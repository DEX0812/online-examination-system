@echo off
setlocal EnableExtensions
echo ==========================================
echo ExamsPro ULTIMATE ^| Backend Starter
echo ==========================================

echo [TRACE] Step 1: Checking Node.js...
node -v >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [TRACE] Step 2: Normalizing Paths...
:: Get the directory of this script
set "ROOT_DIR=%~dp0"
:: Remove trailing backslash if it exists (very important for quoting)
if "%ROOT_DIR:~-1%"=="\" set "ROOT_DIR=%ROOT_DIR:~0,-1%"

echo [LOG] Root: "%ROOT_DIR%"

echo [TRACE] Step 3: Checking Server Folder...
if not exist "%ROOT_DIR%\server" (
    echo [ERROR] 'server' folder not found at: "%ROOT_DIR%\server"
    pause
    exit /b 1
)

echo [TRACE] Step 4: Changing Directory...
cd /d "%ROOT_DIR%\server"
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to change directory to server.
    pause
    exit /b 1
)
echo [LOG] Current Dir: "%CD%"

echo [TRACE] Step 5: Checking index.js...
if not exist "index.js" (
    echo [ERROR] index.js not found in: "%CD%"
    pause
    exit /b 1
)

echo [TRACE] Step 6: Launching Server...
node index.js
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js failed to start.
    pause
    exit /b %ERRORLEVEL%
)

pause
