"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Title from "../Title";
import { apiRequest } from "@/shared/api";
import { getImageUrl } from "@/shared/utils/image";
import Loading from "../common/Loading";

interface TopSellingsProps {
  fetchCards?: boolean;
}

const TopSellings: React.FC<TopSellingsProps> = ({ fetchCards = true }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [heading, setHeading] = useState<string>("top selling");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Dynamic endpoint
        const endpoint = fetchCards
          ? "home-page?populate[topSelling][populate][card][populate]=image"
          : "home-page?populate[topSelling][populate]=*";

        const data = await apiRequest<{ data: any }>(endpoint);
        console.log(data?.data, "products");

        // Dynamic heading field
        const apiHeading =
          data?.data?.topSelling?.title ||
          data?.data?.topSelling?.heading?.name ||
          "Top Selling";
        setHeading(apiHeading);

        // Only set products if cards are fetched
        if (fetchCards) {
          const cards = data?.data?.topSelling?.card || [];
          const processedProducts = cards.map((card: any, index: number) => ({
            id: card.id || index,
            image: card.image ? getImageUrl(card.image) : "/placeholder.png",
            title: card.title || card.name || "Product Title",
            price: card.price || 0,
            oldPrice: card.oldPrice || card.originalPrice,
            discount: card.discount || card.discountPercentage,
            rating: card.rating || 4.5,
          }));
          setProducts(processedProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [fetchCards]);

  return (
    <section className="py-12">
      <Title title={heading} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          <Loading />
        ) : products.length > 0 ? (
          products.map((item: any) => (
            <ProductCard key={item.id} {...item} />
          ))
        ) : (
          <Loading message="No products found." />
        )}
      </div>
      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 border rounded-full hover:bg-black hover:text-white transition">
          View All
        </button>
      </div>
    </section>
  );
};

export default TopSellings;