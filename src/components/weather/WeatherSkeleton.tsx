import { Skeleton } from "../ui/Skeleton";
import { GlassCard } from "../ui/GlassCard";

export const WeatherSkeleton = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Current Weather Skeleton */}
      <GlassCard className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
         <div className="flex-1 space-y-4 w-full">
             <Skeleton className="h-10 w-3/4" />
             <Skeleton className="h-6 w-1/2" />
             <div className="flex items-center mt-4">
                 <Skeleton className="w-24 h-24 rounded-full" />
                 <Skeleton className="h-20 w-32 ml-4" />
             </div>
         </div>
         <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
             <Skeleton className="h-20 w-32" />
             <Skeleton className="h-20 w-32" />
             <Skeleton className="h-20 w-32" />
             <Skeleton className="h-20 w-32" />
         </div>
      </GlassCard>

      {/* AI Insights Skeleton */}
      <GlassCard className="max-w-4xl mx-auto h-auto" delay={0.1}>
          <Skeleton className="h-8 w-1/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
      </GlassCard>

      {/* Forecast Skeleton */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
           <GlassCard className="lg:col-span-2 h-[300px]" delay={0.2}>
               <Skeleton className="h-8 w-1/3 mb-4" />
               <Skeleton className="h-48 w-full" />
           </GlassCard>
           <GlassCard className="lg:col-span-1 h-[300px]" delay={0.3}>
               <Skeleton className="h-8 w-1/2 mb-4" />
               <div className="space-y-4">
                   {[1,2,3,4,5].map(i => (
                       <div key={i} className="flex justify-between items-center">
                           <Skeleton className="h-4 w-12" />
                           <Skeleton className="h-6 w-6 rounded-full" />
                           <Skeleton className="h-4 w-16" />
                       </div>
                   ))}
               </div>
           </GlassCard>
      </div>
    </div>
  )
}
