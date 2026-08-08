import React, { useEffect } from "react";
import PlanCard from "./PlanCard";
import axios from "axios";

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
  const [isPremium, setIsPremium] = React.useState(false);
  const verifyPayment = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/payment/status",
        { withCredentials: true },
      );
      if (res.data?.isPremium) {
        setIsPremium(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <>
      {isPremium ? (
        <p className="text-green-500">You are a premium user!</p>
      ) : (
        <div className="flex justify-center item-center gap-10 mt-10">
          {plans.map((plan) => (
            <PlanCard
              key={plan.planId}
              plan={plan}
              verifyPayment={verifyPayment}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Premium;
