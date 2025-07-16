import React, { useState } from "react";
import gif from "../assets/welcome.jpg";
import { auth } from "../firebase/firebase.config";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// ✅ Database save function (outside main component)
const saveUserToDB = (user) => {
  const userInfo = {
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
  };

  fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("✅ User saved to DB:", data);
    })
    .catch((err) => console.error("❌ DB Save Error:", err));
};

const SignInModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ User signed in:", result.user);
      saveUserToDB(result.user);
      onClose();
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Google login success:", result.user);
      saveUserToDB(result.user);
      onClose();
    } catch (err) {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-lg w-full max-w-sm rounded-xl shadow-xl relative p-6 border border-white/20">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          <i className="ri-close-line"></i>
        </button>

        {/* Avatar */}
        <div className="flex justify-center mb-3">
          <img
            src={gif}
            alt="Welcome Avatar"
            className="w-16 h-16 rounded-full border-2 border-white shadow"
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-1">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Sign in to continue your journey
        </p>

        {/* Error */}
        {error && (
          <p className="text-sm text-center text-red-500 mb-2">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <div className="flex items-center border border-gray-200 rounded-md bg-white px-3 py-2 shadow-sm">
              <i className="ri-mail-line text-gray-400 text-lg mr-2"></i>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="flex items-center border border-gray-200 rounded-md bg-white px-3 py-2 shadow-sm">
              <i className="ri-lock-2-line text-gray-400 text-lg mr-2"></i>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Remember Me & Forgot */}
          <div className="flex items-center justify-between text-xs text-gray-600">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="form-checkbox" />
              Remember me
            </label>
            <button type="button" className="text-primary hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 text-sm"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* OR Line */}
        <div className="my-4 flex items-center justify-center text-xs text-black">
          <span className="w-1/2 h-px bg-gray-200" />
          <span className="px-2 w-1/2 text-center">or continue with</span>
          <span className="w-1/2 h-px bg-gray-200" />
        </div>

        {/* Social Login */}
        <div className="flex justify-evenly items-center gap-6">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="px-12 py-1 bg-white border rounded hover:shadow transition w-12 items-center justify-center flex"
          >
            <i className="ri-google-fill text-lg text-red-500"></i>
          </button>
          <button
            disabled
            className="px-12 py-1 bg-white border rounded w-12 flex justify-center items-center opacity-40 cursor-not-allowed"
          >
            <i className="ri-github-fill text-lg text-gray-700"></i>
          </button>
          <button
            disabled
            className="px-12 py-1 bg-white border rounded w-12 flex justify-center items-center opacity-40 cursor-not-allowed"
          >
            <i className="ri-apple-fill text-lg text-black"></i>
          </button>
        </div>

        <p className="text-xs text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            onClick={onClose}
            className="text-primary font-medium hover:underline"
          >
            Sign up now
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
