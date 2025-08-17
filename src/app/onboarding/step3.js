import { useState } from "react";

export default function Step3({ data, updateData, nextStep, prevStep }) {
  const [formData, setFormData] = useState({
    colorPalette: data.colorPalette || "blue",
    theme: data.theme || "light",
  });

  const colorPalettes = [
    { id: "blue", name: "Ocean Breeze", colors: ["#007BFF", "#0056b3", "#66b3ff"] },
    { id: "green", name: "Forest Green", colors: ["#28a745", "#1e7e34", "#8ad999"] },
    { id: "purple", name: "Royal Purple", colors: ["#6f42c1", "#5a32a3", "#a084e2"] },
    { id: "red", name: "Crimson Red", colors: ["#dc3545", "#bd2130", "#e4898b"] },
    { id: "orange", name: "Sunset Orange", colors: ["#fd7e14", "#dc6a08", "#f6b379"] },
    { id: "pink", name: "Rose Pink", colors: ["#e83e8c", "#d11a6f", "#f19bbd"] },
  ];

  const themes = [
    { id: "light", name: "Light Theme" },
    { id: "dark", name: "Dark Theme" },
    { id: "auto", name: "Auto (System)" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(formData);
    nextStep();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Style</h2>
        <p className="text-gray-600">Select a color palette and theme that represents you</p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorPalettes.map((palette) => (
              <div
                key={palette.id}
                onClick={() => setFormData({ ...formData, colorPalette: palette.id })}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                  formData.colorPalette === palette.id
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 rounded-full" style={{ backgroundColor: palette.colors[0] }}></div>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900">{palette.name}</h4>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    {formData.colorPalette === palette.id ? (
                      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                    )}
                  </div>
                </div>
                <div className="flex mt-3 space-x-1">
                  {palette.colors.map((color, index) => (
                    <div
                      key={index}
                      className="h-3 flex-1 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => setFormData({ ...formData, theme: theme.id })}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 text-center ${
                  formData.theme === theme.id
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-center">
                  <div className="ml-3 flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900">{theme.name}</h4>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    {formData.theme === theme.id ? (
                      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
          Continue
        </button>
      </div>
    </div>
  );
}