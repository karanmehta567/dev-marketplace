import { LucideIcon } from "lucide-react";

export default function EmptyState({message,icon:Icon}:{message:string,icon:LucideIcon}){
    return (
        <div className="empty-state">
            <div className="space-y-4 md:space-y-6">
                <div>
                    {Icon&&<Icon className="size-7 md:size-10 text-muted-foreground/50 mx-auto mb-2 md:mb-4"/>}
                    <p className="text-base md:text-lg font-medium text-muted-foreground">{message}</p>
                </div>
            </div>
        </div>
    )
}