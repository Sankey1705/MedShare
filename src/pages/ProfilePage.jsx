// src/pages/ProfilePage.jsx
import React, { useContext, useEffect, useState } from "react";
import ProfileCard from "../component/ProfileCard";
import BottomNav from "../component/BottomNav";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const ProfilePage = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/signin"); // 🔐 redirect if not signed in
      return;
    }

    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (snap) => {
      if (snap.exists()) {
        setUserData({ uid: auth.currentUser.uid, ...snap.data() });
      } else {
        // fallback: use auth user if no Firestore doc yet
        setUserData({
          uid: auth.currentUser.uid,
          name: auth.currentUser.displayName || "User",
          email: auth.currentUser.email || "No email",
          phone: auth.currentUser.phoneNumber || "No number",
          address: "",
          photoURL: auth.currentUser.photoURL || "/profile-default.png",
          role: "User",
        });
      }
    });

    return () => unsub();
  }, [navigate]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!userData) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {userData.role || "User"} Profile
        </h2>
      </div>

      {/* Profile Card — always fed consistent data */}
      <ProfileCard userData={userData} />

      {/* Other Options */}
      <div className="mt-6 space-y-4">
        <div className="bg-white rounded-2xl shadow p-4 border">
          <p className="py-2 border-b">Documents</p>
          <p className="py-2 border-b">Refer and Earn</p>
          <p className="py-2">Offers</p>
        </div>

        {/* Role-Specific Section */}
        {userData.role === "Donor" && (
          <div className="bg-white rounded-2xl shadow p-4 border">
            <p className="text-green-600 font-medium">🎁 Donor Bonus Rewards</p>
          </div>
        )}
        {userData.role === "Receiver" && (
          <div className="bg-white rounded-2xl shadow p-4 border">
            <p className="text-blue-600 font-medium">
              🎉 Receiver Special Benefits
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow p-4 border">
          <p className="py-2 border-b">Help</p>
          <p className="py-2 border-b">About Us</p>
          <p className="py-2 border-b">Terms and Conditions</p>
          <p
            className="py-2 text-red-500 font-medium cursor-pointer"
            onClick={() => auth.signOut().then(() => navigate("/"))}
          >
            Log Out
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
