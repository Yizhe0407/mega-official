"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ProgressBar } from "./ProgressBar"
import { StepButtonGroup } from "./StepButtonGroup"
import { useState } from "react"
import { useStepStore } from "@/store/step-store"

export function Step2ServiceSelect() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [showOtherInput, setShowOtherInput] = useState(false)
  const [needPickup, setNeedPickup] = useState(false)
  const step2Data = useStepStore((state) => state.step2Data)
  const setStep2Data = useStepStore((state) => state.setStep2Data)

  const services = [
    { id: "maintenance", label: "保養" },
    { id: "tire", label: "換輪胎" },
    { id: "bodywork", label: "鈑金烤漆" },
    { id: "parts", label: "更換零件" },
    { id: "other", label: "其他" },
  ]

  const toggleService = (serviceId: string) => {
    const current = step2Data?.selectServe || []
    let newSelected: string[]
    if (current.includes(serviceId)) {
      newSelected = current.filter(id => id !== serviceId)
      if (serviceId === "other") setShowOtherInput(false)
    } else {
      newSelected = [...current, serviceId]
      if (serviceId === "other") setShowOtherInput(true)
    }
    setStep2Data({
      ...step2Data,
      selectServe: newSelected,
      extra: needPickup,
    })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <ProgressBar />

      <div className="px-4 pt-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">預約項目</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <p className="text-md font-bold">服務項目（可複選）</p>
              <div className="grid gap-3">
                {services.map((service) => (
                  <Button
                    key={service.id}
                    variant={step2Data?.selectServe?.includes(service.label) ? "default" : "outline"}
                    onClick={() => toggleService(service.label)}
                    className="h-12 justify-start"
                  >
                    {service.label}
                  </Button>
                ))}
              </div>
            </div>

            {step2Data?.selectServe?.includes("other") && (
              <div className="space-y-2">
                <Label htmlFor="other-service">請說明其他服務需求</Label>
                <Textarea
                  id="other-service"
                  placeholder="請詳細說明您的服務需求..."
                  className="min-h-[100px]"
                  value={step2Data?.otherService || ""}
                  onChange={e =>
                    setStep2Data({
                      ...step2Data,
                      otherService: e.target.value,
                    })
                  }
                />
              </div>
            )}

            <div className="space-y-4">
              <p className="text-md font-bold">額外服務</p>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pickup"
                  checked={step2Data?.extra || false}
                  onCheckedChange={(checked) => {
                    setStep2Data({
                      ...step2Data,
                      extra: checked === true,
                    })
                  }}
                />
                <Label htmlFor="pickup" className="text-sm font-normal">
                  需要到府牽車
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <StepButtonGroup isNextDisabled={step2Data?.selectServe.length === 0} />
    </div>
  )
}
