import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SuperheroList from "../components/SuperheroList.tsx";
import Pagination from "../components/Pagination.tsx";
import { getSuperheroes } from "../services/api";

const HomePage = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getSuperheroes(page)
      .then((res) => {
        setSuperheroes(res.data.superheroes);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("Failed to fetch superheroes", err);
      });
  }, [page]);

  return (
    <div className="">
      <h1>Superheroes</h1>
      <Link to="/create">
        <button>+ Add New Superhero</button>
      </Link>
      <SuperheroList superheroes={superheroes} />
      <Pagination
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default HomePage;
