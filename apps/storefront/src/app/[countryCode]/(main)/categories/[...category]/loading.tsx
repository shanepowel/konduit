import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"

export default function CategoryLoading() {
  return (
    <div className="content-container py-10">
      <div className="skeleton-block mb-4 h-8 w-56 rounded-full" />
      <div className="skeleton-block mb-8 h-16 max-w-3xl rounded-2xl" />
      <SkeletonProductGrid />
    </div>
  )
}
