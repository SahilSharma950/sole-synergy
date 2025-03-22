
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Facebook, Instagram, Twitter, YouTube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h3 className="font-display text-xl font-bold tracking-tight text-primary">
                SOLE<span className="text-blue-500">SYNERGY</span>
              </h3>
            </Link>
            <p className="text-gray-600 mb-4 text-sm">
              Elevate your style with our premium footwear collection. 
              Where comfort meets cutting-edge design.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <YouTube className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h4 className="font-medium text-base mb-4">Shop</h4>
            <ul className="space-y-2">
              {['All Products', 'New Arrivals', 'Best Sellers', 'Sale', 'Gift Cards'].map(item => (
                <li key={item}>
                  <Link 
                    to={`/products${item === 'All Products' ? '' : '/' + item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-600 text-sm hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="font-medium text-base mb-4">Support</h4>
            <ul className="space-y-2">
              {['Contact Us', 'FAQs', 'Shipping & Returns', 'Size Guide', 'Privacy Policy'].map(item => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                    className="text-gray-600 text-sm hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-medium text-base mb-4">Newsletter</h4>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="h-10 text-sm"
              />
              <Button size="sm" className="h-10">
                Subscribe
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail className="h-4 w-4" />
                <span>support@solesynergy.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin className="h-4 w-4" />
                <span>1234 Fashion Ave, New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} SoleSynergy. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <img 
                src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/visa-2f3038bfdf5dd4eb5ff8c22410e4f6ee5f0d60bc91ec1711a78d1068a58abdcd.svg" 
                alt="Visa" 
                className="h-8"
              />
              <img 
                src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/master-98b28c37edce9612fb0d0bb0f473163a5982c65c1026a849cf384976b7f2117f.svg" 
                alt="Mastercard" 
                className="h-8"
              />
              <img 
                src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/american_express-1c06cbda76dc55d191e139e04eca552b165d0c5dd7ca9f882c203b206e562e8a.svg" 
                alt="American Express" 
                className="h-8"
              />
              <img 
                src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/paypal-49e4c1e03244b6d2de0d270ca0d22dd15da6e92cc7266e93eb43762df5aa355d.svg" 
                alt="PayPal" 
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
