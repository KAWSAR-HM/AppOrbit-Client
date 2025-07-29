// // src/routes/Routes.jsx
// import { createBrowserRouter } from "react-router-dom";
// import MainLayout from "../layout/MainLayout";
// import Home from "../pages/Home";
// import Error from "../pages/Error";

// import AdminLayout from "../components/dashboard/AdminLayout";
// import Statistics from "../pages/admin/Statistics";
// import ManageUsers from "../pages/admin/ManageUsers";
// import ManageCoupons from "../pages/admin/ManageCoupons";
// import { Navigate } from "react-router-dom";

// import ModeratorLayout from "../components/dashboard/ModeratorLayout";
// import ModeratorHome from "../pages/moderator/ModeratorHome";
// import ReviewQueue from "../pages/moderator/ReviewQueue";
// import ReportedContents from "../pages/moderator/ReportedContents";

// import UserLayout from "../components/dashboard/userDashboardLayout";
// import MyProfile from "../pages/user/MyProfile";
// import AddProduct from "../pages/user/AddProduct";
// import MyProducts from "../pages/user/MyProducts";
// import ProductsPage from "../pages/ProductsPage";
// import PrivateRoutes from "./PrivateRoutes";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/products",
//         element: <ProductsPage />,
//       },
//       {
//         path: "/admin/dashboard", // ✅ এই লাইন নতুন
//         element: <Navigate to="/dashboard/admin/statistics" />, // ✅ এই লাইন নতুন
//       },
//       {
//         path: "/dashboard/admin",
//         element: <AdminLayout />,
//         children: [
//           {
//             path: "statistics",
//             element: <Statistics />,
//           },
//           {
//             path: "manage-users",
//             element: <ManageUsers />,
//           },
//           {
//             path: "manage-coupons",
//             element: <ManageCoupons />,
//           },
//         ],
//       },
//       {
//         path: "/moderator/dashboard",
//         element: <ModeratorLayout />,
//         children: [
//           {
//             index: true,
//             element: <ModeratorHome />,
//           },
//           {
//             path: "review-queue",
//             element: <ReviewQueue />,
//           },
//           {
//             path: "reported-contents",
//             element: <ReportedContents />,
//           },
//         ],
//       },
//       {
//         path: "/user/dashboard",
//         element: <UserLayout />,
//         children: [
//           {
//             index: true,
//             element: <MyProfile />,
//           },
//           {
//             path: "my-profile",
//             element: <MyProfile />,
//           },
//           {
//             path: "add-product",
//             element: <AddProduct />,
//           },
//           {
//             path: "my-products",
//             element: <MyProducts />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// export default router;

// src/routes/Routes.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Error from "../pages/Error";
import ProductsPage from "../pages/ProductsPage";

// Dashboard Layouts
import AdminLayout from "../components/dashboard/AdminLayout";
import ModeratorLayout from "../components/dashboard/ModeratorLayout";
import UserLayout from "../components/dashboard/userDashboardLayout";

// Admin Pages
import Statistics from "../pages/admin/Statistics";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageCoupons from "../pages/admin/ManageCoupons";

// Moderator Pages
import ModeratorHome from "../pages/moderator/ModeratorHome";
import ReviewQueue from "../pages/moderator/ReviewQueue";
import ReportedContents from "../pages/moderator/ReportedContents";

// User Pages
import MyProfile from "../pages/user/MyProfile";
import AddProduct from "../pages/user/AddProduct";
import MyProducts from "../pages/user/MyProducts";

// Route Guards
import PrivateRoutes from "./PrivateRoutes";
import RoleBasedRoute from "./RoleBasedRoute"; // ✅ নতুন যুক্ত করব নিচে

import ViewModal from "../components/common/ViewModal";

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
        path: "/product/:id",
        element: <ViewModal />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },

      // ✅ Admin Route
      {
        path: "/admin/dashboard",
        element: <Navigate to="/dashboard/admin/statistics" />,
      },
      {
        path: "/dashboard/admin",
        element: (
          <PrivateRoutes>
            <RoleBasedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </RoleBasedRoute>
          </PrivateRoutes>
        ),
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

      // ✅ Moderator Route
      {
        path: "/moderator/dashboard",
        element: (
          <PrivateRoutes>
            <RoleBasedRoute allowedRoles={["moderator"]}>
              <ModeratorLayout />
            </RoleBasedRoute>
          </PrivateRoutes>
        ),
        children: [
          {
            index: true,
            element: <ModeratorHome />,
          },
          {
            path: "review-queue",
            element: <ReviewQueue />,
          },
          {
            path: "reported-contents",
            element: <ReportedContents />,
          },
        ],
      },

      // ✅ User Route
      {
        path: "/user/dashboard",
        element: (
          <PrivateRoutes>
            <RoleBasedRoute allowedRoles={["user", "admin", "moderator"]}>
              <UserLayout />
            </RoleBasedRoute>
          </PrivateRoutes>
        ),
        children: [
          {
            index: true,
            element: <MyProfile />,
          },
          {
            path: "my-profile",
            element: <MyProfile />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "my-products",
            element: <MyProducts />,
          },
        ],
      },
    ],
  },
]);

export default router;
