// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// const AddProduct = () => {
//   const { register, handleSubmit, watch, reset } = useForm();
//   const [step, setStep] = useState(1);

//   const [productData, setProductData] = useState({
//     images: [],
//     videoFile: null,
//     videoPreview: "",
//     videoUrl: "",
//     longDescription: "",
//     features: [""],
//     specifications: [{ key: "", value: "" }],
//   });
//   const handleArrayChange = (field, index, key, value) => {
//     setProductData((prevData) => {
//       const updatedArray = [...prevData[field]];
//       if (key === null) {
//         updatedArray[index] = value;
//       } else {
//         updatedArray[index][key] = value;
//       }
//       return {
//         ...prevData,
//         [field]: updatedArray,
//       };
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const watchFields = watch();

//   const onSubmit = async (data) => {
//     const finalData = {
//       ...data,
//       images: productData.images,
//       videoUrl: productData.videoUrl,
//       videoFile: productData.videoFile?.name || "",
//       longDescription: productData.longDescription,
//       features: productData.features,
//       timestamp: new Date(),
//       status: "Pending",
//     };

//     console.log("Submitting Product:", finalData);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/products/add-product",
//         finalData
//       );

//       if (res.status === 201 || res.data.insertedId) {
//         alert("✅ Product submitted successfully!");
//         reset();
//         setProductData({
//           images: [],
//           videoFile: null,
//           videoPreview: "",
//           videoUrl: "",
//           longDescription: "",
//           features: [""],
//         });
//         setStep(1);
//       } else {
//         alert("⚠️ Failed to submit product.");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("❌ Error submitting product.");
//     }
//   };

