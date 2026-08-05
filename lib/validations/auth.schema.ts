
import {z} from "zod"

export const loginSchema= z.object({
   email: z
  .email("Invalid email address")
  .trim(),
    password: z.string().min(6,"Password must be atleast 6 characters")
})

export const signupSchema= z.object({
    name: z.string().trim().min(3,"Name must be at least 3 characters"),
email: z
  .email("Invalid email address")
  .trim(),
    password: z.string().min(6,"Password must be atleast 6 characters"),
    
    terms: z.boolean().refine((value)=> value===true,{
        message:"Accept the terms and conditions to register"
    })
   
})

