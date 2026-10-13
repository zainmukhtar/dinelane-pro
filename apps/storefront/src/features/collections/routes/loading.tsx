import { ProductGridSkeleton } from '@/features/products/product-grid-skeleton';

export default function CollectionLoading() {
  return (
    <div className="container mx-auto mt-16 px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters Sidebar Skeleton */}
        <aside className="lg:col-span-1">
          <div className="h-64 animate-pulse rounded-lg bg-muted" />
        </aside>

        {/* Product Grid Skeleton */}
        <div className="lg:col-span-3">
          <ProductGridSkeleton />
        </div>
      </div>
    </div>
  );
}
