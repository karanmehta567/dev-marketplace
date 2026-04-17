import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export default function StatsCard({icon:Icon,value,label,hasBorder}:{icon:LucideIcon,value:string,label:string,hasBorder?:boolean}){
    return(
        <div className={cn("space-y-1 md:space-y-2",hasBorder&&"border-x border-border/50")}>
            <div className="flex items-center justify-center gap-1 md:gap-2">
                <Icon className="size-4 md:size-5 text-primary/70 flex-shrink-0"/>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold">{value}</p>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
        </div>
    )
}