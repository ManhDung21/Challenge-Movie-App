// Skeleton loading components for better UX

export function MovieCardSkeleton() {
    return (
        <div className="space-y-2 animate-pulse">
            {/* Thumbnail skeleton */}
            <div className="aspect-video bg-[#2b2b2b] rounded-lg" />

            {/* Title skeleton */}
            <div className="space-y-2">
                <div className="h-4 bg-[#2b2b2b] rounded w-3/4" />
                <div className="h-3 bg-[#2b2b2b] rounded w-1/4" />
            </div>
        </div>
    );
}

export function MovieGridSkeleton({ count = 12 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <MovieCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function MovieDetailsSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="aspect-video bg-[#2b2b2b] rounded-lg mb-6" />
            <div className="space-y-4">
                <div className="h-8 bg-[#2b2b2b] rounded w-1/2" />
                <div className="h-4 bg-[#2b2b2b] rounded w-full" />
                <div className="h-4 bg-[#2b2b2b] rounded w-5/6" />
                <div className="h-4 bg-[#2b2b2b] rounded w-4/6" />
            </div>
        </div>
    );
}
