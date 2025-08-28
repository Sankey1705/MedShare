import React, { useState } from "react";

const OtpPage = () => {
  const [otp, setOtp] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Enter OTP</h2>
        
        <div className="flex justify-between">
          {Array(4).fill("").map((_, i) => (
            <input
              key={i}
              maxLength={1}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={otp[i] || ""}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                let newOtp = otp.split("");
                newOtp[i] = val;
                setOtp(newOtp.join(""));
              }}
            />
          ))}
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpPage;
