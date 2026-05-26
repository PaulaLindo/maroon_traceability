'use client';

import { ExternalLink } from 'lucide-react';
import { getFinanceAppUrl, isFinanceAppConfigured } from '@/lib/financeAppUrl';

interface FinanceAppLinkProps {
  path?: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  showExternalIcon?: boolean;
}

export function FinanceAppLink({
  path = '/login',
  children,
  className,
  title,
  showExternalIcon = false,
}: FinanceAppLinkProps) {
  if (!isFinanceAppConfigured()) {
    return null;
  }

  const label =
    typeof children === 'string'
      ? `${children} (opens in new tab)`
      : 'Open Varydian financial reporting (opens in new tab)';

  return (
    <a
      href={getFinanceAppUrl(path)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title={title}
      aria-label={label}
    >
      {children}
      {showExternalIcon && <ExternalLink className="ml-1.5 inline h-3.5 w-3.5" aria-hidden />}
    </a>
  );
}
