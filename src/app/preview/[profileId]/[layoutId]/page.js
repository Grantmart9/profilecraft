"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '@supabase/supabase-js';

export default function PreviewPage({ params }) {
  const [layout, setLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vcgvkbcodushhyaodown.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjZ3ZrYmNvZHVzaGh5YW9kb3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczODg4NDYsImV4cCI6MjA2Mjk2NDg0Nn0.YL0Ba4TbNG3A-IZ7Llv1Q6j8iEONyDsEr_ecvnJSeNk"
  );

  useEffect(() => {
    const fetchParamsAndLayout = async () => {
      const resolvedParams = await params;
      fetchLayout(resolvedParams.profileId, resolvedParams.layoutId);
    };
    
    fetchParamsAndLayout();
  }, [params]);

  const fetchLayout = async (profileId, layoutId) => {
    try {
      // Get layout data
      const { data: layoutData, error: layoutError } = await supabase
        .from('profiles_layouts')
        .select('*')
        .eq('id', layoutId)
        .eq('profile_id', profileId)
        .single();
      
      if (layoutError) {
        throw layoutError;
      }
      
      setLayout(layoutData);
    } catch (error) {
      console.error("Error fetching layout:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (!layout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Preview Not Found</h1>
          <p className="mt-2 text-gray-600">The requested preview could not be found.</p>
          <button
            onClick={() => router.push("/editor")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Editor
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Preview Mode</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push("/editor")}
              className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700"
            >
              Back to Editor
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Print
            </button>
          </div>
        </div>
      </div>
      
      <div className="pt-20">
        {layout.layout_data?.html ? (
          <div 
            dangerouslySetInnerHTML={{ __html: layout.layout_data.html }} 
            className="min-h-screen"
          />
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">No Content</h2>
              <p className="mt-2 text-gray-600">This layout doesn't have any content yet.</p>
              <button
                onClick={() => router.push("/editor")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit Layout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}