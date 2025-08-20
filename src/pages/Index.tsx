import { useState, useEffect } from "react";
import Header from "@/components/Header";
import MasonryGrid from "@/components/MasonryGrid";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";

interface UserData {
  title: string;
  description: string;
}

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 90);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/data/userData.json");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header isScrolled={isScrolled} />

      <main className="relative">
        {/* Title above grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 sm:mb-8 mb-4 text-center">
          {userData?.title && (
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" style={{ fontFamily: 'var(--font-family)', color: 'var(--primary-color, #fc077d)' }}>
                {userData.title}
              </h1>
              {userData.description && (
                <p className="mt-4 text-lg sm:text-xl md:text-2xl text-muted-foreground" style={{ fontFamily: 'var(--font-family)' }}>
                  {userData.description}
                </p>
              )}
            </>
          )}
        </div>

        {/* Gallery Grid */}
        <section>
          <MasonryGrid />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
