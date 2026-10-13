import { getRouteLocale } from '@/platform/i18n/server';
import { cacheLife, cacheTag } from 'next/cache';
import { getTopCollections } from '@/features/collections/data';
import Image from 'next/image';
import { NavigationLink } from '@/site/navigation/navigation-link';
import { getTranslations } from 'next-intl/server';

const COPYRIGHT_YEAR = 2026;

async function Copyright() {
  'use cache';
  cacheLife('days');

  const locale = await getRouteLocale();
  const t = await getTranslations({ locale, namespace: 'Footer' });

  return (
    <div>
      &copy; {COPYRIGHT_YEAR} {t('copyright')}
    </div>
  );
}

export async function Footer() {
  'use cache';
  cacheLife('days');

  const locale = await getRouteLocale();
  cacheTag(`footer-${locale}`);

  const t = await getTranslations({ locale, namespace: 'Footer' });
  const collections = await getTopCollections(locale);

  return (
    <footer className="mt-auto border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <NavigationLink href="/" className="mb-4 inline-block">
              <Image
                src="/vendure.svg"
                alt="Vendure"
                width={40}
                height={27}
                className="h-6 w-auto dark:invert"
              />
            </NavigationLink>
            <p className="text-sm leading-relaxed text-balance text-muted-foreground">
              {t('description')}
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold">{t('categories')}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {collections.map((collection) => (
                <li key={collection.id}>
                  <NavigationLink
                    href={`/collection/${collection.slug}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {collection.name}
                  </NavigationLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold">{t('customer')}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <NavigationLink href="/search" className="transition-colors hover:text-foreground">
                  {t('shopAll')}
                </NavigationLink>
              </li>
              <li>
                <NavigationLink
                  href="/account/orders"
                  className="transition-colors hover:text-foreground"
                >
                  {t('orders')}
                </NavigationLink>
              </li>
              <li>
                <NavigationLink
                  href="/account/profile"
                  className="transition-colors hover:text-foreground"
                >
                  {t('account')}
                </NavigationLink>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold">{t('vendure')}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/vendure-ecommerce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {t('github')}
                </a>
              </li>
              <li>
                <a
                  href="https://docs.vendure.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {t('documentation')}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vendure-ecommerce/vendure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {t('sourceCode')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <Copyright />
          <div className="flex items-center gap-2">
            <span>{t('poweredBy')}</span>
            <a
              href="https://vendure.io"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              <Image
                src="/vendure.svg"
                alt="Vendure"
                width={40}
                height={27}
                className="h-4 w-auto dark:invert"
              />
            </a>
            <span>&</span>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              <Image
                src="/next.svg"
                alt="Next.js"
                width={16}
                height={16}
                className="h-5 w-auto dark:invert"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
