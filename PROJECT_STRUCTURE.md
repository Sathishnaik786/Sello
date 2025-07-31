# 📁 Complete Project File Structure

## 🏗️ Hyperlocal Engagement Platform - Full File Structure

```
Sello/
├── 📁 backend/                             # Backend API Server
│   ├── 📁 src/
│   │   └── 📄 index.ts                     # Main Express server file
│   ├── 📁 prisma/
│   │   └── 📄 schema.prisma                # Database schema definition
│   ├── 📄 package.json                     # Backend dependencies & scripts
│   ├── 📄 package-lock.json                # Locked dependency versions
│   ├── 📄 tsconfig.json                    # TypeScript configuration
│   ├── 📄 .env                             # Backend environment variables
│   └── 📄 .gitignore                       # Git ignore for backend
│
├── 📁 frontend/                            # Mobile App (Expo)
│   ├── 📁 src/
│   │   ├── 📁 screens/                     # App screen components
│   │   │   ├── 📄 HomeScreen.tsx          # Store discovery screen
│   │   │   ├── 📄 StoreDetailsScreen.tsx  # Store products screen
│   │   │   ├── 📄 ProfileScreen.tsx       # User profile screen
│   │   │   ├── 📄 OrdersScreen.tsx        # Order history screen
│   │   │   ├── 📄 CartScreen.tsx          # Shopping cart screen
│   │   │   ├── 📄 LoginScreen.tsx         # Authentication screen
│   │   │   └── 📄 EditProfileScreen.tsx   # Profile editing screen
│   │   ├── 📁 navigation/
│   │   │   └── 📄 AppNavigator.tsx        # Navigation configuration
│   │   └── 📁 services/
│   │       └── 📄 api.ts                  # API service layer
│   ├── 📁 assets/                          # Static assets
│   │   ├── 📁 images/
│   │   └── 📁 fonts/
│   ├── 📄 App.tsx                         # Main app component
│   ├── 📄 app.json                        # Expo configuration
│   ├── 📄 babel.config.js                 # Babel configuration
│   ├── 📄 package.json                    # Mobile dependencies
│   ├── 📄 package-lock.json               # Locked dependency versions
│   ├── 📄 tsconfig.json                   # TypeScript configuration
│   ├── 📄 .env                            # Mobile environment variables
│   ├── 📄 .gitignore                      # Git ignore for mobile
│   ├── 📄 metro.config.js                 # Metro bundler config
│   └── 📄 eas.json                        # EAS Build configuration
│
├── 📁 hyperlocal-admin/                    # Admin Dashboard (Planned)
│   ├── 📁 src/
│   │   ├── 📁 components/                 # Reusable UI components
│   │   │   ├── 📁 common/
│   │   │   ├── 📁 forms/
│   │   │   └── 📁 layout/
│   │   ├── 📁 pages/                      # Page components
│   │   │   ├── 📄 Dashboard.tsx
│   │   │   ├── 📄 Users.tsx
│   │   │   ├── 📄 Stores.tsx
│   │   │   ├── 📄 Orders.tsx
│   │   │   └── 📄 Analytics.tsx
│   │   ├── 📁 services/                   # API services
│   │   │   └── 📄 api.ts
│   │   ├── 📁 hooks/                      # Custom React hooks
│   │   ├── 📁 utils/                      # Utility functions
│   │   ├── 📁 types/                      # TypeScript type definitions
│   │   ├── 📄 App.tsx                     # Main app component
│   │   ├── 📄 index.tsx                   # App entry point
│   │   └── 📄 index.css                   # Global styles
│   ├── 📄 package.json                    # Admin dependencies
│   ├── 📄 tsconfig.json                   # TypeScript configuration
│   ├── 📄 .env                            # Admin environment variables
│   ├── 📄 .gitignore                      # Git ignore for admin
│   ├── 📄 vite.config.ts                  # Vite configuration
│   └── 📄 index.html                      # HTML template
│
├── 📁 hyperlocal_mobile/                  # Old React Native app (Deprecated)
│   ├── 📁 android/                        # Android native code
│   ├── 📁 ios/                            # iOS native code
│   ├── 📁 src/
│   │   ├── 📁 screens/
│   │   ├── 📁 navigation/
│   │   └── 📁 services/
│   ├── 📄 App.tsx
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
│
├── 📄 docker-compose.yml                  # Docker services configuration
├── 📄 .gitignore                          # Root git ignore rules
├── 📄 README.md                           # Main project documentation
└── 📄 PROJECT_STRUCTURE.md                # This file structure doc
```

## 📋 Detailed File Descriptions

### 🖥️ Backend Files (`backend/`)

#### `src/index.ts`
- **Purpose**: Main Express server entry point
- **Features**: 
  - Express app setup with CORS and JSON middleware
  - Health check endpoint (`GET /`)
  - API endpoints for users, stores, products, orders
  - Database connection with Prisma
  - Error handling and graceful degradation

#### `prisma/schema.prisma`
- **Purpose**: Database schema definition
- **Models**: User, Store, Product, Order
- **Enums**: UserRole, OrderStatus
- **Relationships**: Proper foreign key relationships
- **Features**: UUID primary keys, timestamps, soft deletes

#### `package.json`
```json
{
  "name": "backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "@prisma/client": "^5.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/cors": "^2.8.13",
    "typescript": "^5.0.4",
    "nodemon": "^3.0.1",
    "prisma": "^5.0.0"
  }
}
```

