import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function VerifyLoading() {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="flex justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Verifying Your Account</h1>
          <p className="text-muted-foreground">Please wait while we verify your email address...</p>
        </div>
      </CardContent>
    </Card>
  );
}
