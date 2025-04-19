// src/components/LoadingSpinner.tsx
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-minOrange"></div>
    </div>
  );
};

export default LoadingSpinner;
