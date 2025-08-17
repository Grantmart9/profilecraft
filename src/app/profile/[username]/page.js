"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { usePageViewTracking, trackClick } from "../../hooks/useAnalytics";

export default function ProfilePage({ params }) {
  const [profile, setProfile] = useState(null);
  const [layout, setLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Track page view
  usePageViewTracking(profile?.id);

  useEffect(() => {
    fetchProfile();
  }, [params.username]);

  const fetchProfile = async () => {
    try {
      // Get user profile by username
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', params.username)
        .single();
      
      if (profileError) {
        if (profileError.code === "PGRST116") {
          // Profile not found
          router.push("/404");
        }
        throw profileError;
      }
      
      setProfile(profileData);
      
      // Get published layout
      const { data: layoutData, error: layoutError } = await supabase
        .from('profiles_layouts')
        .select('*')
        .eq('profile_id', profileData.id)
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (layoutError && layoutError.code !== "PGRST116") {
        throw layoutError;
      }
      
      setLayout(layoutData);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = () => {
    trackClick(profile?.id, "contact-button");
    // Handle contact form or email
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Profile Not Found</h1>
          <p className="mt-2 text-gray-600">The requested profile could not be found.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Check if subscription is active
  if (profile.subscription_status !== 'active') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Profile Unavailable</h1>
          <p className="mt-2 text-gray-600">This profile is currently not available.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Render the layout if available, otherwise show default profile */}
      {layout ? (
        <div 
          dangerouslySetInnerHTML={{ __html: layout.layout_data.html }} 
          className="min-h-screen"
        />
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            {profile.logo ? (
              <img 
                src={profile.logo} 
                alt={profile.name} 
                className="mx-auto h-32 w-32 rounded-full object-cover"
              />
            ) : (
              <div className="mx-auto h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-600">
                  {profile.name?.charAt(0) || "P"}
                </span>
              </div>
            )}
            <h1 className="mt-6 text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="mt-2 text-xl text-gray-600">{profile.tagline}</p>
          </div>
          
          <div className="prose max-w-none">
            {profile.bio && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700">{profile.bio}</p>
              </div>
            )}
            
            <div className="text-center">
              <button
                onClick={handleContactClick}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}