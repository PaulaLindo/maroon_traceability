import {
  DEMO_GOLDEN_PRODUCT_ID,
  DEMO_QR_SCAN_FLAGGED,
  DEMO_QR_SCAN_VERIFIED,
} from '@/constants/demoGoldenPath';
import { INITIAL_BLOCKCHAIN_RECORDS } from '@/constants/demoData';
import type { BlockchainRecord } from '@/types/blockchain';

export interface PublicTraceEvent {
  id: string;
  productId: string;
  type: string;
  actor: string;
  actorRole: string;
  timestamp: string;
  location: string;
  notes: string;
  photos: string[];
  syncStatus: string;
  data: Record<string, unknown>;
}

export interface PublicTraceProduct {
  id: string;
  productName: string;
  description: string;
  category: string;
  farmer: string;
  farmerAddress: string;
  location: string;
  harvestDate: string;
  certifications: string[];
  batchSize: string;
  blockHash: string;
  timestamp: number;
  txHash: string;
  verified: boolean;
  status: string;
  transactionFee: number;
  verifications: number;
}

const CATTLE_EVENTS: PublicTraceEvent[] = [
  {
    id: 'cattle-evt-1',
    productId: DEMO_GOLDEN_PRODUCT_ID,
    type: 'growth',
    actor: 'Karoo Cattle Co.',
    actorRole: 'farmer',
    timestamp: '2025-06-01T08:00:00Z',
    location: 'Karoo Farm, Graaff-Reinet',
    notes: 'Animal tagged with digital ID MAROON-BLK003; ownership registered on ledger',
    photos: [],
    syncStatus: 'synced',
    data: { eventKind: 'tagging' },
  },
  {
    id: 'cattle-evt-2',
    productId: DEMO_GOLDEN_PRODUCT_ID,
    type: 'growth',
    actor: 'Karoo Cattle Co.',
    actorRole: 'farmer',
    timestamp: '2025-07-10T09:30:00Z',
    location: 'Karoo Farm, Graaff-Reinet',
    notes: 'Vaccination round complete — clostridial and anthrax boosters recorded',
    photos: [],
    syncStatus: 'synced',
    data: { eventKind: 'vaccination' },
  },
  {
    id: 'cattle-evt-3',
    productId: DEMO_GOLDEN_PRODUCT_ID,
    type: 'growth',
    actor: 'Karoo Cattle Co.',
    actorRole: 'farmer',
    timestamp: '2025-08-05T11:00:00Z',
    location: 'Karoo Farm, Graaff-Reinet',
    notes: 'Grazing rotation and supplementary feed logged; biosecurity check passed',
    photos: [],
    syncStatus: 'synced',
    data: { eventKind: 'feeding' },
  },
  {
    id: 'cattle-evt-4',
    productId: DEMO_GOLDEN_PRODUCT_ID,
    type: 'harvest',
    actor: 'Karoo Cattle Co.',
    actorRole: 'farmer',
    timestamp: '2025-09-12T10:20:00Z',
    location: 'Karoo Farm, Graaff-Reinet',
    notes: 'Batch BLK003 prepared for transit — 12 head grass-fed cattle',
    photos: [],
    syncStatus: 'synced',
    data: { batchSize: '250kg' },
  },
  {
    id: 'cattle-evt-5',
    productId: DEMO_GOLDEN_PRODUCT_ID,
    type: 'quality-inspection',
    actor: 'Dr. N. Mokoena',
    actorRole: 'inspector',
    timestamp: '2025-09-12T14:00:00Z',
    location: 'Graaff-Reinet, Eastern Cape',
    notes: 'Veterinary inspection passed — fit for abattoir and retail traceability',
    photos: [],
    syncStatus: 'synced',
    data: {},
  },
  {
    id: 'cattle-evt-6',
    productId: DEMO_GOLDEN_PRODUCT_ID,
    type: 'collection',
    actor: 'Eastern Cape Logistics',
    actorRole: 'logistics',
    timestamp: '2025-09-13T06:00:00Z',
    location: 'N9 Corridor — transit permit DIG-TR-2025-0912',
    notes: 'Digital transit permit verified; GPS route active',
    photos: [],
    syncStatus: 'synced',
    data: { permitId: 'DIG-TR-2025-0912' },
  },
  {
    id: 'cattle-evt-7',
    productId: DEMO_GOLDEN_PRODUCT_ID,
    type: 'packaging',
    actor: 'Karoo Processing',
    actorRole: 'packager',
    timestamp: '2025-09-13T12:00:00Z',
    location: 'Abattoir Beta, KZN',
    notes: 'QR passport generated — scan links to public trace record BLK003',
    photos: [],
    syncStatus: 'synced',
    data: {},
  },
];

