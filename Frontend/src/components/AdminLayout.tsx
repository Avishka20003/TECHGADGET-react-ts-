import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }: any) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      <div className="h-1 bg-red-600 w-full" />
      
      <AdminNavbar />
      
      <main className="max-w-7xl mx-auto p-8 border-l border-r border-neutral-900 min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;