"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { apiRequest } from "@/shared/api";

export default function Newsletter() {
  const [newsletterData, setNewsletterData] = useState<any>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const res = await apiRequest<{ data: any }>(
          "home-page?populate[newsLetter][populate]=*"
        );
        setNewsletterData(res.data.newsLetter);
      } catch (error) {
        console.error("Error fetching newsletter:", error);
      }
    };
    fetchNewsletter();
  }, []);

  console.log(newsletterData, "newsletterData");
  

  // Handle Subscribe
  const handleSubscribe = async () => {
    if (!email) return alert("Please enter an email address");

    try {
      await apiRequest("newsletters", {
        method: "POST",
        body: JSON.stringify({
          data: { email },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Subscription failed!");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-black text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center md:text-left">
          {newsletterData?.heading?.name}
        </h2>

        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-72">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full text-black focus:outline-none bg-white"
            />
          </div>

          <button
            onClick={handleSubscribe}
            className="bg-white text-black font-semibold px-6 py-3 rounded-full w-full hover:bg-gray-200 transition"
          >
            {newsletterData?.button?.Button}
          </button>
        </div>
      </div>
    </section>
  );
}
