
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/api';
import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, Truck, Shield, RotateCcw, CreditCard } from 'lucide-react';

const Index = () => {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <Hero />
        
        {/* Featured products section */}
        <FeaturedProducts />
        
        {/* Categories section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-blue-500 font-medium text-sm">Browse By Category</span>
              <h2 className="text-3xl font-display font-bold tracking-tight mt-1">Shop Categories</h2>
              <p className="text-gray-600 max-w-lg mx-auto mt-2">
                Explore our wide range of footwear categories to find your perfect pair
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories?.map((category) => (
                <Link 
                  key={category.id}
                  to={`/categories/${category.slug}`}
                  className="group relative block h-64 overflow-hidden rounded-lg shadow-sm hover-scale"
                >
                  {/* Category Image */}
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-2xl font-display font-bold text-white mb-2">{category.name}</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white/20 text-white border-white/40 backdrop-blur-sm hover:bg-white/30 transition-all"
                    >
                      Shop Now <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why choose us section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-blue-500 font-medium text-sm">Why Choose Us</span>
              <h2 className="text-3xl font-display font-bold tracking-tight mt-1">Shopping With Confidence</h2>
              <p className="text-gray-600 max-w-lg mx-auto mt-2">
                We're committed to providing the best shopping experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Truck className="h-8 w-8" />,
                  title: 'Free Shipping',
                  description: 'Free shipping on all orders over $50'
                },
                {
                  icon: <RotateCcw className="h-8 w-8" />,
                  title: 'Easy Returns',
                  description: '30-day free returns policy'
                },
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: 'Secure Shopping',
                  description: 'Your data is always protected'
                },
                {
                  icon: <CreditCard className="h-8 w-8" />,
                  title: 'Flexible Payment',
                  description: 'Multiple payment options available'
                }
              ].map((item, i) => (
                <div 
                  key={i}
                  className={cn(
                    "flex flex-col items-center text-center p-6 rounded-lg transition-all",
                    "hover:bg-white hover:shadow-md hover-scale"
                  )}
                >
                  <div className="mb-4 text-blue-500">{item.icon}</div>
                  <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter section */}
        <section className="py-16 px-6 bg-blue-500">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-xl bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center p-8 md:p-12 overflow-hidden">
              <div className="max-w-md bg-white/10 backdrop-blur-lg rounded-lg p-6 md:p-8 text-white">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Join Our Newsletter</h2>
                <p className="mb-6 opacity-90">
                  Subscribe to get special offers, exclusive discounts, and early access to new releases.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/60 flex-grow"
                  />
                  <Button className="bg-white text-blue-500 hover:bg-white/90">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
