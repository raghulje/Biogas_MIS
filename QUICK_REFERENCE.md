# BioGas MIS - Quick Reference Guide

## 🚀 Quick Start

### Development Setup
```bash
# Navigate to client
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# Access at: http://localhost:5173
```

### Default Login
```
Email: admin@biogas.com
Password: Admin@123
```

---

## 📁 File Locations Cheat Sheet

### Core Files
| Purpose | Location |
|---------|----------|
| App Entry | `src/main.tsx` |
| Root Component | `src/App.tsx` |
| Routing Config | `src/router/config.tsx` |
| Auth Context | `src/context/AuthContext.tsx` |
| API Base | `src/services/api.ts` |
| MIS Service | `src/services/misService.ts` |
| Admin Service | `src/services/adminService.ts` |

### Pages
| Page | Location | Status |
|------|----------|--------|
| Login | `src/pages/login/page.tsx` | ✅ Working |
| Dashboard | `src/pages/dashboard/page.tsx` | ⚠️ Mock Data |
| MIS Entry | `src/pages/mis-entry/page.tsx` | ⚠️ Not Connected |
| Consolidated View | `src/pages/consolidated-mis-view/page.tsx` | ✅ Partial |
| Admin Panel | `src/pages/admin/page.tsx` | ⚠️ Mock Data |
| Audit Logs | `src/pages/audit-logs/page.tsx` | ⚠️ Mock Data |

### Components
| Component | Location | Purpose |
|-----------|----------|---------|
| Layout | `src/components/Layout.tsx` | Main layout with sidebar |
| FilterPanel | `src/components/FilterPanel.tsx` | Advanced filtering |
| ImportModal | `src/components/ImportModal.tsx` | Excel import |
| ProtectedRoute | `src/components/ProtectedRoute.tsx` | Auth guard |
| RolePermissions | `src/components/RolePermissions.tsx` | Permission editor |

---

## 🔌 API Endpoints Quick Reference

### Authentication
```typescript
POST   /api/auth/login           // Login
POST   /api/auth/logout          // Logout
POST   /api/auth/refresh         // Refresh token
GET    /api/auth/profile         // Get profile
POST   /api/auth/create-user     // Create user
```

### MIS Operations
```typescript
// Entries
POST   /api/mis-entries          // Create entry
PUT    /api/mis-entries/:id      // Update entry
POST   /api/mis-entries/:id/submit // Submit entry
GET    /api/mis-entries          // List entries
GET    /api/mis-entries/:id      // Get entry

// Feed Data
POST   /api/feed-data            // Create feed data
PUT    /api/feed-data/:id        // Update feed data
GET    /api/feed-data/entry/:id  // Get by entry
DELETE /api/feed-data/:id        // Delete feed data

// Digester Data
POST   /api/digester-data        // Create digester data
PUT    /api/digester-data/:id    // Update digester data
GET    /api/digester-data/entry/:id // Get by entry
DELETE /api/digester-data/:id    // Delete digester data
```

### Dashboard Analytics
```typescript
GET /api/dashboard/daily?date=YYYY-MM-DD
GET /api/dashboard/weekly?start_date=X&end_date=Y
GET /api/dashboard/monthly?year=YYYY&month=MM
GET /api/dashboard/quarterly?year=YYYY&quarter=Q
GET /api/dashboard/yearly?year=YYYY
GET /api/dashboard/custom?start_date=X&end_date=Y
```

### Admin
```typescript
GET  /api/admin/users            // List users
GET  /api/admin/roles            // List roles
GET  /api/admin/audit-logs       // Get audit logs
GET  /api/admin/smtp-config      // Get SMTP config
POST /api/admin/smtp-config      // Create SMTP config
PUT  /api/admin/smtp-config/:id  // Update SMTP config
```

### Sync
```typescript
GET  /api/sync/preview?start_date=X&end_date=Y
POST /api/sync/confirm
GET  /api/sync/logs
```

---

## 💻 Common Code Snippets

### Using MIS Service
```typescript
import { misService } from '../../services/misService';

// Get daily data
const data = await misService.getDailyData('2024-01-15');

// Get weekly data
const weeklyData = await misService.getWeeklyData('2024-01-01', '2024-01-07');

// Create entry
const entry = await misService.createEntry({
  date: '2024-01-15',
  shift: 'Morning',
  // ... other fields
});

// Submit entry
await misService.submitEntry(entryId);
```

