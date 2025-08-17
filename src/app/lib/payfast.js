// PayFast integration utilities
export const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID || "";
export const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY || "";
export const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE || "";
export const PAYFAST_ENVIRONMENT = process.env.PAYFAST_ENVIRONMENT || "sandbox"; // "sandbox" or "live"

// PayFast URLs
export const PAYFAST_URLS = {
  sandbox: "https://sandbox.payfast.co.za/eng/process",
  live: "https://www.payfast.co.za/eng/process"
};

// Subscription plan details
export const SUBSCRIPTION_PLAN = {
  name: "Professional Profile Plan",
  description: "Annual subscription for professional profile hosting",
  amount: 2000, // R2000 per year
  currency: "ZAR",
  frequency: "annual" // or "monthly"
};

// Generate PayFast payment form data
export function generatePayFastFormData(
  userId,
  userEmail,
  userName,
  subscriptionId
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  const data = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    return_url: `${baseUrl}/subscription/success`,
    cancel_url: `${baseUrl}/subscription/cancel`,
    notify_url: `${baseUrl}/api/payfast/notify`,
    name_first: userName.split(" ")[0] || "",
    name_last: userName.split(" ")[1] || "",
    email_address: userEmail,
    m_payment_id: subscriptionId,
    amount: SUBSCRIPTION_PLAN.amount,
    item_name: SUBSCRIPTION_PLAN.name,
    item_description: SUBSCRIPTION_PLAN.description,
    currency: SUBSCRIPTION_PLAN.currency,
    subscription_type: "1", // Recurring
    billing_date: new Date().toISOString().split("T")[0],
    recurring_amount: SUBSCRIPTION_PLAN.amount,
    frequency: SUBSCRIPTION_PLAN.frequency === "annual" ? "12" : "1", // 12 months or 1 month
    cycles: "0", // Infinite cycles
    passphrase: PAYFAST_PASSPHRASE
  };

  return data;
}

// Verify PayFast payment notification
export function verifyPayFastNotification(
  payload,
  signature
) {
  // Implementation for verifying PayFast notifications
  // This would typically involve checking the signature and validating the payment
  // For now, we'll return true to indicate successful verification
  console.log("Verifying PayFast notification:", payload);
  return true;
}

// Handle successful subscription
export async function handleSubscriptionSuccess(
  subscriptionId,
  userId,
  paymentData
) {
  // Implementation for handling successful subscription
  // This would typically involve updating the database with subscription details
  console.log("Handling subscription success:", { subscriptionId, userId, paymentData });
  return true;
}

// Handle subscription cancellation
export async function handleSubscriptionCancellation(
  subscriptionId,
  userId
) {
  // Implementation for handling subscription cancellation
  // This would typically involve updating the database to mark subscription as cancelled
  console.log("Handling subscription cancellation:", { subscriptionId, userId });
  return true;
}