import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootLayout from '@/components/layout/RootLayout';
import { PATHS } from './paths';

// Lazy load feature components
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const TransactionsPage = lazy(() => import('@/features/transactions/pages/TransactionsPage'));
const PaymentLinksPage = lazy(() => import('@/features/payment-links/pages/PaymentLinksPage'));
const PaymentLinkDetailPage = lazy(() => import('@/features/payment-links/pages/PaymentLinkDetailPage'));

export const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.DASHBOARD} replace />,
      },
      {
        path: PATHS.DASHBOARD,
        element: (
          <Suspense fallback={<div className="p-8 text-muted-foreground text-sm">Loading dashboard...</div>}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.TRANSACTIONS,
        element: (
          <Suspense fallback={<div className="p-8 text-muted-foreground text-sm">Loading transactions...</div>}>
            <TransactionsPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.PAYMENT_LINKS.LIST,
        element: (
          <Suspense fallback={<div className="p-8 text-muted-foreground text-sm">Loading payment links...</div>}>
            <PaymentLinksPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.PAYMENT_LINKS.DETAIL,
        element: (
          <Suspense fallback={<div className="p-8 text-muted-foreground text-sm">Loading payment details...</div>}>
            <PaymentLinkDetailPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <Navigate to={PATHS.DASHBOARD} replace />,
      },
    ],
  },
]);
