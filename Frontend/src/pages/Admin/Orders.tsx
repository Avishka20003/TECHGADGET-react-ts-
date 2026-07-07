import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import OrderModal from '../../components/OrderModal'; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://localhost:5000/api/v1/orders/all-orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data.data);
    } catch (err) { console.error("Error fetching orders:", err); }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">MANAGE_ORDERS</h2>
      </div>

      <div className="bg-neutral-900 border-2 border-neutral-800 p-8">
        <table className="w-full text-left font-mono">
          <thead className="text-neutral-500 text-[10px] uppercase tracking-widest">
            <tr>
              <th className="pb-6">USER_NAME</th>
              <th className="pb-6">TOTAL</th>
              <th className="pb-6">STATUS</th>
              <th className="pb-6 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {orders.map((o: any) => (
              <tr key={o._id} className="text-sm font-bold text-white hover:bg-neutral-800 transition-colors">
                <td className="py-6">{o.user?.name || "GUEST"}</td>
                <td className="py-6">LKR {o.totalPrice}.00</td>
                <td className="py-6">
                  <span className={`px-3 py-1 font-black text-[10px] uppercase border ${o.status === 'Pending' ? 'border-yellow-600 text-yellow-500' : 'border-green-600 text-green-500'}`}>
                    {o.status}
                  </span>
                </td>
                <td className="py-6 text-right">
                  <button 
                    onClick={() => setSelectedOrder(o)} 
                    className="text-white hover:text-red-500 uppercase text-[10px] font-black underline transition"
                  >
                    VIEW_EDIT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedOrder && (
        <OrderModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          onUpdate={fetchOrders} 
        />
      )}
    </AdminLayout>
  );
};

export default Orders;