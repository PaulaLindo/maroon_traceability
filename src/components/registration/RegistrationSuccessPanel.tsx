'use client';

import { CheckCircle, ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getPublicTracePath, DEMO_GOLDEN_PRODUCT_ID } from '@/constants/demoGoldenPath';

interface RegistrationSuccessPanelProps {
  tierLabel: string;
  email: string;
  dashboardPath: string;
  onContinue: () => void;
}

export function RegistrationSuccessPanel({
  tierLabel,
  email,
  dashboardPath,
  onContinue,
}: RegistrationSuccessPanelProps) {
  return (
    <Card className="p-8 text-center border-green-200 bg-green-50/50">
      <CheckCircle className="h-14 w-14 text-green-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you — we&apos;ve received your details</h2>
      <p className="text-gray-700 mb-4 max-w-lg mx-auto">
        Your <strong>{tierLabel}</strong> registration has been captured for follow-up.
        In this demonstration environment you can continue into the app right away; our team will
        contact you at <strong>{email}</strong> when accounts are activated for production.
      </p>
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
        <Mail className="h-4 w-4" />
        <span>Lead saved locally for demo review (browser storage)</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onContinue} className="bg-blue-600 hover:bg-blue-700">
          Continue to dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" asChild>
          <Link href={getPublicTracePath(DEMO_GOLDEN_PRODUCT_ID)}>
            View sample trace passport (BLK003)
          </Link>
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Dashboard: {dashboardPath}
      </p>
    </Card>
  );
}
