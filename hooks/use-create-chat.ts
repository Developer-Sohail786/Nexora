"use client"

// Refactored duplicate New chat logic
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useCreateChat(){
    const router= useRouter()

    const createChat= async()=>{
        try {
            const res=await fetch("/api/chat",{
                method:"POST"
            })

            if(!res.ok) {
               toast.error("Unable to create a new conversation. Please try again.");
                return
            }

            const chat: {id: string}= await res.json()
            router.push(`/chat/${chat.id}`)
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
            
        }
    }
    return{createChat}
}