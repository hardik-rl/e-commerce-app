"use client";
import { gql } from "@apollo/client";
import ProductCard from "./ProductCard";
import { useQuery } from "@apollo/client/react";
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

interface NewArrivalsData {
  homePage: {
    newArrival: {
      heading: {
        name: string;
      };
      card: Product[];
    };
  };
}


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
  const { data, loading, error } = useQuery<NewArrivalsData>(GET_NEW_ARRIVALS);

  if (error) return <p>Error: {error.message}</p>;

  const products = (data as any)?.homePage?.newArrival || [];

  return (
    <section className="py-12">
      <Heading title={data?.homePage?.newArrival?.heading?.name || "NEW ARRIVALS"} />
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
      <div className="flex mx-auto justify-center mt-8">
        <Button label="View More" variant="outline" />
      </div>
    </section>
  );
}
