"use client";
import liff from "@line/liff";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStepStore } from "@/store/step-store";

export default function VerifyLIFF() {
  const router = useRouter();
  const { userId, setUserId } = useStepStore();
  const setStep1Data = useStepStore((state) => state.setStep1Data);

  // Effect for LIFF initialization and getting user ID
  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
    if (!liffId) {
      console.error(
        "LIFF ID is not defined. Please set the LIFF_ID environment variable."
      );
      return;
    }
    liff
      .init({
        liffId: liffId,
        withLoginOnExternalBrowser: true,
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          toast.success("登入成功");
          liff
            .getProfile()
            .then((profile) => {
              setUserId(profile.userId);
            })
            .catch((err) => {
              console.log("error", err);
            });
        }
      });
  }, [setUserId]);

  // Effect for fetching profile data once userId is available
  useEffect(() => {
    async function getProfile() {
      // Only run if userId is available
      if (!userId) {
        return;
      }

      try {
        const response = await fetch(`/api/profile?id=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 404) {
          router.push("/profile");
          return;
        }

        if (!response.ok) {
          // Handle other server errors without trying to parse JSON
          console.error("Failed to fetch profile:", response.statusText);
          toast.error("無法取得使用者資料");
          return;
        }

        const data = await response.json();
        console.log("Profile data:", data);
        setStep1Data({
          name: data.name || "",
          phone: data.phone || "",
          license: data.license || "",
        });
      } catch (error) {
        console.error("Error fetching or parsing profile data:", error);
      }
    }
    getProfile();
  }, [userId, router, setStep1Data]); // Add all dependencies

  return <div></div>;
}
