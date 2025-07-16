import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="pt-16 lg:pt-0 lg:ml-64 ml-0 transition-all duration-300 ease-in-out p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
