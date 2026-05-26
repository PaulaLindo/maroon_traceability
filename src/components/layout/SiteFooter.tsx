'use client';

import { FinanceAppLink } from '@/components/layout/FinanceAppLink';
import { isFinanceAppConfigured } from '@/lib/financeAppUrl';

export function SiteFooter() {
  if (!isFinanceAppConfigured()) {
    return null;
  }

  return (
    <footer className="border-t border-gray-200 bg-white/80 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm text-gray-600">
        <span>© {new Date().getFullYear()} Maroon Traceability</span>
        <FinanceAppLink
          path="/login"
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
          title="Separate secure app; use your Varydian account."
          showExternalIcon
        >
          Financial reporting (Varydian)
        </FinanceAppLink>
      </div>
    </footer>
  );
}
