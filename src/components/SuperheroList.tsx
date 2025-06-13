import React from "react";
import SuperheroItem, { Superhero } from "./SuperHeroItem.tsx";

interface Props {
  superheroes: Superhero[];
}

const SuperheroList: React.FC<Props> = ({ superheroes }) => {
  if (!superheroes.length) return <p>No superheroes found</p>;

  return (
    <div>
      {superheroes.map((hero) => (
        <SuperheroItem key={hero._id} hero={hero} />
      ))}
    </div>
  );
};

export default SuperheroList;
