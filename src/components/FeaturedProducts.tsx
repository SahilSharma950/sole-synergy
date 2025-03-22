
import { useQuery } from '@tanstack/react-query';
import { getFeaturedProducts } from '@/lib/api';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['featuredProducts'],
    queryFn: getFeaturedProducts
  });
  
  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="w-32 h-10 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  // Error state
  if (error || !products) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500">Failed to load featured products</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
          <div>
            <span className="text-blue-500 font-medium text-sm">Curated Selection</span>
            <h2 className="text-3xl font-display font-bold tracking-tight">Featured Products</h2>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="self-start md:self-center group"
            asChild
          >
            <Link to="/products">
              View All Products 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} featured />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
