import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-gray-100 shadow-2xl relative overflow-hidden border-b border-gray-700 ${
        className || ""
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="group flex items-center space-x-3 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-2 rounded-lg border border-slate-600 group-hover:border-slate-500 transition-all duration-300">
              <svg
                className="w-6 h-6 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                SuperHero
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Database</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 text-sm ${
                isActive("/")
                  ? "bg-slate-700/80 text-cyan-300 shadow-lg backdrop-blur-sm border border-slate-600"
                  : "hover:bg-slate-800/50 hover:text-gray-200 text-gray-300"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Головна</span>
            </Link>

            <Link
              to="/create"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 text-sm ${
                isActive("/create")
                  ? "bg-cyan-600 text-white shadow-lg transform scale-105 border border-cyan-500"
                  : "bg-slate-700 text-gray-200 hover:bg-slate-600 hover:transform hover:scale-105 shadow-md border border-slate-600 hover:border-slate-500"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Створити героя</span>
            </Link>
          </nav>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full translate-y-8 -translate-x-12"></div>

      <div className="absolute top-1/2 left-1/2 w-96 h-0.5 bg-gradient-to-r from-transparent via-slate-600/20 to-transparent transform -translate-x-1/2 -translate-y-1/2"></div>
    </header>
  );
};

export default Header;
