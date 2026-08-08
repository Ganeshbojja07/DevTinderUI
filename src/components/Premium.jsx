import React from "react";
import PlanCard from "./PlanCard";

const plans = [
  {
    planId: 1,
    planName: "Silver",
    planPrice: 499,
    planFeatures: [
      "High-resolution image generation",
      "Customizable style templates",
      "Priority support",
    ],
  },
  {
    planId: 2,
    planName: "Gold",
    planPrice: 999,
    planFeatures: [
      "High-resolution image generation",
      "Customizable style templates",
      "Priority support",
      "Batch processing capabilities",
    ],
  },
];

const Premium = () => {
  return (
    <div className="flex justify-center item-center gap-10 mt-10">
      {plans.map((plan) => (
        <PlanCard key={plan.planId} plan={plan} />
      ))}
    </div>
  );
};

export default Premium;
