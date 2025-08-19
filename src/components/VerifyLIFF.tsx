"use client";
import liff from "@line/liff";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function VerifyLIFF() {
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
        toast.success(liff.isLoggedIn() ? "登入成功" : "登入失敗");
        liff
          .getProfile()
          .then((profile) => {
            const userId = profile.userId;
            console.log("User's ID:", userId);
          })
          .catch((err) => {
            console.log("error", err);
          });
          toast.success("LIFF 初始化成功");
      });
  }, []);
  return <div></div>;
}
