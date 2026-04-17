"use client"
import { ClockIcon, SearchIcon, TrendingUpIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import FeaturedProductCard from "./FeaturedCard";
import type { ProductType } from "@/types";
import { useMemo, useState } from "react";

export function ProductExplorer({products}:{products:ProductType[]}){
    const [searchQuery,setSearchQuery]=useState("")
    const [sortMode, setSortMode] = useState<"trending" | "recent">("trending");

    const filteredProduct = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        const filtered = query.length
            ? products.filter((product) =>
                    product.name.toLowerCase().includes(query)
                )
            : products;

        const copy = [...filtered];

        if (sortMode === "trending") {
            copy.sort((a, b) => (b.voteCount ?? 0) - (a.voteCount ?? 0));
        } else {
            copy.sort((a, b) => {
                const aTime = a.createdAt ? new Date(a.createdAt as any).getTime() : 0;
                const bTime = b.createdAt ? new Date(b.createdAt as any).getTime() : 0;
                return bTime - aTime;
            });
        }

        return copy;
    }, [products, searchQuery, sortMode]);
    return (
        <div>
            <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="flex-1 relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4 md:size-5"/><Input onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Search products..." className="pl-9 md:pl-10 text-sm md:text-base" type="text"/>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Button
                        variant={sortMode === "trending" ? "default" : "outline"}
                        onClick={() => setSortMode("trending")}
                        size="sm"
                        className="text-xs md:text-sm"
                    >
                        <TrendingUpIcon className="size-3 md:size-4"/>Trending
                    </Button>
                    <Button
                        variant={sortMode === "recent" ? "default" : "outline"}
                        onClick={() => setSortMode("recent")}
                        size="sm"
                        className="text-xs md:text-sm"
                    >
                        <ClockIcon className="size-3 md:size-4"/>Recent
                    </Button>
                </div>
            </div>
            <div className="mb-4 md:mb-6">
                <span className="text-xs md:text-sm text-muted-foreground">Showing {filteredProduct.length} products</span>
            </div>
            <div className="grid-wrapper">
                {/* Products */}
                {filteredProduct.map((product)=>(
                    <FeaturedProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    )
}