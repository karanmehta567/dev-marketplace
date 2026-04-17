"use client"
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { FormField } from "../forms/form-field";
import { Button } from "../ui/button";
import { addProductAction} from "@/lib/products/product-action";
import { useActionState } from "react";
import { cn } from "@/lib/utils";

const initialState={
    success:false,
    error:{},
    message:""
}
export function ProductForm(){
    const [state,formAction,isPending]=useActionState(addProductAction,initialState)
    const {errors,message,success}=state
    return (
        <form action={formAction} className="space-y-6">
            {
                message && <div className={cn("p-4 rounded-lg border",success?"bg-primary/10 border-primary text-primary":"bg-destructive/10 border-destructive text-destructive")} role="alert" aria-label="polite">
                    {message}
                </div>
            }
            {/* Name */}
            <FormField label="Product Name" name="name" id="name"
            placeholder="My Awesome Product"
            required
            onChange={()=>{}}
            error={errors?.name}/>

            {/* Slug */}
            <FormField label="Slug" name="slug" id="slug"
            placeholder="my-awesome-product"
            required
            onChange={()=>{}}
            error={errors?.slug}
            helperText="URL Friendly version of your product"/>

            <FormField label="Tagline" name="tagline" id="tagline"
            placeholder="A brief catchy tagline"
            required
            onChange={()=>{}}
            error={errors?.tagline}/>

            <FormField label="Description" name="description" id="description"
            placeholder="Tell us more about your product...."
            required
            onChange={()=>{}}
            error={errors?.description}
            textarea/>

            <FormField label="Website URL" name="websiteUrl" id="websiteUrl"
            placeholder="https://www.yourproduct.com"
            required
            onChange={()=>{}}
            error={errors?.websiteUrl}
            helperText="Enter your product website or landing page"/>

            <FormField label="Tags" name="tags" id="tags"
            placeholder="SaaS,Full-Stack,Devops"
            required
            onChange={()=>{}}
            error={errors?.tags}
            helperText="Enter comma separated tags"/>

            {/* {
                state.success&&
                <div className="flex items-center justify-center text-green-400 font-bold text-lg">
                    {state.message}
                </div>
            } */}

            {isPending?
            <>
                <Button type="submit" className="w-full cursor-pointer" size={'lg'}><Loader2Icon className="size-4 animate-spin"/>Submitting Product.....</Button>
            </>
            :
            <>
                <Button type="submit" className="w-full cursor-pointer" size={'lg'}><SparklesIcon className="size-4"/>Submit Product</Button>
            </>
            }
        </form>
    )
}