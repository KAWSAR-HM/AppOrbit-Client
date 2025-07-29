import React from "react";
import {
  RiRobotLine,
  RiCloudLine,
  RiCodeBoxLine,
  RiHomeGearLine,
} from "react-icons/ri";

const categories = [
  {
    name: "AI & Machine Learning",
    icon: <RiRobotLine className="text-indigo-500 text-3xl" />,
    products: 486,
    images: [
      "https://plus.unsplash.com/premium_photo-1676637656166-cb7b3a43b81a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1680608979589-e9349ed066d5?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    name: "Cloud Services",
    icon: <RiCloudLine className="text-blue-500 text-3xl" />,
    products: 324,
    images: [
      "https://plus.unsplash.com/premium_photo-1681487942927-e1a2786e6036?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1618236897939-b82f677f09a6?fit=crop&w=100&q=80",
    ],
  },
  {
    name: "Developer Tools",
    icon: <RiCodeBoxLine className="text-purple-500 text-3xl" />,
    products: 275,
    images: [
      "https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=100&q=80",
      "https://plus.unsplash.com/premium_photo-1675793715030-0584c8ec4a13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RGV2ZWxvcGVyJTIwdG9vbHN8ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    name: "Smart Home",
    icon: <RiHomeGearLine className="text-green-500 text-3xl" />,
    products: 198,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?fit=crop&w=100&q=80",
      "https://plus.unsplash.com/premium_photo-1688686804638-fadb460edc4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U21hcnQlMjBIb21lfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNtYXJ0JTIwSG9tZXxlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
];

const ExploreCategories = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12 flex-col md:flex-row">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Explore Tech Categories
            </h2>
            <p className="text-lg text-gray-600">
              Discover the world of technology and innovation
            </p>
          </div>
          <button className="px-6 py-2.5 text-primary hover:text-primary/90 font-medium flex items-center gap-1 rounded-full border border-primary">
            View All
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 transition hover:shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center shadow-inner">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {cat.products} Products
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {cat.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${cat.name} ${i}`}
                    className="w-full h-16 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    title={cat.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCategories;
