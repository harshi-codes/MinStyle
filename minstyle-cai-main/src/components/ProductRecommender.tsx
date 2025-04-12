
import React, { useState } from 'react';
import { Filter, Sparkles, ShoppingBag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Placeholder product data
const products = [
  {
    id: 1,
    name: 'Minimalist Tee',
    price: '₹1,999',
    source: 'Myntra',
    tags: ['y2k', 'basic', 'trending'],
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    name: 'Crop Hoodie',
    price: '₹2,499',
    source: 'Amazon',
    tags: ['winter', 'trending'],
    imageUrl: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    name: 'Sustainable Denim',
    price: '₹3,999',
    source: 'Etsy',
    tags: ['sustainable', 'basic'],
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 4,
    name: 'Graphic Tee',
    price: '₹1,499',
    source: 'Flipkart',
    tags: ['y2k', 'trending'],
    imageUrl: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 5,
    name: 'Platform Boots',
    price: '₹5,999',
    source: 'Ajio',
    tags: ['y2k', 'winter'],
    imageUrl: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 6,
    name: 'Eco Puffer',
    price: '₹7,499',
    source: 'Myntra',
    tags: ['sustainable', 'winter'],
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
];

// Available filter tags
const filterTags = ['all', 'y2k', 'sustainable', 'trending', 'basic', 'winter'];

const ProductRecommender = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.tags.includes(activeFilter));

  return (
    <div className="bg-minBlack py-20">
      <div className="min-container space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
              <Sparkles size={24} className="text-minOrange" />
              Smart Recommender
            </h2>
            <p className="text-gray-400 max-w-lg">
              Personalized picks from top fashion marketplaces, curated just for you.
            </p>
          </div>
          <Button variant="outline" className="border-minOrange text-minOrange hover:bg-minOrange/10">
            View All <Filter size={16} className="ml-2" />
          </Button>
        </div>
        
        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          {filterTags.map(tag => (
            <Badge 
              key={tag}
              variant={activeFilter === tag ? "default" : "outline"} 
              className={`cursor-pointer px-4 py-2 capitalize text-sm ${
                activeFilter === tag 
                  ? 'bg-minOrange hover:bg-minOrange/90' 
                  : 'hover:bg-minOrange/10 border-minOrange/50'
              }`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-black border border-gray-800 rounded-lg overflow-hidden card-hover group"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <span className="inline-block bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                    {product.source}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full flex justify-between items-center">
                    <Button size="sm" className="bg-minOrange hover:bg-minOrange/90">
                      <ShoppingBag size={16} className="mr-1" /> Add to Bag
                    </Button>
                    <Button size="icon" variant="ghost" className="text-white hover:text-minOrange">
                      <Heart size={18} />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-medium">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-minOrange font-bold">{product.price}</span>
                  <div className="flex gap-1">
                    {product.tags.map(tag => (
                      <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRecommender;
