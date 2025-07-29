import { useEffect, useState } from "react";
import axios from "axios";

const useUserRole = (email) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      setRole(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/role/${email}`)
      .then((res) => {
        setRole(res.data?.role || "user");
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Role fetch failed:", err);
        setRole("user");
        setLoading(false);
      });
  }, [email]);

  return [role, loading];
};

export default useUserRole;
