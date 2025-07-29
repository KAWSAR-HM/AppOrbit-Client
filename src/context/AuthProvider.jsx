import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true); // ensure loader while checking

      if (!currentUser || !currentUser.email) {
        // 🔻 User is null or not logged in
        setUser(null);
        setRole(null);
        localStorage.removeItem("access-token");
        setLoading(false);
        return;
      }

      // ✅ If user exists
      setUser(currentUser);
      const email = currentUser.email;

      try {
        // 🛡️ Get JWT token
        const jwtRes = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
          email,
        });

        const token = jwtRes.data.token;
        localStorage.setItem("access-token", token);
        console.log(token);
        // 🧠 Get user role
        const roleRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(roleRes);
        const userRole = roleRes?.data?.role || "user";
        setRole(userRole);
      } catch (err) {
        console.error(
          "AuthProvider Error:",
          err?.response?.data || err.message
        );
        localStorage.removeItem("access-token");
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    setLoading(true);
    return signOut(auth).finally(() => {
      localStorage.removeItem("access-token");
      setRole(null);
      setUser(null);
      setLoading(false);
    });
  };

  const authInfo = {
    user,
    role,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
