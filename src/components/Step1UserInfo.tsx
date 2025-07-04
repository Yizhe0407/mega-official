import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ProgressBar } from "./ProgressBar"
import { StepButtonGroup } from "./StepButtonGroup"
import { useStepStore } from "@/store/step-store"

export function Step1UserInfo() {
  const step1Data = useStepStore((state) => state.step1Data) // 取得目前資料
  const setStep1Data = useStepStore((state) => state.setStep1Data)
  return (
    <div className="min-h-screen bg-background pb-24">
      <ProgressBar />

      <div className="px-4 pt-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">基本資料</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-md font-bold">
                姓名 <span className="text-destructive">*</span>
              </p>
              <Input 
                id="name" 
                placeholder="請輸入您的姓名" 
                className="h-12"
                value={step1Data?.name || ""}
                onChange={(e) => setStep1Data({ name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <p className="text-md font-bold">
                手機號碼 <span className="text-destructive">*</span>
              </p>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="請輸入手機號碼" 
                className="h-12"
                value={step1Data?.phone || ""}
                onChange={(e) => setStep1Data({ phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <p className="text-md font-bold">
                車牌號碼 <span className="text-destructive">*</span>
              </p>
              <Input 
                id="license" 
                placeholder="請輸入車牌號碼" 
                className="h-12"
                value={step1Data?.license || ""}
                onChange={(e) => setStep1Data({ license: e.target.value.toUpperCase() })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <StepButtonGroup isNextDisabled={!step1Data?.name || !step1Data?.phone || !step1Data?.license} />
    </div>
  )
}
