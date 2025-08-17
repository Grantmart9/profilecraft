// JavaScript types for the application

export const UserProfile = {
  id: "",
  username: "",
  email: "",
  profile_type: "",
  name: "",
  tagline: "",
  bio: "",
  color_palette: "",
  theme: "",
  content_priority: [],
  created_at: "",
  updated_at: ""
};

export const ProfileLayout = {
  id: "",
  profile_id: "",
  layout_data: {
    html: "",
    css: "",
    js: ""
  },
  is_published: false,
  created_at: "",
  updated_at: "",
  published_at: null
};

export const Subscription = {
  id: "",
  profile_id: "",
  status: "pending", // 'pending' | 'active' | 'cancelled' | 'expired'
  amount: 0,
  currency: "",
  payfast_subscription_id: null,
  start_date: null,
  end_date: null,
  created_at: "",
  updated_at: ""
};

export const Analytics = {
  id: "",
  profile_id: "",
  page_views: 0,
  clicks: 0,
  date: "",
  created_at: "",
  updated_at: ""
};

export const ProfileTemplate = {
  name: "",
  description: "",
  sections: [],
  layout: ""
};

export const ProfileType = "model"; // 'model' | 'salesperson' | 'freelancer' | 'artist' | 'coach' | 'other'

export const PayFastPaymentData = {
  merchant_id: "",
  merchant_key: "",
  return_url: "",
  cancel_url: "",
  notify_url: "",
  name_first: "",
  name_last: "",
  email_address: "",
  m_payment_id: "",
  amount: 0,
  item_name: "",
  item_description: "",
  currency: "",
  subscription_type: "",
  billing_date: "",
  recurring_amount: 0,
  frequency: "",
  cycles: "",
  passphrase: ""
};