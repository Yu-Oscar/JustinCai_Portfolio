import { useState, useEffect } from "react";

interface VideoItem {
  videoUrl: string;
  isVertical?: boolean;
}

interface GridItem {
  id: string;
  videoId: string;
  platform: "youtube" | "instagram";
  title: string;
  aspectRatio: string;
  isVertical: boolean;
}

interface VideoEmbedProps {
  videoId: string;
  platform: "youtube" | "instagram";
  title: string;
  aspectRatio: string;
}

function VideoEmbed({
  videoId,
  platform,
  title,
  aspectRatio,
}: VideoEmbedProps) {
  if (platform === "youtube") {
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

  if (platform === "instagram") {
    return (
      <div className="w-full relative overflow-hidden rounded-lg bg-white">
        <iframe
          src={`https://www.instagram.com/p/${videoId}/embed/`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full"
          style={{
            height: "600px",
            border: "none",
            maxWidth: "100%",
          }}
          loading="lazy"
        />
      </div>
    );
  }

  return null;
}

export default function MasonryGrid() {
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
            let videoId = "";
            let platform: "youtube" | "instagram" = "youtube";

            // Detect platform and extract video ID
            if (video.videoUrl.includes("youtube.com/shorts/")) {
              platform = "youtube";
              videoId = video.videoUrl
                .split("youtube.com/shorts/")[1]
                .split("?")[0];
            } else if (video.videoUrl.includes("youtube.com/watch?v=")) {
              platform = "youtube";
              videoId = video.videoUrl
                .split("youtube.com/watch?v=")[1]
                .split("&")[0];
            } else if (video.videoUrl.includes("instagram.com/p/")) {
              platform = "instagram";
              videoId = video.videoUrl
                .split("instagram.com/p/")[1]
                .split("/")[0]
                .split("?")[0];
            } else if (video.videoUrl.includes("instagram.com/reel/")) {
              platform = "instagram";
              videoId = video.videoUrl
                .split("instagram.com/reel/")[1]
                .split("/")[0]
                .split("?")[0];
            }

            // Determine aspect ratio based on platform and isVertical
            let aspectRatio = "aspect-video";
            if (platform === "instagram") {
              // Instagram posts are typically square or vertical
              aspectRatio = video.isVertical
                ? "aspect-[9/16]"
                : "aspect-square";
            } else {
              // YouTube videos
              aspectRatio = video.isVertical ? "aspect-[9/16]" : "aspect-video";
            }

            // Generate default title
            const title = `Video ${index + 1}`;

            return {
              id: (index + 1).toString(),
              videoId,
              platform,
              title,
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
    <div className="w-full px-6 py-2">
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 space-y-4">
        {videos.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid mb-4 w-full"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="relative group cursor-pointer w-full">
              <div
                className={`
                relative overflow-hidden rounded-lg bg-card border border-border/20 w-full
                transition-all duration-500 ease-smooth
                hover:border-primary/50 hover:shadow-card
                ${hoveredItem === item.id ? "scale-[1.02]" : ""}
              `}
              >
                <VideoEmbed
                  videoId={item.videoId}
                  platform={item.platform}
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
