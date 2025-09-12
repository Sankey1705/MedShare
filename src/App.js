// src/App.js
import React from "react";
import { useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Modes from "./pages/modes";
import DonorPage from "./pages/DonorPage";
import RewardsPage from "./pages/RewardsPages";
import DonationForm from "./pages/DonationForm";
import Scanner from "./pages/Scanner";
import MedOverview from "./pages/MedOverview";
import EditDetailsPage from "./pages/EditDetailsPage";
import PickupDetailsPage from "./pages/PickupDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import ReceiverPage from "./recivers/ReciversPages/ReciverPage";
import MedicineCardReciver from "./recivers/ReciversComponents/MedicineCardReciver";

//backend pages import signup login

import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./component/ProtectedRoute";

// Firebase
import { db, auth, storage } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import ProfileForm from "./pages/EditProfile";
import GetStarted from "./pages/GetStarted";
import OtpVerification from "./pages/OtpVerification";
import EditProfile from "./pages/EditProfile";

function App() {
  useEffect(() => {
    const testFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testCollection"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (error) {
        console.error("Error fetching test data: ", error);
      }
    };

    testFirestore();
  }, []);

  return (
    <Routes>
      <Route path="/MedShare" element={<GetStarted />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/otp" element={<OtpVerification />} />
      <Route path="/Modes" element={<Modes />} />

      <Route path="*" element={<Navigate to="/signin" replace />} />

      <Route path="/donor" element={<DonorPage />} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route
        path="/donation-form"
        element={
          <ProtectedRoute>
            <DonationForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/medoverview" element={<MedOverview />} />
      <Route path="/edit-details" element={<EditDetailsPage />} />
      <Route path="/pickup-details" element={<PickupDetailsPage />} />
      <Route path="/receiver" element={<ReceiverPage />} />
      <Route path="/medicine/:id" element={<MedicineCardReciver />} />
    </Routes>
  );
}

export default App;
