# Supabase Integration Script for Hyperlocal Backend

Write-Host "🔌 Connecting Backend to Supabase..." -ForegroundColor Green

# 1. Configure .env file
Write-Host "📄 Creating .env file..." -ForegroundColor Cyan

$DB_URL = Read-Host "Enter your Supabase DATABASE_URL"
$JWT_SECRET = Read-Host "Enter your Supabase JWT_SECRET (Settings > API)"

$envContent = @"
DATABASE_URL="$DB_URL"
JWT_SECRET="$JWT_SECRET"
PORT=5000
"@

$envContent | Out-File -FilePath "backend/.env" -Encoding UTF8

# 2. Go to backend folder
Set-Location "backend"

# 3. Reinitialize Prisma
Write-Host "🧬 Initializing Prisma schema for Supabase..." -ForegroundColor Cyan
npx prisma init

# 4. Replace schema.prisma with Supabase-friendly schema
$schemaContent = @"
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  name      String
  phone     String   @unique
  password  String
  role      UserRole
  stores    Store[]
  createdAt DateTime @default(now())
}

model Store {
  id          String   @id @default(uuid())
  name        String
  ownerId     String
  owner       User     @relation(fields: [ownerId], references: [id])
  products    Product[]
  orders      Order[]
  isApproved  Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model Product {
  id        String   @id @default(uuid())
  name      String
  price     Float
  stock     Int
  storeId   String
  store     Store    @relation(fields: [storeId], references: [id])
  barcode   String?
  imageUrl  String?
}

model Order {
  id        String   @id @default(uuid())
  customer  User     @relation("CustomerOrders", fields: [customerId], references: [id])
  customerId String
  store     Store    @relation(fields: [storeId], references: [id])
  storeId   String
  items     Json
  status    OrderStatus
  total     Float
  createdAt DateTime @default(now())
}

enum UserRole {
  CUSTOMER
  SELLER
  ADMIN
}

enum OrderStatus {
  PENDING
  READY
  PICKED_UP
  CANCELLED
}
"@

$schemaContent | Out-File -FilePath "prisma/schema.prisma" -Encoding UTF8

# 5. Run Prisma migration & generate client
Write-Host "🧪 Running Prisma migration..." -ForegroundColor Cyan
npx prisma migrate dev --name init
npx prisma generate

# 6. Create a simple Express server
New-Item -ItemType Directory -Name "src" -Force
$serverContent = @"
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", async (_, res) => {
  const users = await prisma.user.findMany();
  res.json({ message: "API running", users });
});

app.listen(PORT, () => {
  console.log(\`🚀 Server running at http://localhost:\${PORT}\`);
});
"@

$serverContent | Out-File -FilePath "src/index.ts" -Encoding UTF8

# 7. Add dev script to package.json
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$packageJson.scripts.dev = "nodemon src/index.ts"
$packageJson | ConvertTo-Json -Depth 10 | Out-File -FilePath "package.json" -Encoding UTF8

Write-Host "✅ Supabase integration complete! Backend ready to use." -ForegroundColor Green

Set-Location ..

# Summary
Write-Host ""
Write-Host "🎯 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Run backend: cd backend && npm run dev" -ForegroundColor White
Write-Host "2. Connect React Native app to your API" -ForegroundColor White
Write-Host "3. Build out routes: /auth, /products, /orders, /stores" -ForegroundColor White
Write-Host "4. (Optional) Add Swagger Docs & Middleware" -ForegroundColor White 