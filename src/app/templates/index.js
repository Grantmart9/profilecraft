export const profileTemplates = {
  model: {
    name: "Model Portfolio",
    description: "Showcase your modeling portfolio with a clean, professional layout",
    sections: ["bio", "gallery", "contact"],
    layout: "model"
  },
  salesperson: {
    name: "Sales Professional",
    description: "Create a professional sales profile to showcase your services",
    sections: ["bio", "services", "testimonials", "contact"],
    layout: "sales"
  },
  freelancer: {
    name: "Freelancer Portfolio",
    description: "Display your freelance services and portfolio in a modern layout",
    sections: ["bio", "services", "gallery", "contact"],
    layout: "freelancer"
  },
  artist: {
    name: "Artist Portfolio",
    description: "Showcase your artistic work with a creative, visually-focused layout",
    sections: ["bio", "gallery", "contact"],
    layout: "artist"
  },
  coach: {
    name: "Coach Profile",
    description: "Promote your coaching services with a professional, approachable design",
    sections: ["bio", "services", "testimonials", "contact"],
    layout: "coach"
  },
  default: {
    name: "Default Profile",
    description: "A balanced template with all essential sections",
    sections: ["bio", "gallery", "services", "contact"],
    layout: "default"
  }
};

export const profileTypes = Object.keys(profileTemplates);