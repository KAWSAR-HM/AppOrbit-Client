// src/pages/moderator/ReviewQueue.jsx
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider"; // ✅ Context for token

const ReviewQueue = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Optional but good practice
  const token = localStorage.getItem("access-token"); // ✅ Get token from localStorage

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/moderator-review`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const productList = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];

        // Pending products first
        const sorted = productList.sort((a, b) => {
          if (a.status === "pending" && b.status !== "pending") return -1;
          if (a.status !== "pending" && b.status === "pending") return 1;
          return 0;
        });

        setProducts(sorted);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAction = async (id, action) => {
    let url = "";
    let payload = {};

    if (action === "feature") {
      url = `${import.meta.env.VITE_API_URL}/products/mark-as-featured/${id}`;
      payload = { isFeatured: true };
    } else if (action === "approve" || action === "reject") {
      url = `${import.meta.env.VITE_API_URL}/products/${id}`;
      payload = { status: action === "approve" ? "Accepted" : "Rejected" };
    } else {
      console.warn("❌ Unknown action:", action);
      return;
    }

    try {
      const res = await axios.patch(url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Update Success:", res.data);

      setProducts((prev) =>
        prev.map((p) =>
          p._id === id
            ? {
                ...p,
                ...(payload.status && { status: payload.status }),
                ...(payload.isFeatured !== undefined && {
                  isFeatured: payload.isFeatured,
                }),
              }
            : p
        )
      );
    } catch (error) {
      console.error(`❌ Action ${action} failed:`, error.message);
    }
  };

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🕒 Product Review Queue</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2 capitalize">{p.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link to={`/product/${p._id}`}>
                      <button className="px-2 py-1 bg-blue-500 text-white rounded">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => handleAction(p._id, "feature")}
                      className="px-2 py-1 bg-yellow-500 text-white rounded disabled:opacity-50"
                      disabled={p.isFeatured}
                    >
                      Feature
                    </button>
                    <button
                      onClick={() => handleAction(p._id, "approve")}
                      className="px-2 py-1 bg-green-600 text-white rounded disabled:opacity-50"
                      disabled={p.status === "Accepted"}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(p._id, "reject")}
                      className="px-2 py-1 bg-red-600 text-white rounded disabled:opacity-50"
                      disabled={p.status === "Rejected"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReviewQueue;
