"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { useStepStore } from "@/store/step-store";

export default function page() {
  const [isEditing, setIsEditing] = useState(false);
  const { userId } = useStepStore();
  const step1Data = useStepStore((state) => state.step1Data); // 取得目前資料
  const setStep1Data = useStepStore((state) => state.setStep1Data);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);

    async function updateProfile() {
      await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({
          userId,
          ...step1Data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    updateProfile();
    async function getProfile() {
      const response = await fetch(`/api/profile?id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setStep1Data({
        name: data.name || "",
        phone: data.phone || "",
        license: data.license || "",
      });
    }
    getProfile();
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background pb-24">
      <div className="px-4 py-6">
        {/* 用戶頭像區域 */}
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-20 h-20 mb-3">
            <AvatarFallback className="text-lg font-medium">
              {step1Data?.name}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold">{step1Data?.name || ""}</h1>
        </div>

        {/* 基本資料卡片 */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">基本資料</CardTitle>
            {!isEditing ? (
              <Button variant="ghost" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-1" />
                編輯
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                </Button>
                <Button variant="default" size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name">姓名</Label>
              {isEditing ? (
                <Input
                  id="profile-name"
                  value={step1Data?.name || ""}
                  onChange={(e) => setStep1Data({ name: e.target.value })}
                  className="h-12"
                />
              ) : (
                <div className="h-12 px-3 py-2 border rounded-md bg-muted/50 flex items-center">
                  {step1Data?.name || ""}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-phone">手機號碼</Label>
              {isEditing ? (
                <Input
                  id="profile-phone"
                  type="tel"
                  value={step1Data?.phone || ""}
                  onChange={(e) => setStep1Data({ phone: e.target.value })}
                  className="h-12"
                />
              ) : (
                <div className="h-12 px-3 py-2 border rounded-md bg-muted/50 flex items-center">
                  {step1Data?.phone || ""}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-license">車牌號碼</Label>
              {isEditing ? (
                <Input
                  id="profile-license"
                  value={step1Data?.license || ""}
                  onChange={(e) => setStep1Data({ license: e.target.value })}
                  className="h-12"
                />
              ) : (
                <div className="h-12 px-3 py-2 border rounded-md bg-muted/50 flex items-center">
                  {step1Data?.license || ""}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
