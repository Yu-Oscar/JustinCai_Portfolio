import Header from "@/components/Header";
import MasonryGrid from "@/components/MasonryGrid";
import { portfolioItems } from "../../data/portfolioData";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <MasonryGrid items={portfolioItems} />
      </main>
    </div>
  );
}
