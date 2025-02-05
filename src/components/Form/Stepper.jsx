import React, { useState } from "react";
import CourseInfo from "./CourseInfo";

// Step Components
const CourseBuilder = () => <div>Course Builder Content</div>;
const Publish = () => <div>Publish Content</div>;

// Define steps with labels and components
const steps = [
  { label: "Course Info", component: <CourseInfo /> },
  { label: "Course Builder", component: <CourseBuilder /> },
  { label: "Publish", component: <Publish /> },
];

function Stepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const newCompletedSteps = [...completedSteps];
      newCompletedSteps[currentStep] = true; // Mark current step as completed
      setCompletedSteps(newCompletedSteps);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl px-4 py-8">
        {/* Step Indicator */}
        <div className="flex items-center mb-8">
          {steps.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center flex-col">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${index < currentStep
                    ? "bg-green-500" // Completed steps
                    : index === currentStep
                      ? "bg-purple-800" // Active step
                      : "bg-orange-500" // Inactive steps
                    }`}
                >
                  {index < currentStep ? "✓" : index + 1}
                </div>
                <span className="text-center mt-2">{item.label}</span>
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${index < currentStep ? "bg-green-500" : "bg-gray-300"
                    }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Render Active Step Component */}
        <div className="mt-8">{steps[currentStep].component}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </button>
          <button
            className="px-4 py-2 bg-purple-800 text-white rounded disabled:opacity-50"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stepper;
