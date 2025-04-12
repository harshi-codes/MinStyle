
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductRecommender from '@/components/ProductRecommender';
import Footer from '@/components/Footer';
import { Sparkles, AlertCircle, BadgeCheck, Leaf, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="min-h-screen bg-minBlack text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
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
                <Link to="/products">
                  <Button className="bg-minOrange hover:bg-minOrange/90 text-white px-6 py-6">
                    Shop Now
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-minBlue text-minBlue hover:bg-minBlue/10 px-6 py-6"
                  onClick={() => setShowChatbot(true)}
                >
                  minStylist
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
      
      {/* Features Section */}
      <div className="py-16 bg-gradient-to-b from-black to-minBlack">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fashion Reimagined</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover a new way of shopping that's mindful, sustainable, and convenient
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-black p-6 border border-gray-800 rounded-lg hover:border-minOrange/50 transition-colors">
              <div className="bg-minOrange/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="text-minOrange" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Stylist</h3>
              <p className="text-gray-400">
                Get personalized outfit recommendations from our minGenie AI assistant.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-black p-6 border border-gray-800 rounded-lg hover:border-minOrange/50 transition-colors">
              <div className="bg-minOrange/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="text-minOrange" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trend Alerts</h3>
              <p className="text-gray-400">
                Stay updated with the latest fashion trends and styling tips.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-black p-6 border border-gray-800 rounded-lg hover:border-minOrange/50 transition-colors">
              <div className="bg-minOrange/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BadgeCheck className="text-minOrange" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Brand Ratings</h3>
              <p className="text-gray-400">
                Discover and support ethical brands with our community-driven ratings.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-black p-6 border border-gray-800 rounded-lg hover:border-minOrange/50 transition-colors">
              <div className="bg-minOrange/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Leaf className="text-minOrange" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Choice</h3>
              <p className="text-gray-400">
                Each purchase contributes to our 1-Cloth Donation program.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Recommender Section */}
      <ProductRecommender />
      
      {/* Sustainability Pledge */}
      <div className="py-20 bg-gradient-to-r from-minBlack to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Sustainability Pledge</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            For every purchase, we donate one clothing item to those in need. 
            Join us in making fashion both stylish and responsible.
          </p>
          
          <div className="relative h-8 bg-gray-800 rounded-full max-w-md mx-auto overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-minOrange to-minOrange-light"
              style={{ width: '35%' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
              14,320 items donated so far
            </div>
          </div>
        </div>
      </div>
      
      {/* Chatbot Modal */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md h-[60vh] relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-gray-700 z-10"
              onClick={() => setShowChatbot(false)}
            >
              <X size={24} />
            </Button>
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/c-xEO0hGfHrTXcZf_3EfC"
              width="100%"
              style={{ height: "100%", minHeight: "400px" }}
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
