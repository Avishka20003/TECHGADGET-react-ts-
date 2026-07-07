import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getMyOrders, downloadOrderInvoice } from '../service/orderService';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (confirm("CONFIRM_ORDER_CANCELLATION?")) {
      try {
        await axios.put(`http://localhost:5000/api/v1/orders/cancel/${id}`, {}, {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").accessToken}` }
        });
        fetchOrders();
      } catch (err) { alert("ACTION_FAILED"); }
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center font-black text-red-600 tracking-[0.5em]">SYSTEM_SYNC...</div>;

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 font-mono">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-black mb-12 uppercase italic border-l-8 border-red-600 pl-6">
          Order_Log
        </h1>
        
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="border-2 border-neutral-800 p-16 text-center">
              <h3 className="text-2xl font-black uppercase mb-4">No_Active_Logs</h3>
              <button onClick={() => navigate('/shop')} className="bg-red-600 text-black px-8 py-4 font-black uppercase hover:bg-white transition">Explore_Hardware</button>
            </div>
          ) : (
            orders.map((order: any) => (
              <div key={order._id} className="bg-neutral-900 border-2 border-neutral-800 p-8 transition-all hover:border-red-600">
                
                <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Reference_ID</p>
                    <p className="text-xl font-black">{order.invoiceNumber}</p>
                  </div>
                  <div className={`px-4 py-1 font-black text-[10px] uppercase border ${order.status === 'Pending' ? 'border-yellow-600 text-yellow-500' : 'border-green-600 text-green-500'}`}>
                    {order.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase mb-2">Assets</p>
                    <div className="space-y-1">
                      {order.items.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between font-bold border-b border-neutral-800 py-1">
                          <span>{item.name}</span>
                          <span className="text-red-500">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase mb-2">Deployment_Location</p>
                    <p className="text-sm font-bold uppercase">{order.shippingAddress}</p>
                    <p className="text-sm font-black text-neutral-400">{order.phone}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8 border-t border-neutral-800 pt-6">
                  <p className="text-sm font-black uppercase text-neutral-500">Total_Transaction</p>
                  <p className="text-3xl font-black text-red-600">LKR {order.totalAmount}</p>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => downloadOrderInvoice(order._id)} className="flex-1 border-2 border-white py-4 font-black uppercase text-xs hover:bg-white hover:text-black transition">Download_Invoice</button>
                  {order.status === 'Pending' && (
                    <>
                      <button onClick={() => handleDelete(order._id)} className="flex-1 bg-red-600 text-black py-4 font-black uppercase text-xs hover:bg-red-700 transition">Cancel_Operation</button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;