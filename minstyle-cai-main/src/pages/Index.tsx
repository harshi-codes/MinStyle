import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useAuth } from "@/providers/AuthProvider";
import { auth } from "@/services/auth";
import { API_BASE_URL } from "@/services/auth";

const Index = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [searchParams, setSearchParams] = useState({
    style: "",
    color: "",
    vibe: "",
    gender: "",
    event: "",
  });
  const [isTokenRefreshing, setIsTokenRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  if (!validateSearchParams()) return; // Extract validation to separate function

  setIsLoading(true);

  try {
    if (!user) {
      navigateToLogin();
      return;
    }

    setIsTokenRefreshing(true);
    const token = await user.getIdToken(true);
    setIsTokenRefreshing(false);
    
    const response = await fetch(`${API_BASE_URL}/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(searchParams),
    });

    if (!response.ok) {
      const errorData = await parseErrorResponse(response);
      throw new Error(errorData.error || "Failed to start search");
    }

    showSuccessToast();
    navigateAfterDelay();

  } catch (error) {
    handleSearchError(error);
  } finally {
    setIsLoading(false);
    setIsTokenRefreshing(false);
  }
};

// Helper functions (define outside component):
const validateSearchParams = () => { /* ... */ };
const navigateToLogin = () => { /* ... */ };
const parseErrorResponse = async (response: Response) => { /* ... */ };
const showSuccessToast = () => { /* ... */ };
const navigateAfterDelay = () => { /* ... */ };
const handleSearchError = (error: unknown) => { /* ... */ };

export default Index;