const GENERIC_EVENTS: PublicTraceEvent[] = [
  {
    id: 'evt1',
    productId: '',
    type: 'planting',
    actor: 'John Farmer',
    actorRole: 'farmer',
    timestamp: '2025-07-01T09:00:00Z',
    location: 'Field A, Local Farm',
    notes: 'Planted with organic seeds and sustainable farming practices',
    photos: [],
    syncStatus: 'synced',
    data: {},
  },
  {
    id: 'evt2',
    productId: '',
    type: 'growth',
    actor: 'John Farmer',
    actorRole: 'farmer',
    timestamp: '2025-08-15T10:30:00Z',
    location: 'Field A, Local Farm',
    notes: 'Healthy growth observed, no pests detected',
    photos: [],
    syncStatus: 'synced',
    data: {},
  },
  {
    id: 'evt3',
    productId: '',
    type: 'harvest',
    actor: 'John Farmer',
    actorRole: 'farmer',
    timestamp: '2025-09-10T08:30:00Z',
    location: 'Field A, Local Farm',
    notes: 'Harvested at peak freshness, all quality standards met',
    photos: [],
    syncStatus: 'synced',
    data: {},
  },
  {
    id: 'evt4',
    productId: '',
    type: 'quality-inspection',
    actor: 'Inspector Jane',
    actorRole: 'inspector',
    timestamp: '2025-09-10T14:00:00Z',
    location: 'Local Farm',
    notes: 'Passed all quality checks. Grade A+ quality.',
    photos: [],
    syncStatus: 'synced',
    data: {},
  },
];

function recordToProduct(record: BlockchainRecord, productId: string): PublicTraceProduct {
  return {
    id: productId,
    productName: record.productName ?? 'Product',
    description:
      productId === DEMO_GOLDEN_PRODUCT_ID
        ? 'Grass-fed cattle from Karoo Cattle Co. — full digital passport with vaccinations, grazing, biosecurity, and transit permit on file.'
        : 'High-quality product from our certified farms, grown with sustainable practices and verified for quality and safety.',
    category: String(record.category ?? 'Other'),
    farmer: record.farmer ?? 'Local Farm',
    farmerAddress: record.farmerAddress ?? '0x742d35Cc6634C0532925a3b8D1750B87B02B6C71',
    location: record.location ?? 'South Africa',
    harvestDate: record.harvestDate ?? '2025-09-10',
    certifications: record.certifications ?? ['Organic'],
    batchSize: String(record.batchSize ?? '—'),
    blockHash: record.blockHash ?? '0x0',
    timestamp: typeof record.timestamp === 'number' ? record.timestamp : Date.now(),
    txHash: record.txHash ?? '0x0',
    verified: record.verified ?? true,
    status: record.status ?? 'Certified',
    transactionFee: record.transactionFee ?? 0.002,
    verifications: record.verifications ?? 1,
  };
}

