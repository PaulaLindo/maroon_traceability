const LEADS_STORAGE_KEY = 'maroon_registration_leads';

export interface RegistrationLead {
  email: string;
  name: string;
  role: string;
  tier: string;
  registrationType: string;
  capturedAt: string;
  phone?: string;
  companyName?: string;
}

export function saveRegistrationLead(lead: Omit<RegistrationLead, 'capturedAt'>): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const existing = getRegistrationLeads();
    const entry: RegistrationLead = {
      ...lead,
      capturedAt: new Date().toISOString(),
    };
    existing.push(entry);
    window.localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    /* demo: ignore quota errors */
  }
}

export function getRegistrationLeads(): RegistrationLead[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as RegistrationLead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getRoleDashboardPath(role: string): string {
  const roleDashboardMap: Record<string, string> = {
    farmer: '/farmer',
    inspector: '/inspector',
    logistics: '/logistics',
    packaging: '/packaging',
    retailer: '/retailer',
    public: '/public',
    government: '/government',
    saps: '/saps',
    admin: '/admin',
  };
  return roleDashboardMap[role] ?? '/farmer';
}
