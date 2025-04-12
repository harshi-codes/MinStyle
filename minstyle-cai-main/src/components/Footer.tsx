import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-black text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">minStyle</h3>
              <p className="text-gray-400 text-sm">
                Sustainable fashion for a better tomorrow. Join us in making fashion more environmentally conscious.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Facebook size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Twitter size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Instagram size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Youtube size={20} />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="text-gray-400 hover:text-white text-sm">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/thrift" className="text-gray-400 hover:text-white text-sm">
                    Thrift Store
                  </Link>
                </li>
                <li>
                  <Link to="/brands" className="text-gray-400 hover:text-white text-sm">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white text-sm">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-white text-sm">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-gray-400 hover:text-white text-sm">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="text-gray-400 hover:text-white text-sm">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white text-sm">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to our newsletter for updates on sustainable fashion.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm focus:outline-none focus:border-minOrange"
                />
                <Button className="w-full bg-minOrange hover:bg-minOrange/90">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} minStyle. All rights reserved.</p>
            <p className="mt-2 text-minOrange">
              Made with{' '}
              <span 
                className="cursor-pointer hover:scale-125 inline-block transition-transform"
                onClick={() => setIsModalOpen(true)}
              >
                🤍
              </span>
              {' '}by 🥟 :)
            </p>
          </div>
        </div>
      </footer>

      {/* Team Photo Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <img 
            src="/team-photo.jpg" 
            alt="Team Photo" 
            className="rounded-lg w-full h-auto"
          />
          <p className="text-center text-white mt-4 text-lg">hehehehe🥟</p>
        </div>
      </Modal>
    </>
  );
};

export default Footer;
