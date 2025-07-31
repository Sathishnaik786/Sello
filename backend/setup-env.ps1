# Hyperlocal Backend Environment Setup
# Run this script to create your .env file

Write-Host "🔧 Setting up environment variables..." -ForegroundColor Green

$envContent = @"
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "Environment file created!" -ForegroundColor Green
Write-Host "Please update the .env file with your actual Supabase credentials" -ForegroundColor Yellow
Write-Host "Get your credentials from: https://supabase.com/dashboard" -ForegroundColor Cyan 