const PRODUCT_BY_ID: Record<string, { record?: BlockchainRecord; fallbackName: string; category: string; farmer: string; location: string }> = {
  BLK001: { fallbackName: 'Organic Apples', category: 'Fruit', farmer: 'Green Valley Farm', location: 'Stellenbosch, Western Cape' },
  BLK002: { fallbackName: 'Free-Range Eggs', category: 'Poultry', farmer: 'Sunrise Poultry', location: 'Robertson, Western Cape' },
  BLK003: { fallbackName: 'Grass-Fed Beef', category: 'Beef', farmer: 'Karoo Cattle Co.', location: 'Graaff-Reinet, Eastern Cape' },
  BLK004: { fallbackName: 'Fresh Spinach', category: 'Vegetables', farmer: 'Leafy Greens Farm', location: 'Paarl, Western Cape' },
};

export function getDemoProduct(productId: string): PublicTraceProduct {
  const chainRecord = INITIAL_BLOCKCHAIN_RECORDS.find((r) => r.id === productId);
  if (chainRecord) {
    return recordToProduct(chainRecord, productId);
  }
  const meta = PRODUCT_BY_ID[productId];
  if (meta) {
    return {
      id: productId,
      productName: meta.fallbackName,
      description: 'Demonstration product record.',
      category: meta.category,
      farmer: meta.farmer,
      farmerAddress: '0x742d35Cc6634C0532925a3b8D1750B87B02B6C71',
      location: meta.location,
      harvestDate: '2025-09-10',
      certifications: ['Organic'],
      batchSize: '—',
      blockHash: '0x0',
      timestamp: Date.now(),
      txHash: '0x0',
      verified: true,
      status: 'Certified',
      transactionFee: 0.002,
      verifications: 1,
    };
  }
  return {
    id: productId,
    productName: 'Product',
    description: 'Demonstration trace record.',
    category: 'Other',
    farmer: 'Local Farm',
    farmerAddress: '0x742d35Cc6634C0532925a3b8D1750B87B02B6C71',
    location: 'South Africa',
    harvestDate: '2025-09-10',
    certifications: [],
    batchSize: '—',
    blockHash: '0x0',
    timestamp: Date.now(),
    txHash: '0x0',
    verified: false,
    status: 'Pending',
    transactionFee: 0,
    verifications: 0,
  };
}

export function getDemoTraceEvents(productId: string): PublicTraceEvent[] {
  if (productId === DEMO_GOLDEN_PRODUCT_ID) {
    return CATTLE_EVENTS;
  }
  return GENERIC_EVENTS.map((e) => ({ ...e, productId }));
}

export interface SapsScanResult {
  scanCode: string;
  status: 'verified' | 'flagged';
  owner: string;
  ownerId: string;
  origin: string;
  destination: string;
  livestock: string;
  permitStatus: string;
  flagReason?: string;
}

export function resolveSapsDemoScan(scanInput: string): SapsScanResult | null {
  const code = scanInput.trim().toUpperCase();
  if (!code) {
    return null;
  }
  if (
    code === DEMO_GOLDEN_PRODUCT_ID ||
    code === DEMO_QR_SCAN_VERIFIED.toUpperCase() ||
    (code.includes('BLK003') && code.includes('VERIFIED'))
  ) {
    return {
      scanCode: scanInput.trim(),
      status: 'verified',
      owner: 'Karoo Cattle Co.',
      ownerId: 'FM-KAROO-003',
      origin: 'Graaff-Reinet, Eastern Cape',
      destination: 'Abattoir Beta, KZN',
      livestock: 'Cattle (12 head) — Grass-Fed Beef batch BLK003',
      permitStatus: 'Digital transit permit valid until 2025-09-20',
    };
  }
  if (
    code === DEMO_QR_SCAN_FLAGGED.toUpperCase() ||
    code.includes('STOLEN') ||
    code.includes('FLAGGED') ||
    code === 'RED'
  ) {
    return {
      scanCode: scanInput.trim(),
      status: 'flagged',
      owner: 'Unknown / disputed',
      ownerId: '—',
      origin: 'Unverified',
      destination: 'Does not match permit',
      livestock: 'Cattle (8 head) — identity mismatch',
      permitStatus: 'Expired or invalid',
      flagReason: 'Flagged: stolen report active / geofence breach',
    };
  }
  return null;
}
