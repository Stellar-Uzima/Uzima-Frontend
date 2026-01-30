"use client";

import { ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Providers wrapper
export default function Providers({ children }: { children: ReactNode }) {
  // Keep QueryClient in state to avoid hydration warnings
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
