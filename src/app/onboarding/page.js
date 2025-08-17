"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Step1 from "./step1.js";
import Step2 from "./step2.js";
import Step3 from "./step3.js";
import Step4 from "./step4.js";
import { supabase } from "../lib/supabaseClient";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    profileType: "",
    name: "",
    tagline: "",
    bio: "",
    logo: null,
    colorPalette: "blue",
    theme: "light",
    contentPriority: [],
  });
  const router = useRouter();

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateProfileData = (data) => {
    setProfileData({ ...profileData, ...data });
  };

  const handleSubmit = async () => {
    try {
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw new Error(`Error fetching user: ${userError.message}`);
      }
      
      if (!user) {
        throw new Error("No authenticated user found");
      }

      // Save profile data to Supabase
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          profile_type: profileData.profileType,
          name: profileData.name,
          tagline: profileData.tagline,
          bio: profileData.bio,
          color_palette: profileData.colorPalette,
          theme: profileData.theme,
          content_priority: profileData.contentPriority,
          created_at: new Date(),
        })
        .select();

      if (error) {
        console.error("Supabase error details:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        throw new Error(`Database error: ${error.message}`);
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving profile:", error);
      // Optionally, you could set an error state here to display to the user
      // setError(error.message);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 data={profileData} updateData={updateProfileData} nextStep={nextStep} />;
      case 2:
        return <Step2 data={profileData} updateData={updateProfileData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3 data={profileData} updateData={updateProfileData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step4 data={profileData} updateData={updateProfileData} prevStep={prevStep} onSubmit={handleSubmit} />;
      default:
        return <Step1 data={profileData} updateData={updateProfileData} nextStep={nextStep} />;
    }
  };

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`h-1 w-16 mx-2 ${
                    currentStep > step ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-gray-600">
          Step {currentStep} of 4
        </div>
      </div>

      {/* Step Content */}
      <div className="py-4">
        {renderStep()}
      </div>
    </div>
  );
}