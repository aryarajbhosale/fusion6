import React, { useEffect, useState } from "react";
import { getFromLocalDB, clearFromLocalDB } from "../data/localDB";

type Order = {
  id: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getFromLocalDB("orders", []));
  }, []);

  const handleClearOrders = () => {
    clearFromLocalDB("orders");
    setOrders([]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <div key={idx} className="border rounded-lg p-4 shadow">
              <h2 className="font-semibold">Order #{order.id}</h2>
              <ul className="list-disc ml-5 mt-2">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.qty} — ₹{item.price * item.qty}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-bold">Total: ₹{order.total}</p>
            </div>
          ))}
        </div>
      )}
      {orders.length > 0 && (
        <button
          onClick={handleClearOrders}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Orders
        </button>
      )}
    </div>
  );
};

export default Orders;
