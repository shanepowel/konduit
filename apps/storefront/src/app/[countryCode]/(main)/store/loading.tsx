import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"

export default function StoreLoading() {
  return (
    <div className="content-container py-10">
      <div className="skeleton-block mb-3 h-5 w-24 rounded-full" />
      <div className="skeleton-block mb-8 h-9 w-48 rounded-full" />
      <SkeletonProductGrid />
    </div>
  )
}
