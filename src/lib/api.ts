
import { Product, Category, User, CartItem, WishlistItem } from './types';
import { toast } from 'sonner';

const API_URL = 'http://localhost:5000/api';

// Helper function for making API requests
const apiRequest = async (
  endpoint: string, 
  method: string = 'GET', 
  data?: any, 
  requiresAuth: boolean = false
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  
  // Add auth token if required
  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined
  };
  
  const response = await fetch(`${API_URL}${endpoint}`, config);
  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(responseData.message || 'Something went wrong');
  }
  
  return responseData;
};

// Product API functions
export const getProducts = async (): Promise<Product[]> => {
  try {
    return await apiRequest('/products');
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (id: string): Promise<Product | undefined> => {
  try {
    return await apiRequest(`/products/${id}`);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    return await apiRequest('/products/featured');
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

// Category API functions
export const getCategories = async (): Promise<Category[]> => {
  try {
    return await apiRequest('/categories');
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    return await apiRequest(`/categories/${categoryId}/products`);
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
};

// Wishlist API functions
export const getWishlist = async (): Promise<WishlistItem[]> => {
  try {
    return await apiRequest('/wishlist', 'GET', undefined, true);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

export const addToWishlist = async (productId: string): Promise<WishlistItem[]> => {
  try {
    const result = await apiRequest('/wishlist', 'POST', { productId }, true);
    toast('Product added to wishlist');
    return result;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    toast(`Error: ${error instanceof Error ? error.message : 'Failed to add to wishlist'}`);
    throw error;
  }
};

export const removeFromWishlist = async (productId: string): Promise<WishlistItem[]> => {
  try {
    const result = await apiRequest(`/wishlist/${productId}`, 'DELETE', undefined, true);
    toast('Product removed from wishlist');
    return result;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    toast(`Error: ${error instanceof Error ? error.message : 'Failed to remove from wishlist'}`);
    throw error;
  }
};

// Cart API functions
export const getCart = async (): Promise<CartItem[]> => {
  try {
    return await apiRequest('/cart', 'GET', undefined, true);
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (productId: string, size: string, color: string, quantity: number = 1): Promise<CartItem[]> => {
  try {
    const result = await apiRequest('/cart', 'POST', { productId, size, color, quantity }, true);
    toast('Product added to cart');
    return result;
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast(`Error: ${error instanceof Error ? error.message : 'Failed to add to cart'}`);
    throw error;
  }
};

export const updateCartItem = async (productId: string, size: string, color: string, quantity: number): Promise<CartItem[]> => {
  try {
    return await apiRequest(`/cart/${productId}`, 'PUT', { size, color, quantity }, true);
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCart = async (productId: string, size: string, color: string): Promise<CartItem[]> => {
  try {
    const result = await apiRequest(`/cart/${productId}?size=${size}&color=${color}`, 'DELETE', undefined, true);
    toast('Product removed from cart');
    return result;
  } catch (error) {
    console.error('Error removing from cart:', error);
    toast(`Error: ${error instanceof Error ? error.message : 'Failed to remove from cart'}`);
    throw error;
  }
};

// Authentication API functions
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const data = await apiRequest('/auth/login', 'POST', { email, password });
    
    // Save token to localStorage
    localStorage.setItem('token', data.token);
    
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      isAdmin: data.isAdmin
    };
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const register = async (name: string, email: string, password: string): Promise<User> => {
  try {
    const data = await apiRequest('/auth/register', 'POST', { name, email, password });
    
    // Save token to localStorage
    localStorage.setItem('token', data.token);
    
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      isAdmin: data.isAdmin
    };
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await apiRequest('/auth/logout', 'POST');
    
    // Remove token from localStorage
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return null;
    }
    
    const data = await apiRequest('/auth/profile', 'GET', undefined, true);
    
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      isAdmin: data.isAdmin
    };
  } catch (error) {
    console.error('Error fetching current user:', error);
    
    // Remove token if it's invalid
    localStorage.removeItem('token');
    
    return null;
  }
};
