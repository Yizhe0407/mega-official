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
              console.log("User ID:", userId);
            })
            .catch((err) => {
              console.log("error", err);
            });
        }
      });

    async function getProfile() {
      const response = await fetch(`/api/profile?id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${liff.getAccessToken()}`,
        },
      });

      if (response.status === 404) {
        router.push("/profile");
      }
      const data = await response.json();
      console.log("Profile data:", data);
      setStep1Data({
        name: data.name || "",
        phone: data.phone || "",
        license: data.license || "",
      });
    }
    getProfile();
  }, [setUserId]);
  return <div></div>;
}
