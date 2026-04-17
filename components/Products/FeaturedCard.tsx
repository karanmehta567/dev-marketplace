import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { StarIcon } from "lucide-react"
import VotingButton from "./VotingButton"
import { ProductType } from "@/types"

// interface IProductType{
//     id:number,
//     name:string,
//     description:string,
//     tags:string[],
//     votes:number,
//     isFeatured:boolean
// }

export default function FeaturedProductCard({product}:{product:ProductType}){
    const hasVoted=false
    return (
        <Link href={`/products/${product.slug}`}>
            <Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-[180px] md:min-h-[200px] flex flex-col h-full">
                <CardHeader className="flex-1 overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 flex-wrap">
                                <CardTitle className="text-base md:text-lg group-hover:text-primary transition-colors line-clamp-1">{product.name}</CardTitle>
                                {product.voteCount>500&&<Badge className="gap-1 bg-primary text-primary-foreground text-xs shrink-0"><StarIcon className="size-3 fill-current"/>Featured</Badge>}
                            </div>
                        <CardDescription className="line-clamp-2 text-xs md:text-sm mt-1">{product.description}</CardDescription>
                        </div>
                        <div className="ml-auto">
                            <VotingButton hasVoted={hasVoted} voteCount={product.voteCount} productId={product.id}/>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className="flex flex-wrap gap-2">
                    {product.tags?.map((tag)=>(
                        <Badge key={tag} variant={'secondary'} className="text-xs">{tag}</Badge>
                    ))}
                </CardFooter>
            </Card>
        </Link>
    )
}