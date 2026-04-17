import PendingProducts from "@/components/admin/pending-products"
import StatsCard from "@/components/admin/stats-card"
import SectionHeader from "@/components/common/section-header"
import { getAllTheDamnProducts } from "@/lib/products/product-select"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { ShieldIcon } from "lucide-react"
import { redirect } from "next/navigation"
import { Suspense } from "react"

function ProductFallback() {
    return (
        <div className="py-16">
            <div className="wrapper">
                <p className="text-muted-foreground">Loading Admin Page...</p>
            </div>
        </div>
    )
}
export default async function Admin() {
    return (
        <Suspense fallback={<ProductFallback />}>
            <AdminContent  />
        </Suspense>
    )
}
async function AdminContent(){
    const {userId}=await auth()
    if(!userId){
        redirect('/sign-in')
    }
    const response=await clerkClient()
    const user=await response.users.getUser(userId!)
    const metadata=user?.publicMetadata

    const isAdmin=metadata?.isAdmin??false
    if(!isAdmin){
        redirect('/')
    }
    const allproducts=await getAllTheDamnProducts()
    const approvedProducts=allproducts.filter((product)=>product.status==='approved')
    const pendingProduct=allproducts.filter((product)=>product.status==='pending')
    const rejectedProducts=allproducts.filter((product)=>product.status==='rejected')

    return (
        <div className="min-h-screen bg-linear-to-br from-background to-secondary/5">
            <div className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
                <div className="wrapper">
                    <div className="mb-8 md:mb-12">
                        <SectionHeader
                            title="Product Admin"
                            icon={ShieldIcon}
                            description="Review and manage submitted products"
                        />
                        <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                            Approve or reject products submitted by the community. Changes update this page automatically.
                        </p>
                    </div>
                    
                    {/* Stats Card */}
                    <div className="mb-10 md:mb-14">
                        <StatsCard 
                            all={allproducts.length} 
                            approved={approvedProducts.length} 
                            rejected={rejectedProducts.length} 
                            pending={pendingProduct.length}
                        />
                    </div>

                    <div className="space-y-12 md:space-y-16">
                        {/* Pending Approval */}
                        <section>
                            <div className="mb-6 md:mb-8">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
                                    Pending Products <span className="text-primary">({pendingProduct.length})</span>
                                </h2>
                                {pendingProduct.length === 0 && (
                                    <p className="text-sm text-muted-foreground mt-2">No pending products awaiting review</p>
                                )}
                            </div>
                            {pendingProduct.length > 0 && (
                                <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                    {pendingProduct.map((product)=>(
                                        <PendingProducts key={product.id} products={product}/>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* ALL PRODUCTS */}
                        <section>
                            <div className="mb-6 md:mb-8">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
                                    All Products <span className="text-primary">({allproducts.length})</span>
                                </h2>
                                {allproducts.length === 0 && (
                                    <p className="text-sm text-muted-foreground mt-2">No products found in the system</p>
                                )}
                            </div>
                            {allproducts.length > 0 && (
                                <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                    {allproducts.map((product)=>(
                                        <PendingProducts key={product.id} products={product}/>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}