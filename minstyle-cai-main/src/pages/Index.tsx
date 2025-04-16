import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductRecommender from "@/components/ProductRecommender";
import Footer from "@/components/Footer";
import { Sparkles, AlertCircle, BadgeCheck, Leaf, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [searchParams, setSearchParams] = useState({
    style: "",
    color: "",
    vibe: "",
    gender: "",
    event: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShopNow = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Validate all fields are filled
    if (
      !searchParams.style ||
      !searchParams.color ||
      !searchParams.vibe ||
      !searchParams.gender ||
      !searchParams.event
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill all the fields to continue",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5002/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchParams),
      });

      if (!response.ok) {
        throw new Error("Failed to start search");
      }

      toast({
        title: "Search Started",
        description: "We're finding the perfect fashion items for you!",
      });

      // Redirect to products page after a short delay
      setTimeout(() => {
        window.location.href = "/products";
      }, 1500);
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Failed",
        description: "Couldn't start the search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                Sustainable, mindful, and convenient shopping for the modern
                generation.
              </p>

              {/* Search Parameters Form */}
              <div className="space-y-4 bg-black/50 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold">
                  Find Your Perfect Style
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Style
                    </label>
                    <Input
                      type="text"
                      name="style"
                      placeholder="e.g., casual, formal, vintage"
                      value={searchParams.style}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Color
                    </label>
                    <Input
                      type="text"
                      name="color"
                      placeholder="e.g., blue, red, black"
                      value={searchParams.color}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Vibe
                    </label>
                    <Input
                      type="text"
                      name="vibe"
                      placeholder="e.g., elegant, sporty, bohemian"
                      value={searchParams.vibe}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Gender
                    </label>
                    <Select
                      value={searchParams.gender}
                      onValueChange={(value) =>
                        handleSelectChange("gender", value)
                      }
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="men">Men</SelectItem>
                        <SelectItem value="women">Women</SelectItem>
                        <SelectItem value="unisex">Unisex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Event
                    </label>
                    <Input
                      type="text"
                      name="event"
                      placeholder="e.g., wedding, beach party, work"
                      value={searchParams.event}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  className="bg-minOrange hover:bg-minOrange/90 text-white px-6 py-6"
                  onClick={handleShopNow}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Searching...
                    </>
                  ) : (
                    "Shop Now"
                  )}
                </Button>
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
                <div className="absolute inset-0 bg-gradient-to-br from-minOrange/20 to-minBlue/20 rounded-2xl"></div>
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                    alt="Fashion Model"
                    className="w-full h-full object-cover"
                  />
                </div>

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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fashion Reimagined
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover a new way of shopping that's mindful, sustainable, and
              convenient
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
                Get personalized outfit recommendations from our minGenie AI
                assistant.
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
                Discover and support ethical brands with our community-driven
                ratings.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Sustainability Pledge
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            For every purchase, we donate one clothing item to those in need.
            Join us in making fashion both stylish and responsible.
          </p>

          <div className="relative h-8 bg-gray-800 rounded-full max-w-md mx-auto overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-minOrange to-minOrange-light"
              style={{ width: "35%" }}
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
