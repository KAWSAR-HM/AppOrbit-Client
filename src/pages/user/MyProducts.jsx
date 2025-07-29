import React, { useEffect, useState } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const [user, setUser] = useState(null);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔐 Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  // 🔄 Fetch my products
  const fetchMyProducts = async () => {
    if (user?.email) {
      try {
        const token = localStorage.getItem("access-token");

        const res = await axios.get(
          `http://localhost:5000/products/user/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMyProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, [user?.email]);

  // 🗑️ Delete handler
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      const token = localStorage.getItem("access-token");

      await axios.delete(`http://localhost:5000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete:", err.message);
    }
  };

  // ✏️ Update button handler
  const handleUpdate = (id) => {
    navigate(`/dashboard/update-product/${id}`); // ✅ You need to create this route
  };

  if (loading) return <div className="p-6">Loading your products...</div>;

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Products</h2>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Name
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Votes
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Status
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {myProducts.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 text-sm text-gray-800">
                {product.name}
              </td>
              <td className="px-4 py-3 text-center text-sm text-blue-600 font-medium">
                {product.votes || 0}
              </td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    product.status === "Accepted"
                      ? "bg-green-100 text-green-600"
                      : product.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {product.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center space-x-2">
                <button
                  onClick={() => handleUpdate(product._id)}
                  className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {myProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No products found.</p>
      )}
    </div>
  );
};

export default MyProducts;
