// src/components/dashboard/userDashboardLayout.jsx

import UserSidebar from "./UserSidebar";
import { Outlet } from "react-router-dom";

const UserDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Fixed on left */}
      <UserSidebar />

      {/* Main content */}
      <main className="pt-16 lg:pt-4 lg:ml-64 ml-0 transition-all duration-300 ease-in-out p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardLayout;
