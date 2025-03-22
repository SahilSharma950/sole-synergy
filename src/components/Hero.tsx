
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const heroImages = [
  {
    src: 'https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_1344,c_limit/e104e283-0984-46c1-b305-aa281bc6a12e/nike-just-do-it.jpg',
    alt: 'Running shoes on athlete',
    title: 'ELEVATE YOUR STYLE',
    subtitle: 'Discover the perfect blend of comfort and design'
  },
  {
    src: 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/running-ss22-ultraboost-launch-hp-masthead-d_tcm221-819213.jpg',
    alt: 'Premium running shoes',
    title: 'PERFORMANCE REDEFINED',
    subtitle: 'Engineered for the ultimate athletic experience'
  },
  {
    src: 'https://www.si.com/.image/t_share/MTg0MjU5OTk4OTIyNzM0ODI1/air-jordan-1-shoes.jpg',
    alt: 'Classic basketball shoes',
    title: 'ICONS NEVER FADE',
    subtitle: 'Legendary designs that stand the test of time'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Auto rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        setIsAnimating(false);
      }, 500);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const currentImage = heroImages[currentSlide];
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax effect */}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
          isAnimating ? "opacity-0" : "opacity-100"
        )}
        style={{ 
          backgroundImage: `url(${currentImage.src})`,
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24">
        <div className="max-w-xl animate-fade-up">
          <span className="inline-block py-2 px-4 bg-blue-500 text-white text-xs font-semibold mb-4 rounded-sm">
            NEW COLLECTION
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            {currentImage.title}
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-md">
            {currentImage.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 transition-all"
              asChild
            >
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 transition-all"
              asChild
            >
              <Link to="/categories">
                Explore Categories
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 rounded-full transition-all",
                currentSlide === index ? 
                  "w-10 bg-white" : 
                  "w-3 bg-white/50"
              )}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
