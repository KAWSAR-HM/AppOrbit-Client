import { useState } from "react";
import { RiAddLine, RiEditLine, RiDeleteBinLine } from "react-icons/ri";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([
    {
      code: "WELCOME20",
      description: "Welcome discount for new customers",
      expiry: "2025-12-31",
      discount: "20%",
    },
    {
      code: "STUDENT15",
      description: "Student special discount",
      expiry: "2025-11-01",
      discount: "15%",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleAddCoupon = (e) => {
    e.preventDefault();
    // handle add logic later
    alert("Add coupon logic goes here!");
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Coupon Management
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <RiAddLine className="mr-2" />
          Add Coupon
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Code
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Expiry Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Discount
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {coupons.map((coupon) => (
              <tr key={coupon.code} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono font-semibold text-blue-600">
                  {coupon.code}
                </td>
                <td className="px-6 py-4 text-gray-600">{coupon.expiry}</td>
                <td className="px-6 py-4 text-gray-600">
                  {coupon.description}
                </td>
                <td className="px-6 py-4 font-semibold text-green-600">
                  {coupon.discount}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <RiEditLine />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal / Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Add Coupon
              </h3>
              <button onClick={() => setShowForm(false)} className="text-2xl">
                &times;
              </button>
            </div>
            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2"
                  rows="2"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Discount Amount
                </label>
                <input
                  type="text"
                  placeholder="e.g. 20% or $50"
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageCoupons;
