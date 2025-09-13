"use client";
import { useState } from "react";

const getPlainText = (description: any): string => {
  if (!description) return "";

  if (typeof description === "string") return description;

  if (Array.isArray(description)) {
    return description
      .map((block) =>
        block?.children
          ? block.children.map((child: any) => child.text || "").join(" ")
          : ""
      )
      .join("\n");
  }

  return "";
};

const ProductTabs = ({ reviewsData }: { reviewsData: any[] }) => {
  const [activeTab, setActiveTab] = useState("reviews");

  return (
    <div>
      {/* Tabs */}
      <div className="mt-10 border-t pt-6">
        <div className="flex justify-center gap-10 font-medium text-gray-500">
          {["Product Details", "Rating & Reviews", "FAQs"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 ${activeTab === tab.toLowerCase()
                  ? "border-b-2 border-black text-black"
                  : ""
                }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 text-gray-600">
          {activeTab === "product details" && (
            <p className="text-center">📦 More product details go here.</p>
          )}

          {activeTab === "reviews" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviewsData && reviewsData.length > 0 ? (
                reviewsData.map((review: any) => (
                  <div
                    key={review.id}
                    className="rounded-xl border p-4 shadow-sm bg-white"
                  >
                    {/* Rating */}
                    <p className="text-yellow-500 text-lg">
                      {"★".repeat(Math.floor(review.rating || 0))}
                      {"☆".repeat(5 - Math.floor(review.rating || 0))}
                    </p>

                    {/* Reviewer */}
                    <div className="flex items-center gap-2 mt-2">
                      <p className="font-semibold">
                        {review.name || "Anonymous"}
                      </p>
                      {review.verified && (
                        <span className="text-green-500">✔</span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mt-2">
                      {getPlainText(review.description)}
                    </p>

                    {/* Date */}
                    {review.date && (
                      <p className="text-sm text-gray-400 mt-2">
                        Posted on{" "}
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )}

          {activeTab === "faqs" && (
            <p className="text-center">❓ FAQs will be shown here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
