// Skeleton blocks for different UI shapes
export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
    <div className="skeleton h-56 w-full rounded-none" />
    <div className="p-4 space-y-2">
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-3 w-1/2" />
      <div className="skeleton h-3 w-full mt-3" />
      <div className="skeleton h-3 w-5/6" />
    </div>
  </div>
);

export const SkeletonProfile = () => (
  <div className="bg-ink px-6 py-16">
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row
                    items-center gap-10">
      <div className="skeleton w-40 h-40 rounded-full flex-shrink-0"
           style={{ background: 'rgba(255,255,255,0.08)' }} />
      <div className="flex-1 space-y-3 w-full">
        <div className="skeleton h-3 w-24 rounded-full"
             style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="skeleton h-8 w-64"
             style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="skeleton h-3 w-full max-w-sm"
             style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="skeleton h-3 w-3/4 max-w-xs"
             style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>
    </div>
  </div>
);

export const SkeletonMemory = () => (
  <div className="skeleton rounded-2xl h-48 w-full" />
);

export const SkeletonComment = () => (
  <div className="flex items-start gap-3 p-4 bg-white rounded-2xl
                  border border-gray-100">
    <div className="skeleton w-9 h-9 rounded-full flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="skeleton h-3 w-32" />
      <div className="skeleton h-3 w-full" />
      <div className="skeleton h-3 w-4/5" />
    </div>
  </div>
);

export const SkeletonText = ({ width = 'w-full', height = 'h-3' }) => (
  <div className={`skeleton ${height} ${width}`} />
);