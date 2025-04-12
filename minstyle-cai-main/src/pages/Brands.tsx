import React, { useState } from 'react';
import { Star, Search, BadgeCheck, Award, Heart, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Brand data
const brands = [
  {
    id: 1,
    name: 'Sustainable Style',
    logo: 'https://images.unsplash.com/photo-1605020420620-20c943cc4669?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
    rating: 4.8,
    reviewCount: 432,
    tier: 'Platinum',
    category: 'Sustainable',
    sustainabilityScore: 95,
    ethicalScore: 92,
    qualityScore: 90,
    priceRange: '₹₹₹',
    website: '#',
    description: 'A pioneer in sustainable fashion using organic materials and ethical manufacturing processes.',
    highlights: ['Carbon-neutral operations', 'Recycled packaging', 'Fair labor practices'],
  },
  {
    id: 2,
    name: 'Eco Threads',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
    rating: 4.6,
    reviewCount: 287,
    tier: 'Gold',
    category: 'Sustainable',
    sustainabilityScore: 88,
    ethicalScore: 90,
    qualityScore: 85,
    priceRange: '₹₹',
    website: '#',
    description: 'Creating timeless designs with eco-friendly materials and transparent supply chains.',
    highlights: ['Plastic-free packaging', 'Organic cotton', 'Water conservation initiatives'],
  },
  {
    id: 3,
    name: 'Urban Indie',
    logo: 'https://images.unsplash.com/photo-1556948634-4ed22a2a5dae?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
    rating: 4.3,
    reviewCount: 156,
    tier: 'Silver',
    category: 'Indie',
    sustainabilityScore: 75,
    ethicalScore: 82,
    qualityScore: 88,
    priceRange: '₹₹',
    website: '#',
    description: 'Independent fashion brand focusing on unique designs and small-batch production.',
    highlights: ['Handcrafted items', 'Local manufacturing', 'Recycled materials where possible'],
  },
  {
    id: 4,
    name: 'Mindful Clothing Co.',
    logo: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
    rating: 4.9,
    reviewCount: 512,
    tier: 'Platinum',
    category: 'Sustainable',
    sustainabilityScore: 98,
    ethicalScore: 96,
    qualityScore: 94,
    priceRange: '₹₹₹₹',
    website: '#',
    description: 'Premium sustainable fashion with a focus on longevity, ethical production, and timeless design.',
    highlights: ['Zero waste policy', 'Circular fashion model', 'Living wage certification'],
  },
  {
    id: 5,
    name: 'Traditional Textiles',
    logo: 'https://images.unsplash.com/photo-1530856021941-02c71be5926f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
    rating: 4.5,
    reviewCount: 208,
    tier: 'Gold',
    category: 'Indie',
    sustainabilityScore: 85,
    ethicalScore: 95,
    qualityScore: 92,
    priceRange: '₹₹₹',
    website: '#',
    description: 'Supporting local craftsmen and traditional textile techniques while embracing modern designs.',
    highlights: ['Preserving heritage craft', 'Artisan partnerships', 'Natural dyes'],
  },
  {
    id: 6,
    name: 'Green Wardrobe',
    logo: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
    rating: 4.2,
    reviewCount: 175,
    tier: 'Silver',
    category: 'Sustainable',
    sustainabilityScore: 78,
    ethicalScore: 80,
    qualityScore: 75,
    priceRange: '₹₹',
    website: '#',
    description: 'Affordable sustainable fashion making eco-friendly choices accessible to everyone.',
    highlights: ['Plant-based materials', 'Biodegradable packaging', 'Energy-efficient production'],
  },
  {
    id: 7,
    name: 'Artisan Collective',
    logo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
    rating: 4.7,
    reviewCount: 320,
    tier: 'Gold',
    category: 'Indie',
    sustainabilityScore: 86,
    ethicalScore: 94,
    qualityScore: 89,
    priceRange: '₹₹₹',
    website: '#',
    description: 'A collective of independent designers focused on handcrafted, small-batch fashion items.',
    highlights: ['Supporting women artisans', 'Traditional techniques', 'Fair trade certified'],
  },
  {
    id: 8,
    name: 'Future Fashion',
    logo: 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
    rating: 4.4,
    reviewCount: 267,
    tier: 'Silver',
    category: 'Innovative',
    sustainabilityScore: 82,
    ethicalScore: 85,
    qualityScore: 88,
    priceRange: '₹₹₹',
    website: '#',
    description: 'Pushing the boundaries of sustainable fashion with innovative materials and technology.',
    highlights: ['Lab-grown materials', 'Digital fashion elements', 'Cradle-to-cradle design'],
  },
  {
    id: 9,
    name: 'Ethical Elegance',
    logo: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
    rating: 4.8,
    reviewCount: 398,
    tier: 'Platinum',
    category: 'Sustainable',
    sustainabilityScore: 94,
    ethicalScore: 97,
    qualityScore: 96,
    priceRange: '₹₹₹₹',
    website: '#',
    description: 'Luxury sustainable fashion that never compromises on ethics or quality.',
    highlights: ['Traceable supply chain', 'Regenerative agriculture', 'Biodegradable materials'],
  },
];

// Filter categories
const categories = ['All', 'Sustainable', 'Indie', 'Innovative'];
const tiers = ['All', 'Platinum', 'Gold', 'Silver'];
const priceRanges = ['All', '₹', '₹₹', '₹₹₹', '₹₹₹₹'];

const Brands = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  
  // Filter brands based on selections
  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || brand.category === selectedCategory;
    const matchesTier = selectedTier === 'All' || brand.tier === selectedTier;
    const matchesPrice = selectedPrice === 'All' || brand.priceRange === selectedPrice;
    
    return matchesSearch && matchesCategory && matchesTier && matchesPrice;
  });

  // Get badge color based on tier
  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Platinum': return 'bg-purple-500 hover:bg-purple-600';
      case 'Gold': return 'bg-amber-500 hover:bg-amber-600';
      case 'Silver': return 'bg-gray-400 hover:bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-minBlack text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-28 pb-12 bg-gradient-to-b from-minBlue/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <Award className="text-amber-500" size={28} />
            <h1 className="text-4xl font-bold">Brand Rankings</h1>
          </div>
          <p className="text-gray-300 max-w-2xl">
            Discover and support brands that align with your values. Our ranking system evaluates brands based on sustainability, ethical practices, and quality.
          </p>
        </div>
      </div>
      
      {/* Filters & Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <Input 
              type="text" 
              placeholder="Search brands..." 
              className="pl-10 bg-gray-800 border-gray-700 focus-visible:ring-minOrange"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {/* Category filters */}
            {categories.map(category => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"} 
                className={`cursor-pointer ${selectedCategory === category ? "bg-minOrange hover:bg-minOrange/90" : "border-gray-700 hover:border-gray-600"}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Additional filters */}
        <div className="flex flex-wrap gap-8 mb-8">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Tier</p>
            <div className="flex flex-wrap gap-2">
              {tiers.map(tier => (
                <Badge 
                  key={tier}
                  variant={selectedTier === tier ? "default" : "outline"} 
                  className={`cursor-pointer ${
                    selectedTier === tier 
                      ? (tier === 'Platinum' ? 'bg-purple-500 hover:bg-purple-600' : 
                         tier === 'Gold' ? 'bg-amber-500 hover:bg-amber-600' : 
                         tier === 'Silver' ? 'bg-gray-400 hover:bg-gray-500' : 'bg-minOrange hover:bg-minOrange/90')
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                  onClick={() => setSelectedTier(tier)}
                >
                  {tier}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Price Range</p>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map(price => (
                <Badge 
                  key={price}
                  variant={selectedPrice === price ? "default" : "outline"} 
                  className={`cursor-pointer ${selectedPrice === price ? "bg-minOrange hover:bg-minOrange/90" : "border-gray-700 hover:border-gray-600"}`}
                  onClick={() => setSelectedPrice(price)}
                >
                  {price}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Brands Grid */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBrands.map((brand) => (
              <div 
                key={brand.id} 
                className="bg-black border border-gray-800 rounded-lg overflow-hidden card-hover"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={brand.logo} 
                        alt={brand.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold flex items-center gap-1">
                          {brand.name}
                          {brand.tier === 'Platinum' && <BadgeCheck className="text-purple-500" size={16} />}
                        </h3>
                        <div className="flex items-center text-sm text-gray-400">
                          <Star className="text-yellow-500 w-4 h-4 mr-1" />
                          <span>{brand.rating}</span>
                          <span className="mx-1">•</span>
                          <span>{brand.reviewCount} reviews</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getTierColor(brand.tier)}`}>
                      {brand.tier}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                    {brand.description}
                  </p>
                  
                  {/* Rating Bars */}
                  <div className="space-y-2 mb-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Sustainability</span>
                        <span>{brand.sustainabilityScore}%</span>
                      </div>
                      <Progress value={brand.sustainabilityScore} className="h-1 bg-gray-700" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Ethical Practices</span>
                        <span>{brand.ethicalScore}%</span>
                      </div>
                      <Progress value={brand.ethicalScore} className="h-1 bg-gray-700" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Quality</span>
                        <span>{brand.qualityScore}%</span>
                      </div>
                      <Progress value={brand.qualityScore} className="h-1 bg-gray-700" />
                    </div>
                  </div>
                  
                  {/* Highlights */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {brand.highlights.map((highlight, index) => (
                        <Badge key={index} variant="outline" className="border-gray-700 text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="flex justify-between items-center mt-4 border-t border-gray-800 pt-4">
                    <span className="text-sm text-gray-400">{brand.priceRange} • {brand.category}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Heart size={16} />
                      </Button>
                      <Button size="sm" className="bg-minOrange hover:bg-minOrange/90 flex items-center">
                        Visit <ArrowUpRight size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No brands found matching your criteria.</p>
            <Button variant="outline" className="mt-4 border-minOrange text-minOrange" onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedTier('All');
              setSelectedPrice('All');
            }}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Brands;
