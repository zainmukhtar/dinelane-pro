import Image from 'next/image';
import { FragmentOf, readFragment } from '@/platform/vendure/graphql';
import { ProductCardFragment } from '@/features/products/graphql';
import { Price } from '@/features/pricing/price';
import { Suspense } from 'react';
import { Link } from '@/platform/i18n/navigation';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
  product: FragmentOf<typeof ProductCardFragment>;
  preload?: boolean;
}

export function ProductCard({ product: productProp, preload }: ProductCardProps) {
  const t = useTranslations('Product');
  const product = readFragment(ProductCardFragment, productProp);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.productAsset ? (
          <Image
            src={product.productAsset.preview}
            alt={product.productName}
            fill
            preload={preload}
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
            sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            {t('noImage')}
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 leading-snug font-medium transition-colors group-hover:text-primary">
          {product.productName}
        </h3>
        <Suspense fallback={<div className="h-8 w-36 rounded bg-muted"></div>}>
          <p className="text-lg font-bold tracking-tight">
            {product.priceWithTax.__typename === 'PriceRange' ? (
              product.priceWithTax.min !== product.priceWithTax.max ? (
                <>
                  <span className="mr-1 text-xs font-normal text-muted-foreground">
                    {t('from')}
                  </span>
                  <Price value={product.priceWithTax.min} currencyCode={product.currencyCode} />
                </>
              ) : (
                <Price value={product.priceWithTax.min} currencyCode={product.currencyCode} />
              )
            ) : product.priceWithTax.__typename === 'SinglePrice' ? (
              <Price value={product.priceWithTax.value} currencyCode={product.currencyCode} />
            ) : null}
          </p>
        </Suspense>
      </div>
    </Link>
  );
}
