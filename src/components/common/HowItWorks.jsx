// src/components/HowItWorks.jsx

import { FaUserPlus, FaRocket, FaThumbsUp } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-white text-2xl" />,
      number: 1,
      title: "Create Account",
      description:
        "Sign up for free and join our community of tech enthusiasts and innovators",
      points: [
        "Quick and easy registration",
        "Customize your profile",
        "Connect with innovators",
      ],
      bg: "bg-primary",
    },
    {
      icon: <FaRocket className="text-white text-2xl" />,
      number: 2,
      title: "Submit Products",
      description:
        "Share your tech products or discoveries with our engaged community",
      points: [
        "Simple submission process",
        "Rich media support",
        "Detailed analytics",
      ],
      bg: "bg-secondary",
    },
    {
      icon: <FaThumbsUp className="text-white text-2xl" />,
      number: 3,
      title: "Get Recognition",
      description:
        "Receive upvotes, feedback, and gain visibility for your innovations",
      points: [
        "Community feedback",
        "Featured opportunities",
        "Growth insights",
      ],
      bg: "bg-blue-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 w-7xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          How AppOrbit Works
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join our community in three simple steps and start discovering amazing
          tech products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-7xl mx-auto">
        {steps.map(({ icon, number, title, description, points, bg }, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="relative mb-8">
              <div
                className={`w-16 h-16 ${bg} text-white rounded-2xl flex items-center justify-center transform -rotate-12`}
              >
                {icon}
              </div>
              <span
                className={`absolute -top-4 -right-4 w-8 h-8 ${bg}/10 text-${bg}-500 font-bold rounded-full flex items-center justify-center`}
              >
                {number}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {title}
            </h3>
            <p className="text-gray-600 mb-6">{description}</p>
            <ul className="space-y-3 text-left">
              {points.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm text-gray-600"
                >
                  <i className="ri-checkbox-circle-line text-primary mr-2"></i>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-button hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 whitespace-nowrap">
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;
