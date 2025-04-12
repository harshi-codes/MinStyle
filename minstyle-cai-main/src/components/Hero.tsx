
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center relative overflow-hidden bg-minBlack">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-minOrange/10 to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-minBlue/10 to-transparent opacity-40"></div>
      
      {/* Animated Circles */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-minOrange/5 animate-spin-slow opacity-30"></div>
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-minBlue/5 animate-spin-slow opacity-20"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 space-y-6 animate-slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">Fashion</span> in a Flash
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-lg">
              Sustainable, mindful, and convenient shopping for the modern generation.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="bg-minOrange hover:bg-minOrange/90 text-white px-6 py-6">
                Shop Now <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button variant="outline" className="border-minBlue text-minBlue hover:bg-minBlue/10 px-6 py-6">
                Try minGenie
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative animate-float">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Fashion image */}
              <div className="absolute inset-0 bg-gradient-to-br from-minOrange/20 to-minBlue/20 rounded-2xl"></div>
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                  alt="Fashion Model" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating product tags */}
              <div className="absolute -top-4 -right-4 bg-minOrange text-white px-3 py-1 rounded-md shadow-lg animate-pulse-soft">
                Sustainable
              </div>
              <div className="absolute -bottom-4 left-10 bg-minBlue text-black px-3 py-1 rounded-md shadow-lg animate-pulse-soft">
                Trending
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
