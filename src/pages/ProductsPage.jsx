import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductDetailsModal from "../components/common/ProductDetailsModal";
// ✅ No bracket needed
import { AuthContext } from "../context/AuthProvider";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCommentsFor, setShowCommentsFor] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});

  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/products?search=${searchTag}&page=${page}&limit=6`
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, searchTag]); // ✅ add searchTag

  const handleSearch = () => {
    setPage(1);
    fetchProducts();
  };

  const handleUpvote = async (productId) => {
    if (!user) return (window.location.href = "/login");

    try {
      const res = await axios.patch(
        `http://localhost:5000/products/upvote/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, votes: res.data.votes } : p
        )
      );
    } catch (err) {
      console.error("Upvote failed:", err.response?.data || err.message);
    }
  };

  const handleCommentSubmit = async (productId) => {
    const commentText = commentTexts[productId]?.trim();
    if (!commentText) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/products/${productId}/comment`,
        {
          comment: {
            userName: user?.displayName || "Anonymous",
            userImage: user?.photoURL || "",
            text: commentText,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newComment = res.data.comment;
      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId
            ? { ...p, comments: [...(p.comments || []), newComment] }
            : p
        )
      );

      setCommentTexts((prev) => ({ ...prev, [productId]: "" }));
    } catch (err) {
      console.error("❌ Comment failed:", err.response?.data || err.message);
    }
  };

  const handleAddTag = async (productId, tag) => {
    if (!tag.trim()) return;

    try {
      const res = await axios.patch(
        `http://localhost:5000/products/${productId}/add-tag`,
        { tag },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, tags: res.data.tags, newTag: "" } : p
        )
      );
    } catch (err) {
      console.error("Failed to add tag:", err.message);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">All Tech Products</h2>

      {/* Search Bar */}
      <div className="flex items-center justify-center mb-6 gap-2">
        <input
          type="text"
          placeholder="Search by tag..."
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <span className="loading loading-spinner text-primary text-3xl"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">No products found</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md hover:shadow-xl transition-all duration-300 p-4 rounded-lg"
              >
                <img
                  src={
                    product.images?.[0] ||
                    "https://via.placeholder.com/600x300.png?text=No+Image"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />

                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(product.tags || []).map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpvote(product._id)}
                      className="flex items-center gap-1"
                    >
                      <i className="ri-arrow-up-line"></i>
                      {product.votes || 0}
                    </button>
                    <button
                      onClick={() =>
                        setShowCommentsFor(
                          showCommentsFor === product._id ? null : product._id
                        )
                      }
                      className="flex items-center gap-1"
                    >
                      <i className="ri-chat-1-line"></i>
                      {product.comments?.length || 0}
                    </button>
                  </div>
                  <button onClick={() => setSelectedProduct(product)}>
                    See Details
                  </button>
                  <span className="flex items-center gap-1">
                    <i className="ri-time-line"></i>
                    {formatDate(product.timestamp)}
                  </span>
                </div>

                {/* Comments */}
                {showCommentsFor === product._id && (
                  <div className="mt-3">
                    <ul className="text-sm mb-2">
                      {product.comments?.map((c, i) => (
                        <li key={i}>
                          <strong>{c.userName}</strong>: {c.text}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={commentTexts[product._id] || ""}
                        onChange={(e) =>
                          setCommentTexts((prev) => ({
                            ...prev,
                            [product._id]: e.target.value,
                          }))
                        }
                        className="border px-2 py-1 text-sm w-full"
                        placeholder="Add a comment"
                      />
                      <button
                        onClick={() => handleCommentSubmit(product._id)}
                        className="bg-primary text-white px-3 text-sm rounded"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}

                {/* Add tag (only by owner) */}
                {user && user.email === product.ownerEmail && (
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      value={product.newTag || ""}
                      onChange={(e) => {
                        const tag = e.target.value;
                        setProducts((prev) =>
                          prev.map((p) =>
                            p._id === product._id ? { ...p, newTag: tag } : p
                          )
                        );
                      }}
                      placeholder="Add a new tag"
                      className="border px-2 py-1 text-sm w-full"
                    />
                    <button
                      className="bg-green-500 text-white px-3 text-sm rounded"
                      onClick={() => handleAddTag(product._id, product.newTag)}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-10 gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="btn"
            >
              Previous
            </button>
            <span className="text-lg font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="btn"
            >
              Next
            </button>
          </div>
        </>
      )}

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
