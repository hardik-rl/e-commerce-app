"use client";
import { gql } from "@apollo/client";
import Image from "next/image";
import { getImageUrl } from "@/shared/utils/image";
import { useQuery } from "@apollo/client/react";

interface Brand {
  id?: number;
  name: string;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

const GET_HOME_PAGE = gql`
  query GetHomePage {
    homePage {
      hero {
        heading
        subHeading
        link {
          label
          url
        }
        cover {
          url
          name
          width
          height
        }
        OurClient {
          name
          url
          alternativeText
          width
          height
        }
        brandsCount
        brandsLabel
        productsCount
        productsLabel
        customersCount
        customersLabel
      }
    }
  }
`;

export default function HeroBanner() {
  const { data, loading, error } = useQuery(GET_HOME_PAGE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  const home = data?.homePage;

  return (
    <section className="relative bg-white w-full">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-6 lg:px-16 py-12">
        {/* Left Side */}
        <div>
          <h1 className="font-integral text-4xl md:text-6xl font-bold leading-tight">
            {home?.hero?.heading}
          </h1>
          <p className="text-gray-600 mt-6 max-w-md">{home?.hero?.subHeading}</p>
          {home?.hero?.link?.length > 0 && (
            <a
              href={home.hero.link[0]?.url}
              className="mt-6 inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
            >
              {home.hero.link[0]?.label}
            </a>
          )}
        </div>

        {/* Right Side */}
        <div className="relative flex justify-center lg:justify-end">
          {home?.hero?.cover && (
            <Image
              src={getImageUrl(home.hero.cover)}
              alt={home.hero.cover?.name || "Hero Banner"}
              width={home.hero.cover.width}
              height={home.hero.cover.height}
              className="z-10 object-cover"
            />
          )}

          {/* Decorative stars */}
          <span className="absolute top-10 left-5 w-6 h-6 bg-black rotate-45"></span>
          <span className="absolute bottom-10 right-10 w-8 h-8 bg-black rotate-45"></span>
        </div>
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10 text-center">
          <div>
            <p className="text-3xl font-bold">{home?.hero?.brandsCount}</p>
            <p className="text-gray-600">{home?.hero?.brandsLabel}</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{home?.hero?.productsCount}</p>
            <p className="text-gray-600">{home?.hero?.productsLabel}</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{home?.hero?.customersCount}</p>
            <p className="text-gray-600">{home?.hero?.customersLabel}</p>
          </div>
        </div>
      </div>

      {/* Brand Bar */}
      <div className="bg-black py-6">
        <div className="flex justify-between items-center px-6 lg:px-20 text-white text-lg font-semibold gap-6 overflow-x-auto">
          {home?.hero?.OurClient?.map((brand: Brand, index: number) => (
            <Image
              key={index}
              src={getImageUrl({ url: brand.url })}
              alt={brand.alternativeText || brand.name}
              width={brand.width}
              height={brand.height}
              className="object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
