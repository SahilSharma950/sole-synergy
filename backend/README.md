
# SoleSynergy Backend

This is the backend API for the SoleSynergy e-commerce application.

## Setup and Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/solesynergy
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Seed the database (optional):
   ```
   node data/seedData.js
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and get token
- `GET /api/auth/profile` - Get user profile (protected)
- `POST /api/auth/logout` - Logout user (client-side)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a product (admin)
- `PUT /api/products/:id` - Update a product (admin)
- `DELETE /api/products/:id` - Delete a product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `GET /api/categories/:id/products` - Get products by category
- `POST /api/categories` - Create a category (admin)
- `PUT /api/categories/:id` - Update a category (admin)
- `DELETE /api/categories/:id` - Delete a category (admin)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:productId` - Update cart item quantity (protected)
- `DELETE /api/cart/:productId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Wishlist
- `GET /api/wishlist` - Get user wishlist (protected)
- `POST /api/wishlist` - Add item to wishlist (protected)
- `DELETE /api/wishlist/:productId` - Remove item from wishlist (protected)

## Authentication

Protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

Admin routes require the user to have `isAdmin: true` in their profile.
