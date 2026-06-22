import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-lg border-b-2 border-red-600">
      <div className="flex items-center space-x-2">
        <Link to="/" className="font-bold text-2xl tracking-widest text-red-600 cursor-pointer">
          TECH<span className="text-white">GADGET</span>
        </Link>
      </div>

      <div className="hidden md:flex space-x-8 font-semibold text-sm tracking-widest">
        <Link to="/" className="hover:text-red-500 transition">HOME</Link>
        <Link to="/shop" className="hover:text-red-500 transition">SHOP ALL</Link>
        <Link to="/about" className="hover:text-red-500 transition">ABOUT US</Link>
      </div>

      <div className="flex items-center space-x-6 text-sm font-semibold">
        <span className="cursor-pointer hover:text-red-500 transition">Account</span>
        <span className="cursor-pointer hover:bg-red-700 transition bg-red-600 px-4 py-1.5 rounded-sm">
          Cart (0)
        </span>
      </div>
    </nav>
  )
}

export default Navbar