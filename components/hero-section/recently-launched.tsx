import { CalendarRangeIcon, RocketIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import FeaturedProductCard from "../Products/FeaturedCard";
import EmptyState from "../common/empty-state";
import { getRecentlyLaunchedProducts } from "@/lib/products/product-select";

const RecentlyLaunchedProductsData:any=[]
export default async function RecentlyLaunchedProducts(){
    const RecentlyLaunchedProductsData=await getRecentlyLaunchedProducts()
    return (
        <div className="py-20">
            <div className="wrapper space-y-12">
                <SectionHeader title="Recently Launched" icon={RocketIcon} description="Latest products from the community"/>
                {
                    RecentlyLaunchedProductsData.length > 0?(
                        <div className="grid-wrapper">
                            {RecentlyLaunchedProductsData.map((product:any)=>(
                                <FeaturedProductCard key={product.id} product={product}
                                />
                            ))}
                        </div>
                    ):(
                        <EmptyState message="No products launched in last 24 hours, check back again later!" icon={CalendarRangeIcon}/>
                    )
                }
            </div>
        </div>
    ) 
}