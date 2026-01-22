'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2Icon, MailIcon, ClockIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        router.push('/profile');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, router]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md text-center"
      >
        <DialogHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/30">
              <CheckCircle2Icon className="size-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <DialogTitle className="text-2xl">Application Submitted!</DialogTitle>
          <DialogDescription className="text-base">
            Your professional verification application has been successfully
            submitted.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
            <ClockIcon className="size-5 text-muted-foreground shrink-0" />
            <p className="text-sm text-left">
              We&apos;ll review your application within{' '}
              <strong>3-5 business days</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
            <MailIcon className="size-5 text-muted-foreground shrink-0" />
            <p className="text-sm text-left">
              A confirmation email has been sent to your professional email
              address.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner className="size-4" />
            <span>Redirecting to profile...</span>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push('/profile')}
            className="w-full sm:w-auto"
          >
            Go to Profile Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
