// DonorPage.jsx
import React, { useEffect, useState } from 'react';   // ✅ make sure useState, useEffect are imported
import Header from '../component/Header';
import DonateCard from '../component/DonateCard';
import ProgressSection from '../component/ProgressSection';
import BottomNav from '../component/BottomNav';
import bikeImg from '../asset/donor_bike.png';
import medicineImg from '../asset/medicine.png';
import MedicineCard from '../component/MedicineCard';

const DonorPage = () => {
  // ✅ define medicine state at the top inside component
  const [medicine, setMedicine] = useState({
    name: "Medicine Name",
    description: "Necessitati Dignissimos Dignissimos Reprehender Necessitati",
    tag: "Liver Medicines",
    expiry: "20/05/2027",
    image: medicineImg,
    arriving: "Arriving Tomorrow For Pickup"
  });

  // ✅ load from localStorage (dynamic values after form submission)
  useEffect(() => {
    const savedMedicine = localStorage.getItem("medicineData");
    if (savedMedicine) {
      setMedicine(JSON.parse(savedMedicine));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 ">
      <Header userType="Donor" switchTo="Receiver" bikeImage={bikeImg} />
      <div className="p-4 mt-4 flex-grow">        
        <DonateCard />

        {/* ✅ medicine is defined because we use state */}
        <MedicineCard
          name={medicine.name}
          description={medicine.description}
          tag={medicine.tag}
          expiry={medicine.expiry}
          image={medicine.image}
          arriving={medicine.arriving}
        />

        <ProgressSection />
      </div>
      <BottomNav />
    </div>
  );
};

export default DonorPage;
