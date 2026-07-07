import { useState } from 'react';
import { placeOrder } from '../service/orderService';

const OrderModal = ({ gadget, onClose }: { gadget: any, onClose: (updatedStock?: number) => void }) => {
  const [formData, setFormData] = useState({ customerName: "", shippingAddress: "", phone: "" });
  const [quantity, setQuantity] = useState(1);

  const submitOrder = async () => {
    try {
      await placeOrder({ 
        ...formData, 
        items: [{ gadgetId: gadget._id, name: gadget.name, quantity, price: gadget.price }], 
        totalAmount: gadget.price * quantity 
      });
      alert("Order Transaction Successful!");
      onClose(gadget.stock - quantity); 
    } catch (err) { alert("Transaction Failed."); }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-neutral-900 w-full max-w-lg border-4 border-white shadow-[0_0_20px_rgba(220,38,38,0.3)]">

        <div className="bg-red-600 p-6 text-black">
          <h2 className="text-3xl font-black uppercase italic">Checkout_Sequence</h2>
          <p className="text-black/80 text-xs font-bold uppercase tracking-widest mt-1">Order_Ref: {gadget.name}</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center bg-black p-4 border border-neutral-700">
            <span className="font-black text-sm uppercase tracking-widest">Quantity</span>
            <div className="flex items-center gap-6">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-xl font-black hover:text-red-500 transition">-</button>
              <span className="font-black text-xl w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(gadget.stock, q + 1))} className="text-xl font-black hover:text-red-500 transition">+</button>
            </div>
          </div>

          <input className="w-full bg-black border-2 border-neutral-700 p-4 text-sm font-bold uppercase outline-none focus:border-red-600" 
                 placeholder="FULL_NAME" onChange={e => setFormData({...formData, customerName: e.target.value})} />
          
          <input className="w-full bg-black border-2 border-neutral-700 p-4 text-sm font-bold uppercase outline-none focus:border-red-600" 
                 placeholder="SHIPPING_ADDRESS" onChange={e => setFormData({...formData, shippingAddress: e.target.value})} />
          
          <input className="w-full bg-black border-2 border-neutral-700 p-4 text-sm font-bold uppercase outline-none focus:border-red-600" 
                 placeholder="PHONE_NUMBER" onChange={e => setFormData({...formData, phone: e.target.value})} />

          <div className="flex justify-between items-center border-t border-neutral-700 pt-6">
            <span className="font-black uppercase tracking-widest">Total_Payable</span>
            <span className="text-3xl font-black text-red-500">${gadget.price * quantity}.00</span>
          </div>
        </div>

        <div className="p-8 pt-0 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 border-2 border-neutral-700 font-bold uppercase hover:border-white transition">Cancel</button>
          <button onClick={submitOrder} className="flex-1 bg-white text-black py-4 font-black uppercase hover:bg-red-600 hover:text-white transition shadow-lg">Confirm_Order</button>
        </div>
      </div>
    </div>
  );
};
export default OrderModal;