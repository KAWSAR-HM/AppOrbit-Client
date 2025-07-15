// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar /> {/* উপরে ন্যাভবার */}
      <Outlet /> {/* যেখানে পেজের ভেতরের কন্টেন্ট রেন্ডার হবে */}
      {/* নিচে ফুটার */}
    </div>
  );
};

export default MainLayout;
