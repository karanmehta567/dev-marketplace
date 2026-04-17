import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, EyeIcon, RocketIcon, SparklesIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import StatsCard from "./stats-card";

const BadgeIconSection=()=>{
    return (
        <Badge className="px-4 py-4 mb-8 text-sm backdrop-blur-sm" variant={'outline'}>
            <span className="relative flex h-2 w-2">
                <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-primary opacity-75"/>
                <span className="relative inline-flex h-2 w-2 bg-primary rounded-full"></span>
            </span>
            <span className="text-muted-foreground ml-1">Join thousands of creators sharing their work</span>
        </Badge>
        )
}
const SectionData=[
    {
        icon:RocketIcon,
        value:"1.5k+",
        label:'Projects Shared'
    },
    {
        icon:UsersIcon,
        value:"5k+",
        label:'Active Creators',
        hasBorder:true
    },
    {
        icon:EyeIcon,
        value:"20k+",
        label:'Monthy Visitors'
    }
]
export default function HeroLandingPage(){
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
            <div className="wrapper">
                <div className="flex flex-col items-center justify-center text-center lg:py-24 py-12">
                    <BadgeIconSection/>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl">Share What You&apos;ve Built ,<br />Discover What&apos;s Launching</h1>
                    <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">A community platform for creators to showcase their apps,AI tools,SaaS products, and creative projects.Authentic launches,real builders,genuine feedback</p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <Button asChild size={'lg'} className="text-base px-7 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                            <Link href={'/submit'}>
                                <SparklesIcon className="size-5"/>
                                Share Your Project
                            </Link>
                        </Button>
                        <Button variant={'secondary'} asChild size={'lg'} className="text-base px-7 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                            <Link href={'/explore'}>
                                Explore Projects <ArrowRightIcon className="size-5"/>
                            </Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl w-full">
                        {
                            SectionData.map((stat)=>(
                                <StatsCard key={stat.label} {...stat}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}