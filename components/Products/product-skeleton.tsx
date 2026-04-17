import { Card, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function ProductSkeleton() {
return (
    <div className="py-20">
        <div className="wrapper space-y-12">
            <div className="mb-12">
                <div className="mb-3 flex items-center gap-2">
                    <Skeleton className="size-6 shrink-0 rounded-md bg-primary/20" />
                    <Skeleton className="h-9 w-[min(18rem,72vw)] max-w-xs rounded-md" />
                </div>
            <Skeleton className="mb-2 h-5 w-full max-w-2xl rounded-md" />
            <Skeleton className="h-5 w-full max-w-xl rounded-md opacity-80" />
            </div>

            <div className="grid-wrapper">
            {Array.from({ length: 6 }).map((_, index) => (
                <Card
                key={index}
                className="pointer-events-none min-h-[200px] select-none border-solid border-gray-400 shadow-xs"
                >
                <CardHeader className="flex-1">
                    <div className="flex items-start gap-3">
                        <div className="flex min-w-0 flex-1 flex-col gap-3">
                            <div className="flex flex-wrap items-center gap-2">
                            <Skeleton className="h-6 w-[68%] min-w-32 rounded-md" />
                            <Skeleton className="h-5 w-20 shrink-0 rounded-full" />
                            </div>
                            <div className="space-y-2.5">
                            <Skeleton className="h-4 w-full rounded-md" />
                            <Skeleton className="h-4 w-[94%] rounded-md" />
                            <Skeleton className="h-4 w-[55%] rounded-md" />
                            </div>
                        </div>
                    <div className="flex shrink-0 flex-col items-center gap-1">
                        <Skeleton className="size-8 rounded-md" />
                        <Skeleton className="h-4 w-7 rounded-md" />
                        <Skeleton className="size-8 rounded-md opacity-50" />
                    </div>
                    </div>
                </CardHeader>
                <CardFooter>
                    <div className="flex flex-wrap items-center gap-2">
                    <Skeleton className="h-6 w-14 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-18 rounded-full opacity-90" />
                    </div>
                </CardFooter>
                </Card>
            ))}
            </div>
        </div>
        </div>
    );
}
