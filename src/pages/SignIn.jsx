import React, { useState } from "react";

const PhoneNumberPage = () => {
  const [phone, setPhone] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Enter Phone Number</h2>
        
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
          <span className="text-gray-500 mr-2">+91</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="flex-1 outline-none bg-transparent"
          />
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          Get OTP
        </button>
      </div>
    </div>
  );
};

export default PhoneNumberPage;
