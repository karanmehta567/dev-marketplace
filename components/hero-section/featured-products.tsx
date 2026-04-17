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
        <section className="py-20 bg-muted/20">
            <div className="wrapper">
                <div className="flex items-center justify-between mb-8">
                    <SectionHeader title='Featured Today' icon={StarIcon} description='Top Picks from community this week'/>
                    <Button variant={'outline'} asChild className="hidden sm:flex px-3 py-4">
                        <Link href={'/explore'}>
                            View All <ArrowUpRightIcon className="size-4"/>
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