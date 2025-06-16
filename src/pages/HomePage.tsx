import  { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SuperheroList from "../components/SuperheroList.tsx";
import Pagination from "../components/Pagination.tsx";
import { getSuperheroes } from "../services/api";

const HomePage = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["superheroes", page],
    queryFn: () => getSuperheroes(page),
    select: (response) => response.data,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto flex justify-center items-center min-h-screen">
        <div>Завантаження...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto flex justify-center items-center min-h-screen">
        <div className="text-red-500">
          Помилка завантаження: {error?.message || "Щось пішло не так"}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <SuperheroList superheroes={data?.superheroes || []} />
      <Pagination totalPages={data?.totalPages || 1} onPageChange={setPage} />
    </div>
  );
};

export default HomePage;
