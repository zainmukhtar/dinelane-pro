'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { OrderLine } from './types';
import { useCheckout } from './checkout-provider';
import { Price } from '@/features/pricing/price';
import { useTranslations } from 'next-intl';

function OrderSummaryContent({
  order,
  t,
}: {
  order: ReturnType<typeof useCheckout>['order'];
  t: ReturnType<typeof useTranslations<'Checkout'>>;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {order.lines.map((line: OrderLine) => (
          <div key={line.id} className="flex gap-3">
            {line.productVariant.product.featuredAsset ? (
              <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={line.productVariant.product.featuredAsset.preview}
                  alt={line.productVariant.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                <ShoppingBag className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium">{line.productVariant.product.name}</p>
              {line.productVariant.name !== line.productVariant.product.name && (
                <p className="text-xs text-muted-foreground">{line.productVariant.name}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {t('qty', { quantity: line.quantity })}
              </p>
            </div>
            <div className="text-sm font-medium">
              <Price value={line.linePriceWithTax} currencyCode={order.currencyCode} />
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t('subtotal')}</span>
          <span>
            <Price value={order.subTotalWithTax} currencyCode={order.currencyCode} />
          </span>
        </div>

        {order.discounts && order.discounts.length > 0 && (
          <>
            {order.discounts.map((discount, index: number) => (
              <div key={index} className="flex justify-between text-sm text-green-600">
                <span>{discount.description}</span>
                <span>
                  <Price value={discount.amountWithTax} currencyCode={order.currencyCode} />
                </span>
              </div>
            ))}
          </>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t('shipping')}</span>
          <span>
            {order.shippingWithTax > 0 ? (
              <Price value={order.shippingWithTax} currencyCode={order.currencyCode} />
            ) : (
              t('toBeCalculated')
            )}
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between text-lg font-bold">
        <span>{t('total')}</span>
        <span>
          <Price value={order.totalWithTax} currencyCode={order.currencyCode} />
        </span>
      </div>
    </div>
  );
}

export default function OrderSummary() {
  const t = useTranslations('Checkout');
  const { order } = useCheckout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile: Collapsible summary */}
      <div className="lg:hidden">
        <Card>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    {t('orderSummary')} ({order.lines.length}{' '}
                    {order.lines.length === 1 ? t('item') : t('items')})
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">
                      <Price value={order.totalWithTax} currencyCode={order.currencyCode} />
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <OrderSummaryContent order={order} t={t} />
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>

      {/* Desktop: Always visible sticky summary */}
      <div className="hidden lg:block">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>{t('orderSummary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderSummaryContent order={order} t={t} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
