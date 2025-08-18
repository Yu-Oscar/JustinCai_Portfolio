import { useState } from "react";
import Header from "@/components/Header";
import TagCloud from "@/components/TagCloud";
import MasonryGrid from "@/components/MasonryGrid";

const Index = () => {
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  const handleTagSelect = (tag: string) => {
    setSelectedTag(selectedTag === tag ? undefined : tag);
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      
      <main className="relative">
        {/* Tag Cloud */}
        <section className="border-b border-border/20">
          <TagCloud
            onTagSelect={handleTagSelect}
            selectedTag={selectedTag}
          />
        </section>

        {/* Gallery Grid */}
        <section>
          <MasonryGrid
            selectedTag={selectedTag}
          />
        </section>
      </main>
    </div>
  );
};

export default Index;
