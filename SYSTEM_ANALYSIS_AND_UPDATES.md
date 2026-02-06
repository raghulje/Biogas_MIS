# BioGas MIS – System Analysis & Updates Required

**Analysis Date:** 2026-02-06  
**Purpose:** List all updates required and missing pieces to make the entire system functional.

---

## 1. Executive Summary

| Area | Status | Notes |
|------|--------|------|
| **Backend CRUD (MIS)** | ✅ Mostly complete | UPDATE/DELETE/Import/Export/Dashboard implemented in extensions and wired in routes |
| **Backend User/Admin** | ✅ Complete | User CRUD, roles, SMTP, email templates, audit logs implemented |
| **Database & Seed** | ✅ OK | Permissions include delete/export; seed has all needed permissions |
| **Client MIS** | ⚠️ Gaps | Edit form reset bug; Export report not wired; Custom date range not sent |
| **Client Auth & Security** | ❌ Missing | Routes not protected; no permission-based UI |
| **Client Admin** | ⚠️ Partial | Admin page exists; needs verification against real API |
| **Config & Ops** | ⚠️ Gaps | DB still from config.json; CORS/port in code; no .env for client |

---

## 2. Updates Required (What to Change)

### 2.1 Critical – Security & Access

| # | Item | Current State | Required Update |
|---|------|----------------|-----------------|
| 1 | **Protect all app routes** | `ProtectedRoute` exists but is **not used** in router. Dashboard, MIS, Admin, Audit Logs are reachable without login. | In `client/src/router/config.tsx`, wrap every route except `/login` with `<ProtectedRoute>`. Redirect unauthenticated users to `/login`. |
| 2 | **Redirect logged-in users from login** | Login page does not check `isAuthenticated`. | In `client/src/pages/login/page.tsx`, if `isAuthenticated` then `<Navigate to="/dashboard" />`. |
| 3 | **Profile must return permissions** | `getProfile` returns user with `role` but **no permissions** array. Client cannot enforce permission-based UI. | In `server/controllers/authController.js` `getProfile`, include role with permissions: `include: [{ model: Role, as: 'role', include: [{ model: Permission, as: 'permissions' }] }]`. |

### 2.2 High – Correctness & Completeness

| # | Item | Current State | Required Update |
|---|------|----------------|-----------------|
| 4 | **MIS form not reset on edit** | `MISFormView` uses `defaultValues` from `selectedEntry` only at first mount. Switching to another entry in edit mode can show stale data. | In `MISFormView`, when `selectedEntry` or `viewMode` changes, call `methods.reset(selectedEntry ?? defaultValues)` in a `useEffect`. |
| 5 | **Dashboard custom date range not used** | UI has “Custom” with start/end date pickers but `fetchDashboardData()` only uses `filterType` (day/week/month/year). Custom dates are never sent. | In `client/src/pages/dashboard/page.tsx`, when `filterType === 'custom'` and both dates set, call API with `startDate` and `endDate` (e.g. add query params or a dedicated endpoint). In `server`: support `startDate`/`endDate` in `getDashboardData` and use them in the date filter. |
| 6 | **Dashboard Export Report button** | Button “Export Report” has no `onClick` and does nothing. | Wire to `misService.exportEntries()` with current dashboard filters (e.g. period or custom range), then trigger download (blob) and show success/error. |
| 7 | **Edit flow: optional submit** | In `MISFormView`, on edit, submit handler always calls `misService.submitEntry()` after `updateEntry()`. User may want to only save draft. | Make submit optional: e.g. “Save draft” only updates; “Submit” updates and then submits. Do not auto-submit after update unless user clicks Submit. |

### 2.3 Medium – Configuration & Maintainability

| # | Item | Current State | Required Update |
|---|------|----------------|-----------------|
| 8 | **Database config from env** | `server/models/index.js` uses `config.json` only; credentials are in repo. `.env` has DB_* but they are not used. | Use env in Sequelize: e.g. `config.database = process.env.DB_NAME || config.database`, same for username, password, host, port; or use `use_env_variable` and a single `DATABASE_URL`. |
| 9 | **Client API base URL** | `misService.ts` and `authService.ts` use hardcoded `http://localhost:5000/api`. | Use `import.meta.env.VITE_API_URL` (or similar) with fallback `http://localhost:5000/api` so production build can point to correct server. |
| 10 | **CORS and port** | `app.js` uses `cors()` with no origin and `PORT` from env defaulting to 3000; docs say server 5000. | Set `cors({ origin: process.env.CORS_ORIGIN?.split(',') || true })` and ensure `PORT=5000` in `.env` (or document default). |
| 11 | **Logout on Layout** | `Layout`’s logout only does `navigate('/login')` and does not call `logout()` from AuthContext (token not cleared). | In `Layout.tsx`, use `useAuth()` and call `logout()` (and optionally clear any local state) before `navigate('/login')`. |

### 2.4 Lower – UX & Robustness

| # | Item | Current State | Required Update |
|---|------|----------------|-----------------|
| 12 | **Permission-based menu and pages** | Layout shows same menu to everyone. Admin/audit should be hidden or disabled for users without permission. | After profile returns permissions, add a small permission context/hook (e.g. `hasPermission(resource, action)`). In Layout, show Admin/Audit only if user has `config:read` or `audit:read` (or per your rules). Optionally use same checks on route level. |
| 13 | **API 401 handling** | If token expires, API returns 401 but client may not redirect to login. | In axios response interceptor (e.g. in `authService` or a shared api instance), on 401 clear token and redirect to `/login` (or set auth state so ProtectedRoute redirects). |
| 14 | **Loading and error UX** | Many pages use `alert()` for errors and minimal loading states. | Prefer toast/snackbar and inline error messages; show loading skeletons or spinners where appropriate. |
| 15 | **MIS form: reset on create** | After “Create new”, form may retain previous entry’s values if `defaultValues` are not reset. | When switching to `viewMode === 'create'`, call `methods.reset(defaultValues)` so form is clean. |

