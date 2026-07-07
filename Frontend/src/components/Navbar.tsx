import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useLocation } from 'react-router-dom';

const Navbar = () => {

  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b-2 border-red-600 px-8 py-5 flex justify-between items-center text-white shadow-[0_4px_10px_rgba(220,38,38,0.2)]">
        
        <Link to="/" className="font-black text-3xl italic tracking-tighter uppercase group">
          TECH<span className="text-red-600 group-hover:text-white transition-colors">GADGET</span>
        </Link>

        <div className="hidden md:flex space-x-10 font-black text-[11px] uppercase tracking-[0.2em] text-neutral-400">
          <Link to="/" className="hover:text-white transition-all">HOME</Link>
          <Link to="/shop" className="hover:text-white transition-all">SHOP_ALL</Link>
          <Link to="/about" className="hover:text-white transition-all">ABOUT_US</Link>
        </div>

        <div className="flex items-center gap-6 font-black text-[11px] uppercase tracking-widest">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="bg-neutral-900 border border-neutral-700 px-6 py-2.5 hover:border-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all"
              >
                MY_ACCOUNT{user.name?.slice(0,4).toUpperCase()}
              </button>
              
              {isOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-black border border-white py-1 shadow-[0_0_20px_rgba(255,255,255,0.1)] z-50">
                  <Link to="/my-account" className="block px-6 py-3 hover:bg-red-600 hover:text-black transition" onClick={() => setIsOpen(false)}>MY_PROFILE</Link>
                  <Link to="/order-history" className="block px-6 py-3 hover:bg-red-600 hover:text-black transition" onClick={() => setIsOpen(false)}>MY_ORDERS</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-6 py-3 text-red-500 hover:bg-red-600 hover:text-black transition">LOGOUT</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => setShowLogin(true)} className="text-neutral-400 hover:text-white transition">LOGIN</button>
              <button onClick={() => setShowRegister(true)} className="bg-white text-black px-8 py-3 hover:bg-red-600 hover:text-white transition shadow-[0_0_10px_rgba(255,255,255,0.2)]">CREATE_ACCOUNT</button>
            </>
          )}
        </div>
      </nav>

      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <Register isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </>
  );
};

export default Navbar;