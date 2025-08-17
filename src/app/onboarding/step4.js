import { useState } from "react";
import { profileTemplates } from "../templates";

export default function Step4({ data, updateData, prevStep, onSubmit }) {
  const [selectedSections, setSelectedSections] = useState(data.contentPriority || []);
  const templateSections = profileTemplates[data.profileType]?.sections || [];

  const toggleSection = (section) => {
    if (selectedSections.includes(section)) {
      setSelectedSections(selectedSections.filter((s) => s !== section));
    } else {
      setSelectedSections([...selectedSections, section]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ contentPriority: selectedSections });
    onSubmit();
  };

  const sections = [
    { id: "bio", name: "About/Bio", description: "Your personal or professional story" },
    { id: "gallery", name: "Gallery", description: "Showcase your work with images" },
    { id: "services", name: "Services", description: "List what you offer to clients" },
    { id: "testimonials", name: "Testimonials", description: "Display client feedback and reviews" },
    { id: "contact", name: "Contact Form", description: "Allow visitors to reach out to you directly" },
    { id: "products", name: "Product List", description: "Showcase items you sell or recommend" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Priority</h2>
        <p className="text-gray-600">Select the content sections you want to include on your profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <div
            key={section.id}
            onClick={() => toggleSection(section.id)}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
              selectedSections.includes(section.id)
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {selectedSections.includes(section.id) ? (
                  <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <h3 className="font-medium text-gray-900">{section.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{section.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-8">
        <button
          onClick={prevStep}
          className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Create Profile
        </button>
      </div>
    </div>
  );
}