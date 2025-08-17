import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { verifyPayFastNotification } from "../../../lib/payfast";

export async function POST(request) {
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get("X-PayFast-Signature") || "";
    
    // Parse the form data
    const formData = new URLSearchParams(body);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    
    // Verify the notification
    const isValid = verifyPayFastNotification(payload, signature);
    
    if (!isValid) {
      console.error("Invalid PayFast notification");
      return NextResponse.json({ error: "Invalid notification" }, { status: 400 });
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
    
    // Handle different types of notifications
    const paymentStatus = payload.payment_status;
    const subscriptionId = payload.m_payment_id;
    const userId = payload.custom_str1; // Assuming we store user ID here
    
    switch (paymentStatus) {
      case "COMPLETE":
        // Payment was successful
        await handleSuccessfulPayment(supabase, subscriptionId, userId, payload);
        break;
        
      case "FAILED":
        // Payment failed
        await handleFailedPayment(supabase, subscriptionId, userId, payload);
        break;
        
      case "CANCELLED":
        // Subscription was cancelled
        await handleCancelledSubscription(supabase, subscriptionId, userId, payload);
        break;
        
      default:
        console.log("Unhandled payment status:", paymentStatus);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing PayFast notification:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function handleSuccessfulPayment(
  supabase,
  subscriptionId,
  userId,
  payload
) {
  try {
    // Update subscription status to active
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        payfast_subscription_id: payload.pf_payment_id,
        start_date: new Date(),
        end_date: calculateEndDate(payload.frequency),
        updated_at: new Date()
      })
      .eq('id', subscriptionId);
      
    if (error) throw error;
    
    console.log("Successfully updated subscription:", subscriptionId);
  } catch (error) {
    console.error("Error updating subscription:", error);
    throw error;
  }
}

async function handleFailedPayment(
  supabase,
  subscriptionId,
  userId,
  payload
) {
  try {
    // Update subscription status to failed
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'expired',
        updated_at: new Date()
      })
      .eq('id', subscriptionId);
      
    if (error) throw error;
    
    console.log("Updated subscription to failed:", subscriptionId);
  } catch (error) {
    console.error("Error updating subscription to failed:", error);
    throw error;
  }
}

async function handleCancelledSubscription(
  supabase,
  subscriptionId,
  userId,
  payload
) {
  try {
    // Update subscription status to cancelled
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'cancelled',
        updated_at: new Date()
      })
      .eq('id', subscriptionId);
      
    if (error) throw error;
    
    console.log("Cancelled subscription:", subscriptionId);
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    throw error;
  }
}

function calculateEndDate(frequency) {
  const endDate = new Date();
  if (frequency === "12") {
    // Annual subscription
    endDate.setFullYear(endDate.getFullYear() + 1);
  } else {
    // Monthly subscription
    endDate.setMonth(endDate.getMonth() + 1);
  }
  return endDate;
}