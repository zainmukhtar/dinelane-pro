import { Button } from '@/components/ui/button';
import { Link } from '@/platform/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { getRouteLocale } from '@/platform/i18n/server';

export async function HeroSection() {
  const locale = await getRouteLocale();
  const t = await getTranslations({ locale, namespace: 'Hero' });
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/50 to-muted">
      {/* Subtle decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-primary)/8,transparent)]" />

      <div className="relative container mx-auto px-4 py-28 md:py-40 lg:py-48">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl lg:text-2xl">
            {t('subtitle')}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button
              render={<Link href="/search" />}
              nativeButton={false}
              size="lg"
              className="min-w-[200px] text-base"
            >
              {t('shopNow')}
            </Button>
            <Button
              render={<Link href="/search" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="min-w-[200px] text-base"
            >
              {t('viewCollections')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
