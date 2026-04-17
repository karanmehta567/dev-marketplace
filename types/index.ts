import { products } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type ProductType = InferSelectModel<typeof products>
