import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch users from API
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load users:", err);
        setLoading(false);
      });
  }, []);

  // 🧠 Get initials
  const getInitials = (name) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  // 🔁 Handle Make Role
  const handleMakeRole = async (email, newRole) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/users/role/${email}`,
        { role: newRole }
      );

      if (res.data.modifiedCount > 0) {
        setUsers((prev) =>
          prev.map((user) =>
            user.email === email ? { ...user, role: newRole } : user
          )
        );
      }
    } catch (error) {
      console.error("❌ Role update failed:", error);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        User Management
      </h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                User Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Role
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.email} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold">
                        {getInitials(user.name)}
                      </span>
                    </div>
                    <span className="text-gray-900 font-medium">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm capitalize">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleMakeRole(user.email, e.target.value)
                      }
                      className="border rounded px-3 py-1 text-sm bg-white text-gray-700 shadow-sm"
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageUsers;
