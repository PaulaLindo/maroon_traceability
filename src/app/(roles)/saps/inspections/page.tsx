'use client';

import { Search, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DashboardLayoutUnified as DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SapsPilotBanner } from '@/components/demo/SapsPilotBanner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  DEMO_QR_SCAN_FLAGGED,
  DEMO_QR_SCAN_VERIFIED,
  getPublicTracePath,
} from '@/constants/demoGoldenPath';
import { resolveSapsDemoScan, type SapsScanResult } from '@/lib/demoTraceData';
import { useUser } from '@/contexts/userContext';

export default function SAPSInspectionsPage() {
  const router = useRouter();
  const { currentUser } = useUser();
  const [isChecking, setIsChecking] = useState(true);
  const [scanResult, setScanResult] = useState('');
  const [scanDetails, setScanDetails] = useState<SapsScanResult | null>(null);
  const [inspectionStatus, setInspectionStatus] = useState<'pending' | 'verified' | 'flagged'>('pending');

  useEffect(() => {
    const checkAuth = () => {
      setIsChecking(false);
      if (!currentUser) {
        router.replace('/login?redirect=/saps/inspections');
        return;
      }
      if (currentUser.role && !['saps'].includes(currentUser.role)) {
        router.replace('/unauthorized');
      }
    };
    const timeoutId = setTimeout(checkAuth, 100);
    return () => clearTimeout(timeoutId);
  }, [currentUser, router]);

  const applyScan = (code: string) => {
    setScanResult(code);
    const resolved = resolveSapsDemoScan(code);
    setScanDetails(resolved);
    if (resolved?.status === 'verified') {
      setInspectionStatus('verified');
    } else if (resolved?.status === 'flagged') {
      setInspectionStatus('flagged');
    } else {
      setInspectionStatus('pending');
    }
  };

  const handleManualScan = () => {
    if (scanResult.trim()) {
      applyScan(scanResult);
    }
  };

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== 'saps') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  const recentInspections = [
    {
      id: 'INS-2024-001',
      location: 'N3 Highway - Johannesburg',
      livestock: 'Cattle (12 head) — BLK003 verified',
      status: 'verified',
      timestamp: '2024-01-15 14:30',
      officer: 'Constable Mthembu',
    },
    {
      id: 'INS-2024-002',
      location: 'R61 - Bloemfontein',
      livestock: 'Sheep (45 head)',
      status: 'flagged',
      timestamp: '2024-01-15 11:15',
      officer: 'Sergeant Nkosi',
    },
    {
      id: 'INS-2024-003',
      location: 'N2 Highway - Port Elizabeth',
      livestock: 'Goats (28 head)',
      status: 'verified',
      timestamp: '2024-01-14 16:45',
      officer: 'Constable Zulu',
    },
  ];

  return (
    <DashboardLayout description="Perform roadside inspections and verify livestock ownership (KZN pilot demo)">
      <div className="space-y-6">
        <div className="mb-4">
          <Button variant="outline" onClick={() => router.push('/saps')} className="inline-flex items-center gap-2">
            Back
          </Button>
        </div>

        <SapsPilotBanner />

        <Card>
          <CardHeader>
            <CardTitle className="text-center">QR Code Scanner</CardTitle>
            <CardDescription>
              Scan IoT ear tags or QR codes to verify livestock ownership and transit permits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                type="button"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => applyScan(DEMO_QR_SCAN_VERIFIED)}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Sample: Green (verified)
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => applyScan(DEMO_QR_SCAN_FLAGGED)}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Sample: Red (flagged)
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="scan-input">Scan Result</Label>
                <div className="flex space-x-2">
                  <Input
                    id="scan-input"
                    value={scanResult}
                    onChange={(e) => setScanResult(e.target.value)}
                    placeholder="Paste or scan code..."
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" type="button" onClick={handleManualScan}>
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Verified demo code: <code className="bg-gray-100 px-1 rounded">{DEMO_QR_SCAN_VERIFIED}</code>
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Inspection Status</Label>
                <Select
                  value={inspectionStatus}
                  onValueChange={(value: string) =>
                    setInspectionStatus(value as 'pending' | 'verified' | 'flagged')
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="verified">Verified - Proceed</SelectItem>
                    <SelectItem value="flagged">Flagged - Hold Vehicle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {scanDetails && (
              <div
                className={`p-4 rounded-lg ${
                  scanDetails.status === 'verified' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2 flex-wrap gap-2">
                  {scanDetails.status === 'verified' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="font-medium">Scan: {scanDetails.scanCode}</span>
                  <Badge variant={scanDetails.status === 'verified' ? 'default' : 'destructive'}>
                    {scanDetails.status === 'verified' ? 'VERIFIED' : 'FLAGGED'}
                  </Badge>
                </div>
                {scanDetails.flagReason && (
                  <p className="text-sm text-red-800 mb-2 font-medium">{scanDetails.flagReason}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <strong>Owner:</strong> {scanDetails.owner} ({scanDetails.ownerId})
                  </div>
                  <div>
                    <strong>Livestock:</strong> {scanDetails.livestock}
                  </div>
                  <div>
                    <strong>Origin:</strong> {scanDetails.origin}
                  </div>
                  <div>
                    <strong>Destination:</strong> {scanDetails.destination}
                  </div>
                  <div className="md:col-span-2">
                    <strong>Permit:</strong> {scanDetails.permitStatus}
                  </div>
                </div>
                {scanDetails.status === 'verified' && (
                  <Button variant="link" className="mt-2 px-0" asChild>
                    <Link href={getPublicTracePath('BLK003')}>View digital title deed (trace passport)</Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Inspection Details</CardTitle>
            <CardDescription>Record inspection findings and actions taken</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle-reg">Vehicle Registration</Label>
                <Input id="vehicle-reg" placeholder="Enter vehicle registration" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="driver-id">Driver ID/Document</Label>
                <Input id="driver-id" placeholder="ID number or license" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Inspection Location</Label>
              <Input id="location" placeholder="Highway and coordinates" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="findings">Inspection Findings</Label>
              <Textarea
                id="findings"
                placeholder="Document any issues, compliance status, or actions taken..."
                rows={4}
              />
            </div>
            <div className="flex space-x-4">
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve & Release
              </Button>
              <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                <XCircle className="w-4 h-4 mr-2" />
                Flag & Impound
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Recent Inspections</CardTitle>
            <CardDescription>Inspection history and outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInspections.map((inspection) => (
                <div
                  key={inspection.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {inspection.status === 'verified' ? (
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{inspection.id}</p>
                      <p className="text-sm text-gray-600">{inspection.location}</p>
                      <p className="text-sm text-gray-600">{inspection.livestock}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={inspection.status === 'verified' ? 'default' : 'destructive'}>
                      {inspection.status.toUpperCase()}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{inspection.timestamp}</p>
                    <p className="text-sm text-gray-600">{inspection.officer}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
