"use client"

import { toast } from "sonner";

interface UsePremiumFeatureOptions{
    enabled: boolean;
    message: string;
}

export function UsePremiumFeature({
    enabled,message
}: UsePremiumFeatureOptions){
    function checkAccess(){
        if(enabled){
            return true
        }
        toast.info(message)
        return false;
    }
    return { checkAccess}
}