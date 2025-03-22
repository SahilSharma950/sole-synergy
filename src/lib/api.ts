
import { Product, Category, User, CartItem } from './types';
import { toast } from '@/components/ui/sonner';

// Mock data for products
const products: Product[] = [
  {
    id: '1',
    name: 'Air Max Pulse',
    price: 149.99,
    description: 'Inspired by the energy of London's music scene, the Air Max Pulse brings a new beat to the iconic Air Max line. Its textile-wrapped midsole and vacuum-sealed accents add a cutting-edge aesthetic to its technical construction, while the Air unit in the heel delivers responsive cushioning for all-day comfort.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1d8e1a76-7f43-4b7e-a811-44c249e2a604/air-max-pulse-shoes-QShhG8.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b329e6f6-be5d-478b-8604-09d709bd2c2e/air-max-pulse-shoes-QShhG8.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6bfe12be-7d7a-468c-9a49-c9481d3eaf3c/air-max-pulse-shoes-QShhG8.png'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Grey'],
    category: 'running',
    featured: true,
    bestseller: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'UltraBoost 22',
    price: 189.99,
    description: 'These running shoes deliver the maximum comfort and cushioning with Boost technology. The knit upper gives you a sock-like fit for natural movement.',
    images: [
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3bd09e4d40b744cbaf56ae9600d1a133_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg',
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bfa5dc44b59a4de98d3aae9600d1b881_9366/Ultraboost_22_Shoes_Black_GZ0127_02_standard_hover.jpg',
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b9f89a9318804e7bb486ae9600d1c5d6_9366/Ultraboost_22_Shoes_Black_GZ0127_03_standard.jpg'
    ],
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Black', 'Blue', 'Red'],
    category: 'running',
    featured: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: '3',
    name: 'Classic Leather',
    price: 79.99,
    description: 'These iconic shoes blend timeless style with modern comfort. The soft leather upper and cushioned midsole provide lasting support and a premium look.',
    images: [
      'https://classic.cdn.reebok.com/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dw6a283969/zoom/49799_01.jpg?sw=840&sh=840&sm=fit&strip=false',
      'https://classic.cdn.reebok.com/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dwe51d160a/zoom/49799_02.jpg?sw=840&sh=840&sm=fit&strip=false',
      'https://classic.cdn.reebok.com/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dw65392da4/zoom/49799_03.jpg?sw=840&sh=840&sm=fit&strip=false'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Cream'],
    category: 'casual',
    bestseller: true,
    rating: 4.6,
    reviews: 206
  },
  {
    id: '4',
    name: 'Stan Smith',
    price: 89.99,
    originalPrice: 110.00,
    description: 'A tennis shoe legacy, reborn for everyday style. These iconic shoes feature a clean leather build and signature details that have made them a cultural staple.',
    images: [
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/90f85768e0244eeebec7aba0014a3379_9366/Stan_Smith_Shoes_White_FX5502_01_standard.jpg',
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ead50a4c299743f98156aba0014a4661_9366/Stan_Smith_Shoes_White_FX5502_02_standard_hover.jpg',
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ac706d6a79b144fd9075aba0014a5192_9366/Stan_Smith_Shoes_White_FX5502_03_standard.jpg'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White/Green', 'White/Navy', 'Black/White'],
    category: 'casual',
    new: true,
    rating: 4.9,
    reviews: 312
  },
  {
    id: '5',
    name: 'Jordan 1 Retro High',
    price: 169.99,
    description: 'The Air Jordan 1 High is a legendary basketball shoe that transcends sport. With its timeless design, premium construction, and iconic Wings logo, it remains as relevant today as it was when it debuted.',
    images: [
      'https://secure-images.nike.com/is/image/DotCom/555088_134_A_PREM?$SNKRS_COVER_WD$&align=0,1',
      'https://secure-images.nike.com/is/image/DotCom/555088_134_B?$SNKRS_COVER_WD$&align=0,1',
      'https://secure-images.nike.com/is/image/DotCom/555088_134_C?$SNKRS_COVER_WD$&align=0,1'
    ],
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    colors: ['University Blue', 'Chicago', 'Shadow'],
    category: 'basketball',
    featured: true,
    bestseller: true,
    rating: 4.9,
    reviews: 428
  },
  {
    id: '6',
    name: 'Old Skool',
    price: 69.99,
    description: 'The Vans Old Skool is a classic skate shoe and the brand's first model to feature the iconic side stripe. With a durable suede and canvas upper, it delivers both style and functionality for skaters and fashion enthusiasts alike.',
    images: [
      'https://images.vans.com/is/image/VansBrand/HO19_OLD%20SKOOL_ECOM_BLACK_SIDE?$SCALE-LARGE$',
      'https://images.vans.com/is/image/VansBrand/HO19_OLD%20SKOOL_ECOM_BLACK_TOP?$SCALE-LARGE$',
      'https://images.vans.com/is/image/VansBrand/HO19_OLD%20SKOOL_ECOM_BLACK_HEEL?$SCALE-LARGE$'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black/White', 'Navy/White', 'Red/White'],
    category: 'skateboarding',
    new: true,
    rating: 4.7,
    reviews: 254
  }
];

// Mock categories
const categories: Category[] = [
  {
    id: 'running',
    name: 'Running',
    image: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_600,c_limit/dc1a8cca-f1c7-4804-b540-c53c832c5762/how-to-find-the-right-running-shoes.jpg',
    slug: 'running'
  },
  {
    id: 'casual',
    name: 'Casual',
    image: 'https://cdn.flightclub.com/TEMPLATE/806141/1.jpg',
    slug: 'casual'
  },
  {
    id: 'basketball',
    name: 'Basketball',
    image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c7cf0de2-0517-4339-a9a5-8fbaa89ac4d8/lebron-xx-basketball-shoes-ct1qVm.png',
    slug: 'basketball'
  },
  {
    id: 'skateboarding',
    name: 'Skateboarding',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/37d1b989-2e8d-4859-8e30-2e9a8be8ec42/sb-force-58-skate-shoes-LJNW5L.png',
    slug: 'skateboarding'
  }
];

// API functions
export const getProducts = async (): Promise<Product[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  return products;
};

export const getProduct = async (id: string): Promise<Product | undefined> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  return products.filter(product => product.featured);
};

