/**
 * Golden-path demo constants — single product ID and QR payloads for client walkthroughs.
 */

/** Primary livestock demo product (Grass-Fed Beef, Karoo Cattle Co.) */
export const DEMO_GOLDEN_PRODUCT_ID = 'BLK003';

/** QR / scan strings used in SAPS roadside demo */
export const DEMO_QR_SCAN_VERIFIED = `MAROON-${DEMO_GOLDEN_PRODUCT_ID}-VERIFIED`;
export const DEMO_QR_SCAN_FLAGGED = 'MAROON-STOLEN-FLAGGED';

export const DEMO_SAPS_PILOT_LABEL = 'KZN pilot — simulated ledger for demonstration';

/** Public trace path (relative) */
export function getPublicTracePath(productId: string = DEMO_GOLDEN_PRODUCT_ID): string {
  return `/public-access/trace/${productId}`;
}

/** Full trace URL when `window` is available */
export function getPublicTraceUrl(productId: string = DEMO_GOLDEN_PRODUCT_ID): string {
  const path = getPublicTracePath(productId);
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`;
  }
  return path;
}

/** JSON payload embedded in demo QR codes */
export function buildDemoQrPayload(options?: {
  productId?: string;
  productName?: string;
  farmer?: string;
  location?: string;
}): string {
  const id = options?.productId ?? DEMO_GOLDEN_PRODUCT_ID;
  return JSON.stringify({
    id,
    name: options?.productName ?? 'Grass-Fed Beef',
    farmer: options?.farmer ?? 'Karoo Cattle Co.',
    location: options?.location ?? 'Graaff-Reinet, Eastern Cape',
    traceUrl: getPublicTraceUrl(id),
    timestamp: new Date().toISOString(),
    source: 'maroon-traceability',
  });
}

/** Documented demo logins (password auth at /auth/login) */
export const DEMO_PASSWORD_ACCOUNTS = [
  { role: 'Farmer', email: 'farmer@demo.com', password: 'farmer123' },
  { role: 'Inspector', email: 'inspector@demo.com', password: 'inspector123' },
  { role: 'Logistics', email: 'logistics@demo.com', password: 'logistics123' },
  { role: 'Packaging', email: 'packaging@demo.com', password: 'packaging123' },
  { role: 'Retailer', email: 'retailer@demo.com', password: 'retailer123' },
  { role: 'SAPS (STU pilot)', email: 'saps@demo.com', password: 'saps123' },
  { role: 'Admin', email: 'admin@demo.com', password: 'admin123' },
] as const;
