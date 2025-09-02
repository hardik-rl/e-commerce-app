"use client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { Mail } from "lucide-react";
import { apiRequest } from "@/shared/api";

const GET_NEWSLETTER = gql`
  query GetNewsletter {
    homePage {
      newsLetter {
        heading {
          name
        }
        button {
          Button
        }
      }
    }
  }
`;

interface NewsletterData {
  homePage: {
    newsLetter: {
      heading: {
        name: string;
      };
      button: {
        Button: string;
      };
    };
  };
}

export default function Newsletter() {
  const { data, loading, error } = useQuery<NewsletterData>(GET_NEWSLETTER);
  const [email, setEmail] = useState("");

  // Handle Subscribe (still REST since Strapi mutations setup is optional)
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

  if (loading) return <p className="text-center">Loading newsletter...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const newsletterData = data?.homePage?.newsLetter;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-black text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center md:text-left">
          {newsletterData?.heading?.name || "Subscribe to our Newsletter"}
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
            {newsletterData?.button?.Button || "Subscribe"}
          </button>
        </div>
      </div>
    </section>
  );
}
