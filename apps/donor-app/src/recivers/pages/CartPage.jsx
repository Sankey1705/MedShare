import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const updateQty = (id, delta) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2 text-xl">←</button>
        <h2 className="text-lg font-semibold">Cart</h2>
      </div>

      {cart.map((item) => (
        <div key={item.id} className="flex items-center bg-white p-3 rounded-xl mb-3 shadow">
          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-3" />
          <div className="flex-1">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">{item.expiry}</p>
            <div className="flex items-center mt-1">
              <button onClick={() => updateQty(item.id, -1)} className="px-2">-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, 1)} className="px-2">+</button>
            </div>
          </div>
          <button onClick={() => removeItem(item.id)} className="text-red-500">🗑</button>
        </div>
      ))}

      <button
        onClick={() => navigate("/user-details")}
        className="bg-blue-500 text-white py-3 rounded-full w-full font-medium"
      >
        Place Order
      </button>
    </div>
  );
};

export default CartPage;
