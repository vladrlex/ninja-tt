import React from "react";
import { Link, useLocation } from "react-router-dom";
import SuperheroItem, { Superhero } from "./SuperHeroItem.tsx";

interface Props {
  superheroes: Superhero[];
  isLoading?: boolean;
}

const SuperheroList: React.FC<Props> = ({ superheroes, isLoading = false }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 animate-pulse rounded-lg h-64 w-full"
          />
        ))}
      </div>
    );
  }

  if (!superheroes?.length) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1M9 4V3a1 1 0 00-1-1H4a1 1 0 00-1 1v1"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Супергероїв не знайдено
        </h3>
        <p className="text-gray-500 mb-4">
          Поки що немає супергероїв у базі даних.
        </p>
        <Link
          to="/create"
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
            isActive("/create") ? "ring-2 ring-blue-500" : ""
          }`}
        >
          Додати першого супергероя
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Супергерої ({superheroes.length})
        </h2>
        <Link
          to="/create"
          className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
            isActive("/create") ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <svg
            className="w-4 h-4 mr-2"
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
          Додати героя
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {superheroes.map((hero) => (
          <SuperheroItem key={hero._id} hero={hero} />
        ))}
      </div>
    </div>
  );
};

export default SuperheroList;
