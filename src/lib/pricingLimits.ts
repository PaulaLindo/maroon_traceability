/**
 * Maps marketing / registration tier to traceability usage limits.
 * "Records / month" aligns with new blockchain product registrations (farmer flow).
 *
 * Seat limits (1 / 5 / 200 users) are not enforced without tenant billing — surfaced in docs only here.
 */

import type { SubscriptionInfo } from '@/types/user-domain-extensions';
import type { User, UniversalUser } from '@/types/types';

/** Tier keys stored in registration `additional_data` (`metadata`) or inferred from legacy fields */
export type PricingTierKey =
  | 'individual'
  | 'professional_smme'
  | 'professional_commercial'
  | 'enterprise';

export type ResolvedPricingTier = PricingTierKey | 'unknown';

export interface MonthlyRecordQuota {
  /** null = unlimited */
  maxRecordsPerMonth: number | null;
}

const TIER_LIMITS: Record<PricingTierKey, MonthlyRecordQuota> = {
  individual: { maxRecordsPerMonth: 5 },
  professional_smme: { maxRecordsPerMonth: 100 },
  professional_commercial: { maxRecordsPerMonth: 200 },
  enterprise: { maxRecordsPerMonth: null },
};

const VALID_TIERS = new Set<PricingTierKey>([
  'individual',
  'professional_smme',
  'professional_commercial',
  'enterprise',
]);

function isPricingTierKey(v: unknown): v is PricingTierKey {
  return typeof v === 'string' && VALID_TIERS.has(v as PricingTierKey);
}

/**
 * Calendar month bucket for usage (local timezone), stable string key for localStorage
 */
export function usageMonthKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function storageKeyRecords(userId: string): string {
  return `maroon_pricing_records_${userId}_${usageMonthKey()}`;
}

export function getMonthlyRecordCreates(userId: string): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  try {
    const raw = window.localStorage.getItem(storageKeyRecords(userId));
    const n = raw ? Number.parseInt(raw, 10) : 0;
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
}

export function incrementMonthlyRecordCreates(userId: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  const next = getMonthlyRecordCreates(userId) + 1;
  try {
    window.localStorage.setItem(storageKeyRecords(userId), String(next));
  } catch {
    /* ignore quota */
  }
}

function mapLegacySubscriptionPlan(plan: SubscriptionInfo['plan']): ResolvedPricingTier {
  switch (plan) {
    case 'basic':
      return 'individual';
    case 'premium':
      return 'professional_smme';
    case 'enterprise':
      return 'enterprise';
    default:
      return 'unknown';
  }
}

function inferFromRegistrationMetadata(meta: Record<string, unknown>): ResolvedPricingTier {
  if (meta.excludeFromFinancialTier === true || meta.operationsNoBilling === true) {
    return 'unknown';
  }
  const explicit = meta.pricingTier;
  if (isPricingTierKey(explicit)) {
    return explicit;
  }

  const regType = meta.registrationType;
  const plan = meta.plan;

  if (regType === 'individual' || meta.userType === 'individual') {
    return 'individual';
  }

  if (regType === 'smme' || meta.userType === 'smme') {
    return 'professional_smme';
  }

  if (regType === 'commercial' || meta.userType === 'commercial') {
    return 'professional_commercial';
  }

  if (regType === 'retailer') {
    return 'professional_smme';
  }

  if (plan === 'professional') {
    return 'professional_smme';
  }

  return 'unknown';
}

/**
 * Prefer explicit tier on user; fallback Supabase-loaded metadata; then subscription slice.
 */
export function resolvePricingTier(user: User | UniversalUser | null): ResolvedPricingTier {
  if (!user) {
    return 'unknown';
  }
  if (user.role === 'saps') {
    return 'unknown';
  }

  const u = user as UniversalUser & { metadata?: Record<string, unknown>; subscriptionInfo?: SubscriptionInfo };

  const meta = (u.metadata && typeof u.metadata === 'object') ? u.metadata as Record<string, unknown> : {};
  const fromMeta = inferFromRegistrationMetadata(meta);
  if (fromMeta !== 'unknown') {
    return fromMeta;
  }

  if (u.subscriptionInfo?.plan) {
    const mapped = mapLegacySubscriptionPlan(u.subscriptionInfo.plan);
    if (mapped !== 'unknown') {
      return mapped;
    }
  }

  return 'unknown';
}

export function getMonthlyRecordQuota(tier: ResolvedPricingTier): MonthlyRecordQuota {
  if (tier === 'unknown') {
    return { maxRecordsPerMonth: null };
  }
  return TIER_LIMITS[tier];
}

export function getMonthlyRecordQuotaForUser(user: User | UniversalUser | null): MonthlyRecordQuota {
  if (!user) {
    return { maxRecordsPerMonth: null };
  }
  /** SAPS uses the QR / trace portal only — not on a commercial or government pricing tier */
  if (user.role === 'saps') {
    return { maxRecordsPerMonth: null };
  }
  return getMonthlyRecordQuota(resolvePricingTier(user));
}
