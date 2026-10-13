import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getRouteLocale } from '@/platform/i18n/server';
import { HeroSection } from '@/site/home/hero-section';
import { FeaturedProducts } from '@/features/products/featured-products';
import { SITE_NAME, SITE_URL, buildCanonicalUrl } from '@/config/metadata';
import { BadgeCheck, Tag, Zap } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { toOgLocale } from '@/platform/i18n/locale-utils';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRouteLocale();
  const t = await getTranslations({ locale, namespace: 'Home' });
  const ogLocale = toOgLocale(locale);

  return {
    title: {
      absolute: `${SITE_NAME} - ${t('pageTitle')}`,
    },
    description: t('description'),
    alternates: {
      canonical: buildCanonicalUrl('/'),
    },
    openGraph: {
      title: `${SITE_NAME} - ${t('pageTitle')}`,
      description: t('ogDescription'),
      type: 'website',
      locale: ogLocale,
      url: SITE_URL,
    },
  };
}

const featureKeys = [
  { icon: BadgeCheck, key: 'highQuality' },
  { icon: Tag, key: 'bestPrices' },
  { icon: Zap, key: 'fastDelivery' },
] as const;

export default async function Home() {
  const locale = await getRouteLocale();
  const t = await getTranslations({ locale, namespace: 'Home' });

  return (
    <div className="min-h-screen">
      <HeroSection />
      <Suspense>
        <FeaturedProducts />
      </Suspense>

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-2xl font-bold tracking-tight md:text-3xl">
            {t('whyShopWithUs')}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {featureKeys.map((feature) => (
              <div
                key={feature.key}
                className="group relative space-y-4 rounded-xl border border-transparent bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <feature.icon className="size-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t(`features.${feature.key}.title`)}</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {t(`features.${feature.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
