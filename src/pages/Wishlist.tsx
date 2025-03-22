
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWishlist, removeFromWishlist, addToCart } from '@/lib/api';
import { WishlistItem } from '@/lib/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingBag, Heart, Loader2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const Wishlist = () => {
  const queryClient = useQueryClient();
  
  const { data: wishlistItems, isLoading } = useQuery<WishlistItem[]>({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    initialData: []
  });
  
  const { mutate: removeItemMutation } = useMutation({
    mutationFn: (productId: string) => removeFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    }
  });
  
  const { mutate: addToCartMutation, isPending: isAddingToCart } = useMutation({
    mutationFn: (params: { productId: string, size: string, color: string, quantity: number }) => 
      addToCart(params.productId, params.size, params.color, params.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleRemoveItem = (productId: string) => {
    removeItemMutation(productId);
  };
  
  const handleAddToCart = (item: WishlistItem) => {
    addToCartMutation({
      productId: item.product.id,
      size: item.product.sizes[0], // Default to first size
      color: item.product.colors[0], // Default to first color
      quantity: 1
    });
  };
  
  // Empty wishlist state
  if (!isLoading && (!wishlistItems || wishlistItems.length === 0)) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-display font-bold mb-8">Your Wishlist</h1>
            
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
              <div className="mb-6 p-6 bg-gray-50 rounded-full">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any products to your wishlist yet.</p>
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
          <h1 className="text-3xl font-display font-bold mb-8">Your Wishlist</h1>
          
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-8 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems?.map((item) => (
                <div key={item.product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <Link to={`/products/${item.product.id}`}>
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </Link>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                      onClick={() => handleRemoveItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  
                  <div className="p-4">
                    <Link to={`/products/${item.product.id}`}>
                      <h2 className="font-medium mb-1 hover:text-blue-500 transition-colors">{item.product.name}</h2>
                    </Link>
                    
                    <div className="flex items-baseline gap-2 mb-3">
                      {item.product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          ${item.product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className={cn(
                        "font-medium",
                        item.product.originalPrice ? "text-red-500" : "text-gray-900"
                      )}>
                        ${item.product.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => handleAddToCart(item)}
                      disabled={isAddingToCart}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