#### `.env`
```env
DATABASE_URL="postgresql://postgres:Dollars@1@db.lrchllkqpbpbqqohjpxd.supabase.co:5432/postgres"
JWT_SECRET="your-jwt-secret-key"
PORT=5000
NODE_ENV=development
```

### 📱 Mobile App Files (`frontend/`)

#### `src/screens/HomeScreen.tsx`
- **Purpose**: Main store discovery screen
- **Features**: Store listing, search, categories
- **API Calls**: Fetches stores from `/api/stores`
- **UI**: Modern card-based layout with search bar

#### `src/screens/StoreDetailsScreen.tsx`
- **Purpose**: Individual store product browsing
- **Features**: Product catalog, add to cart, store info
- **API Calls**: Fetches products from `/api/products`
- **Navigation**: Receives store data as route params

#### `src/screens/ProfileScreen.tsx`
- **Purpose**: User account management
- **Features**: User info display, navigation to other screens
- **Actions**: Edit profile, view orders, logout
- **UI**: Clean profile card with action buttons

#### `src/screens/OrdersScreen.tsx`
- **Purpose**: Order history and tracking
- **Features**: Order list, status indicators, order details
- **API Calls**: Fetches orders from `/api/orders`
- **UI**: Status-based color coding, order cards

#### `src/screens/CartScreen.tsx`
- **Purpose**: Shopping cart management
- **Features**: Cart items, quantity adjustment, checkout
- **State**: Local cart state management
- **UI**: Cart item cards with quantity controls

#### `src/screens/LoginScreen.tsx`
- **Purpose**: User authentication
- **Features**: Phone/password login, registration link
- **Validation**: Form validation and error handling
- **UI**: Clean login form with proper keyboard handling

#### `src/screens/EditProfileScreen.tsx`
- **Purpose**: Profile editing interface
- **Features**: Form fields for name, email, phone
- **Validation**: Input validation and error handling
- **UI**: Form with save/cancel actions

#### `src/navigation/AppNavigator.tsx`
- **Purpose**: Navigation configuration
- **Features**: Stack navigator with all screens
- **Routes**: Home, StoreDetails, Profile, Orders, Cart, Login, EditProfile
- **Options**: Header configuration and screen options

#### `src/services/api.ts`
- **Purpose**: Centralized API service layer
- **Features**: Axios instance with base URL, interceptors
- **Endpoints**: All API calls for the mobile app
- **Error Handling**: Network error handling and retry logic

#### `App.tsx`
```typescript
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
```

#### `package.json`
```json
{
  "name": "frontend",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~49.0.15",
    "react": "18.2.0",
    "react-native": "0.72.6",
    "@react-navigation/native": "^6.1.7",
    "@react-navigation/native-stack": "^6.9.13",
    "react-native-screens": "^3.25.0",
    "react-native-safe-area-context": "^4.7.4",
    "axios": "^1.5.0",
    "expo-barcode-scanner": "^12.7.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.14",
    "typescript": "^5.1.3"
  }
}
```

### 🐳 Docker Configuration

#### `docker-compose.yml`
```yaml
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
    depends_on:
      - db

volumes:
  db_data:
```

### 🔧 Configuration Files

#### `.gitignore`
```
# Dependencies
node_modules/
backend/node_modules/
hyperlocal-admin/node_modules/
hyperlocal_mobile/node_modules/
frontend/node_modules/

# Build outputs
hyperlocal_mobile/android/app/build/
hyperlocal_mobile/ios/build/
backend/dist/
hyperlocal-admin/dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# Expo
.expo/
dist/
web-build/

# React Native
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
```

## 🚀 Development Commands

### Backend Development
```bash
cd backend
npm install
npm run dev                    # Start development server
npx prisma studio             # Open database GUI
npx prisma generate           # Generate Prisma client
npx prisma db push            # Push schema to database
```

### Mobile App Development
```bash
cd frontend
npm install
npx expo start                # Start Expo development server
npx expo start --android      # Start on Android
npx expo start --ios          # Start on iOS
```

### Database Management
```bash
docker-compose up -d           # Start PostgreSQL and pgAdmin
docker-compose down            # Stop database services
```

## 📊 File Statistics

- **Total Files**: ~50 files
- **TypeScript Files**: ~15 files
- **Configuration Files**: ~10 files
- **Documentation Files**: ~5 files
- **Environment Files**: ~5 files

## 🔄 File Dependencies

### Backend Dependencies
```
src/index.ts
├── prisma/schema.prisma
├── package.json
├── tsconfig.json
└── .env
```

### Mobile App Dependencies
```
App.tsx
├── src/navigation/AppNavigator.tsx
├── src/screens/*.tsx
├── src/services/api.ts
├── package.json
├── tsconfig.json
└── .env
```

## 🎯 Key Features by File

### Backend Features
- **Database Integration**: Prisma ORM with PostgreSQL
- **API Endpoints**: RESTful API with proper error handling
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Config**: Flexible environment variable support

### Mobile App Features
- **Navigation**: Stack-based navigation with React Navigation
- **API Integration**: Centralized API service with Axios
- **UI Components**: Custom, responsive UI components
- **State Management**: React Hooks for local state
- **Error Handling**: Graceful error handling and fallbacks

### Infrastructure Features
- **Containerization**: Docker Compose for local development
- **Database**: PostgreSQL with pgAdmin for management
- **Version Control**: Git with proper ignore rules
- **Documentation**: Comprehensive README and structure docs

---

**This structure provides a complete, scalable foundation for the Hyperlocal Engagement Platform.** 