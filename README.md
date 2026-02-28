# E-Commerce Platform 🛍️

A full-stack e-commerce application built with **Express.js** backend and **React + Vite** frontend, featuring user authentication, product management, shopping cart, and admin panel capabilities.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [How the App Works](#how-the-app-works)
- [Backend Services](#backend-services)
- [Frontend Services](#frontend-services)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Docker Deployment](#docker-deployment)

---

## 🎯 Project Overview

This e-commerce platform is a complete end-to-end solution that allows users to:
- Browse and search for products across multiple categories
- Create accounts and manage user profiles
- Add items to cart and proceed to checkout
- Process payments
- Track orders
- Admin users can manage products and collections

The application supports multiple product categories including **Fashion, Electronics, Footwear, Audio, Watches, Food & Nutrition, Toys, Fitness, Accessories, Kids, Home & Living, Books, and Beauty**.

---

## 🛠️ Technology Stack

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) + Bcrypt
- **File Upload**: Multer
- **Session Management**: Express-Session
- **CORS**: Enabled for cross-origin requests
- **Environment Config**: Dotenv, Config

### **Frontend**
- **Library**: React 18.3.1
- **Build Tool**: Vite 5.4.0
- **Router**: React Router DOM v6.26.0
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS 3.4.4
- **UI Components**: Lucide React Icons
- **Notifications**: React Hot Toast

### **DevOps**
- **Containerization**: Docker
- **Orchestration**: Docker Compose

---

## 📁 Project Structure

```
project_1/
├── backend/                    # Express.js Backend
│   ├── app.js                 # Main application file
│   ├── package.json           # Backend dependencies
│   ├── Dockerfile             # Docker configuration
│   ├── config/
│   │   ├── development.json   # Environment configuration
│   │   ├── mongoose-connection.js  # Database connection
│   │   └── multer-config.js   # File upload configuration
│   ├── controllers/           # Business logic
│   │   ├── authController.js
│   │   └── collectionController.js
│   ├── middlewares/           # Custom middlewares
│   │   ├── isLoggedIn.js      # Authentication middleware
│   │   └── isOwner.js         # Authorization middleware
│   ├── models/                # Database schemas
│   │   ├── collection-model.js
│   │   ├── owner-model.js
│   │   ├── product-model.js
│   │   └── user-model.js
│   ├── routes/                # API endpoints
│   │   ├── index.js           # Main routes (products, cart)
│   │   ├── ownersRouter.js    # Admin/Owner routes
│   │   ├── productsRouter.js  # Product management
│   │   └── usersRouter.js     # User management
│   └── utils/
│       └── generateToken.js   # JWT token generation
│
├── frontend/                   # React + Vite Frontend
│   ├── src/
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # React entry point
│   │   ├── index.css          # Global styles
│   │   ├── components/        # Reusable components
│   │   │   └── Navbar.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Payment.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Collections.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ChangePassword.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Categories.jsx
│   │   │   └── Login.jsx
│   │   ├── data/              # Static data
│   │   │   ├── products.jsx
│   │   │   └── translations.js
│   │   └── utils/
│   │       └── api.js         # Axios API client
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── postcss.config.js      # PostCSS configuration
│   ├── package.json           # Frontend dependencies
│   ├── Dockerfile             # Docker configuration
│   ├── index.html             # HTML entry point
│   └── public/                # Static assets
│
├── docker-compose.yml         # Docker Compose orchestration
├── notes.txt                  # Development notes
├── test_index_load.js         # Test script
└── verify_cart_fix.js         # Verification script
```

---

## 🔄 How the App Works

### **1. User Journey**

```
┌─────────────────────────────────────────────────────────┐
│                   USER JOURNEY                          │
└─────────────────────────────────────────────────────────┘

[Guest User]
    ↓
[Browse Home Page]
    ↓
[View Products by Category]
    ↓
[Create Account / Login]
    ↓
[Browse Shop & Collections]
    ↓
[View Product Details]
    ↓
[Add to Cart]
    ↓
[Checkout]
    ↓
[Payment Processing]
    ↓
[Order Confirmation]
    ↓
[View Orders & Track]
    ↓
[Manage Profile]
```

### **2. Authentication Flow**

```
┌──────────────────────────────────────────────┐
│         AUTHENTICATION FLOW                   │
└──────────────────────────────────────────────┘

[User Registration]
    ↓
[Password Hashed with Bcrypt]
    ↓
[User Stored in MongoDB]
    ↓
[Login with Email & Password]
    ↓
[JWT Token Generated]
    ↓
[Token Stored in Cookies]
    ↓
[Authenticated API Requests]
    ↓
[Token Validation via Middleware]
```

### **3. Shopping Cart Flow**

```
┌──────────────────────────────────────────────┐
│         CART & CHECKOUT FLOW                 │
└──────────────────────────────────────────────┘

[Browse Products]
    ↓
[Add to Cart (API Call)]
    ↓
[Cart Stored in Database]
    ↓
[View Cart Items]
    ↓
[Update Quantities]
    ↓
[Remove Items]
    ↓
[Checkout]
    ↓
[Process Payment]
    ↓
[Create Order Record]
    ↓
[Clear Cart]
```

### **4. Admin Management Flow**

```
┌──────────────────────────────────────────────┐
│       ADMIN MANAGEMENT FLOW                  │
└──────────────────────────────────────────────┘

[Admin Login]
    ↓
[Access Admin Panel]
    ↓
[Manage Products]
    │  ├─ Create New Product
    │  ├─ Edit Product Details
    │  ├─ Upload Product Images
    │  └─ Delete Products
    ↓
[Manage Collections]
    │  ├─ Create Collections
    │  ├─ Add Products to Collections
    │  └─ Organize by Category
    ↓
[View Orders & Analytics]
```

---

## 🔙 Backend Services

### **Core Services**

#### **1. Authentication Service**
- **Endpoints**: `/api/users/register`, `/api/users/login`, `/api/users/logout`
- **Features**:
  - User registration with email validation
  - Secure password hashing using bcrypt
  - JWT token generation and storage
  - Session management
  - Password change functionality

#### **2. User Management Service**
- **Endpoints**: `/api/users/profile`, `/api/users/update`
- **Features**:
  - Get user profile information
  - Update user details
  - User authentication state tracking
  - Profile management

#### **3. Product Service**
- **Endpoints**: `/api/products/`, `/api/products/:id`
- **Features**:
  - Fetch all products with filtering
  - Get product details by ID
  - Browse by category (fashion, electronics, footwear, etc.)
  - Product images stored as base64 or external URLs
  - Price and discount information
  - Demo products for testing

#### **4. Cart Service**
- **Endpoints**: `/api/users/cart`, `/api/users/add-to-cart`
- **Features**:
  - Add items to cart
  - View cart contents
  - Update quantities
  - Remove items from cart
  - Cart persistence in database

#### **5. Order Service**
- **Endpoints**: `/api/users/orders`, `/api/users/place-order`
- **Features**:
  - Create orders from cart items
  - Order history tracking
  - Order status management
  - Payment processing integration

#### **6. Collection Service**
- **Endpoints**: `/api/collection/`
- **Features**:
  - Create product collections
  - Manage collection items
  - Organize products by collections

#### **7. Admin/Owner Service**
- **Endpoints**: `/api/owners/`, `/api/owners/admin`
- **Features**:
  - Admin user management
  - Product creation and management
  - Collection management
  - Owner authorization checks

### **Database Models**

**User Model**
```javascript
{
  email: String,
  password: String (hashed),
  fullname: String,
  contact: String,
  address: String,
  profilePicture: Buffer,
  role: String (user/admin),
  cart: [ObjectId],  // Array of product references
  orders: [ObjectId],
  createdAt: Date
}
```

**Product Model**
```javascript
{
  name: String,
  price: Number,
  discount: Number,
  description: String,
  category: String,
  image: Buffer,
  stock: Number,
  ratings: Number,
  createdAt: Date
}
```

**Order Model**
```javascript
{
  user: ObjectId,
  items: [{
    product: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  status: String (pending/confirmed/shipped),
  paymentMethod: String,
  shippingAddress: String,
  createdAt: Date
}
```

**Collection Model**
```javascript
{
  name: String,
  description: String,
  products: [ObjectId],
  owner: ObjectId,
  createdAt: Date
}
```

---

## 🎨 Frontend Services

### **Core Components & Pages**

#### **1. Navigation**
- **Navbar Component**: 
  - Logo and brand
  - Language switcher (English/Hindi support)
  - User authentication status
  - Cart icon with item count
  - Admin panel access

#### **2. Authentication Pages**
- **Login Page** (`/login`):
  - Email and password input
  - Remember me option
  - Link to registration
  - JWT token handling
  - Redirect to shop on success

- **Register Page** (`/register`):
  - Full name, email, password input
  - Password confirmation
  - Form validation
  - Auto-login after registration

#### **3. Shopping Pages**
- **Home Page** (`/`):
  - Hero section
  - Featured products
  - Category showcase
  - Latest collections

- **Shop Page** (`/shop`):
  - All products display in grid
  - Search functionality
  - Category filtering
  - Price range filtering
  - Sorting options

- **Categories Page** (`/categories`):
  - Browse by category
  - Category-specific products
  - Filter options

- **Product Detail Page** (`/product/:id`):
  - Full product information
  - High-resolution images
  - Price and discount details
  - Add to cart button
  - Customer reviews

- **Collections Page** (`/collections`):
  - All available collections
  - Collection details
  - Products in collection
  - Curated product lists

#### **4. Cart & Checkout**
- **Cart Page** (`/cart`):
  - View all cart items
  - Update quantities
  - Remove items
  - Calculate totals
  - Proceed to payment

- **Payment Page** (`/payment`):
  - Payment method selection
  - Address entry
  - Order review
  - Payment processing
  - Order confirmation

#### **5. User Pages**
- **Profile Page** (`/profile`):
  - View user information
  - Edit profile details
  - Profile picture upload
  - Contact information

- **Change Password Page** (`/change-password`):
  - Current password verification
  - New password input
  - Password confirmation

- **Orders Page** (`/orders`):
  - Order history
  - Order status tracking
  - Order details view
  - Download invoices

#### **6. Admin Pages**
- **Admin Panel** (`/admin`):
  - Dashboard overview
  - Quick statistics
  - Recent orders
  - Admin controls

- **Admin Products** (`/admin/products`):
  - Product management table
  - Add new product
  - Edit product details
  - Upload product images
  - Delete products
  - Stock management

### **Key Features**

1. **State Management**:
   - User authentication state
   - Cart items tracking
   - Language preference
   - Loading states

2. **API Integration** (`/src/utils/api.js`):
   - Axios instance with base URL
   - Automatic header configuration
   - JWT token handling
   - Error handling

3. **Styling**:
   - Tailwind CSS utility classes
   - Custom dark theme
   - Responsive design
   - Smooth animations

4. **Notifications**:
   - React Hot Toast for user feedback
   - Success/error messages
   - Toast notifications for actions

5. **Routing**:
   - React Router for SPA navigation
   - Protected routes for authenticated users
   - Admin-only routes
   - Nested routes for pages

6. **Multi-language Support**:
   - English and Hindi translations
   - Language persistence
   - Dynamic language switching

---

## 📦 Installation & Setup

### **Prerequisites**
- Node.js v16 or higher
- MongoDB instance (local or cloud)
- npm or yarn package manager

### **Backend Setup**

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file** with environment variables (adjust ports as needed):
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   EXPRESS_SESSION_SECRET=your_session_secret
   # default port for local backend server (change if you prefer another free port)
   PORT=8086
   NODE_ENV=development
   ```

   > :warning: **CORS configuration** (in `backend/app.js`) allows requests from the frontend origin defined below. Update the `origin` field if you change the frontend port.

4. **Configure database** (`config/development.json`):
   ```json
   {
     "mongoDbUrl": "mongodb://localhost:27017/ecommerce"
   }
   ```

### **Frontend Setup**

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file** for frontend, pointing to the backend port you chose:
   ```env
   # base URL used by axios; relative path `/api` is also supported
   VITE_API_BASE_URL=http://localhost:8086/api
   # optional: override Vite dev server port (default 5173)
   VITE_PORT=8081
   ```

   > :memo: You can also edit `frontend/vite.config.js` to change the `server.port` and proxy `target` if you want a different port.
4. **Configure API endpoint** (`src/utils/api.js` is pre-configured for development)

---

## 🚀 Running the Application

### **Development Mode**

#### **Backend**:
```bash
cd backend
npm run dev
# Server runs on http://localhost:8086 (or whichever PORT you set in .env)
```

#### **Frontend**:
```bash
cd frontend
npm run dev
# App runs on http://localhost:8081 (or the value of VITE_PORT in .env)
# dev server will proxy /api requests to the backend port defined above
```

#### **Both Simultaneously** (new terminals):
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

### **Production Build**

#### **Backend**:
```bash
cd backend
npm start
```

#### **Frontend**:
```bash
cd frontend
npm run build
npm run preview
```

---

## 🔌 API Endpoints

### **Authentication Routes** (`/api/users`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | User login |
| GET | `/logout` | User logout |
| GET | `/me` | Get current user info |
| POST | `/change-password` | Change user password |

### **User Routes** (`/api/users`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile` | Get user profile |
| PUT | `/profile` | Update profile |
| GET | `/cart` | View cart items |
| POST | `/add-to-cart` | Add product to cart |
| DELETE | `/cart/:productId` | Remove from cart |
| POST | `/place-order` | Create order |
| GET | `/orders` | Get user orders |

### **Product Routes** (`/api/products`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all products |
| GET | `/:id` | Get product details |
| GET | `/category/:cat` | Products by category |
| POST | `/create` | Create new product (admin) |
| PUT | `/:id` | Update product (admin) |
| DELETE | `/:id` | Delete product (admin) |

### **Owner/Admin Routes** (`/api/owners`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register owner account |
| POST | `/login` | Owner login |
| GET | `/products` | Get owner's products |
| POST | `/products` | Create product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### **Collection Routes** (`/api/collection`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all collections |
| POST | `/create` | Create collection (admin) |
| GET | `/:id` | Get collection details |
| PUT | `/:id` | Update collection (admin) |
| DELETE | `/:id` | Delete collection (admin) |

---

## ✨ Features

### **User Features**
- ✅ User registration and authentication
- ✅ Browse products by category
- ✅ Advanced product search and filtering
- ✅ Detailed product information with images
- ✅ Shopping cart management
- ✅ Secure checkout process
- ✅ Payment processing
- ✅ Order tracking
- ✅ User profile management
- ✅ Password change functionality
- ✅ Multi-language support (English/Hindi)
- ✅ Wishlist functionality
- ✅ Product reviews and ratings

### **Admin Features**
- ✅ Admin dashboard
- ✅ Complete product management
- ✅ Product image uploads (Multer)
- ✅ Collection management
- ✅ Order management
- ✅ User management
- ✅ Analytics and statistics
- ✅ Inventory tracking

### **Technical Features**
- ✅ JWT authentication
- ✅ Password hashing (Bcrypt)
- ✅ CORS support
- ✅ Session management
- ✅ File upload handling
- ✅ Database persistence
- ✅ Error handling
- ✅ Input validation
- ✅ Responsive design
- ✅ Dark theme
- ✅ Toast notifications
- ✅ Loading states

---

## 🐳 Docker Deployment

### **Using Docker Compose**

1. **Build and start services**:
   ```bash
   docker-compose up -d
   ```

2. **Services will be available at**:
   - Frontend: `http://localhost:8081`
   - Backend: `http://localhost:8086`

3. **View logs**:
   ```bash
   docker-compose logs -f
   ```

4. **Stop services**:
   ```bash
   docker-compose down
   ```

### **Docker Configuration**

**Backend Dockerfile**:
- Node.js runtime
- Installs dependencies
- Exposes port 3000
- Health checks enabled

**Frontend Dockerfile**:
- Node.js build stage
- Nginx server for production
- Exposes port 80
- Health checks enabled

**Docker Compose Services**:
```yaml
backend:
  - Container: backend-cont
  - Port: 3000:3000
  - Health check: /health endpoint
  - Auto-restart enabled

frontend:
  - Container: frontend-cont
  - Port: 80:80
  - Health check: /  (root endpoint)
  - Auto-restart enabled

### **Reverse Proxy & Nginx**

The frontend container uses **Nginx** both to serve the React build and to proxy API requests to the backend. The configuration lives in `frontend/nginx.conf` and looks like this:

```nginx
server {
    listen 80;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://backend:8086;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

- **Static files** are served from `/usr/share/nginx/html`.
- The `try_files` directive ensures **client-side routing** works by falling back to `index.html`.
- All calls starting with `/api/` are forwarded to the backend service running on the `backend` host and port `8006` inside the network.
- Proxy headers pass along the original host and remote IP for logging or security purposes.

This configuration is used in production (containerized) setups where Nginx serves the built React app and proxies API requests to the backend container.

Dev vs Production notes:

- Local development (what you run with `npm run dev`):
  - Frontend dev server (Vite) runs on `http://localhost:8081` and proxies `/api` to the local backend at `http://localhost:8086` (see `frontend/vite.config.js`).
  - This proxy avoids CORS during development by forwarding requests from the dev server to the backend.

- Production (containerized with Docker):
  - Frontend is built and served by Nginx inside the `frontend` container (default container port `80`).
  - Nginx proxies `/api` to the backend container reachable at the Docker network hostname `backend` on port `8086` (as shown above).
  - Docker Compose maps container ports to host ports (e.g., `80:80` for frontend, `3000:3000` for backend in the example compose). You can change the host-side mapping if you want the services reachable on `http://localhost:8081`/`http://localhost:8086`.

Why the proxy helps:

- Avoids CORS: By proxying `/api` on the same origin (Nginx or Vite dev server), browsers see requests as same-origin, so you don't need to relax CORS policies in production.
- Single-origin cookies/sessions: Cookies set by the backend can be scoped to the same origin when proxied, making authentication and sessions simpler.
- Path-based routing: Nginx can route different paths to different services (static files, API, admin panel), enabling simpler URLs for clients.
- SSL termination & caching: Nginx can handle TLS termination, gzip, caching headers, and request buffering before forwarding to the backend.

Tips & adjustments:

- If your backend listens on a different container port, update `proxy_pass` accordingly.
- Ensure `backend` is the correct Docker Compose service name (it matches the `services.backend` key). If you rename the service, update the proxy target.
- When running locally without Docker, keep `vite.config.js` proxy target in sync with the backend local port (`http://127.0.0.1:8086`).

Example development proxy (frontend/vite.config.js):
```js
server: {
  port: 8081,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8086',
      changeOrigin: true,
    },
  },
}
```

This setup allows the frontend to make AJAX requests to relative paths (`/api/...`) without encountering CORS issues in both development and production.
```

---

## 🔐 Security Features

- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Password Hashing**: Bcrypt for secure password storage
- ✅ **CORS Protection**: Restricted origin access
- ✅ **Session Security**: Secure session configuration
- ✅ **Authorization Middleware**: Role-based access control
- ✅ **Input Validation**: Data validation on both frontend and backend
- ✅ **Error Handling**: Secure error responses without sensitive data

---

## 🐛 Testing

Test files included:
- `test_index_load.js` - Test product loading
- `verify_cart_fix.js` - Verify cart functionality

Run tests:
```bash
node test_index_load.js
node verify_cart_fix.js
```

---

## 📝 Product Categories

The platform supports the following product categories:

1. **Fashion** - Clothing, apparel, and accessories
2. **Electronics** - Computers, phones, and gadgets
3. **Footwear** - Shoes, sneakers, and boots
4. **Audio** - Headphones, speakers, and audio equipment
5. **Watches** - Wristwatches and smartwatches
6. **Food & Nutrition** - Groceries and nutritional products
7. **Toys & Games** - Toys and entertainment
8. **Fitness** - Exercise equipment and apparel
9. **Accessories** - Various product accessories
10. **Kids** - Children's products
11. **Home & Living** - Home furnishings and decor
12. **Books** - Educational and recreational books
13. **Beauty** - Beauty products and cosmetics

---

## 📞 Support & Contribution

For issues, questions, or contributions, please:
1. Check the documentation above
2. Review existing issues on GitHub
3. Submit a pull request with improvements
4. Contact the development team

---

## 📄 License

This project is part of the Sheriyans Coding educational series.

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by leading e-commerce platforms
- Designed for learning and production use
- Community-driven improvements welcome

---

**Last Updated**: February 2026  
**Version**: 1.0.0  
**Status**: Active Development

Happy coding! 🚀
