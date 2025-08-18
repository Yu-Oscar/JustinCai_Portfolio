import { useState, useEffect } from "react";

interface VideoItem {
  videoUrl: string;
  category: string;
  isVertical?: boolean;
}

interface GridItem {
  id: string;
  videoId: string;
  title: string;
  technique: string;
  aspectRatio: string;
  isVertical: boolean;
}

interface VideoEmbedProps {
  videoId: string;
  title: string;
  aspectRatio: string;
}

function VideoEmbed({ videoId, title, aspectRatio }: VideoEmbedProps) {
  return (
    <div
      className={`${aspectRatio} w-full relative overflow-hidden rounded-lg`}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&rel=0&showinfo=0&autoplay=1&mute=1&loop=1&playlist=${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

interface MasonryGridProps {
  selectedTag?: string;
}

export default function MasonryGrid({ selectedTag }: MasonryGridProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [videos, setVideos] = useState<GridItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/data/youtubeVideos.json");
        const data = await response.json();

        const processedVideos: GridItem[] = data.videos.map(
          (video: VideoItem, index: number) => {
            // Extract video ID from YouTube URL
            const videoId = video.videoUrl.includes("youtube.com/shorts/")
              ? video.videoUrl.split("youtube.com/shorts/")[1].split("?")[0]
              : video.videoUrl.includes("youtube.com/watch?v=")
              ? video.videoUrl.split("youtube.com/watch?v=")[1].split("&")[0]
              : "";

            // Determine aspect ratio based on isVertical
            const aspectRatio = video.isVertical
              ? "aspect-[9/16]"
              : "aspect-video";

            // Generate title from category
            const title = video.category
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return {
              id: (index + 1).toString(),
              videoId,
              title,
              technique: video.category.toUpperCase(),
              aspectRatio,
              isVertical: video.isVertical || false,
            };
          }
        );

        setVideos(processedVideos);
      } catch (error) {
        console.error("Error loading videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const filteredItems = videos.filter((item) => {
    const matchesTag = !selectedTag || item.technique === selectedTag;
    return matchesTag;
  });

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        <div className="text-center py-16">
          <div className="text-muted-foreground text-lg">Loading videos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-2">
      <div className="columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid mb-4"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="relative group cursor-pointer">
              <div
                className={`
                relative overflow-hidden rounded-lg bg-card border border-border/20
                transition-all duration-500 ease-smooth
                hover:border-primary/50 hover:shadow-card
                ${hoveredItem === item.id ? "scale-[1.02]" : ""}
              `}
              >
                <VideoEmbed
                  videoId={item.videoId}
                  title={item.title}
                  aspectRatio={item.aspectRatio}
                />

                {/* Subtle glow effect */}
                <div
                  className={`
                  absolute inset-0 rounded-lg pointer-events-none
                  transition-opacity duration-300
                  ${
                    hoveredItem === item.id
                      ? "shadow-glow opacity-20"
                      : "opacity-0"
                  }
                `}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
