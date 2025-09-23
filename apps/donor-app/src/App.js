import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Modes from "./pages/modes";
import DonorPage from "./pages/DonorPage";
import DonationForm from "./pages/DonationForm";
import Scanner from "./pages/Scanner";

import EditDetailsPage from "./pages/EditDetailsPage";
import PickupDetailsPage from "./pages/PickupDetailsPage";
import ProfilePage from "./pages/ProfilePage";

// ✅ Receiver side imports
import ReceiverHome from "./recivers/pages/reciversHome";
import CartPage from "./recivers/pages/CartPage";
import UserDetailsPage from "./recivers/pages/UserDetailsPage";
import OrderSuccessPage from "./recivers/pages/OrderSuccessPage";
import MyOrdersPage from "./recivers/pages/MyOrdersPage";
import MedicineDetailsPage from "./recivers/pages/MedicineDetailsPage";
import AllMedicinesPage from "./recivers/pages/AllMedicinesPage";


// backend pages import signup login
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./component/ProtectedRoute";

// Firebase
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import GetStarted from "./pages/GetStarted";
import OtpVerification from "./pages/OtpVerification";
import EditProfile from "./pages/EditProfile";
import MyDonations from "./pages/MyDonations";
import ConfirmPickup from "./pages/ConfirmPickup";




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
      {/* Auth & onboarding */}
      <Route path="/MedShare" element={<GetStarted />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/otp" element={<OtpVerification />} />
      <Route path="/Modes" element={<Modes />} />
      

      {/* Donor side */}
      <Route path="/donor" element={<DonorPage />} />
      <Route path="/mydonations" element={<MyDonations />} />
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
      <Route path="/Edit-Profile" element={<EditProfile />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/confirm-pickup" element={<ConfirmPickup />} />
      <Route path="/edit-details" element={<EditDetailsPage />} />
      <Route path="/pickup-details" element={<PickupDetailsPage />} />

      {/* ✅ Receiver side */}
      <Route path="/receiver" element={<ReceiverHome />} />
      <Route path="/medicine/:id" element={<MedicineDetailsPage />} />
      <Route path="/all-medicines" element={<AllMedicinesPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/user-details" element={<UserDetailsPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
      <Route path="/my-orders" element={<MyOrdersPage />} />

      <Route path="*" element={<Navigate to="/signin" replace />} />
      
    </Routes>
  );
}

export default App;
