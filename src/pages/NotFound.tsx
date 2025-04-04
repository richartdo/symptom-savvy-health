
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="h-24 w-24 bg-health-primary/10 text-health-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold">404</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Page not found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Button asChild className="bg-health-primary hover:bg-health-primary/90">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
