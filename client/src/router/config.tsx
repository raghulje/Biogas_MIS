import { RouteObject, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ProtectedRoute } from '../components/ProtectedRoute';

const LoginPage = lazy(() => import('../pages/login/page'));
const DashboardPage = lazy(() => import('../pages/dashboard/page'));
const MISEntryPage = lazy(() => import('../pages/mis-entry/page'));
const ConsolidatedMISViewPage = lazy(() => import('../pages/consolidated-mis-view/page'));
const ConsolidatedMISV2Page = lazy(() => import('../pages/consolidated-mis-v2/page'));
const FinalMISPage = lazy(() => import('../pages/final-mis/page'));
const AdminPage = lazy(() => import('../pages/admin/page'));
const AuditLogsPage = lazy(() => import('../pages/audit-logs/page'));
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
        <Suspense fallback={<PageLoader />}>
          <AdminPage />
        </Suspense>
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
    path: '*',
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;
