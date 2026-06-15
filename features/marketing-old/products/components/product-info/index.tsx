import React, { useState } from "react";

// --- Dummy Sub-Components ---

function DescriptionView() {
  return (
    <div className="space-y-4 text-gray-600 leading-relaxed">
      <p>
        Experience premium sound engineering with our flagship wireless
        headphones. Designed for audiophiles and daily commuters alike, these
        headphones deliver pristine audio clarity alongside industry-leading
        active noise cancellation.
      </p>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Up to 40 hours of battery life with fast charging</li>
        <li>Custom-engineered 40mm dynamic drivers</li>
        <li>Hybrid Active Noise Cancellation (ANC) with transparency mode</li>
      </ul>
    </div>
  );
}

function ReviewsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
        <div className="text-4xl font-bold text-gray-900">4.8</div>
        <div>
          <div className="text-sm font-semibold text-gray-800">
            Out of 5 stars
          </div>
          <div className="text-xs text-gray-500">
            Based on 142 verified reviews
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="text-sm">
          <div className="flex justify-between font-medium text-gray-800">
            <span>Sarah M.</span>
            <span className="text-gray-400">2 days ago</span>
          </div>
          <p className="mt-1 text-gray-600">
            The battery life on these is insane. I used them for an entire week
            of commuting without a single charge.
          </p>
        </div>
      </div>
    </div>
  );
}

function FaqView() {
  return (
    <div className="space-y-4">
      <div className="border-b border-gray-100 pb-3">
        <h4 className="font-medium text-gray-900 text-sm">
          Is it water-resistant?
        </h4>
        <p className="mt-1 text-sm text-gray-600">
          They feature an IPX4 rating, making them resistant to sweat and light
          splashes, but they should not be submerged.
        </p>
      </div>
      <div className="border-b border-gray-100 pb-3">
        <h4 className="font-medium text-gray-900 text-sm">
          Can I connect to multiple devices simultaneously?
        </h4>
        <p className="mt-1 text-sm text-gray-600">
          Yes, multipoint Bluetooth allows you to switch seamlessly between your
          laptop and smartphone.
        </p>
      </div>
    </div>
  );
}

// --- Main Component ---

type TabType = "description" | "reviews" | "faq";

export function ProductInfo() {
  const [activeTab, setActiveTab] = useState<TabType>("description");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Tab Headers wrapper */}
      <div className="flex w-full border-b border-gray-200">
        {/* Tab 1: Description */}
        <button
          onClick={() => setActiveTab("description")}
          className={`
            relative flex-1 py-4 text-center text-sm font-semibold tracking-wide uppercase transition-colors duration-300
            ${activeTab === "description" ? "text-blue-600" : "text-gray-500 hover:text-gray-800"}
            before:absolute before:bottom-0 before:left-0 before:w-full before:h-[6px] before:bg-blue-600 before:rounded-t-md before:transition-all before:duration-300
            ${activeTab === "description" ? "before:opacity-100 before:scale-x-100" : "before:opacity-0 before:scale-x-75"}
          `}
        >
          Description
        </button>

        {/* Tab 2: Reviews */}
        <button
          onClick={() => setActiveTab("reviews")}
          className={`
            relative flex-1 py-4 text-center text-sm font-semibold tracking-wide uppercase transition-colors duration-300
            ${activeTab === "reviews" ? "text-blue-600" : "text-gray-500 hover:text-gray-800"}
            before:absolute before:bottom-0 before:left-0 before:w-full before:h-[6px] before:bg-blue-600 before:rounded-t-md before:transition-all before:duration-300
            ${activeTab === "reviews" ? "before:opacity-100 before:scale-x-100" : "before:opacity-0 before:scale-x-75"}
          `}
        >
          Reviews & Ratings
        </button>

        {/* Tab 3: FAQ */}
        <button
          onClick={() => setActiveTab("faq")}
          className={`
            relative flex-1 py-4 text-center text-sm font-semibold tracking-wide uppercase transition-colors duration-300
            ${activeTab === "faq" ? "text-blue-600" : "text-gray-500 hover:text-gray-800"}
            before:absolute before:bottom-0 before:left-0 before:w-full before:h-[6px] before:bg-blue-600 before:rounded-t-md before:transition-all before:duration-300
            ${activeTab === "faq" ? "before:opacity-100 before:scale-x-100" : "before:opacity-0 before:scale-x-75"}
          `}
        >
          FAQ
        </button>
      </div>

      {/* Tab Panels Content View */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100 min-h-[200px]">
        {activeTab === "description" && <DescriptionView />}
        {activeTab === "reviews" && <ReviewsView />}
        {activeTab === "faq" && <FaqView />}
      </div>
    </div>
  );
}