//   const steps = ["Basic Info", "Media", "Details", "Review"];

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const [step, setStep] = useState(1);

  const imageInputRef = useRef();

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  const [productData, setProductData] = useState({
    images: [],
    videoFile: null,
    videoPreview: "",
    videoUrl: "",
    longDescription: "",
    features: [""],
    specifications: [{ key: "", value: "" }],
  });

  const handleArrayChange = (field, index, key, value) => {
    setProductData((prevData) => {
      const updatedArray = [...prevData[field]];
      if (key === null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index][key] = value;
      }
      return {
        ...prevData,
        [field]: updatedArray,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const uploaded = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
      formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        uploaded.push(data.secure_url);
      }
    }

    setProductData((prev) => ({
      ...prev,
      images: uploaded,
    }));
  };

  const watchFields = watch();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("access-token");
    const finalData = {
      ...data,
      images: productData.images,
      videoUrl: productData.videoUrl,
      videoFile: productData.videoFile?.name || "",
      longDescription: productData.longDescription,
      features: productData.features,
      ownerName: user?.displayName,
      ownerImage: user?.photoURL,
      ownerEmail: user?.email,
      timestamp: new Date(),
      status: "Pending",
      tags: productData.features,
    };

    console.log("Submitting Product:", finalData);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/add-product`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201 || res.data.insertedId) {
        alert("✅ Product submitted successfully!");
        reset();
        setProductData({
          images: [],
          videoFile: null,
          videoPreview: "",
          videoUrl: "",
          longDescription: "",
          features: [""],
          ownerName: "",
          ownerImage: "",
          ownerEmail: "",
        });
        setStep(1);
      } else {
        alert("⚠️ Failed to submit product.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Error submitting product.");
    }
  };

  const steps = ["Basic Info", "Media", "Details", "Review"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-2">Submit Your Product</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Share your innovative tech product with our community. Follow the steps
        below to create an engaging showcase.
      </p>

      {/* Step Indicators */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {steps.map((label, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-medium ${
                index + 1 === step
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`text-sm font-medium ${
                index + 1 === step ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {label}
            </span>
            {index < steps.length - 1 && (
              <div className="w-8 h-0.5 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Enter your product name"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("category", { required: true })}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300"
                  >
                    <option value="">Select a category</option>
                    <option value="AI & Machine Learning">
                      AI & Machine Learning
                    </option>
                    <option value="Cloud Services">Cloud Services</option>
                    <option value="Developer Tools">Developer Tools</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="IoT & Smart Devices">
                      IoT & Smart Devices
                    </option>
                    <option value="Mobile Apps">Mobile Apps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brief Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("description", {
                      required: true,
                      maxLength: 200,
                    })}
                    placeholder="Describe your product in 1-2 sentences"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 resize-none"
                    rows={3}
                  />
                  <p className="text-sm text-right text-gray-400 mt-1">
                    {watch("description")?.length || 0}/200 characters
                  </p>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    {...register("websiteUrl")}
                    placeholder="https://yourproduct.com"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300"
                  />
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pricing Information
                  </label>
                  <div className="flex items-center gap-4 mt-2 flex-wrap ">
                    {["Free", "Paid", "Subscription"].map((type, idx) => (
                      <label key={idx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          value={type}
                          {...register("pricingType")}
                          className="custom-radio"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <button
                    type="button"
                    disabled
                    className="px-6 py-3 text-gray-400 bg-gray-100 rounded-lg font-medium cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 handled elsewhere as discussed */}

            {step === 2 && (
              <div className="space-y-10">
                {/* Product Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Images <span className="text-red-500">*</span>
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center relative"
                    onClick={() =>
                      document.getElementById("imageUploadInput").click()
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      id="imageUploadInput"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <div className="w-12 h-12 mx-auto mb-4 bg-violet-100 rounded-full flex items-center justify-center">
                      <i className="ri-add-line text-violet-500 text-xl"></i>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      Upload Product Images
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Drag and drop your images here, or click to browse
                    </p>
                    <button
                      type="button"
                      className="bg-violet-600 text-white px-5 py-2 rounded-md text-sm font-medium"
                    >
                      Choose Images
                    </button>
                    <p className="text-xs text-gray-400 mt-4">
                      Recommended: 1200×800px, PNG or JPG, max 5MB each <br />
                      Upload 3–5 high-quality images showcasing your product
                    </p>
                  </div>
                  {productData.images.length > 0 && (
                    <div className="mt-4 flex gap-4 flex-wrap">
                      {productData.images.map((src, index) => (
                        <div key={index} className="relative">
                          <img
                            src={src}
                            alt={`preview-${index}`}
                            className="w-32 h-20 rounded-md object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setProductData((prev) => ({
                                ...prev,
                                images: prev.images.filter(
                                  (_, i) => i !== index
                                ),
                              }))
                            }
                            className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Video Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Video (Optional)
                  </label>
                  <div
                    className="border-2 border-dashed border-pink-300 bg-pink-50 rounded-xl p-8 text-center"
                    onClick={() =>
                      document.getElementById("videoUploadInput").click()
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      id="videoUploadInput"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const preview = file ? URL.createObjectURL(file) : "";
                        setProductData((prev) => ({
                          ...prev,
                          videoFile: file,
                          videoPreview: preview,
                        }));
                      }}
                    />
                    <div className="w-12 h-12 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                      <i className="ri-video-add-line text-pink-500 text-xl"></i>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      Upload Product Video
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Show your product in action with a demo video
                    </p>
                    <button
                      type="button"
                      className="bg-pink-500 text-white px-5 py-2 rounded-md text-sm font-medium"
                    >
                      Choose Video
                    </button>
                    <p className="text-xs text-gray-400 mt-4">
                      Recommended: MP4 format, max 100MB, 30–90 seconds
                    </p>
                  </div>
                  {productData.videoPreview && (
                    <video
                      controls
                      src={productData.videoPreview}
                      className="mt-4 w-full rounded-lg"
                    />
                  )}
                </div>

                {/* Video URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Or Video URL
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={productData.videoUrl}
                    onChange={handleChange}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    YouTube, Vimeo, or Loom links are supported
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6">
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg font-medium hover:bg-gray-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Detailed Description *
                  </label>
                  <textarea
                    name="longDescription"
                    value={productData.longDescription}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Provide a comprehensive description of your product..."
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none"
                    maxLength={2000}
                  />
                  <p className="text-sm text-right text-gray-400 mt-1">
                    {productData.longDescription.length}/2000 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Key Features *
                  </label>
                  {productData.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <input
                        value={feature}
                        onChange={(e) =>
                          handleArrayChange(
                            "features",
                            idx,
                            null,
                            e.target.value
                          )
                        }
                        placeholder="Enter a key feature"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setProductData({
                        ...productData,
                        features: [...productData.features, ""],
                      })
                    }
                    className="text-sm text-primary hover:underline"
                  >
                    + Add Feature
                  </button>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technical Specifications
                  </label>
                  {productData.specifications.map((spec, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-4 mb-2">
                      <input
                        value={spec.key}
                        onChange={(e) =>
                          handleArrayChange(
                            "specifications",
                            idx,
                            "key",
                            e.target.value
                          )
                        }
                        placeholder="Specification name"
                        className="px-4 py-3 bg-gray-50 rounded-xl border-none"
                      />
                      <input
                        value={spec.value}
                        onChange={(e) =>
                          handleArrayChange(
                            "specifications",
                            idx,
                            "value",
                            e.target.value
                          )
                        }
                        placeholder="Value"
                        className="px-4 py-3 bg-gray-50 rounded-xl border-none"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setProductData({
                        ...productData,
                        specifications: [
                          ...productData.specifications,
                          { key: "", value: "" },
                        ],
                      })
                    }
                    className="text-sm text-primary hover:underline"
                  >
                    + Add Specification
                  </button>
                </div> */}

                <div className="flex items-center justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg font-medium hover:bg-gray-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Review Your Submission
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                    <p>
                      <strong>Product Name:</strong> {watchFields.name}
                    </p>
                    <p>
                      <strong>Category:</strong> {watchFields.category}
                    </p>
                    <p className="md:col-span-2">
                      <strong>Description:</strong> {watchFields.description}
                    </p>
                    {productData.features.length > 0 && (
                      <div>
                        <strong>Key Features:</strong>
                        <ul className="list-disc ml-5 mt-1 text-gray-700 text-sm ">
                          {productData.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* <p>
                      <strong>Website:</strong>{" "}
                      {productData.websiteUrl || "N/A"}
                    </p> */}
                    <p>
                      <strong>Pricing:</strong>{" "}
                      {watchFields.pricingType || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md text-sm text-yellow-800">
                  <strong className="block mb-2">Before You Submit</strong>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ensure all required fields are completed</li>
                    <li>Double-check your product information for accuracy</li>
                    <li>
                      Make sure images are high-quality and representative
                    </li>
                    <li>
                      Review your description for clarity and completeness
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" className="custom-checkbox" />
                  <span className="text-sm text-gray-700">
                    I agree to the{" "}
                    <a href="#" className="text-primary underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary underline">
                      Community Guidelines
                    </a>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg font-medium hover:bg-gray-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Live Preview */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Live Preview
          </h3>
          <div className="border rounded-xl p-4 text-center">
            {productData.images.length > 0 ? (
              <img
                src={productData.images[0]}
                alt="Preview"
                className="w-full h-32 object-cover rounded-md mb-2"
              />
            ) : (
              <div className="w-full h-32 bg-gray-100 rounded-md mb-2 flex items-center justify-center text-gray-400">
                Product Image
              </div>
            )}
            <p className="font-semibold text-gray-900 text-left mb-2">
              {watchFields.name || "Product Name"}
            </p>
            <p className="text-sm text-gray-500 truncate text-left">
              {watchFields.description ||
                "Product description will appear here..."}
            </p>
            <br />
            <hr />
            <div className="mt-3 flex items-center justify-between">
              {/* <span className="font-semibold text-gray-900">
                {watchFields.externalLink ? (
                  <a
                    href={watchFields.externalLink}
                    className="text-blue-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Site
                  </a>
                ) : (
                  "No Link"
                )}
              </span> */}

              <span className="font-semibold text-gray-900">
                {watchFields.category || "N/A"}
              </span>

              <span className="font-semibold text-gray-900">
                {watchFields.pricingType || "N/A"}
              </span>
            </div>
          </div>
          <div className="mt-4 bg-blue-50 text-blue-600 p-3 rounded-md text-sm">
            <strong>Preview Tips:</strong> This preview shows how your product
            will appear to users. Make sure all information is accurate before
            publishing.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
