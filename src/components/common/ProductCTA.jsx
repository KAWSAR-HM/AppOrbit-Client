import React from "react";
import { Link } from "react-router-dom";

const ProductCTA = () => {
  return (
    <section className="w-full px-4 md:px-8 py-12">
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between px-8 py-10">
        <div className="mb-6 md:mb-0 md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Ready to showcase your tech product?
          </h2>
          <p className="text-white/90 text-base md:text-lg">
            Join thousands of innovators who have launched their products on
            AppOrbit and reached engaged tech enthusiasts.
          </p>
        </div>
        <div>
          <Link
            to="/dashboard/submit-product"
            className="bg-white text-primary font-medium py-2.5 px-6 rounded-full hover:bg-gray-100 transition duration-200 whitespace-nowrap"
          >
            Submit Your Product
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCTA;