---

## 3. What’s Missing to Make the System Fully Functional

### 3.1 Backend

| Component | Status | Missing / Notes |
|-----------|--------|------------------|
| **MIS CRUD** | ✅ | Create, Read, Update, Delete, Import, Export, Dashboard are implemented and routed. |
| **User CRUD** | ✅ | Create, Read, Update, Delete (soft), Activate, Change password, Bulk update, Activity logs – in userController and adminRoutes. |
| **Roles & permissions** | ✅ | Get roles, create role, assign permissions. Role update/delete not verified; add if needed. |
| **Email templates** | ✅ | CRUD + test email + preview + get variables. |
| **SMTP & schedulers** | ✅ | Get/Create/Update SMTP; get/create schedulers. |
| **Audit logs** | ✅ | getAuditLogs in adminRoutes. |
| **Auth** | ✅ | Login, refresh, logout, getProfile. getProfile should include permissions (see §2.1). |
| **DB seed** | ✅ | Roles, permissions (including mis_entry:delete, mis_entry:export, user/role/config/audit), users. |
| **Validation** | ⚠️ | No request-body validation (e.g. Joi/Zod). Add for critical payloads (login, create user, create/update MIS). |
| **Rate limiting** | ⚠️ | Env has RATE_LIMIT_* but not seen in app.js. Add middleware if required. |

### 3.2 Frontend

| Component | Status | Missing / Notes |
|-----------|--------|------------------|
| **Login** | ✅ | Works; add redirect when already authenticated (§2.1). |
| **Dashboard** | ⚠️ | Uses real API; fix custom date range and wire Export Report (§2.2). |
| **MIS list** | ✅ | List, create, edit, view, delete, import; services wired. |
| **MIS form** | ⚠️ | Fix reset on edit/create and optional submit (§2.2, §2.4). |
| **Admin (users/roles/templates/schedulers/audit)** | ⚠️ | Page and adminService exist; ensure all tabs call real endpoints and handle responses. |
| **Route protection** | ❌ | All routes except login must require auth (§2.1). |
| **Permission-based UI** | ❌ | After profile returns permissions, add permission checks for menu and sensitive actions (§2.4). |
| **Token/401 handling** | ❌ | Centralized 401 handling and logout (§2.4). |
| **Env-based API URL** | ❌ | Use env for API base URL (§2.3). |

### 3.3 DevOps / Deployment

| Item | Status | Missing / Notes |
|------|--------|-----------------|
| **Server .env** | ✅ | Present with PORT, DB_*, JWT, CORS, etc. |
| **Server using .env for DB** | ❌ | Still using config.json; switch to env (§2.3). |
| **Client .env** | ❌ | No VITE_API_URL (or similar); add for production. |
| **Build & run** | ✅ | Standard npm scripts; ensure client build uses correct API URL. |

---

## 4. Checklist to Make the System Fully Functional

- [ ] **Security & access**
  - [ ] Wrap app routes with `ProtectedRoute` (except login).
  - [ ] Redirect authenticated users away from login page.
  - [ ] getProfile returns role with permissions.
  - [ ] Layout logout calls AuthContext `logout()`.
  - [ ] 401 interceptor: clear token and redirect to login.
- [ ] **MIS**
  - [ ] MISFormView: reset form when `selectedEntry` or viewMode changes; optional submit on edit.
  - [ ] Dashboard: send custom start/end dates when “Custom” is selected; wire “Export Report” to export API.
- [ ] **Config**
  - [ ] Server: use DB credentials from .env in Sequelize.
  - [ ] Client: use env variable for API base URL.
  - [ ] CORS and PORT from env.
- [ ] **UX**
  - [ ] Permission-based menu (and optionally routes).
  - [ ] Replace critical `alert()` with toast/snackbar and improve loading states.
- [ ] **Backend (optional but recommended)**
  - [ ] Request validation for login, user create/update, MIS create/update.
  - [ ] Rate limiting middleware if required.

---

## 5. File Reference for Key Changes

| Change | File(s) |
|--------|---------|
| Route protection | `client/src/router/config.tsx` |
| Login redirect if authenticated | `client/src/pages/login/page.tsx` |
| Profile with permissions | `server/controllers/authController.js` |
| Form reset & submit behavior | `client/src/pages/mis-entry/components/MISFormView.tsx` |
| Dashboard custom range & export | `client/src/pages/dashboard/page.tsx`, `server/controllers/misControllerExtensions.js` (getDashboardData) |
| API base URL from env | `client/src/services/misService.ts`, `authService.ts`; add `client/.env` with VITE_API_URL |
| DB from env | `server/models/index.js`, `server/config/config.json` or new config that reads env |
| Logout in Layout | `client/src/components/Layout.tsx` |
| 401 handling | Shared axios instance or interceptors in `client/src/services/authService.ts` (and misService if separate) |
| Permission-based UI | New or existing context (e.g. extend AuthContext or PermissionContext), then `client/src/components/Layout.tsx` |

---

## 6. Summary

- **Backend:** MIS and Admin features are largely implemented and wired; main gaps are **getProfile including permissions**, **using .env for DB**, and optional validation/rate limiting.
- **Frontend:** Main gaps are **route protection**, **login redirect when already logged in**, **form reset and submit behavior on MIS edit**, **dashboard custom range and export**, **logout clearing token**, **401 handling**, and **permission-based menu**. Configuration (API URL, CORS, PORT) should come from env.

Addressing the items in §2 and §4 will make the BioGas MIS system functional end-to-end and ready for production-oriented hardening.
