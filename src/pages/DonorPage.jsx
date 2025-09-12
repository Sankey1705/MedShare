// src/pages/DonorPage.jsx
import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import DonateCard from "../component/DonateCard";
import ProgressSection from "../component/ProgressSection";
import BottomNav from "../component/BottomNav";
import bikeImg from "../asset/donor_bike.png";
import medicineImg from "../asset/medicine.png";
import MedicineCard from "../component/MedicineCard";

import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import MyDonationCard from "../component/MyDonationCard";

const DonorPage = () => {
  const [medicine, setMedicine] = useState({
    name: "Medicine Name",
    description: "Necessitati Dignissimos Dignissimos Reprehender Necessitati",
    tag: "General",
    expiry: "N/A",
    image: medicineImg,
    arriving: "Arriving Tomorrow For Pickup",
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

          setMedicine({
            name: donation.name || "Medicine Name",
            description: donation.description || "No description provided",
            tag: donation.category || "General",
            expiry: donation.expiry || "N/A",
            image: donation.scannedImage || medicineImg,
            arriving: "Arriving Tomorrow For Pickup",
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

        {/* ✅ MedicineCard now always shows latest Firestore donation */}
        <MyDonationCard
            key={donation.id}
            name={donation.name}
            description={donation.description}
            category={donation.category}
            expiry={donation.expiry}
            imageUrl={donation.scannedImageUrl} // ✅ stored Cloudinary URL
          />

        <ProgressSection />
      </div>
      <BottomNav userType="Donor" />
    </div>
  );
};

export default DonorPage;
