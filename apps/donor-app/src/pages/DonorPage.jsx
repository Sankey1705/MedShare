import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import DonateCard from "../component/DonateCard";
import BottomNav from "../component/BottomNav";
import bikeImg from "../asset/donor_bike.png";
import medicineImg from "../asset/medicine.png";
import MyDonationCard from "../component/MyDonationCard";

import { db, auth } from "../firebase";
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";

const DonorPage = () => {
  const [latestDonation, setLatestDonation] = useState({
    name: "Medicine Name",
    description: "Necessitati Dignissimos Dignissimos Reprehender Necessitati",
    category: "General",
    expiry: "N/A",
    imageUrl: medicineImg,
    status: "Arriving Tomorrow For Pickup",
  });

  const [donationCount, setDonationCount] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (auth.currentUser) setUserId(auth.currentUser.uid);
  }, []);

  // Fetch latest confirmed donation
  useEffect(() => {
    if (!userId) return;

    const fetchLatestDonation = async () => {
      try {
        const donationsRef = collection(db, "donations");
        const q = query(
          donationsRef,
          where("userId", "==", userId),
          where("status", "==", "available"), // only confirmed
          orderBy("createdAt", "desc"),
          limit(1)
        );

        const querySnap = await getDocs(q);
        if (!querySnap.empty) {
          const donation = querySnap.docs[0].data();
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
  }, [userId]);

  // Fetch total donation count (excluding pending)
  useEffect(() => {
    if (!userId) return;

    const fetchDonationCount = async () => {
      try {
        const donationsRef = collection(db, "donations");
        const q = query(
          donationsRef,
          where("userId", "==", userId),
          where("status", "==", "available")
        );

        const querySnap = await getDocs(q);
        setDonationCount(querySnap.size);
      } catch (err) {
        console.error("Error fetching donation count:", err);
      }
    };

    fetchDonationCount();
  }, [userId]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header userType="Donor" switchTo="Receiver" bikeImage={bikeImg} />

      <div className="p-4 mt-4 flex-grow">
        <DonateCard />

        {/* Latest donation of current user */}
        {latestDonation && (
          <MyDonationCard
            name={latestDonation.name}
            description={latestDonation.description}
            category={latestDonation.category}
            expiry={latestDonation.expiry}
            imageUrl={latestDonation.imageUrl}
            status={latestDonation.status}
          />
        )}

        {/* Progress Section */}
        <div className="mt-6 bg-white p-4 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                <span className="text-blue-500 text-xl">💊</span>
              </div>
              <p className="text-2xl font-bold">{donationCount}</p>
              <p className="text-sm text-gray-500">Medicines Donated</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav userType="Donor" />
    </div>
  );
};

export default DonorPage;
