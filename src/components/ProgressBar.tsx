import { cn } from "@/lib/utils"
import { useStepStore } from "@/store/step-store"

export function ProgressBar() {
  const currentStep = useStepStore((s) => s.currentStep)
  const totalSteps = 4

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 max-w-md px-4 py-4 z-10 bg-white mx-auto">
      <div className="flex items-center justify-between mb-3">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber <= currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <div key={stepNumber} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  isCurrent
                    ? "bg-[#171717] text-[#fafafa]"
                    : isActive
                      ? "bg-[#171717]/80 text-[#fafafa]"
                      : "bg-[#f5f5f5] text-[#a3a3a3]",
                )}
              >
                {stepNumber}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    "w-12 h-0.5 mx-2 transition-colors",
                    stepNumber < currentStep ? "bg-[#171717]" : "bg-[#f5f5f5]",
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
