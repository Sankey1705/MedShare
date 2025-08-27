// src/App.js
import React from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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

// Firebase
import { db, auth, storage } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

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
      <Route path="/" element={<Modes />} />
      <Route path="/donor" element={<DonorPage />} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route path="/donation-form" element={<DonationForm />} />
      <Route path="/profile" element={<ProfilePage />} />
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
