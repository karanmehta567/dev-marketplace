import z from "zod";

export const productSchema=z.object({
    name:z.string().min(3,{message:'Product name must be at least 3 characters'}).max(150,{message:'Product name must be 150 characters or less'}),
    slug:z.string().min(4,{message:'Slug must be at least 4 characters'}).max(100,{message:'Slug must be 100 characters or less'}).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {message:
        "Slug must be lowercase and contain only letters and numbers and hyphens",
    }),
    tagline:z.string().min(1, { message: "Tagline is required" }).max(200, { message: "Tagline must be 200 characters or less" }),
    description:z.string().optional(),
    websiteUrl:z.string().min(1, { message: "Website URL is required" }),
    tags:z.string().min(1, { message: "Tags are required"}).transform((val)=>val.split(',').map((tag)=>tag.trim().toLowerCase()))
})