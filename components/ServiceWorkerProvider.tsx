"use client";

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/registerServiceWorker';

export default function ServiceWorkerProvider() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
}
