import HomeSwiper from "../_components/SwipperHomePage"
import Navbar from "../_featured/header"
import Footer from "../_featured/footer"
import ProductCards from "../_components/ProductCards"
import CategoryList from "../_components/CategoryList"
import CollectionGrid from "../_components/CollectionCards"
export default function Homepage(){
    return(
        <>
        <Navbar/>
        <HomeSwiper/>
        <ProductCards/>
        <CategoryList/>
        <CollectionGrid/>
        <Footer/>
        </>
    )
}