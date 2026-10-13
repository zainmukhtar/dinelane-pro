import Image from 'next/image';
import { Link } from '@/platform/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { Price } from '@/features/pricing/price';
import { removeFromCart, adjustQuantity } from './actions';
import { getTranslations } from 'next-intl/server';

type ActiveOrder = {
  id: string;
  currencyCode: string;
  lines: Array<{
    id: string;
    quantity: number;
    unitPriceWithTax: number;
    linePriceWithTax: number;
    productVariant: {
      id: string;
      name: string;
      sku: string;
      product: {
        name: string;
        slug: string;
        featuredAsset?: {
          preview: string;
        } | null;
      };
    };
  }>;
};

export async function CartItems({ activeOrder }: { activeOrder: ActiveOrder | null }) {
  const t = await getTranslations('Cart');
  if (!activeOrder || activeOrder.lines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">{t('empty')}</h1>
          <p className="mb-8 text-muted-foreground">{t('emptyMessage')}</p>
          <Button render={<Link href="/" />} nativeButton={false}>
            {t('continueShopping')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border lg:col-span-2">
      {activeOrder.lines.map((line) => (
        <div
          key={line.id}
          className="flex flex-col gap-4 border-x bg-card p-4 transition-colors duration-200 first:rounded-t-xl first:border-t last:rounded-b-xl last:border-b hover:bg-muted/30 sm:flex-row"
        >
          {line.productVariant.product.featuredAsset && (
            <Link href={`/product/${line.productVariant.product.slug}`} className="flex-shrink-0">
              <Image
                src={line.productVariant.product.featuredAsset.preview}
                alt={line.productVariant.name}
                width={120}
                height={120}
                className="h-[120px] w-full rounded-xl object-cover sm:w-[120px]"
              />
            </Link>
          )}

          <div className="min-w-0 flex-grow">
            <Link
              href={`/product/${line.productVariant.product.slug}`}
              className="block font-semibold hover:underline"
            >
              {line.productVariant.product.name}
            </Link>
            {line.productVariant.name !== line.productVariant.product.name && (
              <p className="mt-1 text-sm text-muted-foreground">{line.productVariant.name}</p>
            )}
            <p className="mt-1 text-sm text-muted-foreground">
              {t('sku', { sku: line.productVariant.sku })}
            </p>
            <p className="mt-2 text-sm text-muted-foreground sm:hidden">
              <Price value={line.unitPriceWithTax} currencyCode={activeOrder.currencyCode} />{' '}
              {t('each')}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full border bg-muted/50">
                <form
                  action={async () => {
                    'use server';
                    await adjustQuantity(line.id, Math.max(1, line.quantity - 1));
                  }}
                >
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full transition-all duration-200 hover:bg-background"
                    disabled={line.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </form>

                <span className="w-10 text-center font-semibold tabular-nums transition-all duration-200">
                  {line.quantity}
                </span>

                <form
                  action={async () => {
                    'use server';
                    await adjustQuantity(line.id, line.quantity + 1);
                  }}
                >
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full transition-all duration-200 hover:bg-background"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </form>
              </div>

              <form
                action={async () => {
                  'use server';
                  await removeFromCart(line.id);
                }}
              >
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full text-destructive transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-5 w-5" />
                </Button>
              </form>

              <div className="ml-auto sm:hidden">
                <p className="text-lg font-semibold">
                  <Price value={line.linePriceWithTax} currencyCode={activeOrder.currencyCode} />
                </p>
              </div>
            </div>
          </div>

          <div className="hidden flex-shrink-0 text-right sm:block">
            <p className="text-lg font-semibold">
              <Price value={line.linePriceWithTax} currencyCode={activeOrder.currencyCode} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              <Price value={line.unitPriceWithTax} currencyCode={activeOrder.currencyCode} />{' '}
              {t('each')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
