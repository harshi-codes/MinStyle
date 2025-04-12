
import React, { useState } from 'react';
import { Filter, ShoppingBag, Heart, Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

// Product data
const products = [
  {
    id: 1,
    name: 'Minimalist Tee',
    price: '₹1,999',
    brand: 'Zara',
    category: 'T-shirts',
    tags: ['basic', 'trending'],
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    name: 'Crop Hoodie',
    price: '₹2,499',
    brand: 'H&M',
    category: 'Hoodies',
    tags: ['winter', 'trending'],
    imageUrl: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    name: 'Sustainable Denim',
    price: '₹3,999',
    brand: 'Levi\'s',
    category: 'Jeans',
    tags: ['sustainable', 'basic'],
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 4,
    name: 'Graphic Tee',
    price: '₹1,499',
    brand: 'Uniqlo',
    category: 'T-shirts',
    tags: ['y2k', 'trending'],
    imageUrl: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 5,
    name: 'Platform Boots',
    price: '₹5,999',
    brand: 'Dr. Martens',
    category: 'Footwear',
    tags: ['y2k', 'winter'],
    imageUrl: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 6,
    name: 'Eco Puffer',
    price: '₹7,499',
    brand: 'Patagonia',
    category: 'Jackets',
    tags: ['sustainable', 'winter'],
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 7,
    name: 'Floral Dress',
    price: '₹4,299',
    brand: 'Mango',
    category: 'Dresses',
    tags: ['summer', 'trending'],
    imageUrl: 'https://images.unsplash.com/photo-1612722432474-b971cdcea546?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 8,
    name: 'Oversized Blazer',
    price: '₹6,599',
    brand: 'COS',
    category: 'Outerwear',
    tags: ['formal', 'trending'],
    imageUrl: 'https://images.unsplash.com/photo-1608234807905-4466023792f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 9,
    name: 'Linen Shirt',
    price: '₹2,799',
    brand: 'Muji',
    category: 'Shirts',
    tags: ['summer', 'sustainable'],
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 10,
    name: 'Cargo Pants',
    price: '₹3,499',
    brand: 'Urban Outfitters',
    category: 'Pants',
    tags: ['y2k', 'trending'],
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 11,
    name: 'Mini Skirt',
    price: '₹1,999',
    brand: 'Forever 21',
    category: 'Skirts',
    tags: ['y2k', 'summer'],
    imageUrl: 'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 12,
    name: 'Knit Sweater',
    price: '₹3,299',
    brand: 'GAP',
    category: 'Sweaters',
    tags: ['winter', 'basic'],
    imageUrl: 'https://images.unsplash.com/photo-1599413688595-e211e74286d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
];

// Filter categories
const categories = ['All', 'T-shirts', 'Hoodies', 'Jeans', 'Footwear', 'Jackets', 'Dresses', 'Outerwear', 'Shirts', 'Pants', 'Skirts', 'Sweaters'];
const brands = ['All', 'Zara', 'H&M', 'Levi\'s', 'Uniqlo', 'Dr. Martens', 'Patagonia', 'Mango', 'COS', 'Muji', 'Urban Outfitters', 'Forever 21', 'GAP'];
const tags = ['All', 'basic', 'trending', 'winter', 'sustainable', 'y2k', 'summer', 'formal'];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter products based on all criteria
  const filteredProducts = products.filter(product => {
    // Filter by search query
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    // Filter by brand
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
    
    // Filter by tag
    const matchesTag = selectedTag === 'All' || product.tags.includes(selectedTag.toLowerCase());
    
    // Filter by price range
    const productPrice = parseInt(product.price.replace(/[^\d]/g, ''));
    const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesBrand && matchesTag && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-minBlack text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-28 pb-12 bg-gradient-to-b from-minOrange/10 to-transparent">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Discover Our Collection</h1>
          <p className="text-gray-300">Sustainable fashion for the modern generation</p>
        </div>
      </div>
      
      {/* Filter & Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <Input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 bg-gray-800 border-gray-700 focus-visible:ring-minOrange"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button 
            variant="outline" 
            className="md:hidden w-full border-gray-700 flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={16} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          
          <div className="hidden md:flex flex-wrap gap-2">
            <Button 
              variant={selectedCategory === 'All' ? "default" : "outline"}
              size="sm"
              className={selectedCategory === 'All' ? "bg-minOrange hover:bg-minOrange/90" : "border-gray-700 hover:border-gray-600"}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </Button>
            {categories.slice(1, 7).map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={selectedCategory === category ? "bg-minOrange hover:bg-minOrange/90" : "border-gray-700 hover:border-gray-600"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
            {/* More categories dropdown could be added here */}
          </div>
        </div>
        
        {/* Mobile Filters */}
        {showFilters && (
          <div className="md:hidden mt-4 p-4 bg-gray-800/50 rounded-lg space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 8).map(category => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer ${selectedCategory === category ? "bg-minOrange" : "border-gray-600"}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Brands</h3>
              <div className="flex flex-wrap gap-2">
                {brands.slice(0, 6).map(brand => (
                  <Badge
                    key={brand}
                    variant={selectedBrand === brand ? "default" : "outline"}
                    className={`cursor-pointer ${selectedBrand === brand ? "bg-minOrange" : "border-gray-600"}`}
                    onClick={() => setSelectedBrand(brand)}
                  >
                    {brand}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Price Range</h3>
              <div className="px-2">
                <Slider 
                  defaultValue={[0, 10000]} 
                  max={10000} 
                  step={500}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Desktop Sidebar & Products Grid */}
        <div className="mt-8 flex flex-col md:flex-row gap-6">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategory === category}
                      onCheckedChange={() => setSelectedCategory(category)}
                      className="mr-2 data-[state=checked]:bg-minOrange data-[state=checked]:border-minOrange"
                    />
                    <label htmlFor={`category-${category}`} className="text-sm text-gray-300 cursor-pointer">{category}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Brands</h3>
              <div className="space-y-2">
                {brands.slice(0, 10).map(brand => (
                  <div key={brand} className="flex items-center">
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={selectedBrand === brand}
                      onCheckedChange={() => setSelectedBrand(brand)}
                      className="mr-2 data-[state=checked]:bg-minOrange data-[state=checked]:border-minOrange"
                    />
                    <label htmlFor={`brand-${brand}`} className="text-sm text-gray-300 cursor-pointer">{brand}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Price Range</h3>
              <div className="px-2">
                <Slider 
                  defaultValue={[0, 10000]} 
                  max={10000} 
                  step={500}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className={`cursor-pointer ${selectedTag === tag ? "bg-minOrange hover:bg-minOrange/90" : "border-gray-600 hover:border-gray-500"}`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-400">{filteredProducts.length} products</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select className="bg-gray-800 border border-gray-700 rounded text-sm py-1 px-2 focus:outline-none focus:ring-1 focus:ring-minOrange">
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          {product.brand}
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
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No products found matching your criteria.</p>
                <Button variant="outline" className="mt-4 border-minOrange text-minOrange" onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedBrand('All');
                  setSelectedTag('All');
                  setPriceRange([0, 10000]);
                }}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
