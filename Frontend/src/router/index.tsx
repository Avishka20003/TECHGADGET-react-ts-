import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import ShopAll from "../pages/ShopAll";
import GadgetDetails from "../pages/GadgetDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import OrderHistory from "../pages/OrderHistory";
import AdminDashboard from "../pages/AdminDashboard";
import Gadgets from "../pages/Admin/Gadgets";
import Users from "../pages/Admin/Users";
import Orders from "../pages/Admin/Orders";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("accessToken");
  return token && role === "ADMIN" ? children : <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopAll />} />
        <Route path="/gadgets/:id" element={<GadgetDetails />} />
        <Route path="/order-history" element={<OrderHistory />} />

        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/gadgets" element={<AdminRoute><Gadgets /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><Orders /></AdminRoute>} /> 
      </Routes>
    </Router>
  );
};

export default AppRouter;