import { apiRequest } from "@/shared/api";
import Image from "next/image";
import React, { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { getImageUrl } from "@/shared/utils/image";

interface Brand {
  id: number;
  name: string;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

export default async function HeroBanner() {

  const data = await apiRequest<{ data: any }>("home-page?populate[hero][populate]=*");
  const home = data.data.hero;

  return (
    <section className="relative bg-white w-full">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-6 lg:px-16 py-12">
        {/* Left Side */}
        <div>
          <h1 className="font-integral text-4xl md:text-6xl font-bold leading-tight">
            {home.heading}
          </h1>
          <p className="text-gray-600 mt-6 max-w-md">{home.subHeading}</p>
          <a
            href={home.link[0]?.url}
            className="mt-6 inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
          >
            {home.link[0]?.label}
          </a>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6">
            <div>
              <p className="font-bold text-xl">{home.brandsCount}</p>
              <p className="text-gray-500 text-sm">{home.brandsLabel}</p>
            </div>
            <div>
              <p className="font-bold text-xl">{home.productsCount}</p>
              <p className="text-gray-500 text-sm">{home.productsLabel}</p>
            </div>
            <div>
              <p className="font-bold text-xl">{home.customersCount}</p>
              <p className="text-gray-500 text-sm">{home.customersLabel}</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex justify-center lg:justify-end">
          {home.cover && (
            <Image
              src={getImageUrl(home.cover)}
              alt={home.cover?.name || "Hero Banner"}
              width={home.cover.width}
              height={home.cover.height}
              className="z-10 object-cover"
            />
          )}


          {/* Decorative stars */}
          <span className="absolute top-10 left-5 w-6 h-6 bg-black rotate-45"></span>
          <span className="absolute bottom-10 right-10 w-8 h-8 bg-black rotate-45"></span>
        </div>
      </div>

          {/* {console.log()} */}
      {/* Brand Bar */}
      <div className="bg-black py-6">
        <div className="flex justify-between items-center px-6 lg:px-20 text-white text-lg font-semibold gap-6 overflow-x-auto">
          {home.OurClient?.map((brand: Brand) => {
            return (
              <Image
                key={brand.id}
                src={getImageUrl({ url: brand?.url })}
                alt={brand.alternativeText || brand.name}
                width={brand.width}
                height={brand.height}
                className="object-contain"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
