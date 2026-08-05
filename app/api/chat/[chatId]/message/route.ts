import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  SendMessageSchema,
  type SendMessageInput,
} from "@/lib/validations/message.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import {
  saveAIMessage,
  saveUserMessage,
  streamAIResponse,
} from "@/services/chat/chat.service";
import { generateChatTitle } from "@/services/chat/chat.title";
import { cleanAIResponse } from "@/lib/utils/clean.ai.response";
import { MessageType } from "@prisma/client";
import {
  canGenerateImage,
  canSendMessage,
  canUseModel,
  canUseWebSearch,
} from "@/services/subscription/subscription.service";

import { isSearchPrompt } from "@/lib/utils/is-search-prompt";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> },
) {
  
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { chatId } = await params;

    const body: SendMessageInput = SendMessageSchema.parse(await req.json());

    const { content, model, files, editingMessageId, forceImage } = body;
   

    let finalPrompt = content;

   

    if (files.length > 0) {
      let fileContext = "";

      for (const file of files) {
        const dbFile = await prisma.file.findUnique({
          where: {
            id: file.id,
          },
          select: {
            name: true,
            content: true,
          },
        });

        if (!dbFile) continue;

        fileContext += `

File: ${dbFile.name}

${dbFile.content ?? ""}

`;
      }

      finalPrompt = `${content}

Attached Documents:

${fileContext}`;
    }

    

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        plan: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

 if (!canUseModel(user, model)) {
      return NextResponse.json(
        { message: "This AI model is avaliable only with Nexus Pro" },
        { status: 403 },
      );
    }

    if (forceImage && !(await canGenerateImage(user))) {
      return NextResponse.json(
        {
          message:
            "You've used today's free image generation. Upgrade to Nexus Pro for unlimited image generation.",
        },
        {
          status: 403,
        },
      );
    }

     if (isSearchPrompt(finalPrompt) && !canUseWebSearch(user)) {
      return NextResponse.json(
        {
          message: "Web Search is available only with Nexus Pro.",
        },
        {
          status: 403,
        },
      );
    }
    if (!(await canSendMessage(user))) {
      return NextResponse.json(
        {
          message:
            "You've reached today's free chat limit. Upgrade to Nexus Pro.",
        },
        {
          status: 403,
        },
      );
    }

   

   

    

    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId: user.id,
      },
    });

    if (!chat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    if (editingMessageId) {
      const editedMessage = await prisma.message.findUnique({
        where: {
          id: editingMessageId,
        },
        select: {
          createdAt: true,
        },
      });
      if (editedMessage) {
        await prisma.$transaction([
          prisma.message.update({
            where: {
              id: editingMessageId,
            },
            data: {
              content: finalPrompt,
              attachments: files,
            },
          }),

          prisma.message.deleteMany({
            where: {
              chatId,
              createdAt: {
                gt: editedMessage.createdAt,
              },
            },
          }),
        ]);
      }
    } else {
      await saveUserMessage(chatId, finalPrompt, files);
    }

    const result = await streamAIResponse(chatId, user.id, model, forceImage);

    if (result.type === "image") {
      

      await saveAIMessage(chatId, model, {
        type: MessageType.IMAGE,
        content,
        imageUrl: result.imageUrl,
      });

      if (chat.title === "New Chat") {
        const title = await generateChatTitle(content);

        await prisma.chat.update({
          where: {
            id: chatId,
          },
          data: {
            title,
          },
        });
      }
      return NextResponse.json(result);
    }

    const encoder = new TextEncoder();
    let fullResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.textStream) {
            fullResponse += chunk;
            controller.enqueue(encoder.encode(chunk));
          }

          const cleanedResponse = cleanAIResponse(fullResponse);

          await saveAIMessage(chatId, model, {
            type: MessageType.TEXT,
            content: cleanedResponse,
          });

          if (chat.title === "New Chat") {
            const title = await generateChatTitle(content);

            await prisma.chat.update({
              where: {
                id: chatId,
              },
              data: {
                title,
              },
            });
          }

          controller.close();
        } catch (error) {
          console.error(error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error.issues[0]?.message ?? "Invalid request",
        },
        {
          status: 400,
        },
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
