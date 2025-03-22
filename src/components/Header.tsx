
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCurrentUser, getCart } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { User as UserType, CartItem } from '@/lib/types';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const { data: user } = useQuery<UserType | null>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser
  });
  
  const { data: cart } = useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: getCart,
    initialData: []
  });
  
  // Update header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const totalCartItems = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' }
  ];
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
        isScrolled ? 
          "bg-white/80 backdrop-blur-lg shadow-sm" : 
          "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="font-display text-xl md:text-2xl font-bold tracking-tight text-primary"
        >
          SOLE<span className="text-blue-500">SYNERGY</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-500",
                location.pathname === link.path ? 
                  "text-blue-500" : 
                  "text-primary/80"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 text-xs bg-blue-500 text-white rounded-full animate-fade-in">
                  {totalCartItems}
                </span>
              )}
            </Button>
          </Link>
          
          {user ? (
            <Link to="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button 
                variant="outline" 
                size="sm"
                className="hidden md:inline-flex transition-all hover:bg-blue-50"
              >
                Sign In
              </Button>
            </Link>
          )}
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-sm z-40 animate-fade-in">
          <nav className="flex flex-col items-center justify-center h-full space-y-8 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-blue-500",
                  location.pathname === link.path ? 
                    "text-blue-500" : 
                    "text-primary/80"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {!user && (
              <Link to="/login">
                <Button 
                  className="mt-4 w-full"
                  variant="outline"
                >
                  Sign In
                </Button>
              </Link>
            )}
            
            {!user && (
              <Link to="/register">
                <Button 
                  className="w-full"
                >
                  Create Account
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
