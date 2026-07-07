import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderModal from '../components/OrderModal';
import Footer from '../components/Footer';

const GadgetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gadget, setGadget] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchGadget = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/gadgets/${id}`);
        const result = await response.json();
        setGadget(result.data || result);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGadget();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-black tracking-[0.5em] animate-pulse">LOADING_SYSTEM...</div>;

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-red-600 selection:text-black">
      
      <div className="h-1 bg-red-600 w-full mb-12"></div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-l border-neutral-900 pl-8">
          
          <div className="relative group">
            <div className="absolute -left-12 top-0 text-[10px] text-red-600 writing-vertical-rl rotate-180 uppercase tracking-widest">Gadget.Ref: {id?.slice(0,8)}</div>
            <img src={gadget.imageURL} alt={gadget.name} className="w-full grayscale hover:grayscale-0 transition-all duration-700 contrast-125" />
            <div className="mt-6 border-b border-red-600 w-20"></div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-red-600 font-black text-sm tracking-[0.3em] uppercase mb-2">{gadget.category}</span>
            <h1 className="text-7xl font-black uppercase italic mb-8 leading-none">{gadget.name}</h1>
            <p className="text-neutral-400 text-lg mb-10 border-l-2 border-neutral-800 pl-6">{gadget.description}</p>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
               <div className="bg-neutral-900/50 p-6 border border-neutral-800">
                  <p className="text-[10px] text-neutral-500 uppercase">Current Price</p>
                  <p className="text-3xl font-black text-white">LKR {gadget.price}</p>
               </div>
               <div className="bg-red-600/10 p-6 border border-red-900">
                  <p className="text-[10px] text-red-500 uppercase">Stock Level</p>
                  <p className="text-3xl font-black text-red-500">{gadget.stock} Units</p>
               </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowModal(true)} 
                className="flex-1 bg-red-600 text-black py-4 font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                Initiate Purchase
              </button>
              <button 
                onClick={() => navigate(-1)} 
                className="px-8 border border-neutral-700 hover:border-white uppercase font-bold transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {showModal && <OrderModal gadget={gadget} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default GadgetDetails;