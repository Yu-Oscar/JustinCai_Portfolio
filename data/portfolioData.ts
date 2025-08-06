import youtubeData from "./youtubeVideos.json";

export interface PortfolioItem {
  videoUrl: string;
  category: string;
  isVertical?: boolean;
}

export const portfolioItems: PortfolioItem[] = youtubeData.videos.map(
  (video) => ({
    videoUrl: video.videoUrl,
    category: video.category,
    isVertical: video.isVertical,
  })
);
