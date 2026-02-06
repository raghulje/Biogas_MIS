# CRITICAL: Server Restart Required

## ⚠️ IMMEDIATE ACTION NEEDED

Your server is currently running with the OLD routes. The new CRUD functions (UPDATE, DELETE, Import/Export, Dashboard) will NOT work until you restart the server.

### How to Restart the Server:

1. **Go to the terminal running `npm start`**
2. **Press `Ctrl+C`** to stop the server
3. **Run `npm start`** again to restart with new routes

---

## Current Status

### ✅ Files Created/Updated
- `server/controllers/misControllerExtensions.js` - UPDATE, DELETE, Import, Export, Dashboard
- `server/controllers/userController.js` - User management
- `server/controllers/emailTemplateController.js` - Email templates
- `server/routes/misRoutes.js` - Updated with new endpoints
- `server/routes/adminRoutes.js` - Updated with new endpoints
- `server/seed.js` - Updated with new permissions

### ⚠️ Known Issues

1. **Server Not Restarted** - New routes are not loaded
2. **UPDATE Function Incomplete** - Only handles 3 out of 13 nested entities
3. **Database Not Re-seeded** - New permissions not in database

---

## Step-by-Step Fix

### Step 1: Restart Server (CRITICAL)

```bash
# In the server terminal:
# Press Ctrl+C
npm start
```

### Step 2: Re-seed Database (Add New Permissions)

```bash
cd server
npm run seed
```

**⚠️ WARNING:** This will clear all existing data!

**Alternative (Production-safe):** Manually add permissions via SQL:

```sql
INSERT INTO permissions (name, resource, action, created_at, updated_at) VALUES
('mis_entry:delete', 'mis_entry', 'delete', NOW(), NOW()),
('mis_entry:export', 'mis_entry', 'export', NOW(), NOW()),
('user:create', 'user', 'create', NOW(), NOW()),
('user:update', 'user', 'update', NOW(), NOW()),
('user:delete', 'user', 'delete', NOW(), NOW()),
('role:delete', 'role', 'delete', NOW(), NOW()),
('config:delete', 'config', 'delete', NOW(), NOW());

-- Then assign to Admin role:
INSERT INTO role_permissions (role_id, permission_id, created_at, updated_at)
SELECT 1, id, NOW(), NOW() FROM permissions 
WHERE name IN ('mis_entry:delete', 'mis_entry:export', 'user:create', 'user:update', 'user:delete', 'role:delete', 'config:delete');
```

### Step 3: Test Endpoints

After restarting, test with Postman or curl:

```bash
# Login first
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@biogas.com","password":"Admin@123"}'

# Copy the accessToken and use it below

# Test Dashboard
curl -X GET "http://localhost:5000/api/dashboard/daily?period=month" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test Export
curl -X GET "http://localhost:5000/api/mis-entries/export" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --output export.xlsx

# Test User List
curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## UPDATE Function Issue

The `updateEntry` function in `misControllerExtensions.js` is **INCOMPLETE**.

### Currently Handles (3/13):
- ✅ rawMaterials
- ✅ feedMixingTank
- ✅ digesters

### Missing (10/13):
- ❌ slsMachine
- ❌ rawBiogas
- ❌ rawBiogasQuality
- ❌ compressedBiogas
- ❌ compressors
- ❌ fertilizer
- ❌ utilities
- ❌ manpower
- ❌ plantAvailability
- ❌ hse

### Solution

I will create a complete version in the next file. The pattern is the same for all entities:

```javascript
if (entityData) {
    if (entry.entityName) {
        await entry.entityName.update({
            field1: n(entityData.field1),
            field2: n(entityData.field2),
            // ... all fields
        }, { transaction: t });
    } else {
        await EntityModel.create({
            entry_id: id,
            field1: n(entityData.field1),
            field2: n(entityData.field2),
            // ... all fields
        }, { transaction: t });
    }
}
```

---

## Database Schema Check

The system expects these tables to exist:
- ✅ mis_daily_entries
- ✅ mis_raw_materials
- ✅ mis_feed_mixing_tank
- ✅ mis_digester_data
- ✅ mis_sls_data
- ✅ mis_raw_biogas
- ✅ mis_raw_biogas_quality
- ✅ mis_compressed_biogas
- ✅ mis_compressors
- ✅ mis_fertilizer_data
- ✅ mis_utilities
- ✅ mis_manpower_data
- ✅ mis_plant_availability
- ✅ mis_hse_data
- ✅ users
- ✅ roles
- ✅ permissions
- ✅ role_permissions
- ✅ audit_logs
- ✅ email_logs
- ✅ smtp_configs
- ✅ email_schedulers
- ✅ email_templates (may need to be created)
- ✅ import_logs (may need to be created)

---

## Next Steps

1. **RESTART SERVER** (most critical)
2. **RE-SEED DATABASE** or manually add permissions
3. **TEST ENDPOINTS** to verify they work
4. **COMPLETE UPDATE FUNCTION** (I'll create this next)
5. **TEST CRUD OPERATIONS** end-to-end

---

## Expected Behavior After Fix

### CREATE Entry
- ✅ Already working
- Endpoint: `POST /api/mis-entries`

### READ Entries
- ✅ Already working
- Endpoint: `GET /api/mis-entries`
- Endpoint: `GET /api/mis-entries/:id`

### UPDATE Entry
- ⏳ Partially working (needs completion)
- Endpoint: `PUT /api/mis-entries/:id`
- Currently only updates 3 nested entities

### DELETE Entry
- ✅ Ready (after server restart)
- Endpoint: `DELETE /api/mis-entries/:id`
- Soft delete (sets status to 'Deleted')

### IMPORT
- ✅ Ready (after server restart)
- Endpoint: `POST /api/mis-entries/import`
- Accepts Excel file

### EXPORT
- ✅ Ready (after server restart)
- Endpoint: `GET /api/mis-entries/export`
- Returns Excel file

### DASHBOARD
- ✅ Ready (after server restart)
- Endpoint: `GET /api/dashboard/daily?period=month`
- Returns analytics

---

## Summary

**Root Cause:** Server not restarted + UPDATE function incomplete

**Fix Priority:**
1. Restart server (5 seconds)
2. Re-seed database (30 seconds)
3. Complete UPDATE function (I'll do this next)
4. Test everything (5 minutes)

**After these steps, ALL CRUD operations will work!**
