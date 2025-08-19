"use client";
import { useState, useEffect } from "react";
import { useStepStore } from "@/store/step-store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Save, X, Loader2 } from "lucide-react";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { userId } = useStepStore();
  const step1Data = useStepStore((state) => state.step1Data); // 取得目前資料
  const setStep1Data = useStepStore((state) => state.setStep1Data);
  const [localData, setLocalData] = useState(step1Data);

  useEffect(() => {
    if (!isEditing) {
      setLocalData(step1Data);
    }
  }, [step1Data, isEditing]);

  const handleEdit = () => {
    setLocalData(step1Data); // 進入編輯模式時，從 store 同步資料到本地 state
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // 不做任何事，localData 將在下次編輯時被重置
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({
          userId,
          ...localData, // 使用本地 state 的資料進行儲存
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to update profile");
        return;
      }

      setStep1Data(localData); // 儲存成功後，更新到 store
      setIsEditing(false);
    } catch (error) {
      console.error("An error occurred while saving the profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background pb-24">
      <div className="px-4 py-6">
        {/* 用戶頭像區域 */}
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-20 h-20 mb-3">
            <AvatarImage src={step1Data?.pictureUrl} alt="User Avatar" />
            <AvatarFallback className="text-lg font-medium"></AvatarFallback>
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {!step1Data?.name && (
              <p className="text-sm text-muted-foreground -mt-2 mb-4">
                請先完成基本資料設定，未來系統將會自動帶入，節省您的時間。
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="profile-name">姓名</Label>
              {isEditing ? (
                <Input
                  id="profile-name"
                  value={localData?.name || ""}
                  onChange={(e) =>
                    setLocalData({ ...localData, name: e.target.value })
                  }
                  className="h-12"
                  disabled={isSaving}
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
                  value={localData?.phone || ""}
                  onChange={(e) =>
                    setLocalData({ ...localData, phone: e.target.value })
                  }
                  className="h-12"
                  disabled={isSaving}
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
                  value={localData?.license || ""}
                  onChange={(e) =>
                    setLocalData({ ...localData, license: e.target.value })
                  }
                  className="h-12"
                  disabled={isSaving}
                />
              ) : (
                <div className="h-12 px-3 py-2 border rounded-md bg-muted/50 flex items-center">
                  {step1Data?.license || ""}
                </div>
              )}
            </div>
          </CardContent>
          {isEditing && (
            <CardFooter>
              <p className="text-xs text-muted-foreground text-center w-full">
                更新完畢後，請點擊右上角的儲存按鈕。
              </p>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
