
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getProductsByCategory } from '@/lib/api';
import { Link, useParams } from 'react-router-dom';
import { Category, Product } from '@/lib/types';
import { Container } from '@/components/ui/container';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Categories = () => {
  const { slug } = useParams<{ slug?: string }>();
  
  // Fetch all categories
  const { data: categories, isLoading: loadingCategories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  // Find the current category if slug is provided
  const currentCategory = slug 
    ? categories?.find(category => category.slug === slug) 
    : undefined;
  
  // Fetch products for the current category if one is selected
  const { data: products, isLoading: loadingProducts } = useQuery<Product[]>({
    queryKey: ['productsByCategory', slug],
    queryFn: () => currentCategory ? getProductsByCategory(currentCategory.id) : getProducts(),
    enabled: !!slug || !currentCategory,
  });
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Function to get all products when no category is selected
  const getProducts = async () => {
    // If no category is selected, show products from all categories
    const cats = await getCategories();
    const productPromises = cats.map(cat => getProductsByCategory(cat.id));
    const productsArrays = await Promise.all(productPromises);
    return productsArrays.flat();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <Container>
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/categories" className={cn(
              "hover:text-blue-500 transition-colors",
              !slug && "font-medium text-gray-700"
            )}>Categories</Link>
            
            {slug && currentCategory && (
              <>
                <span className="mx-2">/</span>
                <span className="font-medium text-gray-700">{currentCategory.name}</span>
              </>
            )}
          </div>
          
          {!slug ? (
            // All Categories View
            <>
              <h1 className="text-3xl font-display font-bold mb-8">All Categories</h1>
              
              {loadingCategories ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-video rounded-lg bg-gray-200 animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories?.map((category) => (
                    <Link 
                      key={category.id}
                      to={`/categories/${category.slug}`}
                      className="group relative block aspect-video overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                      {/* Category Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                        style={{ backgroundImage: `url(${category.image})` }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                        <h3 className="text-2xl font-display font-bold text-white mb-2">{category.name}</h3>
                        <span 
                          className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm backdrop-blur-sm group-hover:bg-white/30 transition-all"
                        >
                          Shop Now <ChevronRight className="h-4 w-4 ml-1" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            // Single Category View with Products
            <>
              {currentCategory ? (
                <div className="mb-8">
                  <h1 className="text-3xl font-display font-bold">{currentCategory.name}</h1>
                  <p className="text-gray-600 mt-2">Shop our selection of {currentCategory.name.toLowerCase()} shoes</p>
                </div>
              ) : (
                <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-md mb-8" />
              )}
              
              {loadingProducts ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-[4/5] bg-gray-200 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found in this category.</p>
                </div>
              )}
            </>
          )}
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
