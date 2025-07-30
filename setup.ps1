# Hyperlocal Engagement Platform Setup Script for Windows

Write-Host "🚀 Setting up Hyperlocal Engagement Platform..." -ForegroundColor Green

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Check if Docker is installed
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ Docker is not installed. Please install Docker Desktop for Windows." -ForegroundColor Yellow
}

# 1. Backend Setup
Write-Host "🛠️ Setting up Backend..." -ForegroundColor Cyan
New-Item -ItemType Directory -Name "hyperlocal-backend" -Force
Set-Location "hyperlocal-backend"

# Initialize npm project
npm init -y

# Install dependencies
npm install express cors dotenv pg prisma jsonwebtoken bcrypt socket.io multer swagger-ui-express zod
npm install --save-dev typescript ts-node nodemon @types/node @types/express @types/jsonwebtoken @types/bcrypt

# TypeScript Init
npx tsc --init

# Prisma Init
npx prisma init

Set-Location ..

# 2. React Native App Setup
Write-Host "📱 Creating React Native App..." -ForegroundColor Cyan

# Check if React Native CLI is installed
if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npx is not available. Please install Node.js with npm." -ForegroundColor Red
    exit 1
}

# Create React Native app
npx react-native@latest init hyperlocal_mobile --template react-native-template-typescript

Set-Location "hyperlocal_mobile"

# Install Dependencies
yarn add @react-navigation/native @react-navigation/native-stack react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated
yarn add axios react-native-qrcode-svg react-native-camera react-native-barcode-scanner socket.io-client
yarn add @react-native-async-storage/async-storage @react-native-community/netinfo

Write-Host "📌 NOTE: For iOS, run 'cd ios && pod install' after setup if using Mac." -ForegroundColor Yellow

Set-Location ..

# 3. Admin Panel Setup (React)
Write-Host "🖥️ Setting up Admin Dashboard..." -ForegroundColor Cyan
npx create-react-app hyperlocal-admin --template typescript
Set-Location "hyperlocal-admin"
yarn add axios react-router-dom @tanstack/react-query @chakra-ui/react @emotion/react @emotion/styled framer-motion recharts
Set-Location ..

# 4. Docker Compose for PostgreSQL + pgAdmin
Write-Host "🐘 Setting up Docker Compose (PostgreSQL + pgAdmin)..." -ForegroundColor Cyan

$dockerComposeContent = @"
version: '3.8'
services:
  db:
    image: postgres
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: hyperlocal
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
volumes:
  db_data:
"@

$dockerComposeContent | Out-File -FilePath "docker-compose.yml" -Encoding UTF8

# 5. Git Init + First Commit
Write-Host "📘 Initializing Git repository..." -ForegroundColor Cyan

# Check if Git is installed
if (Get-Command git -ErrorAction SilentlyContinue) {
    git init
    
    $gitignoreContent = @"
node_modules/
hyperlocal-backend/node_modules/
hyperlocal-admin/node_modules/
hyperlocal_mobile/node_modules/
hyperlocal_mobile/android/app/build/
hyperlocal_mobile/ios/build/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
"@
    
    $gitignoreContent | Out-File -FilePath ".gitignore" -Encoding UTF8
    git add .
    git commit -m "Initial project setup with React Native, Backend, Admin Panel, Docker DB"
} else {
    Write-Host "⚠️ Git is not installed. Please install Git for Windows." -ForegroundColor Yellow
}

Write-Host "✅ All Done!" -ForegroundColor Green
Write-Host "🛠️ Next Steps:" -ForegroundColor Yellow
Write-Host "1. Run: docker-compose up -d" -ForegroundColor White
Write-Host "2. Configure your .env files" -ForegroundColor White
Write-Host "3. Start backend and Prisma setup" -ForegroundColor White
Write-Host "4. Start building your mobile and admin UI" -ForegroundColor White 