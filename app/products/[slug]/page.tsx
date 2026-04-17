import SectionHeader from "@/components/common/section-header"
import VotingButton from "@/components/Products/VotingButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts, getProductBySlug } from "@/lib/products/product-select"
import { ArrowLeftIcon,  CalendarSearch,  ExternalLinkIcon,  StarIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export async function generateStaticParams() {
    const products = await getFeaturedProducts()
    return products.map((product) => ({
        slug: product.slug,
    }))
}

function ProductFallback() {
    return (
        <div className="py-16">
            <div className="wrapper">
                <p className="text-muted-foreground">Loading product…</p>
            </div>
        </div>
    )
}

async function ProductContent({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const product = await getProductBySlug(slug)
    if (!product) {
        notFound()
    }
    const {name,description,websiteUrl,tags,voteCount,tagline}=product
    return ( 
        <div className="py-16">
            <div className="wrapper">
                <Link href={'/'} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeftIcon className="size-4"/>Back to Explore
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-start gap-6">
                            <div className="flex-1 min-w-0">
                                <div className="mb-6">
                                    <SectionHeader title={name} icon={StarIcon} description={tagline||""}/>
                                    <div className="flex flex-wrap gap-2">
                                        {tags?.map((tag)=>(
                                            <Badge variant={'secondary'} key={tag}>{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="prose prose-neutral dark:prose-invert max-w-none ">
                            <h2 className="text-xl font-semibold mb-4">About</h2>
                            <p className="text-muted-foreground leading-relaxed">{description}</p>
                        </div>
                        {/*  */}
                        <div className="rounded-lg bg-primary/10 border p-6">
                            <h2 className="text-lg font-semibold mb-4">Product Details</h2>
                            <div className="space-y-3">
                                {
                                [
                                    {
                                        label:'Launched:',
                                        value:new Date(
                                            product.createdAt?.toISOString()??""
                                        ).toLocaleDateString(),
                                        icon:CalendarSearch
                                    },
                                    {
                                        label:'Submitted by:',
                                        value:product.submittedBy,
                                        icon:UserIcon
                                    }
                                ].map(({label,value,icon:Icon})=>(
                                    <div key={label} className="flex items-center gap-1">
                                        {Icon&&<Icon className="size-4 text-muted-foreground"/>}
                                        <span className="text-md text-muted-foreground">{label}</span>
                                        <p className="font-semibold">{value}</p>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                    {/* Right Side Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <div className="border rounded-lg p-6 bg-background">
                                <div className="text-center mb-6">
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Support this product
                                    </p>
                                    <VotingButton voteCount={voteCount} productId={product.id}/>
                                    {voteCount>100&&
                                    <div className="pt-6 border-t">
                                        <Badge className="w-full py-4 rounded-xl justify-center">
                                            <span className="text-lg font-bold">🔥Featured Product</span>
                                        </Badge>
                                    </div>}
                                </div>
                            </div>
                            {
                                websiteUrl&&(
                                    <Button asChild className="w-full rounded-lg" variant={'outline'}>
                                        <a href={websiteUrl} target="_blank" rel="noopener noreferrer">Visit Website <ExternalLinkIcon className="size-4"/></a>
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Product({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    return (
        <Suspense fallback={<ProductFallback />}>
            <ProductContent params={params} />
        </Suspense>
    )
}
