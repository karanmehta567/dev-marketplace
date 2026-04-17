import FeaturedProduct from "@/components/hero-section/featured-products";
import HeroLandingPage from "@/components/hero-section/landing-page";
import RecentlyLaunchedProducts from "@/components/hero-section/recently-launched";
import ProductSkeleton from "@/components/Products/product-skeleton";
import { Suspense } from "react";

export default function Page(){
  return(
    <div>
      <HeroLandingPage/>
        <div className="border-primary border border-dashed my-8 md:my-12 lg:my-16"/>

      {/* <Suspense fallback={<ProductSkeleton/>}> */}
        <FeaturedProduct/>
      {/* </Suspense> */}

      <Suspense fallback={<ProductSkeleton/>}>
        <RecentlyLaunchedProducts/>
      </Suspense>
    </div>
  )
}