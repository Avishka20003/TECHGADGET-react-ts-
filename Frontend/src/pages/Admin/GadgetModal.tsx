import { useState, useEffect } from "react";
import axios from "axios";

const GadgetModal = ({ isOpen, onClose, gadget, onSave }: any) => {
  const [formData, setFormData] = useState({ name: "", category: "", price: "", stock: "", imageURL: "", description: "" });

  useEffect(() => {
    if (gadget) setFormData(gadget);
    else setFormData({ name: "", category: "", price: "", stock: "", imageURL: "", description: "" });
  }, [gadget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    if (gadget) await axios.put(`http://localhost:5000/api/gadgets/${gadget._id}`, formData, config);
    else await axios.post("http://localhost:5000/api/gadgets/save", formData, config);
    
    onSave();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 font-mono">
      <div className="bg-neutral-900 border-4 border-white p-8 w-full max-w-lg relative shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        <h2 className="text-2xl font-black mb-6 uppercase italic border-b-4 border-red-600 pb-2">
          {gadget ? "UPDATE_GADGET" : "INITIALIZE_NEW_GADGET"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-4 bg-black border-2 border-neutral-700 text-white outline-none focus:border-red-600 uppercase font-bold text-sm" placeholder="GADGET_NAME" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          
          <div className="grid grid-cols-2 gap-4">
            <input className="p-4 bg-black border-2 border-neutral-700 text-white outline-none focus:border-red-600 uppercase font-bold text-sm" placeholder="PRICE" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            <input className="p-4 bg-black border-2 border-neutral-700 text-white outline-none focus:border-red-600 uppercase font-bold text-sm" placeholder="STOCK" type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
          </div>
          
          <input className="w-full p-4 bg-black border-2 border-neutral-700 text-white outline-none focus:border-red-600 uppercase font-bold text-sm" placeholder="IMAGE_URL" value={formData.imageURL} onChange={e => setFormData({...formData, imageURL: e.target.value})} required />
          <textarea className="w-full p-4 bg-black border-2 border-neutral-700 text-white outline-none focus:border-red-600 uppercase font-bold text-sm" placeholder="DESCRIPTION" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
          
          <button className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            {gadget ? "SAVE_CHANGES" : "ADD_GADGET"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default GadgetModal;