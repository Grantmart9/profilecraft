"use client";

import React from "react";

export default function OnboardingLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12 pt-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome to Your Profile Setup
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Let's create your personalized profile page in just a few simple steps
            </p>
          </header>
          <main className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}