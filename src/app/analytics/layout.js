"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import Sidebar from "../components/Sidebar";

export default function AnalyticsLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("Analytics");
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
      }
    };
    
    checkUser();
  }, [router]);

  const handlePage = (page) => {
    setCurrentPage(page);
    // Map pages to their routes
    switch (page) {
      case "Home":
        router.push("/");
        break;
      case "Dashboard":
        router.push("/dashboard");
        break;
      case "Editor":
        router.push("/editor");
        break;
      case "Profiles":
        router.push("/profiles");
        break;
      case "Subscription":
        router.push("/subscription");
        break;
      case "Analytics":
        router.push("/analytics");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        handlePage={handlePage} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto pt-4 pb-20 lg:pb-4 lg:pt-4">
          {children}
        </div>
      </div>
    </div>
  );
}