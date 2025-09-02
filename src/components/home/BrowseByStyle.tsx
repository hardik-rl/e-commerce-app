"use client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";

const GET_BROWSE_BY_STYLE = gql`
  query GetBrowseByStyle {
    homePage {
      dressStyle {
        box {
          id
          heading
          image {
            url
            alternativeText
            width
            height
          }
        }
      }
    }
  }
`;

interface DressStyleBox {
  id: number;
  heading: string;
  image: {
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
  };
}

interface BrowseByStyleData {
  homePage: {
    dressStyle: {
      heading: string;
      box: DressStyleBox[];
    };
  };
}

export default function BrowseByStyle() {
  const { data, loading, error } = useQuery<BrowseByStyleData>(
    GET_BROWSE_BY_STYLE
  );

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const dressStyles = data?.homePage?.dressStyle?.box || [];
  const heading = data?.homePage?.dressStyle?.heading || "BROWSE BY DRESS STYLE";

  return (
    <section className="bg-gray-100 rounded-3xl p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8">
        {heading}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {dressStyles.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-xl shadow-md group cursor-pointer"
          >
            {item?.image && (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${item.image.url}`}
                alt={item.image?.alternativeText || "Dress Style"}
                width={item.image.width}
                height={item.image.height}
                className="z-10 object-cover"
              />
            )}
            <span className="absolute top-3 left-3 bg-white/80 text-black text-lg font-semibold px-3 py-1 rounded-lg">
              {item.heading}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
