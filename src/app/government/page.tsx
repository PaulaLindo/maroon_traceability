'use client';

import { withAuth } from '@/components/auth/withAuth';
import { DashboardLayout } from '@/components/dashboard';
import { VarydianGrapPromoCard } from '@/components/layout/VarydianGrapPromoCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/ui/typography';

function GovernmentDashboardPage() {
  return (
    <DashboardLayout description="Oversight, compliance, and cross-platform reporting for public sector entities">
      <div className="space-y-8">
        <PageTitle>Government oversight</PageTitle>

        <VarydianGrapPromoCard />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Supply chain traceability</CardTitle>
              <CardDescription>
                Monitor agricultural assets, audits, and compliance within Maroon.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Use the navigation menu for audits, compliance checks, and traceability reports.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Financial reporting</CardTitle>
              <CardDescription>
                GRAP statements and municipal finance workflows run in Varydian, not inside Maroon.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Sign in to Varydian with your finance-team credentials when the promo card above is
              available.
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withAuth({ requiredRole: ['government', 'admin'] })(GovernmentDashboardPage);
