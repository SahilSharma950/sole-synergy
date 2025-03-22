
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  category: string;
  featured?: boolean;
  bestseller?: boolean;
  new?: boolean;
  rating: number;
  reviews: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}
