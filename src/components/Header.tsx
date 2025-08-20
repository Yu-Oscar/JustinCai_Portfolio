import { Mail, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

interface UserData {
  title: string;
  contact: {
    email: { address: string };
    phone: { number: string };
    instagram: { profile: string };
  };
}

interface HeaderProps {
  isScrolled?: boolean;
}

export default function Header({ isScrolled = false }: HeaderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/data/userData.json");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading || !userData) {
    return (
      <header className="w-full bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center pointer-events-none">
          </div>
          <div className="flex items-center space-x-4">
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 py-3 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center pointer-events-none">
          <h1 className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`} style={{ fontFamily: 'var(--font-family)', color: 'var(--primary-color, #fc077d)' }}>
            {userData.title}
          </h1>
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <a
            href={`mailto:${userData.contact.email.address}`}
            className="hover:text-white transition-colors duration-200 flex items-center space-x-1"
            style={{ color: 'var(--primary-color, #fc077d)' }}
          >
            <Mail className="w-5 h-5" />
            <span className="hidden md:inline uppercase font-bold text-xs md:text-sm lg:text-base" style={{ fontFamily: 'var(--font-family)' }}>
              {userData.contact.email.address}
            </span>
          </a>

          <a
            href={`tel:${userData.contact.phone.number.replace(/\s/g, "")}`}
            className="hover:text-white transition-colors duration-200 flex items-center space-x-1"
            style={{ color: 'var(--primary-color, #fc077d)' }}
          >
            <Phone className="w-5 h-5" />
            <span className="hidden md:inline uppercase font-bold text-xs md:text-sm lg:text-base" style={{ fontFamily: 'var(--font-family)' }}>
              {userData.contact.phone.number}
            </span>
          </a>

          <a
            href={`https://instagram.com/${userData.contact.instagram.profile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200 flex items-center space-x-1"
            style={{ color: 'var(--primary-color, #fc077d)' }}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
