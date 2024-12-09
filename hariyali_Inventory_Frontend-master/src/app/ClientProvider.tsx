"use client";

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <Toaster position={"top-right"} />
        {isClient ? children : null}
      </QueryClientProvider>
    </RecoilRoot>
  );
}