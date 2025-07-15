import React, { useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const SignUpModal = ({ isOpen, onClose, onSwitchToSignIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!agree) {
      return setError("You must agree to terms and policy");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      console.log("✅ User created:", userCredential.user);
      onClose();
    } catch (err) {
      console.error("❌ Error:", err.message);
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Google Login:", result.user);
      onClose();
    } catch (err) {
      setError("Google login failed");
    }
  };

  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("✅ GitHub Login:", result.user);
      onClose();
    } catch (err) {
      setError("GitHub login failed");
    }
  };

  const handleAppleLogin = () => {
    setError("Apple login is not supported in web version.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-2 py-4 overflow-y-auto">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg relative p-4 sm:p-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          <i className="ri-close-line"></i>
        </button>

        {/* Header */}
        <div className="flex justify-center mb-3">
          <div className="bg-primary/10 text-primary p-2 rounded-full">
            <i className="ri-user-add-line text-xl"></i>
          </div>
        </div>

        <h2 className="text-xl font-bold text-center text-gray-900 mb-1">
          Create Account
        </h2>
        <p className="text-xs text-center text-gray-500 mb-3">
          Join our community of tech enthusiasts
        </p>

        {/* Error */}
        {error && (
          <p className="text-center text-sm text-red-500 mb-3">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <div className="flex items-center border rounded-md px-3 py-1.5">
              <i className="ri-user-line text-gray-400 mr-2 text-sm"></i>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <div className="flex items-center border rounded-md px-3 py-1.5">
              <i className="ri-mail-line text-gray-400 mr-2 text-sm"></i>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-md px-3 py-1.5">
              <i className="ri-lock-2-line text-gray-400 mr-2 text-sm"></i>
              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-md px-3 py-1.5">
              <i className="ri-lock-password-line text-gray-400 mr-2 text-sm"></i>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="text-sm text-gray-600 flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 text-sm"
          >
            Create Account
          </button>
        </form>

        {/* Social Logins */}
        <div className="my-3 flex items-center justify-center text-xs text-black">
          <span className="w-1/2 h-px bg-gray-200" />
          <span className="px-2 text-center">or continue with</span>
          <span className="w-1/2 h-px bg-gray-200" />
        </div>

        <div className="flex justify-evenly gap-4">
          <button
            onClick={handleGoogleLogin}
            className="p-2 border rounded hover:shadow transition w-10 flex justify-center"
          >
            <i className="ri-google-fill text-lg text-red-500"></i>
          </button>

          <button
            onClick={handleGitHubLogin}
            className="p-2 border rounded hover:shadow transition w-10 flex justify-center"
          >
            <i className="ri-github-fill text-lg text-gray-700"></i>
          </button>

          <button
            onClick={handleAppleLogin}
            className="p-2 border rounded hover:shadow transition w-10 flex justify-center"
          >
            <i className="ri-apple-fill text-lg text-black"></i>
          </button>
        </div>

        <p className="text-xs text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={onSwitchToSignIn}
            className="text-primary font-medium hover:underline"
          >
            Sign in now
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
