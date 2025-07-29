import React from "react";

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-500 mb-4">{product.category}</p>

        {product.images?.length > 0 && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover rounded"
          />
        )}

        <p className="mt-4 text-gray-700">
          <strong>Description:</strong> {product.description}
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Details:</strong> {product.longDescription}
        </p>

        <div className="mt-4">
          <p>
            <strong>Pricing Type:</strong> {product.pricingType}
          </p>
          <p>
            <strong>Status:</strong> {product.status}
          </p>
          <p>
            <strong>Uploaded:</strong>{" "}
            {new Date(product.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
