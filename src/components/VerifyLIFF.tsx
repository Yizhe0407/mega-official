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
      });
  }, []);
  return <div></div>;
}
