/**
 * Varydian financial reporting app (separate deployment).
 * Set NEXT_PUBLIC_FINANCE_APP_URL in env — no trailing slash.
 */

function normalizeBaseUrl(url: string): string {
  return url.trim().replace(/\/+$/, '');
}

export function isFinanceAppConfigured(): boolean {
  return Boolean(normalizeBaseUrl(process.env.NEXT_PUBLIC_FINANCE_APP_URL || ''));
}

export function getFinanceAppUrl(path = ''): string {
  const base = normalizeBaseUrl(process.env.NEXT_PUBLIC_FINANCE_APP_URL || '');
  if (!base) {
    return path || '#';
  }
  if (!path) {
    return base;
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
