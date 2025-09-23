import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", aadhaar: "" });

  const handleSubmit = () => {
    localStorage.setItem("userDetails", JSON.stringify(form));
    navigate("/order-success");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-lg font-semibold mb-4">Your Details</h2>
      <input
        type="text"
        placeholder="Receiver's full name"
        className="w-full border rounded-lg p-2 mb-3"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone Number"
        className="w-full border rounded-lg p-2 mb-3"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        className="w-full border rounded-lg p-2 mb-3"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <input
        type="text"
        placeholder="Aadhaar Details"
        className="w-full border rounded-lg p-2 mb-3"
        onChange={(e) => setForm({ ...form, aadhaar: e.target.value })}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-3 rounded-full w-full font-medium"
      >
        Next
      </button>
    </div>
  );
};

export default UserDetailsPage;
