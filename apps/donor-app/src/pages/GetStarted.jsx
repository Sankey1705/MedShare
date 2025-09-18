import React from "react";
import { useNavigate } from "react-router-dom";
import StartedImg from "../asset/Started.png";

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 pt-8 pb-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Let&apos;s Get Started!</h1>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center">
        {/* Put "Get Started.png" in /public */}
        <img
          src={StartedImg}
          alt="Get Started"
          className="max-w-[320px] w-full h-auto"
        />
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate("/signup")}
        className="w-full py-4 rounded-2xl text-white text-lg font-semibold
                   bg-blue-500 active:scale-[0.99] transition"
      >
        Lets Get Started
      </button>
    </div>
  );
}
