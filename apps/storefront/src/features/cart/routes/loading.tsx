import { CartSkeleton } from '@/features/cart/components/cart-skeleton';

export default function CartLoading() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-8 h-9 w-48 animate-pulse rounded bg-muted" />
      <CartSkeleton />
    </div>
  );
}
