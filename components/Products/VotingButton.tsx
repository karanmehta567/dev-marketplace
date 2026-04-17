'use client'
import { ChevronDownIcon, ChevronUpIcon} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { downvotingProductAction, upvotingProductAction } from "@/lib/products/product-action";
import { useOptimistic, useTransition } from "react";

export default function VotingButton({hasVoted,voteCount:initialVoteCount,productId}:{hasVoted?:boolean,voteCount:number,productId:number}){
    const [optimisticValue,setOptimisticValue]=useOptimistic(initialVoteCount,(currentCount,change:number)=>Math.max(0,currentCount+change))
    const [isPending,startTransition]=useTransition()

    async function handleUpVote(){
        startTransition(async()=>{
            setOptimisticValue(1)
            const result=await upvotingProductAction(productId)
            console.log(result)
        })
    }
    async function handleDownVote(){
        startTransition(async()=>{
            setOptimisticValue(-1)
            const result=await downvotingProductAction(productId)
            console.log(result)
        })
    }
    return (
        <div className="flex flex-col shrink-0 gap-1 items-center" onClick={(e)=>{
            e.preventDefault(),
            e.stopPropagation()
        }}>
            {/* Voting Button */}
            <Button disabled={isPending} onClick={handleUpVote} variant={'ghost'} size={'sm'} className={cn("h-8 w-8 text-primary",hasVoted?'bg-primary/10 text-primary hover:bg-primary/20':'hover:bg-primary/20 hover:text-primary')}>
                <ChevronUpIcon className="size-4"/>
            </Button>
            <span className="text-sm font-semibold transition-colors text-foreground">
                {optimisticValue}
            </span>
            <Button disabled={isPending} onClick={handleDownVote}variant={'ghost'} size={'sm'} className={cn("h-8 w-8 text-primary",hasVoted?'hover:text-destructive':'opacity-50 cursor-not-allowed')}>
                <ChevronDownIcon className="size-4"/>
            </Button>
        </div>
    )
}