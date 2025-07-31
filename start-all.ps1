# Hyperlocal App - Start All Services
# This script starts all the services for the hyperlocal app

Write-Host "🚀 Starting Hyperlocal App Services..." -ForegroundColor Green

# Start Backend
Write-Host "📡 Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm start"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start Admin Dashboard
Write-Host "📊 Starting Admin Dashboard..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd hyperlocal-admin; npm start"

# Wait a moment for admin to start
Start-Sleep -Seconds 3

# Start Mobile App
Write-Host "📱 Starting Mobile App..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"

Write-Host "✅ All services started!" -ForegroundColor Green
Write-Host "📱 Mobile App: http://localhost:19006" -ForegroundColor Cyan
Write-Host "📊 Admin Dashboard: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend API: http://localhost:5000" -ForegroundColor Cyan 