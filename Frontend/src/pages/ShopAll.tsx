import { useState } from "react"

const products = [
  { id: 1, name: "Pro Gaming Laptop", price: "$1200.00", img: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=500", category: "Computers" },
  { id: 2, name: "Wireless Headphones", price: "$150.00", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500", category: "Audio" },
  { id: 3, name: "Mechanical Keyboard", price: "$90.00", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=500", category: "Accessories" },
  { id: 4, name: "UltraWide Monitor", price: "$450.00", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3a35?q=80&w=500", category: "Computers" },
  { id: 5, name: "Smart Watch V2", price: "$200.00", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500", category: "Wearables" },
  { id: 6, name: "Gaming Mouse", price: "$60.00", img: "https://images.unsplash.com/photo-1527864550417-7fd91051a465?q=80&w=500", category: "Accessories" },
];

const ShopAll = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black uppercase italic mb-10 border-l-4 border-red-600 pl-4">Hardware Collection</h1>
        
        <input 
          type="text" 
          placeholder="SEARCH GADGETS..." 
          className="w-full bg-neutral-900 border border-neutral-800 p-3 mb-10 uppercase font-bold focus:border-red-600 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((p) => (
            <div key={p.id} className="border border-neutral-800 p-3 hover:border-red-600 transition-all group">
              <img src={p.img} className="w-full h-40 object-cover mb-3 grayscale group-hover:grayscale-0 transition" />
              
              <p className="text-[10px] text-neutral-500 uppercase font-bold">{p.category}</p>
              <h3 className="font-bold text-sm uppercase mt-1 truncate">{p.name}</h3>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-red-500 font-black">{p.price}</span>
                <button className="text-[10px] border border-white px-3 py-1 hover:bg-white hover:text-black uppercase font-bold">Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopAll