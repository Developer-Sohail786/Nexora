"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChatActionsProps {
  chatId: string;
  title: string;
}

export default function ChatActions({ chatId, title }: ChatActionsProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const [isRenaming, setIsRenaming] = useState(false);

  const [openRename, setOpenRename] = useState(false);

  const [chatTitle, setChatTitle] = useState(title);

  async function handleRename() {
    try {
      setIsRenaming(true);

      const res = await fetch(`/api/chat/${chatId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: chatTitle.trim(),
        }),
      });

      if (!res.ok) {
        toast.error("Unable to rename the conversation. Please try again.");

        throw new Error("Failed to rename chat.");
      }

      toast.success("Conversation renamed successfully.");
      setOpenRename(false);

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsRenaming(false);
    }
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);

      const res = await fetch(`/api/chat/${chatId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Unable to delete the conversation. Please try again.");

        throw new Error("Failed to delete chat.");
      }

      toast.success("Conversation deleted successfully.");

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Chat actions"
            className="h-7 w-7 rounded-lg text-[#7A748F] opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-white/10 hover:text-white"
          >
            <MoreHorizontal aria-hidden="true" size={15} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-44 rounded-xl border border-white/10 bg-[#221D2D] p-1 text-white shadow-2xl shadow-black/40"
        >
          <DropdownMenuItem
            onClick={() => setOpenRename(true)}
            className="cursor-pointer rounded-lg text-[#D7D3E8] focus:bg-white/10 focus:text-white"
          >
            <Pencil aria-hidden="true" className="mr-2 h-4 w-4" />
            Rename
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-white/10" />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="cursor-pointer rounded-lg text-red-400 focus:bg-red-500/10 focus:text-red-400"
              >
                <Trash2 aria-hidden="true" className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent className="border border-white/10 bg-[#221D2D] text-white shadow-2xl shadow-black/50">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Chat</AlertDialogTitle>

                <AlertDialogDescription className="text-[#A09BB5]">
                  Are you sure you want to delete{" "}
                  <span className="font-medium text-white">
                    &quot;{title}&quot;
                  </span>
                  ?
                  <br />
                  <br />
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="border-white/10 bg-[#17131F] text-white hover:bg-white/10">
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-600 text-white shadow-lg shadow-red-500/20 hover:bg-red-700"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openRename} onOpenChange={setOpenRename}>
        <DialogContent className="border border-white/10 bg-[#221D2D] text-white shadow-2xl shadow-black/50">
          <DialogHeader>
            <DialogTitle>Rename Chat</DialogTitle>

            <DialogDescription className="text-[#A09BB5]">
              Enter a new title for this conversation.
            </DialogDescription>
          </DialogHeader>

          <Input
            aria-label="Conversation title"
            value={chatTitle}
            onChange={(e) => setChatTitle(e.target.value)}
            placeholder="Chat title..."
            className="h-11 rounded-lg border border-white/10 bg-[#17131F] text-white placeholder:text-[#7A748F] focus-visible:border-[#7C5CFC] focus-visible:ring-1 focus-visible:ring-[#7C5CFC]"
          />

          <DialogFooter>
            <Button
              type="button"
              aria-label="Cancel renaming"
              variant="outline"
              onClick={() => setOpenRename(false)}
              className="border border-white/10 bg-[#17131F] text-white hover:bg-white/10 hover:text-white"
            >
              Cancel
            </Button>

            <Button
              type="button"
              aria-label="Save conversation title"
              onClick={handleRename}
              disabled={isRenaming}
              className="bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC]/20 hover:bg-[#6B4EE8]"
            >
              {isRenaming ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
