
import { RouteObject, Navigate } from 'react-router-dom';
import { lazy } from 'react';

const LoginPage = lazy(() => import('../pages/login/page'));
const DashboardPage = lazy(() => import('../pages/dashboard/page'));
const MISEntryPage = lazy(() => import('../pages/mis-entry/page'));
const ConsolidatedMISViewPage = lazy(() => import('../pages/consolidated-mis-view/page'));
const ConsolidatedMISV2Page = lazy(() => import('../pages/consolidated-mis-v2/page'));
const AdminPage = lazy(() => import('../pages/admin/page'));
const AuditLogsPage = lazy(() => import('../pages/audit-logs/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/mis-entry',
    element: <MISEntryPage />,
  },
  {
    path: '/consolidated-mis-view',
    element: <ConsolidatedMISViewPage />,
  },
  {
    path: '/consolidated-mis-v2',
    element: <ConsolidatedMISV2Page />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/audit-logs',
    element: <AuditLogsPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
