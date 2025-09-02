import React from "react";
import Image from "next/image";

interface ProductCardProps {
  id?: number;
  image: { url: string };
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  oldPrice,
  discount,
  rating,
}) => {
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-yellow-500">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-500">☆</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">☆</span>);
      }
    }
    return stars;
  };

  const imageUrl = image?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${image.url}`
    : "/placeholder.png";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
      <div className="mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title || "Product"}
            width={200}
            height={200}
            className="mx-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.png";
            }}
          />
        ) : (
          <div className="w-[200px] h-[200px] mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium">{title}</h3>

      {/* Rating */}
      <div className="flex items-center justify-center mt-2">
        {renderStars(rating)}
        <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
      </div>

      {/* Price */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="text-lg font-bold">${price}</span>
        {/* {oldPrice && oldPrice > price && (
          <span className="line-through text-gray-400">${oldPrice}</span>
        )} */}
        {discount && discount > 0 && (
          <span className="bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;