'use client'
import { CheckIcon, TrashIcon, XCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { handleApproveAction, handleDeleteAction, handleRejectAction } from "@/lib/products/product-action";

export default function GetAdminProduct({status,productId}:{status:string,productId:number}){
    const handleApprove=async()=>{
        await handleApproveAction(productId)
    }
    const handleReject=async()=>{
        await handleRejectAction(productId)
    }
    const handleDelete=async()=>{
        await handleDeleteAction(productId)
    }
    return (
        <div className="flex gap-2">
            <Button variant={'outline'} size="sm" className="flex-1" onClick={handleDelete}><TrashIcon className="size-4 mr-1"/>Delete</Button>
            {
                status==='pending' &&
                <>
                    <Button variant={'default'} size="sm" onClick={handleApprove} className="flex-1">
                        <CheckIcon className="size-4"/>
                        <span className="text-md font-semibold">Approve</span>
                    </Button>
                    <Button variant={'destructive'} size="sm" onClick={handleReject} className="flex-1">
                        <XCircleIcon className="size-4"/>
                        <span className="text-md font-semibold">Reject</span>
                    </Button>
                </>
            }
        </div>
    )
}