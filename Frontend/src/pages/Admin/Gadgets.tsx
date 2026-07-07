import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import GadgetModal from './GadgetModal';

const Gadgets = () => {
  const [gadgets, setGadgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGadget, setEditingGadget] = useState(null);

  useEffect(() => { fetchGadgets(); }, []);

const fetchGadgets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gadgets/all");
      
      console.log("Full Response:", res.data);

      setGadgets(Array.isArray(res.data) ? res.data : (res.data.data || []));

    } catch (err) {
      console.error("Error fetching gadgets:", err);
      setGadgets([]); 
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">MANAGE_GADGETS</h2>
        <button 
          onClick={() => { setEditingGadget(null); setIsModalOpen(true); }} 
          className="bg-red-600 text-white px-8 py-3 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          + ADD_NEW_GADGET
        </button>
      </div>

      <div className="bg-neutral-900 border-2 border-neutral-800 p-8">
        <table className="w-full text-left font-mono">
          <thead className="text-neutral-500 text-[10px] uppercase tracking-widest">
            <tr>
              <th className="pb-6">GADGET_NAME</th>
              <th className="pb-6">PRICE</th>
              <th className="pb-6">STOCK</th>
              <th className="pb-6 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {gadgets.map((g: any) => (
              <tr key={g._id} className="text-sm font-bold text-white hover:bg-neutral-800 transition-colors">
                <td className="py-6">{g.name}</td>
                <td className="py-6">LKR {g.price}</td>
                <td className="py-6">{g.stock}</td>
                <td className="py-6 text-right space-x-6">
                  <button onClick={() => { setEditingGadget(g); setIsModalOpen(true); }} className="text-white hover:text-red-500 uppercase text-[10px] font-black underline">EDIT</button>
                  <button onClick={() => handleDelete(g._id)} className="text-red-600 hover:text-red-400 uppercase text-[10px] font-black underline">DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <GadgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} gadget={editingGadget} onSave={fetchGadgets} />
    </AdminLayout>
  );
};
export default Gadgets;