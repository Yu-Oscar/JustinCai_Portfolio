import { useState, useEffect } from "react";

interface TagCloudProps {
  onTagSelect?: (tag: string) => void;
  selectedTag?: string;
}

export default function TagCloud({ onTagSelect, selectedTag }: TagCloudProps) {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/data/youtubeVideos.json");
        const data = await response.json();

        // Extract unique categories and convert to uppercase
        const uniqueCategories = [
          ...new Set(
            data.videos.map((video: any) => video.category.toUpperCase())
          ),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <div className="text-muted-foreground text-lg">
            Loading categories...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onTagSelect?.(category)}
            onMouseEnter={() => setHoveredTag(category)}
            onMouseLeave={() => setHoveredTag(null)}
            className={`
              px-3 py-1.5 text-xs md:text-sm font-medium rounded-md
              border border-border/50 backdrop-blur-sm
              transition-all duration-300 ease-smooth
              hover:border-primary hover:text-primary hover:shadow-glow
              ${
                selectedTag === category
                  ? "bg-primary text-primary-foreground border-primary shadow-glow"
                  : hoveredTag === category
                  ? "bg-glass border-primary/50 text-primary"
                  : "bg-glass/30 text-muted-foreground hover:text-foreground"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
