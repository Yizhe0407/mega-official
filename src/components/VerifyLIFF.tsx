"use client";
import liff from "@line/liff";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useStepStore } from "@/store/step-store";

export default function VerifyLIFF() {
  const { setUserId } = useStepStore();
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
          liff.getProfile()
            .then((profile) => {
              setUserId(profile.userId);
              toast.success("User's ID: " + profile.userId);
            })
            .catch((err) => {
              toast.error("取得 profile 失敗");
              console.log("error", err);
            });
        } else {
          toast.error("尚未登入 LINE");
        }
      });
  }, [setUserId]);
  return <div></div>;
}
