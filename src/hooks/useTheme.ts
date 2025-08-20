import { useState, useEffect } from "react";

interface ThemeData {
  primaryColor: string;
  fontUrl?: string;
}

interface UserData {
  theme?: ThemeData;
}

function extractFontFamily(googleFontsUrl: string): string {
  try {
    const match = googleFontsUrl.match(/family=([^:&]+)/);
    if (match) {
      const fontName = match[1].replace(/\+/g, ' ');
      return `"${fontName}", sans-serif`;
    }
  } catch (error) {
    console.error("Error extracting font family:", error);
  }
  return 'system-ui, sans-serif';
}

function loadGoogleFont(fontUrl: string): void {
  // Check if font is already loaded
  if (document.querySelector(`link[href="${fontUrl}"]`)) {
    return;
  }

  const link = document.createElement('link');
  link.href = fontUrl;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

function setCSSVariable(property: string, value: string): void {
  document.documentElement.style.setProperty(property, value);
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetch("/data/userData.json");
        const data: UserData = await response.json();
        
        if (data.theme) {
          setTheme(data.theme);
          
          // Set primary color CSS variable with fallback
          const primaryColor = data.theme.primaryColor?.trim() || '#fc077d';
          setCSSVariable('--primary-color', primaryColor);
          
          // Load font and set font family CSS variable with fallback
          if (data.theme.fontUrl?.trim()) {
            loadGoogleFont(data.theme.fontUrl);
            const fontFamily = extractFontFamily(data.theme.fontUrl);
            setCSSVariable('--font-family', fontFamily);
          } else {
            // Set fallback font family
            setCSSVariable('--font-family', 'system-ui, sans-serif');
          }
        } else {
          // Set default values when no theme is provided
          setCSSVariable('--primary-color', '#fc077d');
          setCSSVariable('--font-family', 'system-ui, sans-serif');
        }
      } catch (error) {
        console.error("Error loading theme:", error);
        // Set default values on error
        setCSSVariable('--primary-color', '#fc077d');
        setCSSVariable('--font-family', 'system-ui, sans-serif');
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, []);

  return { theme, loading };
}