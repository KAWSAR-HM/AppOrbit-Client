import { useEffect, useState } from "react";

const useUserRole = (email) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/role/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data.role);
          setLoading(false);
        })
        .catch(() => {
          setRole("user"); // fallback role
          setLoading(false);
        });
    }
  }, [email]);

  return [role, loading];
};

export default useUserRole;
