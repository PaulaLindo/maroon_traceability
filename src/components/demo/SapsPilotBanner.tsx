'use client';

import { AlertTriangle } from 'lucide-react';
import { DEMO_SAPS_PILOT_LABEL } from '@/constants/demoGoldenPath';

interface SapsPilotBannerProps {
  className?: string;
}

export function SapsPilotBanner({ className = '' }: SapsPilotBannerProps) {
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 ${className}`}
      role="status"
    >
      <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
      <div>
        <p className="font-semibold">{DEMO_SAPS_PILOT_LABEL}</p>
        <p className="mt-1 text-amber-800">
          Scan results are illustrative. Use the green and red sample buttons on Roadside Inspections
          to show verified vs flagged outcomes.
        </p>
      </div>
    </div>
  );
}
