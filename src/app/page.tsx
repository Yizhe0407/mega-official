"use client"
import StepperClient from "@/components/StepperClient";
import { useStepStore } from "@/store/step-store";

export default function Home() {
  const { userId } = useStepStore();
  console.log("User ID from store:", userId);

  return (
    <div className="max-w-md mx-auto">
      <StepperClient />
      <div>用戶 ID: {userId}</div>
    </div>
  );
}
