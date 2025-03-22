
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Eye, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const queryClient = useQueryClient();
  
  const { mutate: addToCartMutation } = useMutation({
    mutationFn: () => addToCart(product.id, product.sizes[0], product.colors[0], 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };
  
  return (
    <div 
      className={cn(
        "group relative rounded-lg overflow-hidden bg-white transition-all hover-scale",
        featured ? "aspect-[4/5]" : "aspect-[3/4]",
        featured ? "shadow-md" : "shadow-sm"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product tags */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.new && (
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-sm">
            New
          </span>
        )}
        {product.bestseller && (
          <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-sm">
            Best Seller
          </span>
        )}
        {product.originalPrice && (
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-sm">
            Sale
          </span>
        )}
      </div>
      
      {/* Quick actions */}
      <div 
        className={cn(
          "absolute right-4 top-4 flex flex-col gap-2 transition-all duration-300",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        )}
      >
        <Button 
          variant="outline" 
          size="icon" 
          className="h-9 w-9 rounded-full bg-white shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            addToCartMutation();
          }}
        >
          <ShoppingBag className="h-4 w-4" />
        </Button>
        
        <Link to={`/products/${product.id}`}>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-9 w-9 rounded-full bg-white shadow-sm"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      {/* Product image */}
      <Link to={`/products/${product.id}`} className="block h-full w-full">
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className={cn(
              "h-full w-full object-cover transition-transform duration-700",
              isHovered ? "scale-110" : "scale-100"
            )}
          />
          
          {/* Gradient overlay on hover */}
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </Link>
      
      {/* Product info */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 bg-white transition-all duration-300",
          isHovered ? "translate-y-0" : "translate-y-8"
        )}
      >
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-sm sm:text-base truncate pr-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-xs">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className={cn(
              "font-semibold text-sm sm:text-base",
              product.originalPrice ? "text-red-500" : ""
            )}>
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
        
        <div 
          className={cn(
            "flex justify-between items-center transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="text-xs text-gray-500">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
          
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.round(product.rating) ? "text-amber-400" : "text-gray-300"
                  )}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
