import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../component/BottomNav";
import bikeImg from "../../asset/receiver_bike.png";
import MedicineCardReciver from "../components/MedicineCardReciver";
import Header from "../../component/Header";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";

const ReceiverHome = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMedicines = async () => {
      const q = query(
        collection(db, "donations"),
        where("status", "==", "available"), // ✅ fetch only available medicines
        orderBy("pickupConfirmedAt", "desc"), // ✅ sort by latest
        limit(6) // ✅ show only recent ones
      );
      const querySnapshot = await getDocs(q);
      const meds = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMedicines(meds);
      localStorage.setItem("availableMedicines", JSON.stringify(meds));
    };
    fetchMedicines();
  }, []);

  const filtered = medicines.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header userType="Receiver" switchTo="Donor" bikeImage={bikeImg} />

      {/* Search Bar */}
      <div className="p-4">
        <h3 className="font-semibold mb-2">Search For Medicines</h3>
        <input
          type="text"
          placeholder="Search for medicines"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-full px-4 py-2 focus:ring focus:outline-none"
        />
      </div>

      {/* Medicine List */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Available Medicines</h3>
          <button
            onClick={() => navigate("/all-medicines")}
            className="text-blue-500 text-sm"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((med) => (
            <div key={med.id} onClick={() => navigate(`/medicine/${med.id}`)}>
              <MedicineCardReciver {...med} />
            </div>
          ))}
        </div>
      </div>

      <BottomNav userType="Receiver" />
    </div>
  );
};

export default ReceiverHome;
