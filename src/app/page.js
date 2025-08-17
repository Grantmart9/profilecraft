"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./lib/supabaseClient";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./dashboard/page";
import EditorPage from "./pages/Editor";
import LandingPage from "./landing/page";
import ProfilesPage from "./pages/Profiles";
import SubscriptionPage from "./pages/Subscription";
import AnalyticsPage from "./pages/Analytics";
import * as motion from "motion/react-client";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const scrollContainerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const handlePage = (page) => {
    setCurrentPage(page);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  // If user is not logged in, show the landing page
  if (!user) {
    return <LandingPage />;
  }

  // Render the app with sidebar for logged-in users
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        handlePage={handlePage} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pt-4 pb-20 lg:pb-4 lg:pt-4">
          {
            <>
              {currentPage === "Home" ? (
                <div className="p-6 max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                  >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to ProfileCraft</h1>
                    <p className="text-xl text-gray-600 mb-8">Create and manage your professional profile with ease</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                  >
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Create Profile</h3>
                      <p className="text-gray-600">Build a stunning professional profile in minutes with our easy-to-use editor</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                    >
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Track Analytics</h3>
                      <p className="text-gray-600">Monitor your profile performance with detailed analytics and insights</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                    >
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Get Noticed</h3>
                      <p className="text-gray-600">Increase your visibility and connect with opportunities that matter</p>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-center"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">Ready to get started?</h2>
                    <p className="text-blue-100 mb-6">Select a page from the sidebar to begin creating your professional profile</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePage("Profiles")}
                      className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                    >
                      View Your Profiles
                    </motion.button>
                  </motion.div>
                </div>
              ) : null}
              {currentPage === "Dashboard" ? <DashboardPage handlePage={handlePage} currentPage={currentPage} scrollToTop={scrollToTop} /> : null}
              {currentPage === "Editor" ? <EditorPage /> : null}
              {currentPage === "Profiles" ? <ProfilesPage /> : null}
              {currentPage === "Subscription" ? <SubscriptionPage /> : null}
              {currentPage === "Analytics" ? <AnalyticsPage /> : null}
            </>
          }
        </div>
      </div>
    </div>
  );
}
