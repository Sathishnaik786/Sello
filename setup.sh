#!/bin/bash

echo "🚀 Setting up Hyperlocal Engagement Platform..."

# Install System Dependencies
echo "📦 Installing system tools..."
sudo apt update && sudo apt install -y curl git docker.io docker-compose build-essential

# 1. Backend Setup
echo "🛠️ Setting up Backend..."
mkdir hyperlocal-backend && cd hyperlocal-backend
npm init -y
npm install express cors dotenv pg prisma jsonwebtoken bcrypt socket.io multer swagger-ui-express zod
npm install --save-dev typescript ts-node nodemon @types/node @types/express @types/jsonwebtoken @types/bcrypt

# TypeScript Init
npx tsc --init

# Prisma Init
npx prisma init

cd ..

# 2. React Native App Setup
echo "📱 Creating React Native App..."
npx react-native init hyperlocal_mobile --template react-native-template-typescript
cd hyperlocal_mobile

# Install Dependencies
yarn add @react-navigation/native @react-navigation/native-stack react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated
yarn add axios react-native-qrcode-svg react-native-camera react-native-barcode-scanner socket.io-client
yarn add @react-native-async-storage/async-storage @react-native-community/netinfo

# iOS setup note
echo "📌 NOTE: For iOS, run 'cd ios && pod install' after setup if using Mac."

cd ..

# 3. Admin Panel Setup (React)
echo "🖥️ Setting up Admin Dashboard..."
npx create-react-app hyperlocal-admin --template typescript
cd hyperlocal-admin
yarn add axios react-router-dom @tanstack/react-query @chakra-ui/react @emotion/react @emotion/styled framer-motion recharts
cd ..

# 4. Docker Compose for PostgreSQL + pgAdmin
echo "🐘 Setting up Docker Compose (PostgreSQL + pgAdmin)..."
cat <<EOF > docker-compose.yml
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
EOF

# 5. Git Init + First Commit
echo "📘 Initializing Git repository..."
git init
echo -e "node_modules/\nhyperlocal-backend/node_modules/\nhyperlocal-admin/node_modules/\nhyperlocal_mobile/node_modules/\nhyperlocal_mobile/android/app/build/\nhyperlocal_mobile/ios/build/" >> .gitignore
git add .
git commit -m "Initial project setup with React Native, Backend, Admin Panel, Docker DB"

echo "✅ All Done!"
echo "🛠️ Next Steps:"
echo "1. Run: docker-compose up -d"
echo "2. Configure your .env files"
echo "3. Start backend and Prisma setup"
echo "4. Start building your mobile and admin UI" 