"use client";

import { useState } from "react";

interface PortfolioItem {
  videoUrl: string;
  category: string;
  isVertical?: boolean;
}

interface MasonryGridProps {
  items: PortfolioItem[];
}

export default function MasonryGrid({ items }: MasonryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...new Set(items.map((item) => item.category))];
  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  // Function to extract YouTube video ID from URL (supports regular videos and Shorts)
  const getYouTubeVideoId = (url: string) => {
    // Handle YouTube Shorts format: /shorts/VIDEO_ID
    const shortsMatch = url.match(/youtube\.com\/shorts\/([^?#]+)/);
    if (shortsMatch) {
      return shortsMatch[1];
    }

    // Handle regular YouTube videos
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Function to handle video click
  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filteredItems.map((item, index) => {
          const videoId = getYouTubeVideoId(item.videoUrl);
          return (
            <div
              key={index}
              className="break-inside-avoid mb-4 group cursor-pointer"
              onClick={() => handleVideoClick(item.videoUrl)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-200">
                {videoId ? (
                  <div
                    className="relative w-full"
                    style={{
                      paddingBottom: item.isVertical ? "133.33%" : "75%",
                    }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0&showinfo=0&autoplay=0&mute=0`}
                      title="YouTube video"
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div
                    className="relative w-full"
                    style={{
                      paddingBottom: item.isVertical ? "133.33%" : "75%",
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500">Video not available</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
