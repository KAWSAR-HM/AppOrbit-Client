import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";

const ReportedContents = () => {
  const [reported, setReported] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");

  // 🔄 Load reported products
  useEffect(() => {
    const fetchReported = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products/reported", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReported(res.data || []);
      } catch (err) {
        console.error("Error loading reported products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReported();
  }, []);

  // 🗑️ Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(`http://localhost:5000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Deleted:", res.data);

      setReported((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🚨 Reported Products</h2>

      {loading ? (
        <p>Loading...</p>
      ) : reported.length === 0 ? (
        <p>No reported products available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Reason(s)</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reported.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2 text-red-600">
                    {(p.reports || []).map((r, i) => (
                      <div key={i} className="text-xs">
                        - {r}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <Link to={`/product/${p._id}`}>
                      <button className="px-2 py-1 bg-blue-500 text-white rounded">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
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

export default ReportedContents;
