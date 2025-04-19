// src/pages/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signIn } from "@/services/auth";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { user, error } = await signIn(email, password);

      if (error) {
        let errorMessage = "Login failed. Please try again.";
        if (error.message.includes("auth/invalid-credential")) {
          errorMessage = "Invalid email or password";
        } else if (error.message.includes("auth/too-many-requests")) {
          errorMessage =
            "Account temporarily disabled due to many failed login attempts";
        }

        toast({
          variant: "destructive",
          title: "Login Error",
          description: errorMessage,
        });
        return;
      }

      if (user) {
        toast({
          title: "Login Successful",
          description: "You have been logged in successfully.",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred during login.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-minBlack text-white">
      <Navbar />

      <div className="pt-28 pb-16 flex justify-center items-center">
        <div className="w-full max-w-md p-8 bg-black border border-gray-800 rounded-lg">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/lovable-uploads/909e5fc5-4d64-44a8-9830-5a010adfd5b3.png"
                alt="minStyle"
                className="h-12 mx-auto"
              />
            </Link>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-gray-400 mt-1">
              Sign in to your minStyle account
            </p>
          </div>

          {/* Social login buttons - optional for later implementation */}
          {/* ... keep your existing social login buttons ... */}

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-black px-2 text-gray-400">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
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
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10 bg-gray-800 border-gray-700 focus-visible:ring-minOrange"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-xs text-minOrange hover:text-minOrange/90"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-minOrange hover:bg-minOrange/90 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
              {!isLoading && <ArrowRight size={16} className="ml-2" />}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Don't have an account?
              <Link
                to="/signup"
                className="ml-1 text-minOrange hover:text-minOrange/90 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
