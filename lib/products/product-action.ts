"use server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { productSchema } from "./validations"
import { db } from "@/db"
import { products } from "@/db/schema"
import z from "zod"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { ProductType } from "@/types"

type FormState={
    success:boolean,
    errors?:Record<string,string[]>
    message:string
}
export const handleApproveAction=async(productId:ProductType["id"])=>{
    try {
        await db.update(products).set({status:'approved'}).where(eq(products.id,productId))
        revalidatePath('/admin')
        return {
            success:true,
            message:'Product Approved'
        }
    } catch (error) {
        console.log("Error while doing approval",error)
        return {
            success:false,
            message:'Product not Approved'
        }
    }
}
export const handleDeleteAction=async(productId:ProductType["id"])=>{
    try {
        await db.delete(products).where(eq(products.id,productId))
        revalidatePath('/admin')
        return {
            status:true,
            message:'Succesfully deleted the product'
        }
    } catch (error) {
        console.log(error)
        return {
            status:false,
            message:'could not delete the product'
        }
    }
}
export async function handleRejectAction(productId:ProductType["id"]){
    // TODO: implement reject logic
    try {
        await db.update(products).set({status:'rejected'}).where(eq(products.id,productId))
        revalidatePath('/admin')
        return {
            success:true,
            message:'Product Rejected'
        }
    } catch (error) {
        console.log('Error while rejecting',error)
        return {
            success:false,
            message:'Product not approved'
        }
    }
}
export const addProductAction=async(prevState:FormState|undefined,formData:FormData):Promise<FormState>=>{
    // auth part
    try {
        const {userId,orgId}=await auth()
        if(!userId){
            return {
                success:false,
                errors: undefined,
                message:'You must be loggedin to add a product'
            }
        }
        if(!orgId){
            return {
                success:false,
                errors: undefined,
                message:'You must be a member of an organization to add a product'
            }
        }
        const user=await currentUser()
        const userEmail=user?.emailAddresses?.[0].emailAddress || "anonymous"

        const rawFormData=Object.fromEntries(formData.entries())

        // validate form data(expectation vs reality)
        const validatedData=productSchema.safeParse(rawFormData)

        if(!validatedData.success){
            return {
                success:false,
                errors:validatedData.error.flatten().fieldErrors,
                message:'Invalid Values'
            }
        }
        const {name,slug,description,tagline,tags,websiteUrl}=validatedData.data

        // transform the data
        const tagsArray=tags?tags.filter((tag)=>typeof tag==='string'):[]

        await db.insert(products).values({
            name,
            slug,
            tagline,
            tags:tagsArray,
            websiteUrl,
            description,
            status:"pending",
            submittedBy:userEmail,
            userId,
            organizationId:orgId,  // todo     
        })
        return {
            success:true,
            errors: undefined,
            message:'Product added! It will be reviewed shortly by us'
        }
    } catch (error) {
        console.log(error)
        if(error instanceof z.ZodError){
            return {
                success:false,
                errors:error.flatten().fieldErrors,
                message:"Validation Failed!"
            }
        }
        return {
            success:false,
            errors: prevState?.errors,
            message:'Failed to add product'
        }
    }
}
// Voting Logic
export const upvotingProductAction=async(productId:number)=>{
    try {
        const {userId,orgId}=await auth()
        if(!userId){
            return {
                success:false,
                errors: undefined,
                message:'You must be loggedin to vote a product'
            }
        }
        if(!orgId){
            return {
                success:false,
                errors: undefined,
                message:'You must be a member of an organization to vote a product'
            }
        }
        await db
            .update(products)
            .set({voteCount:sql`${products.voteCount}+1`})
            .where(eq(products.id,productId)).returning()
        revalidatePath('/')
        return {
            success:true,
            message:'Upvoted Succesfully!'
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            message:'Failed to upvote the product',
            voteCount:0
        }
    }
}

export const downvotingProductAction=async(productId:number)=>{
    try {
        const {userId,orgId}=await auth()
        if(!userId){
            return {
                success:false,
                errors: undefined,
                message:'You must be loggedin to vote a product'
            }
        }
        if(!orgId){
            return {
                success:false,
                errors: undefined,
                message:'You must be a member of an organization to vote a product'
            }
        }
        await db
            .update(products)
            .set({voteCount:sql`${products.voteCount}-1`})
            .where(eq(products.id,productId)).returning()
        revalidatePath('/')
        return {
            success:true,
            message:'Downvoted Succesfully!'
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            message:'Failed to downvote the product',
            voteCount:0
        }
    }
}