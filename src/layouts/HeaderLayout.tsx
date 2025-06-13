import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`bg-blue-600 text-white shadow-lg ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-xl font-bold hover:text-blue-200 transition-colors"
          >
            SuperHero App
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`hover:text-blue-200 transition-colors ${
                isActive('/') ? 'text-blue-200 font-semibold' : ''
              }`}
            >
              Main
            </Link>
            <Link
              to="/create"
              className={`hover:text-blue-200 transition-colors ${
                isActive('/create') ? 'text-blue-200 font-semibold' : ''
              }`}
            >
              Create Superhero
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
