// DonorPage.jsx (Main Page)
import React from 'react';
import Header from '../component/Header';
import DonateCard from '../component/DonateCard';
import MedicineCard from '../component/MedicineCard';
import ProgressSection from '../component/ProgressSection';
import BottomNav from '../component/BottomNav';
import bikeImg from '../asset/donor_bike.png'; // Replace with actual image path
import medicineImg from '../asset/medicine.png';

const DonorPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 ">
      <Header userType="Donor" switchTo="Receiver" bikeImage={bikeImg} />
      <div className="p-4 mt-4 flex-grow">        
        <DonateCard />
        <MedicineCard
          name="Medicine Name"
          description="Necessitati Dignissimos Dignissimos Reprehender Necessitati"
          tag="Liver Medicines"
          expiry="21/05/2027"
          image={medicineImg}
        />
        <ProgressSection />
      </div>
      <BottomNav />
    </div>
  );
};

export default DonorPage;
