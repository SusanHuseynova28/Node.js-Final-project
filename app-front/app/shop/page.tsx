"use client"
import Shop from '../_components/ShopImg';
import Navbar from '../_featured/header';
import CategoryList from '../_components/CategoryList';
import Footer from '../_featured/footer';
import FilterPage from '../_components/FilterPage';

export default function ShopPage() {
  return (
    <div>
      <Navbar/>
        <Shop />
        <CategoryList/>
        <FilterPage/>
        <Footer/>
 </div>
);
}