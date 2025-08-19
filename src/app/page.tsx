import StepperClient from "@/components/StepperClient";
import liff from "@line/liff";
import { toast } from "react-hot-toast";

export default function Home() {
  let userId;
  liff
    .getProfile()
    .then((profile) => {
      userId = profile.userId;
      console.log("User's ID:", userId);
    })
    .catch((err) => {
      console.log("error", err);
    });
  toast.success("User's ID: " + userId);
  return (
    <div className="max-w-md mx-auto">
      <StepperClient />
    </div>
  );
}
