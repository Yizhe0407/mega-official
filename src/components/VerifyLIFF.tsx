"use client";
import liff from "@line/liff";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStepStore } from "@/store/step-store";

export default function VerifyLIFF() {
  const router = useRouter();
  const { userId, setUserId, setStep1Data } = useStepStore();
  const liffInitialized = useRef(false); // 使用 ref 防止重複初始化

  // Effect for LIFF initialization and getting user ID
  useEffect(() => {
    // 防止在開發模式的嚴格模式下重複執行
    if (liffInitialized.current) {
      return;
    }
    liffInitialized.current = true;

    const initializeLiff = async () => {
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

        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          setUserId(profile.userId);
          // 將從 LINE 取得的 pictureUrl 存到 store
          if (profile.pictureUrl) {
            setStep1Data({ pictureUrl: profile.pictureUrl });
          }
        } else {
          liff.login();
        }
      } catch (error) {
        console.error("LIFF Initialization failed:", error);
        toast.error("LIFF 初始化失敗");
      }
    };

    initializeLiff();
  }, [setUserId]);

  // Effect for fetching profile data once userId is available
  useEffect(() => {
    if (!userId) {
      return;
    }

    const getProfile = async () => {
      try {
        const response = await fetch(`/api/profile?id=${userId}`);

        if (response.status === 404) {
          // 新用戶，導向設定頁面
          router.push("/profile");
          return;
        }

        if (!response.ok) {
          console.error("Failed to fetch profile:", response.statusText);
          toast.error("無法取得使用者資料");
          return;
        }

        const data = await response.json();
        setStep1Data({
          name: data.name || "",
          phone: data.phone || "",
          license: data.license || "",
        });
      } catch (error) {
        console.error("Error fetching or parsing profile data:", error);
        toast.error("讀取資料時發生錯誤");
      }
    };

    getProfile();
  }, [userId, router, setStep1Data]);

  return <div></div>;
}
