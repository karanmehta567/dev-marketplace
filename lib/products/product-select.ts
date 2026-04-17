import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { connection } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function getFeaturedProducts(){
    'use cache'
    const ProductData=await db.select().from(products).where(eq(products.status,"approved")).orderBy(desc(products.voteCount))
    return ProductData
}
export async function getProductsItem(){
    'use cache'
    const ProductData=await db.select().from(products).where(eq(products.status,"approved")).orderBy(desc(products.voteCount))
    return ProductData
}
export async function getAllTheDamnProducts(){
    const product=await db.select().from(products).orderBy(desc(products.voteCount))
    return product
}
export async function getProductBySlug(slug:string){
    const product=await db.select().from(products).where(eq(products.slug,slug))
    // console.log(product)
    return product?.[0] ?? null
}
export async function getRecentlyLaunchedProducts(){
    noStore()
    await connection()
    const getProducts=getProductsItem() 
    const oneWeekAgo=new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate()-7)
    return (await getProducts).filter((product)=>(
        product.createdAt&&new Date(product.createdAt.toISOString())>=oneWeekAgo
    ))
}