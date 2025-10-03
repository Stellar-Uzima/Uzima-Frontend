"use client";

import { ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import {
  createSyncStoragePersister,
} from "@tanstack/query-persist-client-sync-storage";
import {
  createIDBPersister,
} from "@tanstack/query-persist-client-indexeddb";

// Setup IndexedDB persister
const idbPersister = createIDBPersister({
  dbName: "reactQuery",     // database name
  storeName: "reactQuery",  // store name
});

// Providers wrapper
export default function Providers({ children }: { children: ReactNode }) {
  // Keep QueryClient in state to avoid hydration warnings
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            cacheTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      })
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: idbPersister }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </PersistQueryClientProvider>
  );
}
