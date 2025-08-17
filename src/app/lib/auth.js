import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getUser() {
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
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function requireAuth() {
  const user = await getUser();
  
  if (!user) {
    throw new Error("Authentication required");
  }
  
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  
  // Check if user has admin role (you would implement this based on your needs)
  // For now, we'll just check if the user exists
  if (!user) {
    throw new Error("Admin access required");
  }
  
  return user;
}