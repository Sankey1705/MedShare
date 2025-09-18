// src/pages/DonorPage.jsx
import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import DonateCard from "../component/DonateCard";
import ProgressSection from "../component/ProgressSection";
import BottomNav from "../component/BottomNav";
import bikeImg from "../asset/donor_bike.png";
import medicineImg from "../asset/medicine.png";
// ❌ remove MedicineCard
// import MedicineCard from "../component/MedicineCard";
import MyDonationCard from "../component/MyDonationCard";

import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const DonorPage = () => {
  const [latestDonation, setLatestDonation] = useState({
    name: "Medicine Name",
    description: "Necessitati Dignissimos Dignissimos Reprehender Necessitati",
    category: "General",
    expiry: "N/A",
    imageUrl: medicineImg,
    status: "Arriving Tomorrow For Pickup",
  });

  // ✅ Fetch most recent donation from Firestore
  useEffect(() => {
    const fetchLatestDonation = async () => {
      try {
        const donationsRef = collection(db, "donations");
        const q = query(donationsRef, orderBy("createdAt", "desc"), limit(1));
        const querySnap = await getDocs(q);

        if (!querySnap.empty) {
          const docSnap = querySnap.docs[0];
          const donation = docSnap.data();

          setLatestDonation({
            name: donation.name || "Medicine Name",
            description: donation.description || "No description provided",
            category: donation.category || "General",
            expiry: donation.expiry || "N/A",
            imageUrl: donation.scannedImageUrl || medicineImg,
            status: "Arriving Tomorrow For Pickup",
          });
        }
      } catch (err) {
        console.error("Error fetching latest donation:", err);
      }
    };

    fetchLatestDonation();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header userType="Donor" switchTo="Receiver" bikeImage={bikeImg} />
      <div className="p-4 mt-4 flex-grow">
        <DonateCard />

        {/* ✅ Latest donation using MyDonationCard */}
        <MyDonationCard
          name={latestDonation.name}
          description={latestDonation.description}
          category={latestDonation.category}
          expiry={latestDonation.expiry}
          imageUrl={latestDonation.imageUrl}
          status={latestDonation.status}
        />

        <ProgressSection />
      </div>
      <BottomNav userType="Donor" />
    </div>
  );
};

export default DonorPage;
