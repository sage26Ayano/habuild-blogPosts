import { Link, useLocation } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSearchTerm } from "@/store/slices/postsSlice";

const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.posts.searchTerm);
  const isHomePage = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="">
            <img
              src="habuild-logo.webp"
              alt="Habuild Logo"
              className="h-10 w-auto hover:bg-gray-100/50"
            />
          </Link>

          <nav className="flex items-center space-x-6">
            {isHomePage && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                  className="pl-10 w-64 bg-gray-100/50 border-0 focus-visible:ring-2 focus-visible:ring-primary transition-smooth"
                />
              </div>
            )}

            <Link
              to="/"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:text-primary hover:bg-gray-100/50 transition-smooth"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