export const getCategories = async (): Promise<Category[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return categories;
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return products.filter(product => product.category === categoryId);
};

// Mock cart state (normally would use a more sophisticated state management)
let cart: CartItem[] = [];

export const getCart = async (): Promise<CartItem[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return cart;
};

export const addToCart = async (productId: string, size: string, color: string, quantity: number = 1): Promise<CartItem[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    throw new Error('Product not found');
  }
  
  // Check if product already in cart
  const existingItemIndex = cart.findIndex(
    item => item.product.id === productId && item.size === size && item.color === color
  );
  
  if (existingItemIndex >= 0) {
    // Update quantity if product already in cart
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({
      product,
      quantity,
      size,
      color
    });
  }
  
  toast('Product added to cart');
  return cart;
};

export const updateCartItem = async (productId: string, size: string, color: string, quantity: number): Promise<CartItem[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const itemIndex = cart.findIndex(
    item => item.product.id === productId && item.size === size && item.color === color
  );
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is zero or negative
      cart = cart.filter((_, index) => index !== itemIndex);
    } else {
      // Update quantity
      cart[itemIndex].quantity = quantity;
    }
  }
  
  return cart;
};

export const removeFromCart = async (productId: string, size: string, color: string): Promise<CartItem[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  cart = cart.filter(
    item => !(item.product.id === productId && item.size === size && item.color === color)
  );
  
  toast('Product removed from cart');
  return cart;
};

// Mock authentication functions
let currentUser: User | null = null;

export const login = async (email: string, password: string): Promise<User> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simple validation (in a real app, this would be handled by the server)
  if (email === 'user@example.com' && password === 'password') {
    currentUser = {
      id: '1',
      name: 'Demo User',
      email: 'user@example.com'
    };
    return currentUser;
  }
  
  throw new Error('Invalid credentials');
};

export const register = async (name: string, email: string, password: string): Promise<User> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple validation (in a real app, this would be handled by the server)
  if (email === 'user@example.com') {
    throw new Error('Email already in use');
  }
  
  currentUser = {
    id: '2',
    name,
    email
  };
  
  return currentUser;
};

export const logout = async (): Promise<void> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  currentUser = null;
};

export const getCurrentUser = async (): Promise<User | null> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return currentUser;
};
