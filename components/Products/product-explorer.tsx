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
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5"/><Input onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Search products...." className="pl-10" type="text"/>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={sortMode === "trending" ? "default" : "outline"}
                        onClick={() => setSortMode("trending")}
                    >
                        <TrendingUpIcon className="size-4"/>Trending
                    </Button>
                    <Button
                        variant={sortMode === "recent" ? "default" : "outline"}
                        onClick={() => setSortMode("recent")}
                    >
                        <ClockIcon className="size-4"/>Recent
                    </Button>
                </div>
            </div>
            <div className="mb-6">
                <span className="text-sm text-muted-foreground">Showing {filteredProduct.length} products</span>
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