import React, { useState } from 'react';
import { loginUser } from '../service/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      const userData = response.data;
      localStorage.setItem("accessToken", userData.accessToken);
      localStorage.setItem("userRole", userData.roles[0]);
      setUser(userData);
      onClose();
      if (userData.roles.includes("ADMIN")) navigate("/admin/dashboard");
      else navigate("/");
    } catch (err) {
      alert("AUTH_FAILED");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 font-mono">
      <div className="bg-neutral-900 border-4 border-white p-8 w-full max-w-lg relative shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        
        <h2 className="text-3xl font-black italic uppercase border-b-4 border-red-600 pb-2 mb-8">
          WELCOME_BACK
        </h2>
        <button onClick={onClose} className="absolute top-4 right-4 font-black text-xl hover:text-red-500">✕</button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-black border-2 border-neutral-700 p-4 text-white font-bold uppercase focus:border-red-600 outline-none"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-black border-2 border-neutral-700 p-4 text-white font-bold uppercase focus:border-red-600 outline-none"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 text-white py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;