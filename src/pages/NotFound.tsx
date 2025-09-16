import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <div className="bg-muted/20 p-6 rounded-full inline-block mb-6">
          <Search className="h-16 w-16 text-muted-foreground" />
        </div>
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Button asChild className="gradient-primary text-white shadow-soft hover:shadow-medium transition-smooth">
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
