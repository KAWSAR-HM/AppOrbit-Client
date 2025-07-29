import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products/trending");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching trending products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner text-primary text-2xl"></span>
        <p className="text-gray-500 mt-2">Loading trending products...</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trending This Week
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what's hot in the tech world right now
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full shadow-sm">
                  <i className="ri-arrow-up-line mr-1"></i>+
                  {product.growthPercent || "0"}%
                </span>
              </div>

              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                <img
                  src={
                    product.images?.[0] ||
                    "https://via.placeholder.com/600x300?text=No+Image"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <i
                        className={`ri-${product.icon || "apps-2-line"} ri-lg`}
                      ></i>
                    </div>
                    <span className="ml-2 font-medium">
                      {product.category || "Tech"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <i className="ri-fire-line mr-1"></i>
                      {product.votes || 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center">
                    <i className="ri-star-smile-line text-primary ri-lg"></i>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  {product.description?.slice(0, 80) || "No description"}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {(product.votedUsers || []).slice(0, 2).map((user, i) => (
                      <img
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        src={
                          user.photo ||
                          "https://randomuser.me/api/portraits/men/32.jpg"
                        }
                        alt="User"
                      />
                    ))}
                    {product.votedUsers?.length > 2 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-xs font-medium text-gray-500">
                        +{product.votedUsers.length - 2}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="px-4 py-2 bg-primary/5 text-primary font-medium rounded-lg hover:bg-primary/10 transition-colors text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg max-w-xl w-full relative p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedProduct.name}
            </h2>
            <img
              src={
                selectedProduct.images?.[0] ||
                "https://via.placeholder.com/600x300"
              }
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="text-gray-700 mb-4">
              {selectedProduct.description || "No description available."}
            </p>
            {selectedProduct.tags && selectedProduct.tags.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
              <span>
                <i className="ri-fire-line mr-1"></i>
                Votes: <strong>{selectedProduct.votes || 0}</strong>
              </span>
              <span>
                Category: <strong>{selectedProduct.category || "N/A"}</strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;
