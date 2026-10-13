import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getRouteLocale } from '@/platform/i18n/server';
import { getTranslations } from 'next-intl/server';
import { RegistrationForm } from './registration-form';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { SITE_NAME } from '@/config/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRouteLocale();
  const t = await getTranslations({ locale, namespace: 'Auth' });
  return {
    title: t('createAccount'),
  };
}

function RegistrationFormSkeleton() {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="mx-auto h-4 w-44" />
      </CardFooter>
    </Card>
  );
}

async function RegisterContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const redirectTo = resolvedParams?.redirectTo as string | undefined;

  return <RegistrationForm redirectTo={redirectTo} />;
}

export default async function RegisterPage({ searchParams }: PageProps<'/[locale]/register'>) {
  const locale = await getRouteLocale();
  const t = await getTranslations({ locale, namespace: 'Auth' });

  return (
    <div className="mt-16 flex min-h-[calc(100vh-4rem)]">
      {/* Branded panel - desktop only */}
      <div className="hidden items-center justify-center rounded-br-3xl bg-gradient-to-br from-primary to-primary/70 p-12 lg:flex lg:w-1/2">
        <div className="max-w-md space-y-6 text-primary-foreground">
          <h2 className="text-4xl font-bold tracking-tight">{SITE_NAME}</h2>
          <p className="text-xl leading-relaxed text-primary-foreground/80">{t('joinUs')}</p>
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold">{t('featureFast')}</p>
              <p className="text-sm text-primary-foreground/70">{t('featureCheckout')}</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{t('featureSecure')}</p>
              <p className="text-sm text-primary-foreground/70">{t('featurePayments')}</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{t('featureEasy')}</p>
              <p className="text-sm text-primary-foreground/70">{t('featureReturns')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-sm font-medium tracking-wider text-primary uppercase lg:hidden">
              {SITE_NAME}
            </p>
            <h1 className="text-3xl font-bold">{t('createAccount')}</h1>
            <p className="text-muted-foreground">{t('signUpMessage')}</p>
          </div>
          <Suspense fallback={<RegistrationFormSkeleton />}>
            <RegisterContent searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
