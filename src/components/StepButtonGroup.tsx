"use client"

import { Button } from "@/components/ui/button"
import { useStepStore } from "@/store/step-store"

export function StepButtonGroup({
  isLoading = false,
  isNextDisabled = false,
}: {
  isLoading?: boolean
  isNextDisabled?: boolean
}) {
  const currentStep = useStepStore((s) => s.currentStep)
  const prevStep = useStepStore((s) => s.prevStep)
  const nextStep = useStepStore((s) => s.nextStep)
  const totalSteps = 4
  const step3Data = useStepStore((state) => state.step3Data)

  // 第一頁時「上一步」禁用，否則啟用
  const isPreviousDisabled = currentStep === 1

  // 第四頁時「下一步」顯示「確認預約」，否則顯示「下一步」
  const nextButtonText = currentStep === totalSteps ? "確認預約" : "下一步"

  const send = async () => {
    try {
      await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(step3Data)
      })
    } catch (error) {
      console.error("Error during send:", error)
    }
  }

  const handleNextClick = async () => {
    if (currentStep === totalSteps) {
      await send()
    } else {
      nextStep()
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
      <div className="flex gap-3 max-w-md mx-auto">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={isPreviousDisabled}
          className="flex-1 h-12 "
        >
          上一步
        </Button>
        <Button
          onClick={handleNextClick}
          disabled={isNextDisabled || isLoading}
          className="flex-1 h-12 "
        >
          {isLoading ? "處理中..." : nextButtonText}
        </Button>
      </div>
    </div>
  )
}
