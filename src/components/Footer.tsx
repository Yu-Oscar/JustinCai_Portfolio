export default function Footer() {
  return (
    <footer className="w-full mt-20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">
            Created by Justin Cai. © 2025
          </p>
          <p className="text-muted-foreground text-sm">
            Website by{" "}
            <a 
              href="https://oscar-yu-portfolio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors duration-200"
            >
              Oscar Yu
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}