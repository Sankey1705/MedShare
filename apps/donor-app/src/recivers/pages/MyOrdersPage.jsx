import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase";
import BottomNav from "../../component/BottomNav";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, "orders"));
      const querySnapshot = await getDocs(q);
      const ords = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(ords);
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-lg font-semibold mb-4">My Orders</h2>

      <h3 className="font-medium mb-2">Arriving</h3>
      {orders
        .filter((o) => o.status === "arriving")
        .map((order) => (
          <div key={order.id} className="bg-white p-3 rounded-lg shadow mb-3">
            <p className="font-medium">{order.medicineName}</p>
            <p className="text-sm text-gray-500">Arriving on {order.arrivalDate}</p>
          </div>
        ))}

      <h3 className="font-medium mt-4 mb-2">Delivered</h3>
      {orders
        .filter((o) => o.status === "delivered")
        .map((order) => (
          <div key={order.id} className="bg-white p-3 rounded-lg shadow mb-3">
            <p className="font-medium">{order.medicineName}</p>
            <p className="text-sm text-gray-500">Delivered on {order.deliveryDate}</p>
          </div>
        ))}

      <BottomNav userType="Receiver" />
    </div>
  );
};

export default MyOrdersPage;
