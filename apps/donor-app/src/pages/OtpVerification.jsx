import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  linkWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";

export default function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [err, setErr] = useState("");
  const confirmationRef = useRef(null);

  const phone = sessionStorage.getItem("pending_phone") || "+15555550123"; // ✅ default test phone

  const isDev = window.location.hostname === "localhost";

  const sendOtp = async () => {
    try {
      setErr("");
      setSending(true);

      if (isDev) {
        // ✅ Skip reCAPTCHA completely in dev
        console.log("Using Firebase test phone auth (dev mode)");
        confirmationRef.current = {
          confirm: (code) => {
            if (code === "111111") {
              return Promise.resolve({ user: auth.currentUser || { uid: "test-user" } });
            } else {
              return Promise.reject(new Error("Invalid test code"));
            }
          },
        };
      } else {
        // ✅ Production: normal phone auth with reCAPTCHA
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            { size: "invisible" },
            auth
          );
        }

        if (auth.currentUser) {
          confirmationRef.current = await linkWithPhoneNumber(
            auth.currentUser,
            phone,
            window.recaptchaVerifier
          );
        } else {
          confirmationRef.current = await signInWithPhoneNumber(
            auth,
            phone,
            window.recaptchaVerifier
          );
        }
      }
    } catch (e) {
      console.error("Error sending OTP ❌", e);
      setErr(e.message || "Failed to send OTP");
    } finally {
      setSending(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setErr("");
      setVerifying(true);
      console.log("Verifying OTP:", otp);

      await confirmationRef.current.confirm(otp); // ✅ works in dev + prod

      sessionStorage.removeItem("pending_phone");
      console.log("OTP verified ✅");
      navigate("/Modes", { replace: true });
    } catch (e) {
      console.error("OTP verification failed ❌", e);
      setErr(e.message || "Invalid OTP");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 pt-8 pb-6">
      <h1 className="text-2xl font-bold">OTP Verification</h1>

      <div className="space-y-3">
        {!isDev && <div id="recaptcha-container" />} {/* ✅ skip in dev */}

        <div className="flex gap-3">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter OTP"
            className="flex-1 border rounded-xl px-4 py-3 outline-none tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={sendOtp}
            disabled={sending}
            className="px-4 rounded-xl border text-sm font-semibold active:scale-[0.99] transition"
          >
            {sending ? "Sending..." : "Send OTP"}
          </button>
        </div>

        {err && <p className="text-sm text-red-600">{err}</p>}

        <button
          onClick={verifyOtp}
          disabled={verifying || !otp}
          className="w-full py-4 rounded-2xl text-white text-lg font-semibold
                     bg-blue-500 disabled:opacity-60 active:scale-[0.99] transition"
        >
          {verifying ? "Verifying..." : "Verify & Continue"}
        </button>
      </div>
    </div>
  );
}
