// src/app/providers.tsx
'use client';

import React from 'react';
import { ErrorBoundary } from '@/components/errorBoundary';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { EventLogsProvider } from '@/contexts/eventLogsContext';
import { ProductProvider } from '@/contexts/productContext';
import { SearchProvider } from '@/contexts/search-context';
import { UserProvider } from '@/contexts/userContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <UserProvider>
        <ProductProvider>
          <EventLogsProvider>
            <SearchProvider>
              <main className="container mx-auto px-4 pt-20 pb-8">
                {children}
              </main>
              <SiteFooter />
            </SearchProvider>
          </EventLogsProvider>
        </ProductProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}
