import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const ProductCard = ({ product }) => {
  const {
    _id,
    name,
    images,
    description,
    tags = [],
    votes = 0,
    timestamp,
    ownerEmail,
  } = product;

  const [voteCount, setVoteCount] = useState(votes);
  const [hasVoted, setHasVoted] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error("❌ Invalid user in localStorage:", err);
      localStorage.removeItem("user");
    }
  }, []);

  const handleUpvote = async () => {
    if (!user) return navigate("/login");

    if (user.email === ownerEmail || hasVoted) return;

    try {
      const res = await axios.patch(
        `http://localhost:5000/products/upvote/${_id}`,
        { userEmail: user.email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      if (res.data?.votes >= 0) {
        setVoteCount(res.data.votes);
        setHasVoted(true);
      }
    } catch (err) {
      console.error("❌ Vote failed:", err);
    }
  };

  return (
    <div className="relative group bg-white shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl">
      {/* 🖼 Image */}
      <img
        src={
          images?.[0] || "https://via.placeholder.com/600x300.png?text=No+Image"
        }
        alt={name}
        className="w-full h-48 object-cover"
        onClick={() => navigate(`/product/${_id}`)}
        style={{ cursor: "pointer" }}
      />

      {/* 📄 Content */}
      <div className="p-5">
        {/* Title */}
        <h3
          className="text-xl font-semibold text-gray-900 mb-1 hover:text-primary cursor-pointer"
          onClick={() => navigate(`/product/${_id}`)}
        >
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3">
          {description?.slice(0, 100) || "No description."}
        </p>

        {/* 🏷 Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 🔘 Footer */}
        <div className="flex items-center justify-between text-gray-500 text-sm border-t pt-4">
          <button
            onClick={handleUpvote}
            disabled={!user || user?.email === ownerEmail || hasVoted}
            className={`flex items-center gap-2 text-sm ${
              hasVoted || user?.email === ownerEmail
                ? "text-gray-400 cursor-not-allowed"
                : "hover:text-primary transition"
            }`}
          >
            <FaThumbsUp /> {voteCount}
          </button>

          <button
            onClick={() => navigate(`/product/${_id}`)}
            className="text-sm hover:text-primary transition"
          >
            View
          </button>

          <span className="text-xs">
            {timestamp
              ? formatDistanceToNow(new Date(timestamp), { addSuffix: true })
              : "Just now"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
