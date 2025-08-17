"use client";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaymentIcon from "@mui/icons-material/Payment";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { SubMenuList } from "../supabase";
import * as motion from "motion/react-client";
import { Button } from "@mui/material";
import { supabase } from "../lib/supabaseClient";

const Sidebar = ({ currentPage, handlePage, isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Navigation items for the main sidebar
  const navItems = [
    { name: "Home", icon: HomeIcon, page: "Home" },
    { name: "Dashboard", icon: DashboardIcon, page: "Dashboard" },
    { name: "Editor", icon: EditIcon, page: "Editor" },
    { name: "Profiles", icon: PeopleIcon, page: "Profiles" },
    { name: "Subscription", icon: PaymentIcon, page: "Subscription" },
    { name: "Analytics", icon: AnalyticsIcon, page: "Analytics" },
  ];

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      // Redirect to login page
      window.location.href = "/auth/login";
    }
  };

  return (
    <>
      {/* Sidebar for desktop */}
      <div className={`hidden lg:flex flex-col h-screen bg-white shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-20"}`}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">
                P
              </div>
              <span className="text-xl font-bold text-gray-800">ProfileCraft</span>
            </motion.div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            {isOpen ? (
              <ChevronLeftIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav>
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      handlePage(item.page);
                    }}
                    className={`w-full flex items-center rounded-lg px-3 py-3 text-left transition-colors ${currentPage === item.page
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-6 w-6" />
                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-3"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* User section */}
        {isOpen && (
          <div className="p-4 border-t">
            <div className="space-y-2">
              {SubMenuList.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 text-sm"
                  onClick={() => {
                    if (item.name === "Logout") {
                      handleLogout();
                    } else {
                      // Handle other submenu items
                    }
                  }}
                >
                  {item.name}
                </button>
              ))}
              <Button 
                variant="contained" 
                className="bg-blue-600 hover:bg-blue-800" 
                fullWidth
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Mobile bottom navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                handlePage(item.page);
              }}
              className={`flex flex-col items-center justify-center py-2 px-1 ${currentPage === item.page
                ? "text-blue-600"
                : "text-gray-500"
                }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;