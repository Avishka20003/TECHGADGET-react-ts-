import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import ShopAll from "./pages/ShopAll"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans antialiased">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopAll />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
export default App