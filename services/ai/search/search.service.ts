import { buildSearchMessages } from "./prompt"
import { searchTavily } from "./tavily"

export async function prepareSearchMessages(
    messages:{
        role: "user" | "ai",
        content: string
    }[],
){
    const lastMessage=messages.at(-1)

    if(!lastMessage){
        throw new Error("No message found.")
    }

    const search= await searchTavily(lastMessage.content)

    return buildSearchMessages(messages, search.results)
}