import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const fetchProduct = async () => {
    if (!id) return;

    setLoading(true);
    try {
      // 🔐 JWT token আনছি localStorage থেকে
      const token = localStorage.getItem("access-token");

      const res = await axios.get(`http://localhost:5000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && id) {
      fetchProduct();
    }
  }, [id, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    navigate(-1);
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="text-center">
          <span className="loading loading-spinner text-primary text-3xl"></span>
          <p className="mt-4">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Product Not Found</h2>
          </div>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <div className="mt-6">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <img
              src={
                product.images?.[0] ||
                "https://placehold.co/600x300?text=No+Image"
              }
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700">{product.description}</p>
          </div>
          {/* Add more product details if needed */}
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
