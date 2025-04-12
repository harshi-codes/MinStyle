import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-minBlack/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/minstyle.jpg" alt="minStyle" className="h-24 w-24 rounded-full object-cover" />
            <span className="text-2xl font-bold text-white"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white flex items-center space-x-1">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/products" className="text-gray-300 hover:text-white">
              Products
            </Link>
            <Link to="/thrift" className="text-gray-300 hover:text-white">
              Thrift
            </Link>
            <Link to="/brands" className="text-gray-300 hover:text-white">
              Brands
            </Link>
            <Link to="/blog" className="text-gray-300 hover:text-white">
              Blog
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white">
              About
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
              <ShoppingBag size={20} />
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <User size={20} />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-minBlack border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-300 hover:text-white flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/products"
              className="block text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/thrift"
              className="block text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Thrift
            </Link>
            <Link
              to="/brands"
              className="block text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Brands
            </Link>
            <Link
              to="/blog"
              className="block text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="block text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <ShoppingBag size={20} />
              </Button>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <User size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
