
export const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZW54bXBrem1kZWh6d2VodmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjk3ODQsImV4cCI6MjA3MDg0NTc4NH0.JMgjIQ3SwNR0dy3skbwKUCwcjHZ-vsqM028I4hj-srI";
export const SUPABASE_URL = "https://beenxmpkzmdehzwehvka.supabase.co";
export const NEXT_PUBLIC_GOOGLE_API_KEY = "AIzaSyDFqp0PGp-vOy_BLx-ljnGZcUks9VbJgXM"


export const MainMenuList = [
  {
    "name": "Clothing & Accessories",
    "path": "/donations",
    "menu": [
      { "name": "Women", "path": "/donations" },
      { "name": "Men", "path": "/donations" },
      { "name": "Kids", "path": "/donations" },
      { "name": "Baby", "path": "/donations" }
    ]
  },
  {
    "name": "Electronics",
    "path": "/donations",
    "menu": [
      { "name": "Laptops & Tablets", "path": "/donations" },
      { "name": "Mobile Phones", "path": "/donations" },
      { "name": "Other Devices", "path": "/donations" }
    ]
  },
  {
    "name": "Household Items",
    "path": "/donations",
    "menu": [
      { "name": "Furniture", "path": "/donations" },
      { "name": "Kitchenware", "path": "/donations" },
      { "name": "Decor & Essentials", "path": "/donations" }
    ]
  },
  {
    "name": "Books & Stationery",
    "path": "/donations",
    "menu": [
      { "name": "School Supplies", "path": "/donations" },
      { "name": "Books for All Ages", "path": "/donations" },
      { "name": "Art & Craft Supplies", "path": "/donations" }
    ]
  },
  {
    "name": "Medical Items",
    "path": "/donations",
    "menu": [
      { "name": "First Aid Supplies", "path": "/donations" },
      { "name": "Mobility Aids", "path": "/donations" },
      { "name": "Health & Wellness Products", "path": "/donations" }
    ]
  },
  {
    "name": "Food & Beverages",
    "path": "/donations",
    "menu": [
      { "name": "Non-Perishables", "path": "/donations" },
      { "name": "Beverages", "path": "/donations" },
      { "name": "Baby Food", "path": "/donations" }
    ]
  },
  {
    "name": "Time & Money",
    "path": "/donations",
    "menu": [
      { "name": "Volenteer", "path": "/donations" },
      { "name": "Donate money", "path": "/donations" }
    ]
  }
]

export const SubMenuList = [
  { "name": "About Us", "path": "/donations" },
  { "name": "Contact Us", "path": "/donations" },
  { "name": 'Meet Our Team', "path": "/donations" },
  { "name": 'Vission & Mission', "path": "/donations" },
]

export const Colors = {
  orange: "rgba(248, 185, 134,0.72)",
  red: "rgba(235, 92, 92,0.72)",
  green: "rgba(143, 230, 187,0.72)",
  blue: "rgba(114, 219, 209,0.72)",
  pink: "rgba(246, 140, 158,0.72)",
  yellow: "rgba(248, 215, 96,0.72)"
}

export const AppName = "WeCare";
export const Address = "21 welgemoed street, welgemoed"
export const phone_number = "+27 61 417 0615"
export const email_address = "www.wecare@gmail.com"
export const instagram_account = ""
export const facebook_account = ""
export const whatsapp_account = ""

export const third_party_delivery_rate = 5.75 // R/km
export const our_delivery_rate = 4
export const delivery_rate = our_delivery_rate + third_party_delivery_rate; // R/km
export const max_delivery_cost = 350; // R
export const min_delivery_cost = 50;
export const max_distance_from_warehouse = 50; // in km if the the distance exceeds this ammount, same day delivery does not apply
export const min_distance_from_warehouse = 5; // personal delivery for distances less than this

export const TextColorHover = "#0A4D68"
export const TitleColor = "rgba(27, 51, 54, 0.75)"
export const DrawerBackgroundColor = "transparent"
export const DrawerBackgroundHoverColor = "rgba(0, 0, 0, 0.25)"
export const BackgroundColor = DrawerBackgroundColor
export const TextColor = "text-cyan-950"
export const IconButtonColor = "#b1fbfc"
export const TopBarColor = "bg-cyan-950"
export const FontType = "Poetsen One, serif"
export const NavigationBackgroundColor = "to-lime-400 from-cyan-500 via-pink-500"
export const NavigationTextSize = "sm";
export const LoaderColor = "rgba(181, 24, 100, 0.8)"
export const ProductBackgroundColor = "rgba(27, 51, 54, 0.8)"
