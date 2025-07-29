import { useEffect, useState } from "react";
import videoSrc from "../../assets/Hero-1.mp4"; // ভিডিও ফাইল ইমপোর্ট

const heroSlides = [
  {
    id: 1,
    category: "AI & Machine Learning",
    title: "Revolutionize Your Workflow with AI Innovation",
    description:
      "AI টুলস দিয়ে আপনার কাজের পদ্ধতিকে বদলে দিন, আরও দ্রুত ও বুদ্ধিদীপ্তভাবে কাজ করুন।",
    video: videoSrc,
  },
  {
    id: 2,
    category: "Cloud Computing",
    title: "Scale Your Business with Cloud Solutions",
    description:
      "ক্লাউড ভিত্তিক প্রযুক্তি দিয়ে সহজে ডিপ্লয় করুন, পরিচালনা করুন ও স্কেল করুন।",
    image: "https://i.ibb.co/r2tGrSBJ/b9bd82f4d43deab360752f9c887606cb.jpg",
  },
  {
    id: 3,
    category: "Developer Tools",
    title: "Build Better Software Faster",
    description: "ডেভেলপার টুলস দিয়ে কোডিং ও ডিবাগিং হোক আরও কার্যকরী ও সহজ।",
    image: "https://i.ibb.co/LzVtbLJ7/002c6138f0de233ce0b2a656fdf7e3b6.jpg",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[600px] overflow-hidden bg-gray-900">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          {slide.video ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={slide.video} type="video/mp4" />
              আপনার ব্রাউজার ভিডিওটি সমর্থন করে না।
            </video>
          ) : (
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-xl">
              <span className="inline-block text-orange-500 font-medium mb-4">
                {slide.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-primary text-white font-medium rounded-button hover:bg-primary/90">
                  এক্সপ্লোর করুন
                </button>
                <button className="px-6 py-3 bg-white/10 text-white border border-white/30 font-medium rounded-button hover:bg-white/20 backdrop-blur-sm">
                  আরও জানুন
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentSlide ? "bg-white" : "bg-white/30"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
