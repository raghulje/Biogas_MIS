# 🔐 Biogas MIS — Complete Permissions Analysis

> **Generated:** 2026-02-19  
> **Scope:** Full-stack (Server + Client) — Read, Write, Update, Delete permissions deep-dive

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Database Schema](#2-database-schema)
3. [Permission Definitions (All 25 Permissions)](#3-permission-definitions)
4. [Roles & Role-Based Permissions](#4-roles--role-based-permissions)
5. [Users & User-Level Permissions](#5-users--user-level-permissions)
6. [Server-Side Enforcement](#6-server-side-enforcement)
7. [Client-Side Enforcement](#7-client-side-enforcement)
8. [Route-by-Route Permission Map](#8-route-by-route-permission-map)
9. [Permission Flow Diagram](#9-permission-flow-diagram)
10. [Gaps, Issues & Recommendations](#10-gaps-issues--recommendations)

---

## 1. Architecture Overview

The Biogas MIS uses a **dual-layer permission system**:

```
┌─────────────────────────────────────────────────────────────┐
│                    PERMISSION LAYERS                         │
├─────────────────────────────────────────────────────────────┤
│  Layer 1: ROLE-BASED (role_permissions table)               │
│  → Fallback, used mainly for Admin/SuperAdmin bypass        │
│                                                             │
│  Layer 2: USER-BASED (user_permissions table) ← PRIMARY     │
│  → Per-user granular permissions assigned via Admin UI      │
└─────────────────────────────────────────────────────────────┘
```

**Key Design Decision:** User-level permissions are the **primary** authority. Role-based permissions serve as a **fallback for Admin roles only**. For non-Admin users, the system checks `user_permissions` exclusively.

### Tech Stack
| Layer | Technology |
|-------|-----------|
| **Database** | MySQL 8 with Sequelize ORM |
| **Server** | Node.js + Express.js |
| **Auth** | JWT (access + refresh tokens) |
| **Client** | React + TypeScript + Vite |
| **UI** | Material UI (MUI) |

---

## 2. Database Schema

### 2.1 Core Tables

#### `roles` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK, AUTO_INCREMENT) | Role identifier |
| `name` | VARCHAR(255) UNIQUE | Role name |
| `description` | VARCHAR(255) | Human-readable description |

**Current Roles:**
| ID | Name | Description |
|----|------|-------------|
| 1 | **Admin** | System Administrator |
| 2 | **Manager** | Plant Manager |
| 3 | **Operator** | Data Entry Operator |
| 4 | **Site User** | (No description) |

#### `users` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK, AUTO_INCREMENT) | User identifier |
| `name` | VARCHAR(255) | Full name |
| `email` | VARCHAR(255) UNIQUE | Login email |
| `password` | VARCHAR(255) | bcrypt hashed password |
| `role_id` | INT (FK → roles.id) | Assigned role |
| `is_active` | TINYINT(1) DEFAULT 1 | Account active status |

**Current Users (12 total):**
| ID | Name | Email | Role | Active |
|----|------|-------|------|--------|
| 1 | Super Admin | admin@biogas.com | Admin (1) | ✅ |
| 2 | John Operator | operator@biogas.com | Operator (3) | ❌ |
| 3 | Jane Manager | manager@biogas.com | Manager (2) | ❌ |
| 4 | Raghul | raghul.je@refex.co.in | Admin (1) | ✅ |
| 5 | Murugesh | murugesh.k@refex.co.in | Admin (1) | ✅ |
| 6 | Sathish | sathishkumar.r@refex.co.in | Manager (2) | ✅ |
| 7 | Saravanan | saravanan.v@refex.co.in | Operator (3) | ✅ |
| 8 | Kalpesh | kalpesh.k@refex.co.in | Operator (3) | ✅ |
| 9 | Ramesh | ramesh.c@refex.co.in | Manager (2) | ✅ |
| 10 | Rohan DK | rohan.dk@refex.co.in | Operator (3) | ✅ |
| 11 | Abhilash AG | abhilash.ag@refex.co.in | Operator (3) | ✅ |
| 12 | Abdul Naim | abdul.naim@refex.co.in | Manager (2) | ✅ |

#### `permissions` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK, AUTO_INCREMENT) | Permission identifier |
| `name` | VARCHAR(255) UNIQUE | Format: `resource:action` |
| `description` | VARCHAR(255) | Optional description |
| `resource` | VARCHAR(255) | Resource category |
| `action` | VARCHAR(255) | CRUD action |

#### `role_permissions` (Join Table)
| Column | Type | Description |
|--------|------|-------------|
| `role_id` | INT (FK → roles.id) | Role reference |
| `permission_id` | INT (FK → permissions.id) | Permission reference |

#### `user_permissions` (Join Table) ← **PRIMARY AUTHORITY**
| Column | Type | Description |
|--------|------|-------------|
| `user_id` | INT (FK → users.id) | User reference |
| `permission_id` | INT (FK → permissions.id) | Permission reference |

---

## 3. Permission Definitions (All 25 Permissions)

### Organized by Resource

#### 🗂️ MIS Entry (`mis_entry`) — 8 permissions
| ID | Permission Name | Action | Description |
|----|----------------|--------|-------------|
| 1 | `mis_entry:create` | create | Create new MIS daily entries |
| 2 | `mis_entry:read` | read | View MIS entries list & details |
| 3 | `mis_entry:update` | update | Edit existing MIS entries |
| 4 | `mis_entry:delete` | delete | Delete MIS entries |
| 5 | `mis_entry:submit` | submit | Submit entries for approval |
| 6 | `mis_entry:approve` | approve | Approve submitted entries |
| 7 | `mis_entry:import` | import | Import MIS data from Excel |
| 8 | `mis_entry:export` | export | Export MIS data to Excel |

#### 👤 User Management (`user`) — 4 permissions
| ID | Permission Name | Action | Description |
|----|----------------|--------|-------------|
| 9 | `user:read` | read | View user list |
| 10 | `user:create` | create | Create new users |
| 11 | `user:update` | update | Edit user details |
| 12 | `user:delete` | delete | Deactivate users |

#### 🎭 Role Management (`role`) — 4 permissions
| ID | Permission Name | Action | Description |
|----|----------------|--------|-------------|
| 13 | `role:read` | read | View roles list |
| 14 | `role:create` | create | Create new roles |
| 15 | `role:update` | update | Edit roles & assign permissions |
| 16 | `role:delete` | delete | Delete roles |

#### ⚙️ Configuration (`config`) — 4 permissions
| ID | Permission Name | Action | Description |
|----|----------------|--------|-------------|
| 17 | `config:read` | read | View system configurations |
| 18 | `config:create` | create | Create configurations (SMTP, Email, etc.) |
| 19 | `config:update` | update | Update configurations |
| 20 | `config:delete` | delete | Delete configurations |

#### 📋 Audit (`audit`) — 1 permission
| ID | Permission Name | Action | Description |
|----|----------------|--------|-------------|
| 21 | `audit:read` | read | View audit logs |

#### 🏢 Customer (`customer`) — 4 permissions
| ID | Permission Name | Action | Description |
|----|----------------|--------|-------------|
| 22 | `customer:create` | create | Create customer records |
| 23 | `customer:read` | read | View customer list |
| 24 | `customer:update` | update | Edit customer details |
| 25 | `customer:delete` | delete | Delete customer records |

---

## 4. Roles & Role-Based Permissions

### Role Permission Matrix (from `role_permissions` table)

| Permission | Admin (1) | Manager (2) | Operator (3) | Site User (4) |
|-----------|:---------:|:-----------:|:------------:|:-------------:|
| **MIS Entry** | | | | |
| `mis_entry:create` | ✅ | ✅ | ✅ | ❌ |
| `mis_entry:read` | ✅ | ✅ | ✅ | ❌ |
| `mis_entry:update` | ✅ | ✅ | ✅ | ❌ |
| `mis_entry:delete` | ✅ | ✅ | ❌ | ❌ |
| `mis_entry:submit` | ✅ | ✅ | ✅ | ❌ |
| `mis_entry:approve` | ✅ | ✅ | ❌ | ❌ |
| `mis_entry:import` | ✅ | ✅ | ❌ | ❌ |
| `mis_entry:export` | ✅ | ✅ | ❌ | ❌ |
| **User Mgmt** | | | | |
| `user:read` | ✅ | ❌ | ❌ | ❌ |
| `user:create` | ✅ | ❌ | ❌ | ❌ |
| `user:update` | ✅ | ❌ | ❌ | ❌ |
| `user:delete` | ✅ | ❌ | ❌ | ❌ |
| **Roles** | | | | |
| `role:read` | ✅ | ❌ | ❌ | ❌ |
| `role:create` | ✅ | ❌ | ❌ | ❌ |
| `role:update` | ✅ | ❌ | ❌ | ❌ |
| `role:delete` | ✅ | ❌ | ❌ | ❌ |
| **Config** | | | | |
| `config:read` | ✅ | ❌ | ❌ | ❌ |
| `config:create` | ✅ | ❌ | ❌ | ❌ |
| `config:update` | ✅ | ❌ | ❌ | ❌ |
| `config:delete` | ✅ | ❌ | ❌ | ❌ |
| **Audit** | | | | |
| `audit:read` | ✅ | ✅ | ❌ | ❌ |
| **Customer** | | | | |
| `customer:create` | ✅ | ❌ | ❌ | ❌ |
| `customer:read` | ✅ | ❌ | ❌ | ❌ |
| `customer:update` | ✅ | ❌ | ❌ | ❌ |
| `customer:delete` | ✅ | ❌ | ❌ | ❌ |

### Summary by Role:
- **Admin (38 permissions):** Full access to everything
- **Manager (10 permissions):** MIS CRUD + submit + approve + import + export + audit read
- **Operator (5 permissions):** MIS create + read + update + submit
- **Site User (0 permissions):** No role-level permissions assigned

---

## 5. Users & User-Level Permissions

### User Permission Matrix (from `user_permissions` table)

> ⚠️ **Important:** Users 1–5 (Admins) have **NO** user_permissions entries. They rely on the **Admin role bypass** in the middleware.
> 
> User 6 (Sathish, Manager) has limited user-level permissions.

| Permission ID | Permission Name | User 6 | User 7 | User 8 | User 9 | User 10 | User 11 | User 12 |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | `mis_entry:create` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2 | `mis_entry:read` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 3 | `mis_entry:update` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 5 | `mis_entry:submit` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 17 | `config:read` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 18 | `config:create` | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ |
| 19 | `config:update` | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |
| 21 | `audit:read` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### Per-User Breakdown:

#### **User 6 — Sathish (Manager)**
| Capability | Status |
|-----------|--------|
| View MIS Entries | ✅ |
| Create MIS Entries | ❌ |
| Edit MIS Entries | ❌ |
| Submit MIS Entries | ❌ |
| View Config/Admin Panel | ✅ |
| View Audit Logs | ❌ |
| **Effective:** Read-only for MIS + config view |

#### **Users 7, 10, 11 — Saravanan, Rohan, Abhilash (Operators)**
| Capability | Status |
|-----------|--------|
| View MIS Entries | ✅ |
| Create MIS Entries | ✅ |
| Edit MIS Entries | ✅ |
| Submit MIS Entries | ✅ |
| View Config/Admin Panel | ✅ |
| View Audit Logs | ✅ |
| **Effective:** Full MIS operations + config view + audit view |

#### **User 8 — Kalpesh (Operator)**
| Capability | Status |
|-----------|--------|
| All of User 7 above | ✅ |
| Create Config | ✅ |
| **Effective:** MIS operations + config view/create + audit view |

#### **User 9 — Ramesh (Manager)**
| Capability | Status |
|-----------|--------|
| All of User 8 above | ✅ |
| Update Config | ✅ |
| **Effective:** MIS operations + config CRUD (no delete) + audit view |

#### **User 12 — Abdul Naim (Manager)**
| Capability | Status |
|-----------|--------|
| Same as User 9 | ✅ |
| **Effective:** MIS operations + config CRUD (no delete) + audit view |

---

## 6. Server-Side Enforcement

### 6.1 Authentication Middleware (`authMiddleware.js`)

```
Request → Extract Bearer token → jwt.verify() → req.user = { id, email, role_id, role }
```

- Validates JWT token from `Authorization: Bearer <token>` header
- Decodes and attaches user payload to `req.user`
- Returns **401** if no token or invalid token
- Uses `JWT_SECRET` from `.env` with fallback `'your_jwt_secret_key'`

### 6.2 Permission Middleware (`permissionMiddleware.js`) — THE CORE

This is the **heart of the permission system**. Here's how it works:

```javascript
permissionMiddleware(resource, action)
```

**Decision Flow:**

```
1. Check req.user.id exists → 401 if not

2. ADMIN BYPASS CHECK:
   → Fetch user with Role
   → If role.name === 'Admin' or 'SuperAdmin' → ✅ ALLOW (skip all checks)

3. USER-LEVEL CHECK (Primary):
   → Query user_permissions JOIN permissions
   → WHERE user_id = current AND resource = required AND action = required
   → If found → ✅ ALLOW
   → If not found → ❌ DENY (403)

4. NOTE: Role-level permissions are NOT checked for non-Admin users
```

**Critical Code Path:**
```javascript
// Step 2: Admin bypass
const user = await User.findByPk(userId, { include: [{ model: Role, as: 'role' }] });
const roleName = user?.role?.name?.toLowerCase();
if (roleName === 'admin' || roleName === 'superadmin') return next();

// Step 3: User-level check ONLY
const userPerms = await Permission.findAll({
    include: [{
        model: User,
        as: 'users',
        where: { id: userId },
        through: { attributes: [] }
    }],
    where: { resource, action }
});
if (userPerms && userPerms.length > 0) return next();

// Step 4: Deny
return res.status(403).json({ message: 'Access denied: insufficient permissions' });
```

### 6.3 Login & Token Generation (`authController.js`)

On login, the system:
1. Validates email/password against `users` table
2. Checks `is_active` flag
3. **Fetches user-level permissions** from `user_permissions` join:
```javascript
const userPerms = await Permission.findAll({
    include: [{
        model: User,
        as: 'users',
        where: { id: user.id },
        through: { attributes: [] }
    }]
});
```
4. Returns permissions in the login response alongside the JWT token
5. Permissions are returned as array of `{ id, name, resource, action }` objects

### 6.4 Profile Endpoint (`getProfile`)

The `/auth/profile` endpoint re-fetches the user with:
- Role information
- **User-level permissions** (same as login)
- Used by client to refresh permissions after page reload

---

## 7. Client-Side Enforcement

### 7.1 AuthContext (`AuthContext.tsx`)

The `AuthContext` stores the authenticated user data including permissions:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: string | { name: string };
  permissions?: any[];  // Array of { id, name, resource, action }
}
```

**`hasPermission` Function:**
```typescript
const hasPermission = (resource: string, action: string): boolean => {
  if (!user) return false;
  const roleName = typeof user.role === 'string' ? user.role : (user.role?.name || '');
  if (roleName.toLowerCase() === 'admin') return true;  // Admin bypass
  return (user.permissions || []).some(
    (p: any) => p.resource === resource && p.action === action
  );
};
```

This mirrors the server-side logic:
- Admin role → always `true`
- Otherwise → check user-level permissions array

### 7.2 Route Guards

#### `ProtectedRoute` — Authentication Only
```
✅ Any authenticated user can access
❌ Unauthenticated → redirect to /login
```
**Used for:** Dashboard, MIS Entry, Consolidated MIS View, Final MIS, Audit Logs, Customers

#### `AdminRoute` — Admin or Config Permission
```
✅ Admin role OR user has (config:read OR config:update OR admin:read OR admin:update)
❌ No matching role/permission → redirect to /dashboard
```
**Used for:** Admin Page, Notification Config

### 7.3 Conditional UI Rendering

The client uses `hasPermission()` to conditionally show/hide UI elements:

| UI Element | Permission Check |
|-----------|-----------------|
| "Create New Entry" button | `hasPermission('mis_entry', 'create')` |
| "Edit" button on entries | `hasPermission('mis_entry', 'update')` |
| "Submit" button | `hasPermission('mis_entry', 'submit')` |
| "Import" button | `hasPermission('mis_entry', 'import')` |
| "Export" button | `hasPermission('mis_entry', 'export')` |
| Admin sidebar link | Role check or `hasPermission('config', 'read')` |
| Audit Logs link | `hasPermission('audit', 'read')` |

---

## 8. Route-by-Route Permission Map

### Authentication Routes (`/api/auth/*`) — No Permission Required
| Method | Route | Middleware | Permission |
|--------|-------|-----------|------------|
| POST | `/auth/login` | None | Public |
| POST | `/auth/logout` | authMiddleware | Authenticated |
| POST | `/auth/refresh` | None | Has refresh token |
| GET | `/auth/profile` | authMiddleware | Authenticated |
| POST | `/auth/create-user` | authMiddleware | Authenticated (no permission check!) |
| POST | `/auth/forgot-password` | None | Public |
| POST | `/auth/reset-password` | None | Public |

### MIS Routes (`/api/mis/*`)
| Method | Route | Permission Check |
|--------|-------|-----------------|
| GET | `/mis/entries` | `mis_entry:read` |
| GET | `/mis/entries/:id` | `mis_entry:read` |
| POST | `/mis/entries` | `mis_entry:create` |
| PUT | `/mis/entries/:id` | `mis_entry:update` |
| PUT | `/mis/entries/:id/submit` | `mis_entry:submit` |
| PUT | `/mis/entries/:id/approve` | `mis_entry:approve` |
| DELETE | `/mis/entries/:id` | `mis_entry:delete` |
| POST | `/mis/entries/import` | `mis_entry:import` |
| GET | `/mis/entries/export` | `mis_entry:export` |
| GET | `/mis/consolidated` | `mis_entry:read` |
| GET | `/mis/consolidated-v2` | `mis_entry:read` |
| GET | `/mis/consolidated-v2/export` | `mis_entry:export` |
| GET | `/mis/final-report` | `mis_entry:read` |
| GET | `/mis/final-report/export` | `mis_entry:export` |

### Admin Routes (`/api/admin/*`)
| Method | Route | Permission Check |
|--------|-------|-----------------|
| **User Management** | | |
| GET | `/admin/users` | `user:read` |
| POST | `/admin/users` | `user:create` |
| GET | `/admin/users/:id` | `user:read` |
| PUT | `/admin/users/:id` | `user:update` |
| DELETE | `/admin/users/:id` | `user:delete` |
| PUT | `/admin/users/:id/activate` | `user:update` |
| PUT | `/admin/users/:id/password` | `user:update` |
| POST | `/admin/users/bulk` | `user:update` |
| GET | `/admin/users/:id/activity` | `user:read` |
| **Role Management** | | |
| GET | `/admin/roles` | `role:read` |
| POST | `/admin/roles` | `role:create` |
| POST | `/admin/roles/assign-permissions` | `role:update` |
| PUT | `/admin/roles/:id/permissions` | `role:update` |
| **Config** | | |
| GET | `/admin/config` | `config:read` |
| GET | `/admin/smtp` | `config:read` |
| POST | `/admin/smtp` | `config:create` |
| PUT | `/admin/smtp/:id` | `config:update` |
| POST | `/admin/smtp/test` | `config:update` |
| GET | `/admin/schedulers` | `config:read` |
| POST | `/admin/schedulers` | `config:create` |
| PUT | `/admin/schedulers/:id` | `config:update` |
| GET | `/admin/notification-schedule` | `config:read` |
| POST | `/admin/notification-schedule` | `config:update` |
| GET | `/admin/notification-schedules` | `config:read` |
| POST | `/admin/notification-schedules` | `config:create` |
| PUT | `/admin/notification-schedules/:id` | `config:update` |
| DELETE | `/admin/notification-schedules/:id` | `config:delete` |
| GET | `/admin/mis-email-config` | `config:read` |
| POST | `/admin/mis-email-config` | `config:update` |
| GET | `/admin/final-mis-report-config` | `config:read` |
| POST | `/admin/final-mis-report-config` | `config:update` |
| POST | `/admin/final-mis-report-config/test` | `config:update` |
| **Email Templates** | | |
| GET | `/admin/email-templates` | `config:read` |
| POST | `/admin/email-templates` | `config:create` |
| PUT | `/admin/email-templates/:id` | `config:update` |
| DELETE | `/admin/email-templates/:id` | `config:delete` |
| POST | `/admin/email-templates/:id/test` | `config:update` |
| **Audit** | | |
| GET | `/admin/audit-logs` | `audit:read` |
| GET | `/admin/sessions` | `audit:read` |

### Customer Routes (`/api/customers/*`)
| Method | Route | Permission Check |
|--------|-------|-----------------|
| POST | `/customers/` | `customer:create` |
| GET | `/customers/` | `customer:read` |
| PUT | `/customers/:id` | `customer:update` |
| DELETE | `/customers/:id` | `customer:delete` |

### Other Routes (Index-Level)
| Method | Route | Permission Check |
|--------|-------|-----------------|
| GET | `/health` | None (public) |
| GET | `/app/theme` | authMiddleware only |
| PUT | `/admin/theme` | `config:update` |
| GET | `/admin/permissions` | `config:read` |
| GET | `/email-templates` | `config:read` |
| POST | `/admin/email-templates/:id/test` | `config:update` |

---

## 9. Permission Flow Diagram

```
┌──────────┐     ┌─────────────┐     ┌───────────────┐     ┌──────────────┐
│  CLIENT   │────▶│  authService │────▶│  Express API   │────▶│  Controller   │
│  (React)  │     │  (Axios)    │     │   Server       │     │  (Business)   │
└──────────┘     └─────────────┘     └───────────────┘     └──────────────┘
     │                  │                    │                      │
     │    LOGIN         │                    │                      │
     │ ─────────────────▶  POST /auth/login  │                      │
     │                  │ ──────────────────▶│                      │
     │                  │                    │   authController      │
     │                  │                    │ ────────────────────▶│
     │                  │                    │                      │ Validate
     │                  │                    │                      │ credentials
     │                  │                    │  ◀────────────────── │
     │                  │  { token, user,    │                      │
     │  ◀────────────── │    permissions }   │                      │
     │                  │                    │                      │
     │  Store in        │                    │                      │
     │  AuthContext +   │                    │                      │
     │  localStorage    │                    │                      │
     │                  │                    │                      │
     │    API CALL      │                    │                      │
     │  hasPermission() │                    │                      │
     │  check FIRST     │                    │                      │
     │ (client-side)    │                    │                      │
     │                  │                    │                      │
     │ ─────────────────▶  GET /mis/entries  │                      │
     │                  │  Authorization:    │                      │
     │                  │  Bearer <token>    │                      │
     │                  │ ──────────────────▶│                      │
     │                  │                    │                      │
     │                  │              ┌─────┴─────┐                │
     │                  │              │ authMiddle │                │
     │                  │              │ ware       │                │
     │                  │              │ (JWT)      │                │
     │                  │              └─────┬─────┘                │
     │                  │                    │                      │
     │                  │              ┌─────┴─────┐                │
     │                  │              │ permission │                │
     │                  │              │ Middleware  │                │
     │                  │              │('mis_entry' │                │
     │                  │              │  'read')   │                │
     │                  │              └─────┬─────┘                │
     │                  │                    │                      │
     │                  │              Admin? ──YES──▶ next()       │
     │                  │                │                          │
     │                  │               NO                         │
     │                  │                │                          │
     │                  │         user_permissions                  │
     │                  │         has (resource,                    │
     │                  │          action)?                        │
     │                  │           │        │                      │
     │                  │          YES      NO                     │
     │                  │           │        │                      │
     │                  │        next()    403                     │
     │                  │           │     Forbidden                │
     │                  │           ▼                              │
     │                  │     misController.                       │
     │                  │     getEntries()                         │
```

---

## 10. Gaps, Issues & Recommendations

### 🔴 Critical Issues

#### 1. **Auth Route `/auth/create-user` Lacks Permission Check**
```javascript
// authRoutes.js line 10
router.post('/create-user', authMiddleware, authController.createUser);
```
**Problem:** Only `authMiddleware` is applied — **any authenticated user** can create other users via this endpoint.  
**Risk:** An Operator could directly call this API to create an Admin user.  
**Fix:** Add `permissionMiddleware('user', 'create')` to this route.

#### 2. **Role-Based Permissions Are Effectively Ignored for Non-Admin Users**
The middleware only checks `user_permissions`, NOT `role_permissions` for non-Admin users. This means:
- A newly created Manager/Operator with **no user_permissions assigned** will be **denied everything** except JWT-valid routes
- The role_permissions table data is essentially **decorative** for non-Admin roles
- **Impact:** If a user's user_permissions aren't set during creation, they get **zero access**

#### 3. **Admin Users (IDs 1, 4, 5) Have No `user_permissions` Records**
These users rely entirely on the Admin role bypass. This is intentional but means:
- If their role is ever changed from Admin, they immediately lose **all** access
- No granular permission tracking for Admin actions

### 🟡 Medium Issues

#### 4. **Inconsistent Permission Mapping in `syncUserPermissions`**
```javascript
// userController.js
const UI_PAGE_TO_RESOURCE = {
    'Dashboard': 'config',           // Dashboard maps to config?
    'Consolidated MIS View': 'mis_entry',  // Shares resource with MIS Entry
    'Import Data': 'mis_entry'       // Shares resource with MIS Entry
};
```
- **Dashboard** maps to `config` resource — giving Dashboard read access also gives config read
- **Consolidated MIS View** shares the same resource as **MIS Entry** — no way to independently control access
- **Import Data** maps to `mis_entry` — giving Import creates `mis_entry:import`, but also requires `mis_entry:create` due to the `if (perm.create)` block

#### 5. **Implicit Permission Bundling in `syncUserPermissions`**
```javascript
if (perm.create) {
    dbPermissions.push({ resource, action: 'create' });
    if (resource === 'mis_entry') {
        dbPermissions.push({ resource, action: 'import' });
        dbPermissions.push({ resource, action: 'submit' });
    }
}
if (perm.update) {
    dbPermissions.push({ resource, action: 'update' });
    if (resource === 'mis_entry') {
        dbPermissions.push({ resource, action: 'export' });
    }
}
```
- `mis_entry:create` is **bundled** with `import` and `submit`
- `mis_entry:update` is **bundled** with `export`
- Users **cannot** have `create` without `import`/`submit`, or `update` without `export`

#### 6. **Client-Side Route Guards Don't Check Specific Permissions**
Most routes only use `ProtectedRoute` (authentication check), not permission-specific checks:
```typescript
// /mis-entry — any authenticated user can navigate here
<ProtectedRoute><MISEntryPage /></ProtectedRoute>

// /customers — any authenticated user can navigate here  
<ProtectedRoute><CustomerPage /></ProtectedRoute>

// /audit-logs — any authenticated user can navigate here
<ProtectedRoute><AuditLogsPage /></ProtectedRoute>
```
While the API will return 403, the user can still **navigate to the page** and see a broken/empty state instead of being redirected.

### 🟢 Minor Issues

#### 7. **Duplicate Unique Key Constraints**
The SQL dump shows excessive duplicate unique keys on multiple tables:
- `permissions.name` has 62 unique keys (name_1 through name_62)
- `users.email` has 62 unique keys
- `password_reset_tokens.token` has 44 unique keys

This is caused by repeated Sequelize migrations/syncs. While not a security issue, it adds unnecessary database overhead.

#### 8. **JWT Secret Fallback**
```javascript
const verified = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
```
The hardcoded fallback secret is a security risk in production. If `JWT_SECRET` env variable is not set, anyone knowing this default can forge tokens.

#### 9. **`Site User` Role Has Zero Permissions**
Role ID 4 (`Site User`) has no role-level permissions AND no users assigned to it in the current database. It appears to be unused/orphaned.

### 📋 Recommendations

| Priority | Recommendation | Effort |
|----------|---------------|--------|
| 🔴 P0 | Add `permissionMiddleware('user', 'create')` to `/auth/create-user` route | 1 min |
| 🔴 P0 | Ensure all new users get user_permissions set during creation | Low |
| 🟡 P1 | Separate Dashboard/Consolidated MIS View into distinct resources if needed | Medium |
| 🟡 P1 | Add permission-based route guards in the client router (not just ProtectedRoute) | Medium |
| 🟡 P1 | Decouple the implicit `create→import+submit` and `update→export` bundling | Low |
| 🟢 P2 | Remove hardcoded JWT secret fallback | 1 min |
| 🟢 P2 | Clean up duplicate unique key constraints in DB | Low |
| 🟢 P2 | Decide if `Site User` role should be kept or removed | Low |

---

## Summary

The Biogas MIS permission system is **well-structured** with a clear separation between:
- **Authentication** (JWT-based)
- **Authorization** (User-level permissions with Admin bypass)

The **user-level permissions** model provides fine-grained control, and the middleware correctly enforces permissions on every protected API endpoint. The main areas for improvement are:
1. The unprotected `/auth/create-user` endpoint
2. Client-side route guards that check only authentication, not permissions
3. The implicit permission bundling that prevents truly independent permission control for MIS operations

The system currently has **25 permissions** across **6 resource categories**, **4 roles**, and **12 users** (10 active), with permissions actively enforced on **50+ API endpoints**.
