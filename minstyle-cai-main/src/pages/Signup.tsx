// src/pages/SignUp.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signUp } from "@/services/auth";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { user, error } = await signUp(email, password);

      if (error) {
        let errorMessage = "Sign up failed. Please try again.";
        if (error.message.includes("auth/email-already-in-use")) {
          errorMessage = "Email already in use";
        } else if (error.message.includes("auth/weak-password")) {
          errorMessage = "Password should be at least 6 characters";
        } else if (error.message.includes("auth/invalid-email")) {
          errorMessage = "Invalid email address";
        }

        toast({
          variant: "destructive",
          title: "Sign Up Error",
          description: errorMessage,
        });
        return;
      }

      if (user) {
        toast({
          title: "Account Created",
          description: "Your account has been created successfully.",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred during sign up.",
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
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-gray-400 mt-1">Join minStyle today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
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
                minLength={6}
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                className="pl-10 bg-gray-800 border-gray-700 focus-visible:ring-minOrange"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-minOrange hover:bg-minOrange/90 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
              {!isLoading && <ArrowRight size={16} className="ml-2" />}
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

export default SignUp;
