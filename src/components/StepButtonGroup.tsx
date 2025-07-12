"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useStepStore } from "@/store/step-store"
import { useLiffMessage } from "@/hooks/useLiffMessage"
import toast from 'react-hot-toast'

export function StepButtonGroup({
  isLoading = false,
  isNextDisabled = false,
}: {
  isLoading?: boolean
  isNextDisabled?: boolean
}) {
  const currentStep = useStepStore((step) => step.currentStep)
  const prevStep = useStepStore((step) => step.prevStep)
  const nextStep = useStepStore((step) => step.nextStep)
  const FIRST_STEP = 1
  const TOTAL_STEP = 4
  const router = useRouter()
  const step1Data = useStepStore((state) => state.step1Data)
  const step2Data = useStepStore((state) => state.step2Data)
  const step3Data = useStepStore((state) => state.step3Data)

  // 第一頁時「上一步」禁用，否則啟用
  const isPreviousDisabled = currentStep === FIRST_STEP

  // 第四頁時「下一步」顯示「確認預約」，否則顯示「下一步」
  const nextButtonText = currentStep === TOTAL_STEP ? "確認預約" : "下一步"

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
  
  const sendMail = async () => {
    try {
      const reservationData = {
        ...step1Data,
        ...step2Data,
        ...step3Data,
      }
      await fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      })
    } catch (error) {
      console.error("Error during sendMail:", error)
    }
  }
  const { sendLineMessage } = useLiffMessage(); //不能放在handleNextClick內，React Hook只能在組件的最外層呼叫
  const handleNextClick = async () => {
    if (currentStep === TOTAL_STEP) {
      await toast.promise(
        (async () => {
          await send()
          await sendLineMessage()
          await sendMail()
        })(),
        {
          loading: '處理中...',
          success: '預約完成！',
          error: '預約失敗，請稍後再試',
        }
      )
      router.push('/final')
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
