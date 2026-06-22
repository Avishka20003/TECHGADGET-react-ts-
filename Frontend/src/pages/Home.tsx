import { useState } from "react"

const Home = () => {
  const [categories] = useState([
    { name: "Gaming Rig", img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800" },
    { name: "Audio", img: "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=800" },
    { name: "Wearables", img: "https://images.unsplash.com/photo-1508685096489-7cab943bd152?q=80&w=800" },
    { name: "Accessories", img: "https://images.unsplash.com/photo-1596464530060-66444855483a?q=80&w=800" }
  ])

  return (
    <div className="bg-black text-white min-h-screen">
      
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center p-6 border-b border-neutral-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter z-10 uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
          Future Tech
        </h1>
        <p className="mt-6 text-xl text-neutral-400 max-w-2xl z-10">Experience the absolute peak of hardware engineering. Crafted for those who demand more.</p>
        <button className="mt-10 border border-white px-10 py-3 hover:bg-white hover:text-black transition-all font-bold uppercase tracking-widest z-10">
          Shop Hardware
        </button>
      </section>

      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-sm font-bold text-red-500 uppercase tracking-[0.3em] mb-12">Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[600px]">
          {categories.map((cat, i) => (
            <div key={i} className={`relative group overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
              <div className="absolute bottom-6 left-6 z-10">
                <p className="text-3xl font-bold uppercase italic">{cat.name}</p>
                <div className="w-0 h-1 bg-red-600 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-24 px-6 border-t border-neutral-800">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-[0.3em] mb-4">Our Vision</h2>
            <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-6">Built for the <br />Future Elite.</h3>
            <p className="text-neutral-400 leading-relaxed">
              We believe technology shouldn't just be functional—it should be an extension of your intent. 
              Our hardware is meticulously curated to provide uncompromising performance for professionals, 
              creators, and gamers who refuse to settle.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-neutral-800 p-6">
              <p className="text-3xl font-black text-red-600 mb-2">10+</p>
              <p className="text-sm uppercase font-bold tracking-widest">Years of Tech</p>
            </div>
            <div className="border border-neutral-800 p-6">
              <p className="text-3xl font-black text-red-600 mb-2">50K+</p>
              <p className="text-sm uppercase font-bold tracking-widest">Trusted Users</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 py-24 px-6 text-center border-t border-neutral-800">
        <h3 className="text-4xl font-light tracking-tight mb-6">"Performance doesn't have to be loud."</h3>
        <p className="text-neutral-500">Discover our silent-cooling series.</p>
      </section>
      
    </div>
  )
}

export default Home