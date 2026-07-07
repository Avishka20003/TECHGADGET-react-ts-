import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer" 

const ShopAll = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]); 
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gadgets/all");
        const result = await response.json(); 
        
        if (result && result.data) {
          setProducts(result.data); 
        } else {
          setProducts([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hardware:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow p-6 md:p-12 max-w-7xl mx-auto w-full">
        <h1 className="text-4xl font-black uppercase italic mb-10 border-l-4 border-red-600 pl-4">Hardware Collection</h1>
        
        <input 
          type="text" 
          placeholder="SEARCH GADGETS..." 
          className="w-full bg-neutral-900 border border-neutral-800 p-3 mb-10 uppercase font-bold focus:border-red-600 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-neutral-500 font-bold animate-pulse uppercase">System Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((p) => (
              <div key={p._id} className="border border-neutral-800 p-4 hover:border-red-600 transition-all group bg-neutral-950">
                <div className="overflow-hidden mb-3">
                    <img src={p.imageURL} className="w-full h-40 object-cover grayscale group-hover:grayscale-0 transition duration-500 group-hover:scale-105" alt={p.name} />
                </div>
                
                <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">{p.category}</p>
                <h3 className="font-bold text-sm uppercase mt-1 truncate">{p.name}</h3>
                
                <div className="flex justify-between items-center mt-5">
                  <span className="text-red-500 font-black text-lg">LKR {p.price}</span>
                  <button 
                    onClick={() => navigate(`/gadgets/${p._id}`)} 
                    className="text-[10px] border border-white px-4 py-2 hover:bg-white hover:text-black uppercase font-bold transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ShopAll