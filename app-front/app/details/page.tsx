"use client";
import React from "react";
import CollectionGrid from "../_components/CollectionCards";
import Navbar from "../_featured/header";
import Footer from "../_featured/footer";
import { useRouter } from "next/router";

export default function ShopPage() {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    console.log(`Redirecting to /dynamic/${id}`);
    router.push(`/dynamic/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <CollectionGrid onCardClick={handleCardClick} />
      </div>
      <Footer />
    </div>
  );
}
