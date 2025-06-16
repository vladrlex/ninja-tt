import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEditSuperhero } from "../hooks/useEditSuperhero.ts";
import { Button } from "../components/Button.tsx";
import { ImageGallery } from "../components/ImageGallery.tsx";

const SuperheroDetailsPage: React.FC = () => {
  const {
    superhero: hero,
    isLoading,
    deleteImageMutation,
  } = useEditSuperhero();

  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="text-center mt-10 text-lg text-gray-500">
        Завантаження
      </div>
    );

  if (!hero)
    return (
      <div className="text-center mt-10 text-gray-500">
        Не знайдено супергероя
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        {hero.nickname}
      </h1>

      <div className="space-y-3 text-gray-800">
        <p>
          <span className="font-semibold">Справжнє ім'я:</span> {hero.real_name}
        </p>
        <p>
          <span className="font-semibold">Опис:</span> {hero.origin_description}
        </p>
        <p>
          <span className="font-semibold">Суперсила:</span>{" "}
          {Array.isArray(hero.superpowers)
            ? hero.superpowers.join(", ")
            : hero.superpowers}
        </p>
        <p>
          <span className="font-semibold">Популярна фраза:</span>{" "}
          {hero.catch_phrase}
        </p>
      </div>

      {hero.images?.length > 0 && (
        <div className="mt-6">
          <ImageGallery
            images={hero.images}
            onDelete={(img) => deleteImageMutation.mutate(img)}
          />
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Button onClick={() => navigate("/")} variant="subtle" size="md">
          Назад
        </Button>

        <Link
          to={`/edit/${hero._id}`}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Змінити Супергероя
        </Link>
      </div>
    </div>
  );
};

export default SuperheroDetailsPage;
