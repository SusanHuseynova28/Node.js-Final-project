"use client";
import HomeSwiper from "../_components/SwipperHomePage";
import Navbar from "../_featured/header";
import Footer from "../_featured/footer";
import ProductCards from "../_components/ProductCards";
import CategoryList from "../_components/CategoryList";
import CollectionGrid from "../_components/CollectionCards";
import FindStore from "../_components/FindStore";
import AutumnCollection from "../_components/autumncollection";
import HeroSection from "../_components/HeroSection";
import FeaturedProducts from "../_components/featuredproducts";
import CustomerReviewSwiper from "../_components/CustomerReviewSwiper";
import JournalPage from "../_components/JournalPage";
import InstagramGallery from "../_components/InstagramGallery";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <HomeSwiper />
      <ProductCards />
      <CategoryList />
      <CollectionGrid />
      <FindStore />
      <AutumnCollection />
      <HeroSection />
      <FeaturedProducts />
      <CustomerReviewSwiper />
      <JournalPage />
      <InstagramGallery />
      <Footer />
    </>
  );
}
