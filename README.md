# 🚀 Hyperlocal Engagement Platform

A comprehensive full-stack platform for connecting local businesses with customers through real-time engagement, order management, and analytics.

## 🏗️ Architecture

```
hyperlocal-platform/
├── backend/                # Node.js + Express + Socket.IO API
├── hyperlocal-admin/       # React + Chakra UI Admin Dashboard
├── frontend/               # React Native + Expo Mobile App
└── docs/                   # Documentation & Guides
```

## 🛠️ Tech Stack

### Backend (`backend`)
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Socket.IO
- **Authentication**: JWT + Supabase Auth
- **Validation**: Zod
- **Documentation**: Swagger UI
- **Development**: ts-node-dev

### Admin Dashboard (`hyperlocal-admin`)
- **Framework**: React + TypeScript
- **UI Library**: Chakra UI
- **State Management**: React Query
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Animations**: Framer Motion

### Mobile App (`frontend`)
- **Framework**: React Native + Expo
- **Navigation**: React Navigation
- **Database**: Supabase Client
- **Storage**: AsyncStorage
- **Camera**: Expo Camera
- **Barcode**: Expo Barcode Scanner

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <repository-url>
cd hyperlocal-platform

# Install backend dependencies
cd backend
npm install

# Install admin dashboard dependencies
cd ../hyperlocal-admin
npm install

# Install mobile app dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

#### Backend (`.env`)
```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### Mobile App (`.env`)
```bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Database Setup
1. Create a Supabase project
2. Run the SQL schema from `frontend/supabase_schema.sql`
3. Add sample data using the provided SQL scripts

### 4. Start All Services
```bash
# Start backend
cd backend
npm run dev

# Start admin dashboard
cd ../hyperlocal-admin
npm start

# Start mobile app
cd ../frontend
npm start
```

## 📱 Features

### Mobile App
- 🔐 **Authentication**: Email/password login with Supabase
- 🏪 **Store Discovery**: Browse nearby stores with real-time data
- 📦 **Order Management**: Place orders with real-time status updates
- 📱 **Push Notifications**: Order status updates
- 📷 **Barcode Scanning**: Quick product lookup
- 🗺️ **Location Services**: Find stores near you

### Admin Dashboard
- 📊 **Analytics**: Real-time sales and order analytics
- 👥 **User Management**: Customer and store owner management
- 📦 **Order Tracking**: Real-time order status monitoring
- 🏪 **Store Management**: Store approval and management
- 📈 **Reports**: Sales reports and insights

### Backend API
- 🔐 **Authentication**: JWT-based auth with Supabase
- 📡 **Real-time**: Socket.IO for live updates
- 📝 **Validation**: Zod schema validation
- 📚 **Documentation**: Swagger API docs
- 🔒 **Security**: Rate limiting and CORS

## 🗄️ Database Schema

### Core Tables
- **users**: Customer and store owner accounts
- **stores**: Store information and locations
- **products**: Product catalog with pricing
- **orders**: Order tracking and status
- **order_items**: Individual items in orders

### Relationships
```
users (1) ←→ (many) stores
stores (1) ←→ (many) products
users (1) ←→ (many) orders
orders (1) ←→ (many) order_items
products (1) ←→ (many) order_items
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Stores
- `GET /api/stores` - List all stores
- `GET /api/stores/:id` - Get store details
- `POST /api/stores` - Create new store
- `PUT /api/stores/:id` - Update store
- `DELETE /api/stores/:id` - Delete store

### Products
- `GET /api/products` - List all products
- `GET /api/products/store/:storeId` - Store products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - List all orders (admin)
- `GET /api/orders/my-orders` - User's orders
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/orders/:id` - Get order details

## 🔄 Real-time Features

### Socket.IO Events
- `join-store` - Join store room for updates
- `new-order` - New order notification
- `order-updated` - Order status change
- `disconnect` - Client disconnection

### Real-time Updates
- 📦 **Order Status**: Live order status updates
- 🔔 **Notifications**: Instant order notifications
- 📊 **Analytics**: Real-time dashboard updates
- 🏪 **Store Activity**: Live store activity feed

## 🛡️ Security

### Authentication
- JWT tokens with expiration
- Supabase Auth integration
- Role-based access control

### Data Protection
- Input validation with Zod
- SQL injection prevention
- CORS configuration
- Rate limiting

## 📊 Monitoring & Analytics

### Backend Metrics
- Request/response logging
- Error tracking
- Performance monitoring
- Database query optimization

### Admin Dashboard
- Real-time analytics
- Sales reports
- User activity tracking
- Store performance metrics

## 🚀 Deployment

### Backend Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Admin Dashboard Deployment
```bash
# Build for production
npm run build

# Deploy to hosting service
```

### Mobile App Deployment
```bash
# Build for app stores
expo build:android
expo build:ios
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Mobile App Testing
```bash
cd frontend
npm test
```

## 📚 Documentation

- [API Documentation](http://localhost:5000/api-docs)
- [Supabase Setup Guide](SUPABASE_SETUP_GUIDE.md)
- [Mobile App Guide](frontend/README.md)
- [Admin Dashboard Guide](hyperlocal-admin/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- 📧 Email: support@hyperlocal.com
- 📱 Discord: [Join our community]
- 📖 Docs: [Documentation site]

---

**🎉 Built with ❤️ for local communities** 