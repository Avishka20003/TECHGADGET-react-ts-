import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.get("http://localhost:5000/api/v1/users/get-all-customers", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.data); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("CONFIRM_USER_REMOVAL_OPERATION?")) {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:5000/api/v1/auth/delete-customer/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      fetchUsers();
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">MANAGE_USER_DATABASE</h2>
      </div>
      
      <div className="bg-neutral-900 border-2 border-neutral-800 p-8">
        <table className="w-full text-left font-mono">
          <thead className="text-neutral-500 text-[10px] uppercase tracking-widest">
            <tr>
              <th className="pb-6">USER_NAME</th>
              <th className="pb-6">EMAIL_ADDRESS</th>
              <th className="pb-6">ACCESS_ROLE</th>
              <th className="pb-6 text-right">OPERATIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {users.map((u: any) => (
              <tr key={u._id} className="text-sm font-bold text-white hover:bg-neutral-800 transition-colors">
                <td className="py-6">{u.name}</td>
                <td className="py-6 text-neutral-400">{u.email}</td>
                <td className="py-6 uppercase">{u.roles}</td>
                <td className="py-6 text-right">
                  <button 
                    onClick={() => handleDelete(u._id)} 
                    className="text-red-600 hover:text-red-400 uppercase text-[10px] font-black underline"
                  >
                    REMOVE_ACCESS
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Users;