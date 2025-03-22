
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Truck, Clock, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero section */}
        <div className="relative bg-[url('https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center py-20">
          <div className="absolute inset-0 bg-black/50" />
          <Container className="relative text-center text-white">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Story</h1>
            <p className="max-w-2xl mx-auto text-lg text-white/90">
              We're passionate about providing the best footwear for every lifestyle.
            </p>
          </Container>
        </div>
        
        {/* Mission section */}
        <section className="py-16 px-6">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8">
                At SoleSynergy, our mission is to provide exceptional footwear that combines style, comfort, and performance. 
                We believe that the right pair of shoes can transform your experience, whether you're an athlete pushing your limits, 
                a professional navigating your workday, or someone who values both fashion and function in everyday life.
              </p>
              <p className="text-lg text-gray-600">
                We're committed to quality, innovation, and customer satisfaction. Every pair of shoes in our collection 
                is carefully selected to meet our high standards and to help you put your best foot forward.
              </p>
            </div>
          </Container>
        </section>
        
        {/* Values section */}
        <section className="py-16 px-6 bg-gray-50">
          <Container>
            <h2 className="text-3xl font-display font-bold text-center mb-12">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <ShieldCheck className="h-10 w-10" />,
                  title: 'Quality',
                  description: 'We curate only the highest quality footwear from trusted brands around the world.'
                },
                {
                  icon: <Award className="h-10 w-10" />,
                  title: 'Authenticity',
                  description: 'Every product we sell is 100% authentic, guaranteed.'
                },
                {
                  icon: <Truck className="h-10 w-10" />,
                  title: 'Reliability',
                  description: 'Fast shipping and hassle-free returns make shopping with us simple and reliable.'
                },
                {
                  icon: <Clock className="h-10 w-10" />,
                  title: 'Customer Service',
                  description: 'Our dedicated team is available to assist you with any questions or concerns.'
                }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm"
                >
                  <div className="mb-4 text-blue-500">{item.icon}</div>
                  <h3 className="font-display font-semibold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
        
        {/* Story section with image */}
        <section className="py-16 px-6">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6">Our Journey</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2015, SoleSynergy began as a small boutique shop with a big vision: to create a one-stop destination 
                  for footwear enthusiasts. What started as a passion project quickly grew into a thriving business as customers 
                  responded to our commitment to quality and service.
                </p>
                <p className="text-gray-600 mb-4">
                  Over the years, we've expanded our collection to include a wide range of styles for every occasion, from athletic 
                  performance shoes to casual everyday footwear and fashion-forward designs.
                </p>
                <p className="text-gray-600 mb-8">
                  Today, we're proud to serve customers worldwide, bringing the best in footwear to doorsteps across the globe. 
                  Despite our growth, we remain committed to the values that defined us from the beginning: quality, authenticity, 
                  and exceptional customer service.
                </p>
                <Button asChild>
                  <Link to="/products">Shop Our Collection</Link>
                </Button>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80" 
                  alt="Sneakers on display" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Container>
        </section>
        
        {/* CTA section */}
        <section className="py-16 px-6 bg-blue-500 text-white">
          <Container className="text-center">
            <h2 className="text-3xl font-display font-bold mb-4">Join the SoleSynergy Community</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Be the first to know about new releases, exclusive offers, and footwear trends.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/products">
                Shop Now
              </Link>
            </Button>
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
