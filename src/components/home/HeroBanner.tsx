"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { apiRequest } from "@/shared/api";
import { getImageUrl } from "@/shared/utils/image";

interface Brand {
  id: number;
  name: string;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

export default function HeroBanner() {
  const [home, setHome] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiRequest<{ data: any }>(
          "home-page?populate[hero][populate][OurClient][populate]=*"
        );
        setHome(data.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="relative bg-white w-full">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-6 lg:px-16 py-12">
        {/* Left Side */}
        <div>
          <h1 className="font-integral text-4xl md:text-6xl font-bold leading-tight">
            {home?.hero?.heading}
          </h1>
          <p className="text-gray-600 mt-6 max-w-md">{home?.subHeading}</p>
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

      {/* Brand Bar */}
      {/* {home?.OurClient?.length > 0 && ( */}
        <div className="bg-black py-6">
          <div className="flex justify-between items-center px-6 lg:px-20 text-white text-lg font-semibold gap-6 overflow-x-auto">
            {home?.hero?.OurClient?.map((brand: Brand) => (
              <Image
                key={brand.id}
                src={getImageUrl({ url: brand.url })}
                alt={brand.alternativeText || brand.name}
                width={brand.width}
                height={brand.height}
                className="object-contain"
              />
            ))}
          </div>
        </div>
      {/* )} */}
    </section>
  );
}
