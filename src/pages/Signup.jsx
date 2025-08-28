import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // E.g. +91xxxxxxxxxx
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleContinue = async () => {
    setErr("");
    if (!email || !password || !phone) {
      setErr("Please fill all fields.");
      return;
    }
    if (!phone.startsWith("+")) {
      setErr("Phone must be in E.164 format, e.g., +91XXXXXXXXXX");
      return;
    }
    try {
      setLoading(true);
      // 1) Create Email/Password account
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      // 2) Store phone temporarily and go to OTP page to link phone
      sessionStorage.setItem("pending_phone", phone);
      navigate("/otp", { replace: true });
    } catch (e) {
      setErr(e.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 pt-8 pb-6">
      <h1 className="text-2xl font-bold">Sign Up</h1>

    

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-xl px-4 py-3 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl px-4 py-3 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone (e.g. +91XXXXXXXXXX)"
          className="w-full border rounded-xl px-4 py-3 outline-none"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl px-4 py-3 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {err && <p className="text-sm text-red-600">{err}</p>}

        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full py-4 rounded-2xl text-white text-lg font-semibold
                     bg-blue-500 disabled:opacity-60 active:scale-[0.99] transition"
        >
          {loading ? "Creating..." : "Continue"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
