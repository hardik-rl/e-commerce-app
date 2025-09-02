"use client";
import { gql } from "@apollo/client";
import ProductCard from "./ProductCard";
import { useQuery } from "@apollo/client/react";
import { Heading } from "../common/Heading";
import Loading from "../common/Loading";

const GET_NEW_ARRIVALS = gql`
  query GetNewArrivals {
  homePage {
    newArrival {
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

export default function NewArrivals() {
  const { data, loading, error } = useQuery(GET_NEW_ARRIVALS);

  if (error) return <p>Error: {error.message}</p>;

  const products = data?.homePage?.newArrival || [];
  
  return (
    <section className="py-12">
      <Heading title={data?.homePage?.newArrival?.heading?.name} />
      <div className="grid md:grid-cols-4 sm:grid-cols-6 col-12 gap-6">
        {loading ? (
          <Loading />
        ) : products.card ? (
          products.card.map((item: any) => (
            <ProductCard key={item.id} {...item} />
          ))
        ) : (
          <Loading message="No products found." />
        )}
      </div>
    </section>
  );
}
