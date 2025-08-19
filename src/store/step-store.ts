import { create } from "zustand";

type Step1Data = {
  name?: string;
  phone?: string;
  license?: string;
  pictureUrl?: string;
};

type Step2Data = {
  selectServe: string[];
  otherService?: string;
  extra?: boolean;
};

type Step3Data = {
  date: string;
  time: string;
};

type StepState = {
  currentStep: number;
  step1Data: Step1Data;
  step2Data: Step2Data;
  step3Data: Step3Data;
  userId: string;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep1Data: (data: Step1Data) => void;
  setStep2Data: (data: Step2Data) => void;
  setStep3Data: (data: Step3Data) => void;
  setUserId: (userId: string) => void;
};

export const useStepStore = create<StepState>((set, get) => ({
  currentStep: 1,
  step1Data: {},
  step2Data: { selectServe: [] },
  step3Data: { date: "", time: "" },
  userId: "",
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 4) set({ currentStep: currentStep + 1 });
  },
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) set({ currentStep: currentStep - 1 });
  },
  setStep1Data: (data) => set({ step1Data: { ...get().step1Data, ...data } }),
  setStep2Data: (data) => set({ step2Data: { ...get().step2Data, ...data } }),
  setStep3Data: (data) => set({ step3Data: { ...get().step3Data, ...data } }),
  setUserId: (userId) => set({ userId: userId }),
}));