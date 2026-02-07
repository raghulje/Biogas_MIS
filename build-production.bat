@echo off
echo ========================================
echo BioGas MIS - Production Build Script
echo ========================================
echo.

echo [1/3] Building client...
cd client
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Client build failed!
    pause
    exit /b 1
)
echo ✓ Client build completed successfully
echo.

echo [2/3] Checking server configuration...
cd ..\server
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Please copy .env.example to .env and configure it.
    pause
    exit /b 1
)
echo ✓ Server configuration found
echo.

echo [3/3] Production build complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Update server/.env with SERVE_CLIENT=true
echo 2. Configure production database credentials
echo 3. Run: cd server ^&^& npm start
echo.
echo For Docker deployment:
echo   docker-compose up -d
echo ========================================
pause
