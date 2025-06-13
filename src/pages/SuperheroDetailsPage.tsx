import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSuperhero } from "../services/api";
import { Superhero } from "../types/types";


const SuperheroDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: hero,
    isLoading,
    isError,
    error,
  } = useQuery<Superhero>({
    queryKey: ["superhero", id],
    queryFn: () => getSuperhero(id!).then((res) => res.data),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading superhero details.</p>;
  if (!hero) return <p>No superhero found.</p>;

  return (
    <div className="superhero-details">
      <h1>{hero.nickname}</h1>

      <p>
        <strong>Real Name:</strong> {hero.real_name}
      </p>
      <p>
        <strong>Description:</strong> {hero.origin_description}
      </p>
      <p>
        <strong>Superpowers:</strong>{" "}
        {Array.isArray(hero.superpowers)
          ? hero.superpowers.join(", ")
          : hero.superpowers}
      </p>
      <p>
        <strong>Catch Phrase:</strong> {hero.catch_phrase}
      </p>

      <div className="images-container">
        {hero.images?.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:3001/uploads/${image}`}
            alt={`Hero ${index}`}
            className="hero-image"
          />
        ))}
      </div>

      <div className="actions">
        <button onClick={() => navigate("/")}>Back</button>
        <Link to={`/edit/${hero._id}`} className="edit-button">
          Edit Superhero
        </Link>
      </div>
    </div>
  );
};

export default SuperheroDetailsPage;