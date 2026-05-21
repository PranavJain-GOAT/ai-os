// Change #11: Shimmer skeleton loaders matching card shapes
export function ProductCardSkeleton() {
  return (
    <div className="radial-card rounded-2xl overflow-hidden min-h-[220px] flex flex-col group border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="h-40 shimmer-skeleton w-full relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,2,2,0.9)] via-transparent to-transparent z-10" />
      </div>
      <div className="p-4 flex flex-col flex-1 relative z-20">
        <div className="flex gap-2 mb-3">
           <div className="h-5 w-16 rounded-sm shimmer-skeleton" />
           <div className="h-5 w-12 rounded-sm shimmer-skeleton" />
           <div className="h-5 w-20 rounded-sm shimmer-skeleton" />
        </div>
        <div className="h-5 w-3/4 rounded-full shimmer-skeleton mb-2" />
        <div className="h-3 w-full rounded-full shimmer-skeleton mb-1.5 mt-2" />
        <div className="h-3 w-5/6 rounded-full shimmer-skeleton mb-4" />
        
        <div className="flex justify-between items-center mt-auto pt-2">
          <div className="h-6 w-16 rounded-full shimmer-skeleton" />
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-full shimmer-skeleton" />
            <div className="h-8 w-20 rounded-full shimmer-skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturedCardSkeleton() {
  return (
    <div className="radial-card rounded-2xl overflow-hidden min-h-[260px] flex md:flex-row flex-col group border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="w-full md:w-2/5 h-40 md:h-auto shimmer-skeleton relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,2,2,0.9)] md:bg-gradient-to-r md:via-[rgba(2,2,2,0.5)] via-transparent to-transparent z-10" />
      </div>
      <div className="p-6 flex flex-col flex-1 relative z-20">
        <div className="flex gap-2 mb-3">
           <div className="h-5 w-20 rounded-sm shimmer-skeleton" />
           <div className="h-5 w-16 rounded-sm shimmer-skeleton" />
        </div>
        <div className="h-6 w-1/2 rounded-full shimmer-skeleton mb-3 max-w-sm" />
        <div className="h-3 w-full rounded-full shimmer-skeleton mb-2" />
        <div className="h-3 w-full rounded-full shimmer-skeleton mb-2" />
        <div className="h-3 w-3/4 rounded-full shimmer-skeleton mb-6" />
        
        <div className="flex items-center gap-4 mt-auto">
          <div className="h-6 w-20 rounded-full shimmer-skeleton" />
          <div className="h-8 w-28 rounded-full shimmer-skeleton ml-auto" />
        </div>
      </div>
    </div>
  );
}

export function MarketplaceSkeletons() {
  return (
    <div className="space-y-4">
      <div className="sm:col-span-2 lg:col-span-3">
        <FeaturedCardSkeleton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    </div>
  );
}