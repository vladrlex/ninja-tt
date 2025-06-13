import React from "react";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export interface Superhero {
  _id: string;
  nickname: string;
  images?: string[];
}

interface Props {
  hero: Superhero;
}

const SuperheroItem: React.FC<Props> = ({ hero }) => {
  return (
    <div>
      <img
        src={`${API_URL}/images/${hero.images?.[0]}`}
        alt={hero.nickname}
        className="w-10"
      />
      <h3>{hero.nickname}</h3>
      <Link to={`/edit/${hero._id}`}>Edit</Link>{" "}
      <Link to={`/superheroes/${hero._id}`}>View Details</Link>
    </div>
  );
};

export default SuperheroItem;
