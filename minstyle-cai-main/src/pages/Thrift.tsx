import React, { useState } from 'react';
import { Filter, ShoppingBag, Heart, Search, Leaf, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Thrift store products
const thriftProducts = [
  {
    id: 1,
    name: 'Vintage Denim Jacket',
    price: '₹1,299',
    condition: 'Very Good',
    size: 'M',
    brand: 'Levi\'s',
    era: '90s',
    tags: ['vintage', 'denim', 'jacket'],
    imageUrl: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    name: 'Retro Graphic Tee',
    price: '₹699',
    condition: 'Good',
    size: 'L',
    brand: 'Unknown',
    era: '00s',
    tags: ['retro', 'graphic', 'tee'],
    imageUrl: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    name: 'Y2K Mini Skirt',
    price: '₹899',
    condition: 'Excellent',
    size: 'S',
    brand: 'Guess',
    era: '00s',
    tags: ['y2k', 'mini', 'skirt'],
    imageUrl: 'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 4,
    name: 'Oversized Wool Sweater',
    price: '₹1,199',
    condition: 'Good',
    size: 'XL',
    brand: 'Ralph Lauren',
    era: '80s',
    tags: ['wool', 'vintage', 'sweater'],
    imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 5,
    name: 'Classic Leather Bag',
    price: '₹1,999',
    condition: 'Very Good',
    size: 'One Size',
    brand: 'Coach',
    era: '90s',
    tags: ['leather', 'bag', 'classic'],
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 6,
    name: 'Corduroy Pants',
    price: '₹999',
    condition: 'Excellent',
    size: '32',
    brand: 'Wrangler',
    era: '70s',
    tags: ['corduroy', 'vintage', 'pants'],
    imageUrl: 'https://images.unsplash.com/photo-1624378441864-6eda7eac51cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 7,
    name: 'Silk Blouse',
    price: '₹799',
    condition: 'Good',
    size: 'M',
    brand: 'Vintage',
    era: '80s',
    tags: ['silk', 'vintage', 'blouse'],
    imageUrl: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 8,
    name: 'Patterned Cardigan',
    price: '₹1,099',
    condition: 'Very Good',
    size: 'S',
    brand: 'Urban Outfitters',
    era: '90s',
    tags: ['cardigan', 'patterned', 'vintage'],
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
];

// Filter options
const eras = ['All', '70s', '80s', '90s', '00s'];
const conditions = ['All', 'Excellent', 'Very Good', 'Good'];
const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'One Size'];
const tags = ['All', 'vintage', 'y2k', 'retro', 'denim', 'leather'];

const Thrift = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  
  // Filter products based on selections
  const filteredProducts = thriftProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesEra = selectedEra === 'All' || product.era === selectedEra;
    const matchesCondition = selectedCondition === 'All' || product.condition === selectedCondition;
    const matchesSize = selectedSize === 'All' || product.size === selectedSize;
    const matchesTag = selectedTag === 'All' || product.tags.includes(selectedTag.toLowerCase());
    
    return matchesSearch && matchesEra && matchesCondition && matchesSize && matchesTag;
  });

  return (
    <div className="min-h-screen bg-minBlack text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-28 pb-12 bg-gradient-to-b from-minOrange/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <Leaf className="text-green-500" size={24} />
            <h1 className="text-4xl font-bold">Thrift Store</h1>
          </div>
          <p className="text-gray-300 max-w-2xl">
            Give pre-loved fashion a second life. Our thrift collection features unique, curated pieces that are both sustainable and stylish.
          </p>
          
          <div className="mt-6 bg-black/50 backdrop-blur-sm p-4 rounded-lg max-w-3xl">
            <div className="flex items-center gap-2 text-green-500 mb-2">
              <Sparkles size={16} />
              <span className="font-semibold">Why Thrift with us?</span>
            </div>
            <ul className="text-sm text-gray-400 space-y-1 pl-6 list-disc">
              <li>Each thrift purchase saves approximately 2,700 liters of water</li>
              <li>Reduces textile waste by extending clothing lifecycle</li>
              <li>Professionally cleaned and quality-checked items</li>
              <li>10% of thrift sales support local recycling initiatives</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Filters & Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <Input 
              type="text" 
              placeholder="Search thrift items..." 
              className="pl-10 bg-gray-800 border-gray-700 focus-visible:ring-minOrange"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {/* Era filters */}
            {eras.map(era => (
              <Badge 
                key={era}
                variant={selectedEra === era ? "default" : "outline"} 
                className={`cursor-pointer ${selectedEra === era ? "bg-minOrange hover:bg-minOrange/90" : "border-gray-700 hover:border-gray-600"}`}
                onClick={() => setSelectedEra(era)}
              >
                {era}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Additional filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Condition</p>
            <div className="flex flex-wrap gap-2">
              {conditions.map(condition => (
                <Badge 
                  key={condition}
                  variant={selectedCondition === condition ? "default" : "outline"} 
                  className={`cursor-pointer ${selectedCondition === condition ? "bg-minOrange hover:bg-minOrange/90" : "border-gray-700 hover:border-gray-600"}`}
                  onClick={() => setSelectedCondition(condition)}
                >
                  {condition}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <Badge 
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"} 
                  className={`cursor-pointer ${selectedSize === size ? "bg-minOrange hover:bg-minOrange/90" : "border-gray-700 hover:border-gray-600"}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Style Tags</p>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"} 
                  className={`cursor-pointer ${selectedTag === tag ? "bg-minOrange hover:bg-minOrange/90" : "border-gray-700 hover:border-gray-600"}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="absolute top-2 right-2 flex gap-1">
                    <span className="inline-block bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                      {product.era}
                    </span>
                    <span className="inline-block bg-green-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                      Thrift
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
                <div className="p-4 space-y-2">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-minOrange font-bold">{product.price}</span>
                    <span className="text-xs text-gray-400">{product.condition}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{product.brand}</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-800 rounded">{product.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No thrift items found matching your criteria.</p>
            <Button variant="outline" className="mt-4 border-minOrange text-minOrange" onClick={() => {
              setSearchQuery('');
              setSelectedEra('All');
              setSelectedCondition('All');
              setSelectedSize('All');
              setSelectedTag('All');
            }}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Sustainability Impact */}
      <div className="bg-black py-12 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Thrift Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">7,432</div>
              <p className="text-gray-300">Thrift items sold</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">20M+</div>
              <p className="text-gray-300">Liters of water saved</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">₹1.2L</div>
              <p className="text-gray-300">Donated to recycling initiatives</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Thrift;
