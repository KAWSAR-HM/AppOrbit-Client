// src/routes/Routes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Error from "../pages/Error";

import AdminLayout from "../components/dashboard/AdminLayout";
import Statistics from "../pages/admin/Statistics";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageCoupons from "../pages/admin/ManageCoupons";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin/dashboard", // ✅ এই লাইন নতুন
        element: <Navigate to="/dashboard/admin/statistics" />, // ✅ এই লাইন নতুন
      },
      {
        path: "/dashboard/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "statistics",
            element: <Statistics />,
          },
          {
            path: "manage-users",
            element: <ManageUsers />,
          },
          {
            path: "manage-coupons",
            element: <ManageCoupons />,
          },
        ],
      },
    ],
  },
]);

export default router;
