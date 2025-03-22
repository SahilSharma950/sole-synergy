import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProduct, addToCart, addToWishlist, removeFromWishlist, getWishlist } from '@/lib/api';
import { Product, WishlistItem } from '@/lib/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, Share2, ChevronRight, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const queryClient = useQueryClient();
  
  const { data: product, isLoading, error } = useQuery<Product | undefined>({
    queryKey: ['product', id],
    queryFn: () => getProduct(id || ''),
    enabled: !!id
  });
  
  const { data: wishlistItems } = useQuery<WishlistItem[]>({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    initialData: []
  });
  
  useEffect(() => {
    if (wishlistItems && product) {
      setIsInWishlist(wishlistItems.some(item => item.product.id === product.id));
    }
  }, [wishlistItems, product]);
  
  const { mutate: addToCartMutation, isPending } = useMutation({
    mutationFn: () => addToCart(product!.id, selectedSize, selectedColor, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
  
  const { mutate: addToWishlistMutation } = useMutation({
    mutationFn: () => addToWishlist(product!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    }
  });
  
  const { mutate: removeFromWishlistMutation } = useMutation({
    mutationFn: () => removeFromWishlist(product!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    }
  });

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Set default size and color
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
    }
  }, [product]);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16 px-6">
          <div className="max-w-7xl mx-auto animate-pulse">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                <div className="flex gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-24 h-24 bg-gray-200 rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="h-10 bg-gray-200 rounded-md mb-4 w-2/3" />
                <div className="h-6 bg-gray-200 rounded-md mb-6 w-1/3" />
                <div className="h-4 bg-gray-200 rounded-md mb-2 w-full" />
                <div className="h-4 bg-gray-200 rounded-md mb-2 w-full" />
                <div className="h-4 bg-gray-200 rounded-md mb-6 w-2/3" />
                <div className="h-10 bg-gray-200 rounded-md mb-4 w-1/4" />
                <div className="h-12 bg-gray-200 rounded-md mb-6 w-full" />
                <div className="h-12 bg-gray-200 rounded-md w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16 px-6 flex items-center justify-center">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-display font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCartMutation();
    }
  };
  
  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlistMutation();
    } else {
      addToWishlistMutation();
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex mb-8 text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-500">Home</Link>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            <Link to="/products" className="text-gray-500 hover:text-blue-500">Products</Link>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            <Link to={`/categories/${product?.category}`} className="text-gray-500 hover:text-blue-500">
              {product?.category.charAt(0).toUpperCase() + product?.category.slice(1)}
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{product?.name}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="mb-4 overflow-hidden rounded-lg bg-gray-50">
                <img 
                  src={product?.images[selectedImage]} 
                  alt={product?.name}
                  className="w-full h-auto object-contain aspect-square"
                />
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product?.images.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      "rounded-md overflow-hidden border-2 transition-all",
                      selectedImage === index ? "border-blue-500" : "border-transparent"
                    )}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-24 h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2">
              <div className="mb-6">
                <h1 className="text-3xl font-display font-bold mb-2">{product?.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.round(product?.rating || 0) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product?.rating.toFixed(1)} ({product?.reviews} reviews)
                  </span>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-3">
                    {product?.originalPrice && (
                      <span className="text-gray-400 line-through text-lg">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className={cn(
                      "text-2xl font-semibold",
                      product?.originalPrice ? "text-red-500" : "text-gray-900"
                    )}>
                      ${product?.price.toFixed(2)}
                    </span>
                  </div>
                  
                  {product?.originalPrice && (
                    <p className="text-sm text-green-600 mt-1">
                      Save ${(product.originalPrice - product.price).toFixed(2)} ({Math.round((1 - product.price / product.originalPrice) * 100)}% off)
                    </p>
                  )}
                </div>
                
                <p className="text-gray-600 mb-8">{product?.description}</p>
                
                {/* Size selection */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Size</h3>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm text-blue-500"
                    >
                      Size Guide
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {product?.sizes.map((size) => (
                      <button
                        key={size}
                        className={cn(
                          "h-10 min-w-[2.5rem] px-3 rounded border text-sm font-medium transition-all",
                          selectedSize === size
                            ? "border-blue-500 bg-blue-50 text-blue-500"
                            : "border-gray-300 hover:border-gray-400"
                        )}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Color selection */}
                <div className="mb-8">
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {product?.colors.map((color) => (
                      <button
                        key={color}
                        className={cn(
                          "flex items-center gap-2 h-10 px-3 rounded border text-sm font-medium transition-all",
                          selectedColor === color
                            ? "border-blue-500 bg-blue-50 text-blue-500"
                            : "border-gray-300 hover:border-gray-400"
                        )}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity and add to cart */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  {/* Quantity selector */}
                  <div className="flex items-center border rounded-md w-36">
                    <button 
                      className="w-10 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      onClick={handleDecreaseQuantity}
                    >
                      -
                    </button>
                    <div className="flex-1 text-center font-medium">
                      {quantity}
                    </div>
                    <button 
                      className="w-10 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      onClick={handleIncreaseQuantity}
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Add to cart button */}
                  <Button 
                    className="flex-1 h-12"
                    onClick={handleAddToCart}
                    disabled={!selectedSize || !selectedColor || isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="mr-2">Adding...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  
                  {/* Wishlist button */}
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-12 w-12"
                    onClick={toggleWishlist}
                  >
                    <Heart 
                      className={cn("h-5 w-5", isInWishlist ? "fill-red-500 text-red-500" : "")} 
                    />
                  </Button>
                </div>
                
                {/* Additional info */}
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Free Shipping</p>
                      <p className="text-gray-600 text-sm">Free shipping on orders over $50</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Secure Payment</p>
                      <p className="text-gray-600 text-sm">100% secure payment processing</p>
                    </div>
                  </div>
                </div>
                
                {/* Share */}
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Share:</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
