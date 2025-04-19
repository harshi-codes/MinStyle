// src/pages/Profile.tsx
import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { logout } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      toast({
        variant: "destructive",
        title: "Logout Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-minBlack text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-black border border-gray-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

          {user && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-300">
                  Account Information
                </h2>
                <div className="mt-2 space-y-2">
                  <p>
                    <span className="text-gray-400">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="text-gray-400">Email Verified:</span>{" "}
                    {user.emailVerified ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleLogout}
                  className="bg-minOrange hover:bg-minOrange/90"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
