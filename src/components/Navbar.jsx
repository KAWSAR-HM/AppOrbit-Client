import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import useUserRole from "../hooks/useUserRole";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);

  const [role, roleLoading] = useUserRole(user?.email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => setDropdownOpen(false))
      .catch((err) => console.error("Logout error:", err));
  };

  // ✅ Dynamically route based on role
  const dashboardLink = () => {
    if (role === "admin") return "/dashboard/admin/statistics";
    if (role === "moderator") return "/moderator/dashboard/review-queue";
    return "/user/dashboard/my-profile";
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600"
            >
              <i className="ri-menu-2-line text-2xl"></i>
            </button>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
            <Link to="/" className="text-2xl font-['Pacifico'] text-gray-900">
              AppOrbit
            </Link>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-2">
            {["/", "/products", "/categories", "/about"].map((path, i) => {
              const names = ["Home", "Products", "Categories", "About"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-black font-medium px-4 py-[4px] rounded"
                      : "text-gray-500 hover:text-white hover:bg-black font-medium px-4 py-[4px] rounded"
                  }
                >
                  {names[i]}
                </NavLink>
              );
            })}
          </div>

          {/* Auth Section (Desktop) */}
          <div className="flex items-center space-x-4 hidden md:flex">
            {!user ? (
              <>
                <button
                  onClick={() => setShowSignIn(true)}
                  className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-full"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowSignUp(true)}
                  className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center"
                >
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/40"}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user.displayName || "User"}
                      {!roleLoading && (
                        <p className="text-xs text-gray-500 mt-1">
                          Role: {role}
                        </p>
                      )}
                    </div>

                    {!roleLoading && role && (
                      <Link
                        to={dashboardLink()}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 h-full w-2/3 bg-black z-50 px-4 py-6 space-y-4 text-white border-r border-blue-900">
            {["/", "/products", "/categories", "/about"].map((path, i) => {
              const names = ["Home", "Products", "Categories", "About"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-black hover:bg-gray-100 px-4 py-[4px] rounded"
                >
                  {names[i]}
                </NavLink>
              );
            })}
            {!user ? (
              <>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setShowSignIn(true);
                  }}
                  className="block w-full text-left hover:text-black hover:bg-gray-100 px-4 py-[4px] rounded"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setShowSignUp(true);
                  }}
                  className="block w-full text-left hover:text-black hover:bg-gray-100 px-4 py-[4px] rounded"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <div className="text-sm font-medium px-4 py-2 border-b border-gray-700">
                  Hello, {user.displayName || "User"}
                  {!roleLoading && (
                    <p className="text-xs text-gray-300">Role: {role}</p>
                  )}
                </div>
                {!roleLoading && role && (
                  <NavLink
                    to={dashboardLink()}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-left hover:text-black hover:bg-gray-100 px-4 py-[4px] rounded"
                  >
                    Dashboard
                  </NavLink>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left hover:text-black hover:bg-gray-100 px-4 py-[4px] rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </>
      )}

      {/* Auth Modals */}
      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
      <SignUpModal isOpen={showSignUp} onClose={() => setShowSignUp(false)} />
    </nav>
  );
};

export default Navbar;
