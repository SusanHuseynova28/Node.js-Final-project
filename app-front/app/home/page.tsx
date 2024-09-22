import HomeSwiper from "../_components/SwipperHomePage"; // Ensure correct path
import Navbar from "../_featured/header"; // Check if _featured/header exists
import Footer from "../_featured/footer";
import ProductCards from "../_components/ProductCards";
import CategoryList from "../_components/CategoryList";
import CollectionGrid from "../_components/CollectionCards";
import FindStore from "../_components/FindStore";
import AutumnCollection from "../_components/autumncollection";
import HeroSection from "../_components/HeroSection";
import FeaturedProducts from "../_components/featuredproducts";
import CustomerReviewSwiper from "../_components/CustomerReviewSwiper";

export default function Homepage(){
    return(
        <>
        <Navbar/>
        <HomeSwiper/>
        <ProductCards/>
        <CategoryList/>
        <CollectionGrid/>
        <FindStore/>
        <AutumnCollection/>
        <HeroSection/>
        <FeaturedProducts/>
        <CustomerReviewSwiper/>
        <Footer/>
        </>
    )
}