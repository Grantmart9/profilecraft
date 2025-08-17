import { useState } from "react";
import { profileTemplates } from "../templates";

export default function Step1({ data, updateData, nextStep }) {
  const [selectedType, setSelectedType] = useState(data.profileType);

  const handleSelect = (type) => {
    setSelectedType(type);
    updateData({ profileType: type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedType) {
      nextStep();
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What best describes your profile?</h2>
        <p className="text-gray-600">Select the option that best matches your professional identity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(profileTemplates).map(([key, template]) => (
          <div
            key={key}
            onClick={() => handleSelect(key)}
            className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
              selectedType === key
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{template.description}</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                {selectedType === key ? (
                  <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={handleSubmit}
          disabled={!selectedType}
          className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}