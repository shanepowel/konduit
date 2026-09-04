const SkeletonProductPreview = () => {
  return (
    <div className="card elev-sm h-full gap-2 p-4" aria-hidden>
      <div className="skeleton-block aspect-[4/3] w-full rounded-2xl" />
      <div className="skeleton-block h-5 w-2/3 rounded-full" />
      <div className="skeleton-block h-4 w-5/6 rounded-full" />
      <div className="skeleton-block h-3.5 w-1/2 rounded-full" />
    </div>
  )
}

export default SkeletonProductPreview
