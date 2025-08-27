import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        ...form,
        email: auth.currentUser.email,
        profileCompleted: true,
      });
      navigate("/profile"); // go to styled ProfilePage
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />
        <select
          name="role"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Role</option>
          <option value="Donor">Donor</option>
          <option value="Receiver">Receiver</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
