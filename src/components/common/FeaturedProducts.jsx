// ✅ FeaturedProducts.jsx — Updated Version with Tags & Comments

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductDetailsModal from "../common/ProductDetailsModal";
import { AuthContext } from "../../context/AuthProvider";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCommentsFor, setShowCommentsFor] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});

  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");

  // ✅ Fetch featured products
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/featured-products`
        );
        setFeaturedProducts(res.data);
      } catch (err) {
        console.error("Failed to load featured products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // ✅ Upvote handler
  const handleUpvote = async (productId) => {
    if (!user) return (window.location.href = "/login");

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/upvote/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFeaturedProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, votes: res.data.votes } : p
        )
      );
    } catch (err) {
      console.error("Upvote failed:", err.response?.data || err.message);
    }
  };

  // ✅ Comment Submit
  const handleCommentSubmit = async (productId) => {
    const commentText = commentTexts[productId]?.trim();
    if (!commentText) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${productId}/comment`,
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
      setFeaturedProducts((prev) =>
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

  // ✅ Tag add
  const handleAddTag = async (productId, tag) => {
    if (!tag.trim()) return;

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/${productId}/add-tag`,
        { tag },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFeaturedProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, tags: res.data.tags, newTag: "" } : p
        )
      );
    } catch (err) {
      console.error("Failed to add tag:", err.message);
    }
  };

  const badgeColor = {
    Featured: "bg-primary text-white",
    New: "bg-green-500 text-white",
    Trending: "bg-orange-500 text-white",
    Popular: "bg-blue-500 text-white",
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Featured Products
        </h2>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : featuredProducts.length === 0 ? (
          <p className="text-center text-gray-400">
            No featured products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="relative group bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                {Array.isArray(product.badges) && (
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    {product.badges.map((badge, i) => (
                      <span
                        key={i}
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[badge]}`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                <img
                  src={
                    product.images?.[0] ||
                    "https://via.placeholder.com/600x300.png?text=No+Image"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>

                  {/* Tags */}
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

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                    <div className="flex items-center gap-4">
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

                  {/* Comments Section */}
                  {showCommentsFor === product._id && (
                    <div className="mt-4">
                      <ul className="text-sm mb-2">
                        {product.comments?.map((c, i) => (
                          <li key={i} className="mb-1">
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

                  {/* Add New Tag (only for owner) */}
                  {user && user.email === product.ownerEmail && (
                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        value={product.newTag || ""}
                        onChange={(e) => {
                          const tag = e.target.value;
                          setFeaturedProducts((prev) =>
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
                        onClick={() =>
                          handleAddTag(product._id, product.newTag)
                        }
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default FeaturedProducts;