### Using Admin Service
```typescript
import { adminService } from '../../services/adminService';

// Get users
const { users } = await adminService.getUsers();

// Create user
await adminService.createUser({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  role_id: 2
});

// Get audit logs
const logs = await adminService.getAuditLogs({
  page: 1,
  limit: 50
});
```

### Using Auth Context
```typescript
import { useAuth } from '../../context/AuthContext';

function MyComponent() {
  const { user, logout, isAuthenticated } = useAuth();
  
  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <p>Role: {user?.role?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protected Route
```typescript
import { ProtectedRoute } from '../components/ProtectedRoute';

<Route 
  path="/admin" 
  element={
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  } 
/>
```

---

## 🎨 Styling Quick Reference

### Theme Colors
```typescript
primary.main: '#1a237e'      // Deep Blue
secondary.main: '#0d47a1'    // Blue
background: '#f5f7fa'        // Light Gray
```

### Common MUI Components
```typescript
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
```

### Common Icons
```typescript
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  AdminPanelSettings as AdminIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
```

---

## 🐛 Troubleshooting

### Login Fails
```bash
# Check backend is running
curl http://localhost:3000/api/health

# Check browser console for errors
# Verify credentials: admin@biogas.com / Admin@123
```

### API Calls Fail
```bash
# Verify proxy is working
# Check vite.config.ts proxy settings
# Check browser Network tab
# Verify backend CORS settings
```

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Type check
npm run type-check

# Lint
npm run lint
```

### Port Already in Use
```bash
# Change port in vite.config.ts
server: {
  port: 5174,  // Change this
}
```

---

## 📊 Data Structures

### User Object
```typescript
{
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
    description?: string;
  };
}
```

### MIS Entry
```typescript
{
  id: number;
  date: string;
  shift: string;
  status: 'draft' | 'submitted';
  created_by: number;
  created_at: string;
  updated_at: string;
}
```

### Feed Data
```typescript
{
  id: number;
  entry_id: number;
  feed_type: string;
  quantity: number;
  time: string;
  // ... other fields
}
```

### Digester Data
```typescript
{
  id: number;
  entry_id: number;
  digester_id: string;
  temperature: number;
  pressure: number;
  ph: number;
  // ... other fields
}
```

---

## 🔧 Configuration

### Environment Variables
```bash
# .env (if needed)
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=BioGas MIS
```

### Vite Config
```typescript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

---

## 📝 Common Tasks

### Add a New Page
1. Create page component in `src/pages/my-page/page.tsx`
2. Add route in `src/router/config.tsx`
3. Add menu item in `src/components/Layout.tsx`

### Add a New API Endpoint
1. Add method to appropriate service (`misService.ts` or `adminService.ts`)
2. Use in component with proper error handling

### Add a New Component
1. Create component in `src/components/MyComponent.tsx`
2. Export and import where needed
3. Add TypeScript types for props

### Update User Role Display
```typescript
// ❌ Wrong
<Typography>{user.role}</Typography>

// ✅ Correct
<Typography>{user?.role?.name || 'N/A'}</Typography>
```

---

## 🎯 Integration Checklist

- [ ] Dashboard connected to `misService.getDailyData()` etc.
- [ ] MIS Entry form submits via `misService.createEntry()`
- [ ] Admin Panel uses `adminService.getUsers()`
- [ ] Audit Logs uses `adminService.getAuditLogs()`
- [ ] All `user.role` references updated to `user.role?.name`
- [ ] Loading states added to all API calls
- [ ] Error handling improved with toast notifications
- [ ] Form validation added

---

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Lint code
npm run type-check       # Type check

# Debugging
npm run dev -- --debug   # Debug mode
npm run dev -- --host    # Expose to network

# Clean
rm -rf node_modules out  # Clean install
npm install              # Reinstall
```

---

## 🔗 Important Links

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000
- **Material-UI Docs:** https://mui.com/
- **React Router Docs:** https://reactrouter.com/
- **Vite Docs:** https://vitejs.dev/

---

**Last Updated:** February 6, 2026
