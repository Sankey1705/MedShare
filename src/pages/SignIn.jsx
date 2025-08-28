import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setErr("");
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Modes", { replace: true });
    } catch (e) {
      setErr(e.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 pt-8 pb-6">
      <h1 className="text-2xl font-bold">Sign In</h1>

     

      <div className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl px-4 py-3 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleSignIn}
          disabled={loading}
          className="w-full py-4 rounded-2xl text-white text-lg font-semibold
                     bg-blue-500 disabled:opacity-60 active:scale-[0.99] transition"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-600">
          New here?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
