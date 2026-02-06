# Quick Start Guide - BioGas MIS V2

## Prerequisites
- Node.js (v18+)
- MySQL Server (Running)

## Setup
The project uses `client` (Frontend) and `server` (Backend).

### 1. Database Setup
The database schema has been updated to support the new MIS structure.
If you need to reset/re-seed the database:
```bash
cd server
node seed.js
```
*Warning: This wipes existing data.*

### 2. Running the Server (Port 5000)
```bash
cd server
npm start
```

### 3. Running the Client (Port 3000)
```bash
cd client
npm run dev
```

## Features
- **New MIS Entry**: Navigate to "MIS Entry". Fill in the comprehensive form. Click "Submit".
- **View Entry**: Click on an entry in the list to view full details.
- **Form Features**:
    - Auto-calculation (currently manual entry as per mock).
    - Dynamic Digester rows (Add/Remove).
    - Real-time validation (via standard HTML5 inputs).

## Troubleshooting
- **Port Conflict**: Ensure Port 3000 (Client) and 5000 (Server) are free.
- **Database Connection**: Check `server/config/config.json`.
