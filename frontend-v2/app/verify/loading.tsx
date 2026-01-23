import { Spinner } from '@/components/ui/spinner';

export default function VerifyLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Spinner className="size-8" />
            <p className="text-muted-foreground">Loading verification...</p>
          </div>
        </div>
      </div>
    </main>
  );
}
