// src/pages/ProfilePage.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // global state for user info
import { FaPhoneAlt, FaEnvelope, FaHome, FaEdit } from "react-icons/fa";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/medoverview"); // goes to MedOverview page for editing
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow p-4 text-center">
        <h2 className="text-lg font-semibold">Profile</h2>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-xl p-4 m-4">
        <div className="flex items-center space-x-4">
          <img
            src={user.image || "https://via.placeholder.com/80"}
            alt="profile"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h3 className="text-lg font-bold">{user.name}</h3>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <FaPhoneAlt className="mr-2 text-blue-500" /> {user.phone}
            </div>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <FaEnvelope className="mr-2 text-blue-500" /> {user.email}
            </div>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <FaHome className="mr-2 text-blue-500" /> {user.address}
            </div>
          </div>
        </div>

        {/* Edit Profile */}
        <button
          onClick={handleEdit}
          className="mt-4 flex items-center justify-center w-full border border-blue-400 text-blue-500 rounded-lg py-2 font-medium hover:bg-blue-50 transition"
        >
          <FaEdit className="mr-2" /> Edit Profile
        </button>
      </div>

      {/* Options */}
      <div className="bg-white shadow-md rounded-xl p-4 m-4 space-y-3">
        <p className="border-b pb-2">Documents</p>
        <p className="border-b pb-2">Refer and Earn</p>
        <p className="pb-2">Offers</p>
      </div>

      <div className="bg-white shadow-md rounded-xl p-4 m-4 space-y-3">
        <p className="border-b pb-2">Help</p>
        <p className="border-b pb-2">About Us</p>
        <p className="border-b pb-2">Terms and Conditions</p>
        <p className="text-red-500 font-medium">Log Out</p>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white border-t shadow-inner flex justify-around py-2">
        <button onClick={() => navigate("/")} className="flex flex-col items-center text-gray-500">
          <span className="material-icons">home</span>
          <p className="text-xs">Home</p>
        </button>
        <button onClick={() => navigate("/rewards")} className="flex flex-col items-center text-gray-500">
          <span className="material-icons">account_balance_wallet</span>
          <p className="text-xs">Rewards</p>
        </button>
        <button onClick={() => navigate("/profile")} className="flex flex-col items-center text-blue-500">
          <span className="material-icons">person</span>
          <p className="text-xs">Profile</p>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
