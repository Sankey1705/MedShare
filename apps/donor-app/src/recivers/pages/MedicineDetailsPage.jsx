import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MedicineDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("availableMedicines")) || [];
    const med = saved.find((m) => m.id === id);
    setMedicine(med);
  }, [id]);

  if (!medicine) return <p>Loading...</p>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((c) => c.id === medicine.id);
    if (!exists) {
      cart.push({ ...medicine, qty: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2 text-xl">←</button>
        <h2 className="text-lg font-semibold">Medicine Details</h2>
      </div>

      {/* Medicine Card */}
      <div className="bg-white rounded-2xl shadow p-4 border">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{medicine.name}</h3>
          <span className="border border-blue-400 text-blue-500 px-3 py-1 rounded-full text-xs">
            {medicine.category}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Description : {medicine.description}
        </p>
        <p className="text-sm font-medium">
          Expiration date : {medicine.expiry}
        </p>
      </div>

      <button
        onClick={addToCart}
        className="mt-auto bg-blue-500 text-white py-3 rounded-full w-full font-medium"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MedicineDetailsPage;
