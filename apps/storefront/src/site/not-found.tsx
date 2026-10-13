import { getRouteLocale } from '@/platform/i18n/server';
import { Button } from '@/components/ui/button';
import { SearchX, Home, ShoppingBag } from 'lucide-react';
import { Link } from '@/platform/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { getTopCollections } from '@/features/collections/data';

export default async function NotFound() {
  const locale = await getRouteLocale();
  const t = await getTranslations({ locale, namespace: 'NotFound' });
  let collections: { id: string; name: string; slug: string }[] = [];
  try {
    collections = await getTopCollections(locale);
  } catch {
    // Gracefully handle if collections can't be fetched
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="max-w-lg space-y-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <SearchX className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-7xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">{t('title')}</h2>
          <p className="mx-auto max-w-sm text-muted-foreground">{t('message')}</p>
        </div>

        <div className="flex justify-center gap-3">
          <Button nativeButton={false} render={<Link href="/" />} size="lg">
            <Home className="mr-2 h-4 w-4" />
            {t('goHome')}
          </Button>
          <Button nativeButton={false} render={<Link href="/search" />} variant="outline" size="lg">
            <ShoppingBag className="mr-2 h-4 w-4" />
            {t('browseProducts')}
          </Button>
        </div>

        {collections.length > 0 && (
          <div className="border-t pt-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              {t('popularCollections')}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {collections.slice(0, 6).map((collection) => (
                <Button
                  key={collection.id}
                  render={<Link href={`/collection/${collection.slug}`} />}
                  nativeButton={false}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  {collection.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
