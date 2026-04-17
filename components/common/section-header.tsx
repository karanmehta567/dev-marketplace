import { LucideIcon } from "lucide-react";

export default function SectionHeader({title,icon:Icon,description}:{title:string,icon:LucideIcon,description:string}){
    return (
        <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Icon className="size-5 md:size-6 text-primary flex-shrink-0"/>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h2>
            </div>
            <p className="text-muted-foreground text-base md:text-lg">{description}</p>
        </div>
    )
}