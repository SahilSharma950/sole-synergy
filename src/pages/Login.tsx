
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { User } from '@/lib/types';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation<User, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(['currentUser'], user);
      toast('Successfully logged in!');
      navigate('/');
    },
    onError: (error) => {
      toast(error.message || 'Failed to log in. Please try again.');
    }
  });
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? 'Signing in...' : 'Sign In'}
                </Button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="white"/>
                    <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="none" stroke="black" strokeWidth="0.5"/>
                    <path d="M33.8908 24.1812C33.8908 23.5155 33.8306 22.8725 33.7178 22.2432H24.0278V26.265H29.5989C29.3293 27.535 28.5802 28.6125 27.4782 29.3327V32.0972H31.3642C33.3783 30.2715 34.5269 27.4947 34.5269 24.1812H33.8908Z" fill="#4285F4"/>
                    <path d="M23.9999 34.4999C27.2349 34.4999 29.9549 33.4399 31.9999 31.4399L28.1499 28.6999C26.9999 29.4999 25.6149 29.9999 23.9999 29.9999C20.9749 29.9999 18.3899 28.0349 17.3749 25.3999H13.3999V28.1999C15.4399 31.9999 19.3999 34.4999 23.9999 34.4999Z" fill="#34A853"/>
                    <path d="M17.3751 24.7154C16.9401 23.5654 16.9401 22.2904 17.3751 21.1404V18.3404H13.3751C11.9551 21.1404 11.9551 24.7154 13.3751 27.5154L17.3751 24.7154Z" fill="#FBBC05"/>
                    <path d="M23.9999 16.2C25.4699 16.2 26.7999 16.7 27.8499 17.7L31.1999 14.35C29.1999 12.45 26.6999 11.5 23.9999 11.5C19.3999 11.5 15.4399 14 13.3999 17.8L17.3999 20.6C18.3999 17.85 20.9999 16.2 23.9999 16.2Z" fill="#EA4335"/>
                  </svg>
                  Google
                </Button>
                
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 9.9C27.9 9.9 9.9 27.9 9.9 50C9.9 72.1 27.9 90.1 50 90.1C72.1 90.1 90.1 72.1 90.1 50C90.1 27.9 72.1 9.9 50 9.9ZM69.8 34.9H61.4C60.5 34.9 59.6 36 59.6 36.9V43.9H69.8V53.7H59.6V83.1H49.8V53.7H41.5V43.9H49.8V38C49.8 29.7 55.3 23.7 63.7 23.7H69.8V34.9Z" fill="#1877F2"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-500 hover:text-blue-600 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
