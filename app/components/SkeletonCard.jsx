export default function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-3/4" />
      <div className="h-3 bg-gray-100 rounded animate-pulse mb-2 w-1/2" />
      <div className="h-3 bg-gray-100 rounded animate-pulse mb-4 w-1/3" />
      <div className="flex gap-2">
        <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  )
}