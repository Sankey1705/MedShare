import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-6xl text-blue-500 mb-4">✔</div>
      <h2 className="text-xl font-semibold mb-2">Your order has been placed successfully!</h2>
      <p className="text-gray-600 mb-6">Your order will be delivered between 3 Oct - 7 Oct 25</p>
      <button
        onClick={() => navigate("/my-orders")}
        className="bg-blue-500 text-white py-3 rounded-full w-3/4 font-medium"
      >
        Continue
      </button>
    </div>
  );
};

export default OrderSuccessPage;
