import { Link } from '@/platform/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { Price } from '@/features/pricing/price';
import { getTranslations } from 'next-intl/server';

type ActiveOrder = {
  id: string;
  currencyCode: string;
  subTotalWithTax: number;
  shippingWithTax: number;
  totalWithTax: number;
  discounts?: Array<{
    description: string;
    amountWithTax: number;
  }> | null;
};

export async function OrderSummary({ activeOrder }: { activeOrder: ActiveOrder }) {
  const t = await getTranslations('Cart');
  return (
    <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">{t('orderSummary')}</h2>

      <div className="mb-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t('subtotal')}</span>
          <span>
            <Price value={activeOrder.subTotalWithTax} currencyCode={activeOrder.currencyCode} />
          </span>
        </div>
        {activeOrder.discounts && activeOrder.discounts.length > 0 && (
          <>
            {activeOrder.discounts.map((discount, index) => (
              <div key={index} className="flex justify-between text-sm text-green-600">
                <span>{discount.description}</span>
                <span>
                  <Price value={discount.amountWithTax} currencyCode={activeOrder.currencyCode} />
                </span>
              </div>
            ))}
          </>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t('shipping')}</span>
          <span>
            {activeOrder.shippingWithTax > 0 ? (
              <Price value={activeOrder.shippingWithTax} currencyCode={activeOrder.currencyCode} />
            ) : (
              t('calculatedAtCheckout')
            )}
          </span>
        </div>
      </div>

      <div className="mb-6 border-t pt-4">
        <div className="flex items-baseline justify-between text-lg font-bold">
          <span>{t('total')}</span>
          <span className="text-2xl">
            <Price value={activeOrder.totalWithTax} currencyCode={activeOrder.currencyCode} />
          </span>
        </div>
      </div>

      <Button render={<Link href="/checkout" />} nativeButton={false} className="w-full" size="lg">
        {t('proceedToCheckout')}
      </Button>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="h-3 w-3" />
        <span>{t('secureCheckout')}</span>
      </div>

      <Button
        render={<Link href="/" />}
        nativeButton={false}
        variant="outline"
        className="mt-3 w-full"
      >
        {t('continueShopping')}
      </Button>
    </div>
  );
}
