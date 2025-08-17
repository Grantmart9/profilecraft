import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { profileId } = await request.json();
    
    if (!profileId) {
      return NextResponse.json({ error: "Profile ID is required" }, { status: 400 });
    }
    
    // Get Supabase client
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
          set(name, value, options) {
            cookieStore.set(name, value, options);
          },
          remove(name, options) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    
    // Increment page views
    const { error } = await supabase.rpc('increment_page_views', { profile_uuid: profileId });
    
    if (error) {
      console.error("Error incrementing page views:", error);
      return NextResponse.json({ error: "Failed to track page view" }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking page view:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}