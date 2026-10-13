import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getRouteLocale } from '@/platform/i18n/server';
import { getTranslations } from 'next-intl/server';
import { LoginForm } from './login-form';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { SITE_NAME } from '@/config/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRouteLocale();
  const t = await getTranslations({ locale, namespace: 'Auth' });
  return {
    title: t('pageTitle'),
  };
}

function LoginFormSkeleton() {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="h-4 w-40" />
        </div>
      </CardFooter>
    </Card>
  );
}

async function SignInContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const redirectTo = resolvedParams?.redirectTo as string | undefined;

  return <LoginForm redirectTo={redirectTo} />;
}

export default async function SignInPage({ searchParams }: PageProps<'/[locale]/sign-in'>) {
  const locale = await getRouteLocale();
  const t = await getTranslations({ locale, namespace: 'Auth' });

  return (
    <div className="mt-16 flex min-h-[calc(100vh-4rem)]">
      {/* Branded panel - desktop only */}
      <div className="hidden items-center justify-center rounded-br-3xl bg-gradient-to-br from-primary to-primary/70 p-12 lg:flex lg:w-1/2">
        <div className="max-w-md space-y-6 text-primary-foreground">
          <h2 className="text-4xl font-bold tracking-tight">{SITE_NAME}</h2>
          <p className="text-xl leading-relaxed text-primary-foreground/80">{t('welcomeBack')}</p>
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
            <h1 className="text-3xl font-bold">{t('signIn')}</h1>
            <p className="text-muted-foreground">{t('enterCredentials')}</p>
          </div>
          <Suspense fallback={<LoginFormSkeleton />}>
            <SignInContent searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
