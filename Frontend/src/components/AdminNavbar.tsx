import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-black border-b-2 border-neutral-800 px-8 py-4 flex justify-between items-center sticky top-0 z-50 font-mono">
      <div className="flex items-center gap-12">
        <Link to="/admin/dashboard" className="font-black text-xl tracking-tighter text-white">
          ADMIN<span className="text-red-600">PANEL</span>
        </Link>
        <div className="flex gap-8 font-black text-[15px] text-neutral-500 uppercase tracking-widest">
          <Link to="/admin/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link to="/admin/gadgets" className="hover:text-white transition-colors">Gadgets</Link>
          <Link to="/admin/orders" className="hover:text-white transition-colors">Orders</Link>
          <Link to="/admin/users" className="hover:text-white transition-colors">Users</Link>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/')} 
        className="bg-transparent border border-white text-white px-6 py-2 text-[15px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
      >
        BACK_TO_SHOP
      </button>
    </nav>
  );
};
export default AdminNavbar;