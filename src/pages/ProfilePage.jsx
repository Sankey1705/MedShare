import React, { useContext, useEffect } from "react";
import ProfileCard from "../component/ProfileCard";
import BottomNav from "../component/BottomNav";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && !user.profileCompleted) {
      navigate("/profile-form"); // if not complete, go fill form
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-xl font-semibold text-center mb-6">
        {user.role} Profile
      </h2>
      <ProfileCard user={user} />

      {/* Other Options */}
      <div className="mt-6 space-y-4">
        <div className="bg-white rounded-2xl shadow p-4 border">
          <p className="py-2 border-b">Documents</p>
          <p className="py-2 border-b">Refer and Earn</p>
          <p className="py-2">Offers</p>
        </div>

        {/* Role-Specific Section */}
        {user.role === "Donor" && (
          <div className="bg-white rounded-2xl shadow p-4 border">
            <p className="text-green-600 font-medium">🎁 Donor Bonus Rewards</p>
          </div>
        )}
        {user.role === "Receiver" && (
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
          <p className="py-2 text-red-500 font-medium">Log Out</p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default ProfilePage;






