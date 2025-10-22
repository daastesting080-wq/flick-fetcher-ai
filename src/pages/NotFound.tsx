import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="text-center glass-strong rounded-2xl p-12 max-w-md">
        <h1 className="mb-4 text-6xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">404</h1>
        <p className="mb-6 text-xl text-foreground">Oops! Page not found</p>
        <a href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
