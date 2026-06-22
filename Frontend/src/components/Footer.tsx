const Footer = () => {
  return (
    <footer className="w-full bg-neutral-950 text-neutral-400 relative overflow-hidden mt-20 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-neutral-800">
          
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-white italic tracking-tighter">TECH<span className="text-red-600">GADGET</span>.</h3>
            <p className="text-sm leading-relaxed">
              Premium hardware for the next generation. Precision engineered for performance and style.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-8 h-8 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center text-sm cursor-pointer hover:bg-red-600 hover:text-white transition">🌐</span>
              <span className="w-8 h-8 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center text-sm cursor-pointer hover:bg-red-600 hover:text-white transition">📸</span>
              <span className="w-8 h-8 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center text-sm cursor-pointer hover:bg-red-600 hover:text-white transition">👥</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><a href="#" className="hover:text-red-500 transition">Home</a></li>
              <li><a href="#about-us" className="hover:text-red-500 transition">About Us</a></li>
              <li><a href="/shop" className="hover:text-red-500 transition">Shop All</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-widest">Categories</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li className="hover:text-red-500 cursor-pointer transition">Gaming Rig</li>
              <li className="hover:text-red-500 cursor-pointer transition">Audio</li>
              <li className="hover:text-red-500 cursor-pointer transition">Wearables</li>
              <li className="hover:text-red-500 cursor-pointer transition">Accessories</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-widest">Newsletter</h4>
            <p className="text-xs">Subscribe for tech drops & exclusive deals.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-neutral-900 border border-neutral-800 text-white text-sm rounded-sm px-3 py-2 w-full placeholder-neutral-600 focus:outline-none focus:border-red-600"
              />
              <button className="bg-red-600 text-white font-bold text-sm px-4 py-2 rounded-sm hover:bg-red-700 transition">Join</button>
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 font-medium gap-4">
          <p>© 2026 TechGadget. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer