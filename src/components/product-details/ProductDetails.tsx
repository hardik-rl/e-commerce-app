"use client";
import { useState } from "react";
import Image from "next/image";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import ProductTabs from "./ProductTabs";
import Button from "../common/Button";
import AreYouLike from "./AreYouLike";

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
    AreYouLike {
    name
      card {
        id
        image {
          alternativeText
          caption
          url

        }
        price
        rating
        title
      }
     }
      productsDetails {
        id
        name
        price
        category
        color
        description
        rating
        size
        images {
          alternativeText
          url
        }
      }
      reviewAndRating {
        id
        name
        date
        description
        rating
      }
    }
  }
`;

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState("olive");
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <p>Error loading products: {error.message}</p>;
  }

  const product = data?.products?.[0]?.productsDetails || {};
  const reviews = data?.products?.[0]?.reviewAndRating || [];
  const areYouLikes = data?.products?.[0]?.AreYouLike || [];

  if (!product) return <p>No product found</p>;

  return (
    <section className="container mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        Home / Shop / {product.category} /{" "}
        <span className="text-black font-medium">{product.name}</span>
      </nav>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT - Image Gallery */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product.images?.map((img: any, index: number) => (
              <Image
                key={index}
                src={`${process.env.NEXT_PUBLIC_API_URL}${img.url}`}
                alt={img.alternativeText || `Thumbnail ${index}`}
                width={80}
                height={80}
                className={`rounded-lg border cursor-pointer ${activeImage === index ? "border-black" : "border-gray-300"
                  }`}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            {product.images?.[activeImage] && (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${product.images[activeImage].url}`}
                alt={product.images[activeImage].alternativeText || product.name}
                width={500}
                height={500}
                className="rounded-lg object-cover w-full"
              />
            )}
          </div>
        </div>

        {/* RIGHT - Product Info */}
        <div>
          {/* Title + Rating */}
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <div className="flex items-center gap-2 mt-2 text-yellow-500">
            {"⭐".repeat(Math.floor(product.rating || 0))}
            {"☆".repeat(5 - Math.floor(product.rating || 0))}
            <span className="text-gray-500 text-sm">{product.rating}/5</span>
          </div>

          {/* Price (oldPrice + discount are static demo fields) */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold">${product.price}</span>
            <span className="line-through text-gray-400">$300</span>
            <span className="text-red-500 bg-red-100 px-2 py-1 rounded-lg text-sm font-semibold">
              -40%
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mt-4">
            {product.description[0].children[0].text}
          </p>

          {/* Colors (from API color or fallback) */}
          <div className="mt-6">
            <p className="font-medium mb-2">Select Colors</p>
            <div className="flex gap-3">
              {["olive", "navy", "black"].map((c) => (
                <button
                  key={c}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === c ? "border-black" : "border-gray-300"
                    }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setSelectedColor(c)}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <p className="font-medium mb-2">Choose Size</p>
            <div className="flex gap-3">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  className={`px-5 py-2 rounded-full border ${selectedSize === size
                    ? "bg-black text-white border-black"
                    : "bg-gray-100 text-black border-gray-300"
                    }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button
                className="px-3 py-1 text-lg"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 py-1 text-lg"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <Button label="Add to Cart" variant="black">

            </Button>
          </div>
        </div>
      </div>

      <ProductTabs reviewsData={reviews} />
      <AreYouLike areYouLikes={areYouLikes?.card} heading={areYouLikes?.name} loading={loading} />
    </section>
  );
}