import { cn } from "@/lib/utils"

export default function StatsCard({all,approved,rejected,pending}:{all:number,approved:number,rejected:number,pending:number}){
    const stats=[
        {
            label:'Total Products',
            count:all,
            color:'bg-primary/10 text-primary',
            icon:'📊'
        },
        {
            label:'Pending Review',
            count:pending,
            color:'bg-yellow-500/10 text-yellow-600',
            icon:'⏳'
        },
        {
            label:'Approved',
            count:approved,
            color:'bg-green-500/10 text-green-600',
            icon:'✓'
        },
        {
            label:'Rejected',
            count:rejected,
            color:'bg-red-500/10 text-red-600',
            icon:'✗'
        }
    ]
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stats.map(({label,color,count,icon})=>(
                <div key={label} className={cn("rounded-lg p-3 md:p-4 border border-border/50 hover:border-border transition-colors", color)}>
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs md:text-sm font-medium opacity-75">{label}</p>
                        <span className="text-lg md:text-xl">{icon}</span>
                    </div>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold">{count}</p>
                </div>
            ))}
        </div>
    )
}