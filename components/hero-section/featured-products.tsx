'use cache'
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import { Button } from "../ui/button";
import Link from "next/link";
import FeaturedProductCard from "../Products/FeaturedCard";
import { getFeaturedProducts } from "@/lib/products/product-select";

export default async function FeaturedProduct(){
    const FeaturedProducts=await getFeaturedProducts()
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-muted/20">
            <div className="wrapper">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
                    <SectionHeader title='Featured Today' icon={StarIcon} description='Top Picks from community this week'/>
                    <Button variant={'outline'} asChild className="hidden sm:flex px-3 py-2 md:py-4 text-sm md:text-base">
                        <Link href={'/explore'} className="whitespace-nowrap">
                            View All <ArrowUpRightIcon className="size-3 md:size-4 ml-1"/>
                        </Link>
                    </Button>
                </div>
                <div className="grid-wrapper">
                    {FeaturedProducts.map((product)=>(
                        <FeaturedProductCard key={product.id} product={product}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}