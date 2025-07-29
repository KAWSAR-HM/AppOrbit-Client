import React, { useEffect, useState } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import {
  RiUser3Line,
  RiMailLine,
  RiEarthLine,
  RiTwitterLine,
  RiMailSendLine,
  RiBarChart2Line,
  RiEyeLine,
  RiVipCrown2Line,
} from "react-icons/ri";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const [subscribed, setSubscribed] = useState(false);
  const [emailNotify, setEmailNotify] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/profile/${user.email}`)
        .then((res) => {
          setProfile(res.data);
          setSubscribed(res.data.subscribed);
          setEmailNotify(res.data.emailNotify);
          setAnalytics(res.data.analytics);
          setPublicProfile(res.data.publicProfile);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Profile fetch error", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleSave = async () => {
    try {
      const update = {
        subscribed,
        emailNotify,
        analytics,
        publicProfile,
      };
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/settings/${user.email}`,
        update
      );
      if (res.data.modifiedCount > 0) {
        alert("✅ Profile updated successfully");
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
        <img
          src={user?.photoURL || "https://i.pravatar.cc/150?img=65"}
          alt="User"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <h3 className="mt-4 text-xl font-semibold text-gray-800">
          {user?.displayName || "User"}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{profile?.role || "User"}</p>

        <div
          className={`text-xs px-3 py-1 rounded-full font-semibold mb-4 ${
            subscribed
              ? "bg-purple-100 text-purple-600"
              : "bg-gray-100 text-gray-600"
          } flex items-center gap-2`}
        >
          <RiVipCrown2Line />
          {subscribed ? "Pro Plan" : "Free Plan"}
        </div>

        {!subscribed && (
          <button
            onClick={() => setSubscribed(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            Upgrade to Pro - $9.99/mo
          </button>
        )}
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Profile Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <RiUser3Line /> Full Name
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                disabled
                className="input input-bordered w-full mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <RiMailLine /> Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                disabled
                className="input input-bordered w-full mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Bio</label>
              <textarea
                className="textarea textarea-bordered w-full mt-1"
                rows={3}
                defaultValue={profile?.bio || ""}
              ></textarea>
            </div>
            <div>
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <RiEarthLine /> Website
              </label>
              <input
                type="url"
                defaultValue={profile?.website || ""}
                className="input input-bordered w-full mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <RiTwitterLine /> Twitter
              </label>
              <input
                type="text"
                defaultValue={profile?.twitter || ""}
                className="input input-bordered w-full mt-1"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Account Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiMailSendLine /> Email Notifications
                </p>
                <p className="text-xs text-gray-500">
                  Receive email updates about your products
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-info"
                checked={emailNotify}
                onChange={() => setEmailNotify(!emailNotify)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiBarChart2Line /> Product Analytics
                </p>
                <p className="text-xs text-gray-500">
                  Allow us to track product performance
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-secondary"
                checked={analytics}
                onChange={() => setAnalytics(!analytics)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiEyeLine /> Public Profile
                </p>
                <p className="text-xs text-gray-500">
                  Make your profile visible to other users
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-success"
                checked={publicProfile}
                onChange={() => setPublicProfile(!publicProfile)}
              />
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={handleSave}
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-6"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
