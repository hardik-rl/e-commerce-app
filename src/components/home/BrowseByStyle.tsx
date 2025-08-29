"use client";

import { apiRequest } from "@/shared/api";
import { getImageUrl } from "@/shared/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BrowseByStyle() {
    const [dressStyles, setDressStyleData] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await apiRequest<{ data: any }>(
                    "home-page?populate[dressStyle][populate][box][populate]=*"
                );
                console.log(data.data.dressStyle, "data");

                setDressStyleData(data?.data?.dressStyle.box || []);
            } catch (err) {
                console.error("Error fetching dress styles:", err);
            }
        }
        fetchData();
    }, []);

    return (
        <section className="bg-gray-100 rounded-3xl p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8">
                BROWSE BY DRESS STYLE
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {dressStyles.map((item: any) => {
                    return (
                        <div
                            key={item.id}
                            className="relative overflow-hidden rounded-xl shadow-md group cursor-pointer"
                        >
                            {item?.image && (
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${item.image.url}`}
                                    alt={item.image?.name || "Hero Banner"}
                                    width={item.image.width}
                                    height={item.image.height}
                                    className="z-10 object-cover"
                                />
                            )}
                            <span className="absolute top-3 left-3 bg-white/80 text-black text-lg font-semibold px-3 py-1 rounded-lg">
                                {item.heading}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
