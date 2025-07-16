import { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Dummy data for now
  useEffect(() => {
    setUsers([
      {
        name: "Alexander Johnson",
        email: "alexander@email.com",
        role: "user",
      },
      {
        name: "Sarah Mitchell",
        email: "sarah@email.com",
        role: "moderator",
      },
      {
        name: "Michael Chen",
        email: "michael@email.com",
        role: "admin",
      },
    ]);
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const handleMakeRole = (email, role) => {
    console.log(`${email} -> ${role}`);
    // Here you can call backend API to update role
  };

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
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleMakeRole(user.email, "moderator")}
                      className={`px-3 py-1 text-sm rounded-button ${
                        user.role === "moderator" || user.role === "admin"
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                      disabled={
                        user.role === "moderator" || user.role === "admin"
                      }
                    >
                      Make Moderator
                    </button>
                    <button
                      onClick={() => handleMakeRole(user.email, "admin")}
                      className={`px-3 py-1 text-sm rounded-button ${
                        user.role === "admin"
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                      }`}
                      disabled={user.role === "admin"}
                    >
                      Make Admin
                    </button>
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
