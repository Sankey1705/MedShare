// src/components/ProfileCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaHome, FaPen } from "react-icons/fa";

const ProfileCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow p-5 border">
      {/* Profile image and info */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <div className="flex items-center text-sm text-gray-600">
            <FaPhone className="mr-2 text-blue-500" />
            {user.phone}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaEnvelope className="mr-2 text-blue-500" />
            {user.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaHome className="mr-2 text-blue-500" />
            {user.address}
          </div>
        </div>
      </div>

      {/* Edit button */}
      <button
        onClick={() => navigate("/edit-details")}
        className="w-full border rounded-full py-2 flex items-center justify-center text-blue-500 border-blue-400 hover:bg-blue-50"
      >
        <FaPen className="mr-2" /> Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
