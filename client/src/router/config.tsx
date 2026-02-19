import { RouteObject, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ProtectedRoute } from '../components/ProtectedRoute';
import AdminRoute from '../components/AdminRoute';

const LoginPage = lazy(() => import('../pages/login/page'));
const ResetPasswordPage = lazy(() => import('../pages/reset-password/page'));
const DashboardPage = lazy(() => import('../pages/dashboard/page'));
const MISEntryPage = lazy(() => import('../pages/mis-entry/page'));
const ConsolidatedMISViewPage = lazy(() => import('../pages/consolidated-mis-view/page'));
const ConsolidatedMISV2Page = lazy(() => import('../pages/consolidated-mis-v2/page'));
const FinalMISPage = lazy(() => import('../pages/final-mis/page'));
const AdminPage = lazy(() => import('../pages/admin/page'));
const NotificationConfigPage = lazy(() => import('../pages/admin/notifications/page'));
const AuditLogsPage = lazy(() => import('../pages/audit-logs/page'));
const CustomerPage = lazy(() => import('../pages/customer/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const PageLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
    <CircularProgress sx={{ color: '#2879b6' }} />
  </Box>
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <Suspense fallback={<PageLoader />}>
        <ResetPasswordPage />
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <DashboardPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/mis-entry',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <MISEntryPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/consolidated-mis-view',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <ConsolidatedMISViewPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/consolidated-mis-v2',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <ConsolidatedMISV2Page />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/final-mis',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <FinalMISPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <Suspense fallback={<PageLoader />}>
            <AdminPage />
          </Suspense>
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/audit-logs',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <AuditLogsPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/notifications',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <Suspense fallback={<PageLoader />}>
            <NotificationConfigPage />
          </Suspense>
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/customers',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <CustomerPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;
