
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    console.log('Signup attempt with:', { name, email, password });
    // In a real app, this would call an authentication API
    
    // Mock successful signup
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-minBlack text-white">
      <Navbar />
      
      <div className="pt-28 pb-16 flex justify-center items-center">
        <div className="w-full max-w-md p-8 bg-black border border-gray-800 rounded-lg">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img src="/lovable-uploads/909e5fc5-4d64-44a8-9830-5a010adfd5b3.png" alt="minStyle" className="h-12 mx-auto" />
            </Link>
            <h1 className="text-2xl font-bold">Join minStyle</h1>
            <p className="text-gray-400 mt-1">Create your account to get started</p>
          </div>
          
          {/* Social signup buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
            </Button>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                />
              </svg>
            </Button>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.2 14.1c-.3.7-1 1.1-1.8 1-3.1-.3-6.1-.3-9.2 0-.8.1-1.5-.3-1.8-1-.5-1.2-.5-5.8 0-7 .3-.7 1-1.1 1.8-1 3.1.3 6.1.3 9.2 0 .8-.1 1.5.3 1.8 1 .5 1.2.5 5.8 0 7z"
                />
                <path
                  fill="currentColor"
                  d="M9.8 11.9l5.5-3.2c.1-.1.3.1.2.2l-5.5 3.2c-.2.1-.3-.1-.2-.2z"
                />
              </svg>
            </Button>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-black px-2 text-gray-400">OR CONTINUE WITH</span>
            </div>
          </div>
          
          {/* Signup form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="text"
                placeholder="Full Name"
                className="pl-10 bg-gray-800 border-gray-700 focus-visible:ring-minOrange"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="email"
                placeholder="Email"
                className="pl-10 bg-gray-800 border-gray-700 focus-visible:ring-minOrange"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10 bg-gray-800 border-gray-700 focus-visible:ring-minOrange"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-start">
              <Checkbox 
                id="terms" 
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="mt-1 data-[state=checked]:bg-minOrange data-[state=checked]:border-minOrange"
              />
              <label htmlFor="terms" className="text-sm text-gray-300 ml-2 cursor-pointer">
                I agree to minStyle's <a href="#" className="text-minOrange hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-minOrange hover:underline">Privacy Policy</a>
              </label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-minOrange hover:bg-minOrange/90 flex items-center justify-center"
              disabled={!agreeTerms}
            >
              Create Account
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 text-minOrange hover:text-minOrange/90 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;
