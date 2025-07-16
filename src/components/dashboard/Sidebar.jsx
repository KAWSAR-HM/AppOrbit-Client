import { NavLink } from "react-router-dom";
import {
  RiDashboardLine,
  RiUserLine,
  RiCouponLine,
  RiMenuLine,
  RiCloseLine,
  RiHome2Line,
} from "react-icons/ri";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      icon: <RiDashboardLine className="w-6 h-6" />,
      to: "/dashboard/admin/statistics",
    },
    {
      name: "Users",
      icon: <RiUserLine className="w-6 h-6" />,
      to: "/dashboard/admin/manage-users",
    },
    {
      name: "Coupons",
      icon: <RiCouponLine className="w-6 h-6" />,
      to: "/dashboard/admin/manage-coupons",
    },
  ];

  return (
    <>
      {/* ✅ Mobile Topbar with Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between px-4 py-3 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          {isOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>
        <h1 className="text-xl font-semibold">AppOrbit</h1>
      </div>

      {/* ✅ Sidebar */}
      <aside
        className={`bg-white shadow-lg fixed top-0 z-40 h-full 
          w-16 lg:w-64 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-4 border-b flex justify-center lg:justify-start">
          <h1 className="text-2xl font-pacifico text-blue-500">AppOrbit</h1>
        </div>

        {/* ✅ Navigation */}
        <nav className="p-2">
          <ul className="space-y-2">
            {/* Home Button */}
            <li>
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg justify-center lg:justify-start transition ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <RiHome2Line className="w-6 h-6" />
                <span className="hidden lg:inline">Home</span>
              </NavLink>
            </li>

            {/* Other Nav Items */}
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg justify-center lg:justify-start transition ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.icon}
                  <span className="hidden lg:inline">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
