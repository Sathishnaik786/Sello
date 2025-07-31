# Environment Setup Script for Hyperlocal Platform

Write-Host "🔧 Setting up environment variables..." -ForegroundColor Green

# Get Supabase credentials from user
$VITE_SUPABASE_URL = Read-Host "Enter your VITE_SUPABASE_URL"
$VITE_SUPABASE_ANON_KEY = Read-Host "Enter your VITE_SUPABASE_ANON_KEY"
$SUPABASE_SERVICE_ROLE_KEY = Read-Host "Enter your SUPABASE_SERVICE_ROLE_KEY"

# Create backend .env file
Write-Host "📄 Creating backend .env file..." -ForegroundColor Cyan
$backendEnvContent = @"
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
JWT_SECRET="$SUPABASE_SERVICE_ROLE_KEY"
PORT=5000
NODE_ENV=development
"@

$backendEnvContent | Out-File -FilePath "backend/.env" -Encoding UTF8

# Create React Native .env file
Write-Host "📱 Creating React Native .env file..." -ForegroundColor Cyan
$mobileEnvContent = @"
VITE_SUPABASE_URL="$VITE_SUPABASE_URL"
VITE_SUPABASE_ANON_KEY="$VITE_SUPABASE_ANON_KEY"
API_URL="http://localhost:5000"
"@

$mobileEnvContent | Out-File -FilePath "hyperlocal_mobile/.env" -Encoding UTF8

# Create Admin Panel .env file
Write-Host "🖥️ Creating Admin Panel .env file..." -ForegroundColor Cyan
$adminEnvContent = @"
VITE_SUPABASE_URL="$VITE_SUPABASE_URL"
VITE_SUPABASE_ANON_KEY="$VITE_SUPABASE_ANON_KEY"
VITE_API_URL="http://localhost:5000"
"@

$adminEnvContent | Out-File -FilePath "hyperlocal-admin/.env" -Encoding UTF8

# Create root .env file for Docker
Write-Host "🐳 Creating root .env file for Docker..." -ForegroundColor Cyan
$rootEnvContent = @"
VITE_SUPABASE_URL="$VITE_SUPABASE_URL"
VITE_SUPABASE_ANON_KEY="$VITE_SUPABASE_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="$SUPABASE_SERVICE_ROLE_KEY"
"@

$rootEnvContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "✅ Environment files created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 IMPORTANT: Update the DATABASE_URL in backend/.env with your actual Supabase database URL" -ForegroundColor Yellow
Write-Host "   Format: postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Update backend DATABASE_URL with your actual Supabase database URL" -ForegroundColor White
Write-Host "2. Start backend: cd backend && npm run dev" -ForegroundColor White
Write-Host "3. Test API endpoints at http://localhost:5000" -ForegroundColor White 