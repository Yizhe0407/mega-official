"use client";
import liff from "@line/liff";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStepStore } from "@/store/step-store";

export default function VerifyLIFF() {
  const router = useRouter();
  const { setUserId, setStep1Data } = useStepStore();
  const liffInitialized = useRef(false);

  useEffect(() => {
    if (liffInitialized.current) {
      return;
    }
    liffInitialized.current = true;

    const initializeAndFetchProfile = async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        if (!liffId) {
          console.error("LIFF ID is not defined.");
          toast.error("LIFF 設定錯誤");
          return;
        }

        await liff.init({
          liffId: liffId,
          withLoginOnExternalBrowser: true,
        });

        if (!liff.isLoggedIn()) {
          liff.login();
          return; // 登入會重新導向，後續程式碼不執行
        }

        // 登入後，直接取得 LINE Profile
        const lineProfile = await liff.getProfile();
        const currentUserId = lineProfile.userId;
        setUserId(currentUserId);

        // 取得 userId 後，立即獲取後端儲存的 Profile
        const response = await fetch(`/api/profile?id=${currentUserId}`);

        if (response.status === 404) {
          // 新用戶，只設定從 LINE 來的 pictureUrl，然後導向設定頁面
          setStep1Data({ pictureUrl: lineProfile.pictureUrl });
          router.push("/profile");
          return;
        }

        if (!response.ok) {
          console.error("Failed to fetch profile:", response.statusText);
          toast.error("無法取得使用者資料");
          return;
        }

        const dbProfile = await response.json();

        // 將 LINE Profile 和資料庫 Profile 合併後，一次性更新到 store
        setStep1Data({
          pictureUrl: lineProfile.pictureUrl,
          name: dbProfile.name || "",
          phone: dbProfile.phone || "",
          license: dbProfile.license || "",
        });
      } catch (error) {
        console.error("LIFF/Profile process failed:", error);
        toast.error("初始化或讀取資料時發生錯誤");
      }
    };

    initializeAndFetchProfile();
  }, [router, setUserId, setStep1Data]);

  return <div></div>;
}
