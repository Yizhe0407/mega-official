"use client"
import StepperClient from "@/components/StepperClient";
import liff from "@line/liff";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Home() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (liff.isLoggedIn()) {
      liff.getProfile()
        .then((profile) => {
          setUserId(profile.userId);
          toast.success("User's ID: " + profile.userId);
          console.log("User's ID:", profile.userId);
        })
        .catch((err) => {
          toast.error("取得 profile 失敗");
          console.log("error", err);
        });
    } else {
      toast.error("尚未登入 LINE");
      console.log("尚未登入 LINE");
    }
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <StepperClient />
      <div>用戶 ID: {userId}</div>
    </div>
  );
}
