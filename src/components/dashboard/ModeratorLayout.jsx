// src/layouts/ModeratorLayout.jsx
import { Outlet } from "react-router-dom";
import ModeratorSidebar from "./ModeratorSidebar";

const ModeratorLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ModeratorSidebar />
      <main className="pt-16 lg:pt-0 lg:ml-64 ml-0 transition-all duration-300 ease-in-out p-6 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ModeratorLayout;
