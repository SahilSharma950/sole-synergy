
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, updateCartItem, removeFromCart } from '@/lib/api';
import { CartItem } from '@/lib/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Cart = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const queryClient = useQueryClient();
  
  const { data: cart, isLoading } = useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: getCart,
    initialData: []
  });
  
  const { mutate: updateItemMutation } = useMutation({
    mutationFn: (params: { productId: string; size: string; color: string; quantity: number }) => 
      updateCartItem(params.productId, params.size, params.color, params.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
  
  const { mutate: removeItemMutation } = useMutation({
    mutationFn: (params: { productId: string; size: string; color: string }) => 
      removeFromCart(params.productId, params.size, params.color),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleQuantityChange = (item: CartItem, quantity: number) => {
    updateItemMutation({
      productId: item.product.id,
      size: item.size,
      color: item.color,
      quantity
    });
  };
  
  const handleRemoveItem = (item: CartItem) => {
    removeItemMutation({
      productId: item.product.id,
      size: item.size,
      color: item.color
    });
  };
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate a checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      // In a real app, this would redirect to a checkout page or process
    }, 1500);
  };
  
  // Calculate subtotal
  const subtotal = cart?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) || 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;
  
  // Empty cart state
  if (!isLoading && (!cart || cart.length === 0)) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-display font-bold mb-8">Your Cart</h1>
            
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
              <div className="mb-6 p-6 bg-gray-50 rounded-full">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
              <Button asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-8">Your Cart</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="lg:w-2/3">
              {isLoading ? (
                <div className="bg-white rounded-lg shadow-sm p-8 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <ul>
                    {cart?.map((item, index) => (
                      <li 
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        className={cn(
                          "flex flex-col sm:flex-row gap-4 p-6",
                          index !== cart.length - 1 && "border-b border-gray-100"
                        )}
                      >
                        {/* Product image */}
                        <div className="sm:w-24 sm:h-24 flex-shrink-0">
                          <Link to={`/products/${item.product.id}`}>
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </Link>
                        </div>
                        
                        {/* Product info */}
                        <div className="flex-grow">
                          <Link to={`/products/${item.product.id}`}>
                            <h3 className="font-medium">{item.product.name}</h3>
                          </Link>
                          
                          <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1 mb-3">
                            <span>Size: {item.size}</span>
                            <span className="mx-1">•</span>
                            <span>Color: {item.color}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <button 
                                className="w-8 h-8 flex items-center justify-center border rounded-l-md bg-gray-50"
                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="w-10 text-center">{item.quantity}</span>
                              <button 
                                className="w-8 h-8 flex items-center justify-center border rounded-r-md bg-gray-50"
                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <span className="font-medium">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleRemoveItem(item)}
                                className="h-8 w-8 text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-6">
                <Button variant="outline" asChild>
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Including taxes & fees
                    </p>
                  </div>
                </div>
                
                <Button 
                  className="w-full mb-4" 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Checkout <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  We accept Visa, Mastercard, American Express, and PayPal
                </p>
              </div>
              
              {/* Shipping info */}
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h3 className="font-medium text-sm mb-3">Shipping</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Free shipping on all orders over $50. Orders typically ship within 1-2 business days.
                </p>
                
                <h3 className="font-medium text-sm mb-3">Returns</h3>
                <p className="text-sm text-gray-600">
                  We offer a 30-day return policy. Items must be in original condition with tags attached.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
