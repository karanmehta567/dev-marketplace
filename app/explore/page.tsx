import SectionHeader from "@/components/common/section-header";
import { ProductExplorer } from "@/components/Products/product-explorer";
import { getProductsItem } from "@/lib/products/product-select";
import { ShipWheelIcon } from "lucide-react";

export default async function ExplorePage(){
    const products=await getProductsItem()
    return (
        <div className="py-8 md:py-12 lg:py-20">
            <div className="wrapper">
                <div className="mb-8 md:mb-12">
                    <SectionHeader 
                        title="Explore All Products" 
                        icon={ShipWheelIcon} 
                        description="Browse and discover all products shared by our community"/>
                    {/* Product Explorer */}
                    <ProductExplorer products={products}/>
                </div>
            </div>
        </div>
    )
}