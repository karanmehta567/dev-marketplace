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
            <Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-[200px]">
                <CardHeader className="flex-1">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-lg group-hover:text-primary transition-colors">{product.name}</CardTitle>
                                {product.voteCount>500&&<Badge className="gap-1 bg-primary text-primary-foreground"><StarIcon className="size-3 fill-current"/>Featured</Badge>}
                            </div>
                        <CardDescription>{product.description}</CardDescription>
                        </div>
                        <VotingButton hasVoted={hasVoted} voteCount={product.voteCount} productId={product.id}/>
                    </div>
                </CardHeader>
                <CardFooter>
                    <div className="flex items-center gap-2">
                        {product.tags?.map((tag)=>(
                            <Badge key={tag} variant={'secondary'}>{tag}</Badge>
                        ))}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}