import React, { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider"; // Make sure this import path is correct
import { auth } from "@/services/auth"; // Import your Firebase auth instanceimport {
import {
Filter,
  ShoppingBag,
  Heart,
  Search,
  SlidersHorizontal,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { API_URL } from "@/config/api";

// Define product type
interface Product {
  name: string;
  price: string;
  link: string;
  image: string;
  brand: string;
  website: string;
}

const Products = () => {
  const { user } = useAuth();
  // State for products and loading state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(true); // New state for scraping status
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedWebsite, setSelectedWebsite] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  // Derived state for unique values from data
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [brands, setBrands] = useState<string[]>(["All"]);
  const [websites, setWebsites] = useState<string[]>(["All"]);
  const tags = [
    "All",
    "basic",
    "trending",
    "winter",
    "sustainable",
    "y2k",
    "summer",
    "formal",
  ];

  // Fetch products from API with polling
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setScraping(true);

        // Check if user is authenticated
        if (!user) {
          setError("Authentication required");
          setLoading(false);
          setScraping(false);
          return;
        }

        // Get the user's ID token
        const token = await user.getIdToken();

        const pollInterval = setInterval(async () => {
          try {
            const response = await fetch(`${API_URL}/products`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status === "success") {
              // Products are ready
              clearInterval(pollInterval);
              setProducts(data.products);
              setLoading(false);
              setScraping(false);

              // Extract unique brands and websites
              const uniqueBrands = [
                "All",
                ...new Set(data.products.map((p: Product) => p.brand)),
              ];
              const uniqueWebsites = [
                "All",
                ...new Set(data.products.map((p: Product) => p.website)),
              ];

              setBrands(uniqueBrands);
              setWebsites(uniqueWebsites);
            } else if (data.status === "pending") {
              // Still scraping, continue polling
              console.log("Scraping in progress...");
            } else {
              // Error case
              clearInterval(pollInterval);
              setError(data.error || "Unknown error occurred");
              setLoading(false);
              setScraping(false);
            }
          } catch (err) {
            clearInterval(pollInterval);
            setError(
              err instanceof Error ? err.message : "An unknown error occurred",
            );
            setLoading(false);
            setScraping(false);
            console.error("Error fetching products:", err);
          }
        }, 2000); // Poll every 2 seconds

        // Cleanup interval on unmount
        return () => clearInterval(pollInterval);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        setLoading(false);
        setScraping(false);
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to convert price string to number
  const getPriceNumber = (priceStr: string): number => {
    return parseFloat(priceStr.replace("₹", "").replace(",", "").trim());
  };

  // Filter products based on all criteria
  const filteredProducts = products.filter((product) => {
    // Filter by search query
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by brand
    const matchesBrand =
      selectedBrand === "All" || product.brand === selectedBrand;

    // Filter by website
    const matchesWebsite =
      selectedWebsite === "All" || product.website === selectedWebsite;

    // Filter by price range
    const productPrice = getPriceNumber(product.price);
    const matchesPrice =
      productPrice >= priceRange[0] && productPrice <= priceRange[1];

    return matchesSearch && matchesBrand && matchesWebsite && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-minBlack text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-28 pb-12 bg-gradient-to-b from-minOrange/10 to-transparent">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Discover Our Collection</h1>
          <p className="text-gray-300">
            Sustainable fashion for the modern generation
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
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
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          <div className="hidden md:flex flex-wrap gap-2">
            <Button
              variant={selectedWebsite === "All" ? "default" : "outline"}
              size="sm"
              className={
                selectedWebsite === "All"
                  ? "bg-minOrange hover:bg-minOrange/90"
                  : "border-gray-700 hover:border-gray-600"
              }
              onClick={() => setSelectedWebsite("All")}
            >
              All Websites
            </Button>
            {websites.slice(1, 7).map((website) => (
              <Button
                key={website}
                variant={selectedWebsite === website ? "default" : "outline"}
                size="sm"
                className={
                  selectedWebsite === website
                    ? "bg-minOrange hover:bg-minOrange/90"
                    : "border-gray-700 hover:border-gray-600"
                }
                onClick={() => setSelectedWebsite(website)}
              >
                {website}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="md:hidden mt-4 p-4 bg-gray-800/50 rounded-lg space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Websites</h3>
              <div className="flex flex-wrap gap-2">
                {websites.slice(0, 8).map((website) => (
                  <Badge
                    key={website}
                    variant={
                      selectedWebsite === website ? "default" : "outline"
                    }
                    className={`cursor-pointer ${selectedWebsite === website ? "bg-minOrange" : "border-gray-600"}`}
                    onClick={() => setSelectedWebsite(website)}
                  >
                    {website}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Brands</h3>
              <div className="flex flex-wrap gap-2">
                {brands.slice(0, 6).map((brand) => (
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
              <h3 className="text-lg font-medium mb-3">Websites</h3>
              <div className="space-y-2">
                {websites.map((website) => (
                  <div key={website} className="flex items-center">
                    <Checkbox
                      id={`website-${website}`}
                      checked={selectedWebsite === website}
                      onCheckedChange={() => setSelectedWebsite(website)}
                      className="mr-2 data-[state=checked]:bg-minOrange data-[state=checked]:border-minOrange"
                    />
                    <label
                      htmlFor={`website-${website}`}
                      className="text-sm text-gray-300 cursor-pointer"
                    >
                      {website}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Brands</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {brands.slice(0, 20).map((brand) => (
                  <div key={brand} className="flex items-center">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrand === brand}
                      onCheckedChange={() => setSelectedBrand(brand)}
                      className="mr-2 data-[state=checked]:bg-minOrange data-[state=checked]:border-minOrange"
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="text-sm text-gray-300 cursor-pointer"
                    >
                      {brand}
                    </label>
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
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-400">
                {scraping
                  ? "Fetching products..."
                  : `${filteredProducts.length} products`}
              </p>
              {!scraping && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Sort by:</span>
                  <select className="bg-gray-800 border border-gray-700 rounded text-sm py-1 px-2 focus:outline-none focus:ring-1 focus:ring-minOrange">
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Popular</option>
                  </select>
                </div>
              )}
            </div>

            {scraping && (
              <div className="text-center py-20">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="h-12 w-12 text-minOrange animate-spin" />
                  <h3 className="text-xl font-medium">
                    Gathering Fashion Items
                  </h3>
                  <p className="text-gray-400 max-w-md">
                    We're searching across multiple stores to find the perfect
                    items for you. This may take a minute...
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-400">{error}</p>
                <Button
                  variant="outline"
                  className="mt-4 border-minOrange text-minOrange"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            )}

            {!scraping && !error && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={index}
                    className="bg-black border border-gray-800 rounded-lg overflow-hidden card-hover group"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={product.image}
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
                          <a
                            href={product.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              className="bg-minOrange hover:bg-minOrange/90"
                            >
                              <ShoppingBag size={16} className="mr-1" /> View
                              Product
                            </Button>
                          </a>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-white hover:text-minOrange"
                          >
                            <Heart size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="font-medium line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-minOrange font-bold">
                          {product.price}
                        </span>
                        <span className="text-xs text-gray-400">
                          From: {product.website}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !scraping && !error ? (
              <div className="text-center py-12">
                <p className="text-gray-400">
                  No products found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-minOrange text-minOrange"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedWebsite("All");
                    setSelectedBrand("All");
                    setPriceRange([0, 10000]);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
