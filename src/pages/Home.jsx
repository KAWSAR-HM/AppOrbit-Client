import React from "react";
import Hero from "../components/common/Hero";
import FeaturedProducts from "../components/common/FeaturedProducts";
import Footer from "../components/Footer";
import HowItWorks from "../components/common/HowItWorks";
import TrendingProducts from "../components/common/TrendingProducts";
import ExploreCategories from "../components/common/ExploreCategories";
import ProductCTA from "../components/common/ProductCTA";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <TrendingProducts />
      <ExploreCategories />
      <HowItWorks />
      <ProductCTA />
      <Footer />
    </>
  );
};

export default Home;
