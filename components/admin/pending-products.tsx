import { ProductType } from "@/types";
import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import GetAdminProduct from "./admin-product";

export default function PendingProducts({products}:{products:ProductType}){
    return (
        <Card className="border rounded-lg p-4 md:p-6 bg-background hover:shadow-lg hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col gap-6">
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <CardTitle className="text-base md:text-lg font-semibold line-clamp-2">
                                {products.name}
                            </CardTitle>
                            <Badge className={cn("shrink-0",
                                products.status==='pending'&&"bg-yellow-500/10 text-yellow-600 border-yellow-500",
                                products.status==='approved'&&"bg-green-500/10 text-green-500 border-green-600",
                                products.status==='rejected'&&"bg-red-500/10 text-red-500 border-red-500"
                            )}>{products.status}</Badge>
                        </div>
                        
                        <CardDescription className="space-y-3">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {products.tagline}
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {products.tags?.slice(0, 3).map((tag)=>(
                                    <Badge key={tag} variant={'secondary'} className="text-xs">{tag}</Badge>
                                ))}
                                {products.tags && products.tags.length > 3 && (
                                    <Badge variant={'outline'} className="text-xs">+{products.tags.length - 3}</Badge>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 text-xs md:text-sm text-muted-foreground pt-2 border-t">
                                <p className="flex items-center gap-1"><span className="font-semibold text-foreground">By:</span>{products.submittedBy}</p>
                                <div className="flex flex-col sm:flex-row sm:gap-3 gap-1">
                                    <p>{products.createdAt?new Intl.DateTimeFormat("en-US",{year:'numeric',month:'short',day:'numeric'})
                                    .format(new Date(products.createdAt?.toISOString())):""}
                                    </p>
                                    <a href={products.websiteUrl??""}target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Visit Website</a>
                                </div>
                            </div>
                        </CardDescription>
                    </div>
                        
                    <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t">
                        <div className="flex-1">
                            <GetAdminProduct status={products.status??""} productId={products.id}/>
                        </div>
                    </div>
                </div> 
        </Card>
    )
}