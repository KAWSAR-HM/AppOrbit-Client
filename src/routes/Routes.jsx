// src/routes/Routes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // ✅ এখানেই MainLayout বসে
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // অন্য পেজগুলোও এখানে যোগ করো
    ],
  },
]);

export default router;
