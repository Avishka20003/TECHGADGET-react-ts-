import React, { useState } from 'react';
import { registerUser } from '../service/authService';

const Register = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false); 

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await registerUser(formData);
      alert("REGISTRATION_SUCCESSFUL");
      onClose();
    } catch (err) {
      console.error(err);
      alert("REGISTRATION_FAILED");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm font-mono">
      <div className="bg-neutral-900 border-4 border-white p-8 w-full max-w-lg relative shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        
        <button onClick={onClose} className="absolute top-4 right-4 font-black text-xl hover:text-red-500">✕</button>
        
        <h2 className="text-3xl font-black italic uppercase border-b-4 border-red-600 pb-2 mb-8">
          Initialize_Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Full Name</label>
            <input 
              className="w-full bg-black border-2 border-neutral-700 p-4 text-white font-bold uppercase outline-none focus:border-red-600" 
              placeholder="YOUR_FULL_NAME" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Email</label>
            <input 
              className="w-full bg-black border-2 border-neutral-700 p-4 text-white font-bold uppercase outline-none focus:border-red-600" 
              placeholder="EMAIL_ADDRESS" 
              type="email" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Password</label>
            <input 
              className="w-full bg-black border-2 border-neutral-700 p-4 text-white font-bold uppercase outline-none focus:border-red-600" 
              placeholder="SECURE_PASSWORD" 
              type="password" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-600 text-white py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-50"
          >
            {loading ? "INITIALIZING..." : "Create_Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;