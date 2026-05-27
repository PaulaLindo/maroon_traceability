import type { RegistrationData } from '@/core/types/adapter';
import type { UniversalUser } from '@/types/types';
import { toUniversalUser } from '@/types/types';

/**
 * Merge registration form fields into the session user when DB profile
 * has not been loaded yet (e.g. immediately after sign-up).
 */
export function enrichUserFromRegistration(
  user: UniversalUser,
  registration: RegistrationData,
): UniversalUser {
  const ad = (registration.additionalData ?? {}) as Record<string, unknown>;

  const enriched = {
    ...user,
    name: registration.name || user.name,
    email: registration.email || user.email,
    role: registration.role || user.role,
    phone: (ad.phone as string) || user.phone || '',
    metadata: {
      ...(typeof user.metadata === 'object' && user.metadata ? user.metadata : {}),
      ...ad,
      phone: ad.phone ?? user.phone,
      address: ad.address,
      city: ad.city,
      province: ad.province,
      postalCode: ad.postalCode,
      farmSize: ad.farmSize,
      livestockType: ad.livestockType,
    },
  };

  if (ad.address || ad.city || ad.province || ad.postalCode) {
    enriched.address = {
      street: (ad.address as string) || '',
      city: (ad.city as string) || '',
      state: (ad.province as string) || '',
      postalCode: (ad.postalCode as string) || '',
      formatted: [ad.address, ad.city, ad.province, ad.postalCode].filter(Boolean).join(', '),
    };
  }

  return toUniversalUser(enriched, user._source?.type ?? 'api', {
    adapterId: user._source?.adapterId,
    version: user._source?.version,
  }) ?? user;
}
