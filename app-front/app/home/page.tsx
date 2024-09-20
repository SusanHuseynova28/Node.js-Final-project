import HomeSwiper from "../_components/SwipperHomePage"
import Navbar from "../_featured/header"
import Footer from "../_featured/footer"
import ProductCards from "../_components/ProductCards"
export default function Homepage(){
    return(
        <>
        <Navbar/>
        <HomeSwiper/>
        <ProductCards/>
        <Footer/>
        </>
    )
}