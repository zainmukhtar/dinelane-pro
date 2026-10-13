'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/platform/i18n/navigation';
import { useTranslations } from 'next-intl';

interface CartIconProps {
  cartItemCount: number;
}

export function CartIcon({ cartItemCount }: CartIconProps) {
  const t = useTranslations('Navigation');
  return (
    <Button
      render={<Link href="/cart" />}
      nativeButton={false}
      variant="ghost"
      size="icon"
      className="relative"
    >
      <ShoppingCart className="h-5 w-5" />
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {cartItemCount}
        </span>
      )}
      <span className="sr-only">{t('shoppingCart')}</span>
    </Button>
  );
}
