import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ProgressBar } from "./ProgressBar"
import { StepButtonGroup } from "./StepButtonGroup"
import { useStepStore } from "@/store/step-store"

export function Step4Confirm() {
  const step1Data = useStepStore((state) => state.step1Data)
  const step2Data = useStepStore((state) => state.step2Data)
  const step3Data = useStepStore((state) => state.step3Data)

  return (
    <div className="min-h-screen bg-background pb-24">
      <ProgressBar />

      <div className="px-4 pt-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">確認預約資訊</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-sm mb-2">基本資料</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">姓名</span>
                    <span className="text-sm font-bold">{step1Data.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">手機號碼</span>
                    <span className="text-sm font-bold">
                      {step1Data.phone
                        ? step1Data.phone.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1-$2-$3")
                        : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">車牌號碼</span>
                    <span className="text-sm font-bold">{step1Data.license}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-bold text-sm mb-2">服務項目</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">選擇項目</span>
                    <span className="text-sm font-bold">{step2Data.selectServe.join("、")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">到府牽車</span>
                    <span className="text-sm font-bold">{step2Data.extra ? "是" : "否"}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-bold text-sm mb-2">預約時間</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">日期</span>
                    <span className="text-sm font-bold">{step3Data.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">時間</span>
                    <span className="text-sm font-bold">{step3Data.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <Alert>
              <AlertDescription>請檢查預約資訊是否正確無誤。</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <StepButtonGroup />
    </div>
  )
}
