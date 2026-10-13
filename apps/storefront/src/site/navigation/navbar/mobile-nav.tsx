'use client';

import { useState } from 'react';
import { Link, useRouter } from '@/platform/i18n/navigation';
import { Menu, Search, ShoppingBag, User, Package, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { useTranslations } from 'next-intl';

interface Collection {
  id: string;
  name: string;
  slug: string;
}

interface MobileNavProps {
  collections: Collection[];
}

export function MobileNav({ collections }: MobileNavProps) {
  const t = useTranslations('Navigation');
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    setOpen(false);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
        <Menu className="size-5" />
        <span className="sr-only">{t('openMenu')}</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-full overflow-y-auto sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>{t('menu')}</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 pb-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('searchProducts')}
              className="w-full pl-9"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>

          {/* Shop All */}
          <div>
            <SheetClose
              render={
                <Link
                  href="/search"
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                />
              }
              nativeButton={false}
              onClick={handleLinkClick}
            >
              <ShoppingBag className="h-5 w-5" />
              {t('shopAll')}
            </SheetClose>
          </div>

          {/* Collections */}
          {collections.length > 0 && (
            <div>
              <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {t('collections')}
              </p>
              <nav className="flex flex-col gap-0.5">
                {collections.map((collection) => (
                  <SheetClose
                    key={collection.slug}
                    render={
                      <Link
                        href={`/collection/${collection.slug}`}
                        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                      />
                    }
                    nativeButton={false}
                    onClick={handleLinkClick}
                  >
                    {collection.name}
                  </SheetClose>
                ))}
              </nav>
            </div>
          )}

          {/* Account links */}
          <div>
            <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {t('account')}
            </p>
            <nav className="flex flex-col gap-0.5">
              <SheetClose
                render={
                  <Link
                    href="/account/profile"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                  />
                }
                nativeButton={false}
                onClick={handleLinkClick}
              >
                <User className="h-5 w-5" />
                {t('profile')}
              </SheetClose>
              <SheetClose
                render={
                  <Link
                    href="/account/orders"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                  />
                }
                nativeButton={false}
                onClick={handleLinkClick}
              >
                <Package className="h-5 w-5" />
                {t('orders')}
              </SheetClose>
              <SheetClose
                render={
                  <Link
                    href="/account/addresses"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                  />
                }
                nativeButton={false}
                onClick={handleLinkClick}
              >
                <MapPin className="h-5 w-5" />
                {t('addresses')}
              </SheetClose>
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
