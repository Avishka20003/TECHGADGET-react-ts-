import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Package, Users, ShoppingCart, DollarSign } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); 
    fetch('http://localhost:5000/api/v1/admin/stats', {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => { if(data.success) setStats(data); });
  }, []);

  if (!stats) return <div className="min-h-screen bg-black text-red-600 p-10 font-black">SYSTEM_SYNC...</div>;

  const { cardStats, chartData } = stats;

  return (
    <div className="bg-black min-h-screen"> 
      <AdminLayout> 
        <div className="space-y-8 p-6 bg-black text-white font-mono">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="REVENUE" value={`LKR ${cardStats.totalRevenue}`} icon={<DollarSign className="text-red-600"/>} />
            <StatCard title="ORDERS" value={cardStats.totalOrders} icon={<ShoppingCart className="text-red-600"/>} />
            <StatCard title="GADGETS" value={cardStats.totalGadgets} icon={<Package className="text-red-600"/>} />
            <StatCard title="USERS" value={cardStats.totalUsers} icon={<Users className="text-red-600"/>} />
          </div>

          <div className="bg-black border-2 border-neutral-800 p-8">
            <h3 className="text-sm font-black text-white mb-8 uppercase tracking-widest border-l-4 border-red-600 pl-4">
              MONTHLY_REVENUE_OVERVIEW
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="_id" stroke="#737373" />
                  <YAxis stroke="#737373" />
                  <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #dc2626'}} />
                  <Bar dataKey="revenue" fill="#dc2626" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

const StatCard = ({ title, value, icon }: any) => (
  <div className="bg-black border-2 border-neutral-800 p-6 flex items-center gap-4 hover:border-red-600 transition-all">
    <div className="p-3 bg-neutral-900 border border-neutral-800">{icon}</div>
    <div>
      <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{title}</p>
      <h3 className="text-xl font-black">{value}</h3>
    </div>
  </div>
);

export default AdminDashboard;