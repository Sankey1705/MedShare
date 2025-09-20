import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import MyDonationCard from "../component/MyDonationCard";
import BottomNav from "../component/BottomNav";

const MyDonations = () => {
  const [user] = useAuthState(auth);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (!user) return;

    // ✅ Get user donations excluding pending, latest first
    const q = query(
      collection(db, "donations"),
      where("userId", "==", user.uid),
      where("status", "==", "ready_for_pickup"), // Only include confirmed donations
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonations(docs);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-center mb-6">My Donations</h2>

      {donations.length === 0 ? (
        <p className="text-gray-500 text-center">No confirmed donations yet.</p>
      ) : (
        donations.map((donation) => (
          <MyDonationCard
            key={donation.id}
            name={donation.name}
            description={donation.description}
            category={donation.category}
            expiry={donation.expiry}
            imageUrl={donation.scannedImageUrl || null}
            status={donation.status === "ready_for_pickup" ? "Arriving Tomorrow For Pickup" : donation.status}
          />
        ))
      )}

      <BottomNav />
    </div>
  );
};

export default MyDonations;
