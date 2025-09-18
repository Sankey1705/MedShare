// src/components/ProfileCard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaHome, FaPen } from "react-icons/fa";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ProfileCard = ({ userData }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(userData || null);
  const [loading, setLoading] = useState(!userData);

  // ✅ Fetch from Firestore if no userData passed
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!auth.currentUser) return;
        const refDoc = doc(db, "users", auth.currentUser.uid);
        const snap = await getDoc(refDoc);
        if (snap.exists()) {
          setProfile(snap.data());
        } else {
          // fallback from Auth if Firestore has no doc yet
          setProfile({
            name: auth.currentUser.displayName || "Unnamed User",
            email: auth.currentUser.email || "",
            phone: auth.currentUser.phoneNumber || "",
            address: "",
            photoURL: auth.currentUser.photoURL || "/profile-default.png",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!userData) {
      fetchProfile();
    }
  }, [userData]);

  // ✅ Show loader if still fetching
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow p-5 border">
        <p className="text-center text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-2xl shadow p-5 border">
        <p className="text-center text-gray-500">No profile found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-5 border">
      {/* Profile image and info */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={
            profile.photoURL ||
            profile.profilePic || // old key fallback
            "/profile-default.png"
          }
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-lg font-semibold">{profile.name}</h2>
          <div className="flex items-center text-sm text-gray-600">
            <FaPhone className="mr-2 text-blue-500" />
            {profile.phone || "No phone"}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaEnvelope className="mr-2 text-blue-500" />
            {profile.email || "No email"}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaHome className="mr-2 text-blue-500" />
            {profile.address || "No address"}
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <button
        onClick={() => navigate("/EditProfile")}
        className="w-full border rounded-full py-2 flex items-center justify-center text-blue-500 border-blue-400 hover:bg-blue-50"
      >
        <FaPen className="mr-2" /> Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
