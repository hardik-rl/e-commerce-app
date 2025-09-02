"use client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import ProductCard from "./ProductCard";
import { Heading } from "../common/Heading";
import Loading from "../common/Loading";
import Button from "../common/Button";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  image: {
    url: string;
    alternativeText?: string;
  };
}

interface TopSellingData {
  homePage: {
    topSelling: {
      heading: {
        name: string;
      };
      card: Product[];
    };
  };
}

const GET_TOP_SELLINGS = gql`
  query GetTopSellings {
    homePage {
      topSelling {
        heading {
          name
        }
        card {
          id
          title
          price
          rating
          image {
            url
            alternativeText
          }
        }
      }
    }
  }
`;

export default function TopSellings() {
  const { data, loading, error } = useQuery<TopSellingData>(GET_TOP_SELLINGS);

  if (error) return <p>Error: {error.message}</p>;

  const products = data?.homePage?.topSelling?.card || [];
  const heading = data?.homePage?.topSelling?.heading?.name || "TOP SELLING";

  return (
    <section className="py-12">
      <Heading title={heading} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          <Loading />
        ) : products.length > 0 ? (
          products.map((item: Product) => (
            <ProductCard key={item.id} {...item} />
          ))
        ) : (
          <Loading message="No products found." />
        )}
      </div>

      {/* View All button */}
      <div className="flex justify-center mt-8">
        <Button label="View More" variant="outline" />
      </div>
    </section>
  );
}
