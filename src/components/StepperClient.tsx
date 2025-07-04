"use client"

// import liff from "@line/liff";
// import { useState, useEffect } from "react";
import { useStepStore } from "@/store/step-store"
import { Step1UserInfo } from "@/components/Step1UserInfo"
import { Step2ServiceSelect } from "@/components/Step2ServiceSelect"
import { Step3DateTime } from "@/components/Step3DateTime"
import { Step4Confirm } from "@/components/Step4Confirm"

export default function StepperClient() {
  const currentStep = useStepStore((s) => s.currentStep)

  // useEffect(() => {
  //   const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
  //   if (!liffId) {
  //     console.error("LIFF ID is not defined. Please set the LIFF_ID environment variable.");
  //     return;
  //   }
  //   liff.init({
  //     liffId: liffId,
  //     withLoginOnExternalBrowser: true,
  //   });
  // }, []);

  switch (currentStep) {
    case 1:
      return <Step1UserInfo />
    case 2:
      return <Step2ServiceSelect />
    case 3:
      return <Step3DateTime />
    case 4:
      return <Step4Confirm />
    default:
      return <Step1UserInfo />
  }
}