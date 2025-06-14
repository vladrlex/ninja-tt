import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSuperhero, deleteSuperheroImage } from "../services/api";
import { Superhero } from "../types/types";

const SuperheroDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const API_URL = process.env.REACT_APP_API_URL;

  const {
    data: hero,
    isLoading,
    isError,
  } = useQuery<Superhero>({
    queryKey: ["superhero", id],
    queryFn: () => getSuperhero(id!).then((res) => res.data),
    enabled: !!id,
  });

  const deleteImageMutation = useMutation({
    mutationFn: (imageName: string) => deleteSuperheroImage(id!, imageName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superhero", id as string] });

    },
    onError: () => {
      alert("Не вдалося видалити фото");
    },
  });

  if (isLoading)
    return (
      <div className="text-center mt-10 text-lg text-gray-500">
        Завантаження
      </div>
    );
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Помилка завантаження деталей супергероя
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
          <h2 className="text-xl font-semibold mb-2">Фото:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hero.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={`${API_URL}/uploads/${image}`}
                  alt={`Hero ${index}`}
                  className="w-full h-64 object-cover rounded-lg shadow"
                />
                {hero.images.length > 1 && (
                  <button
                    onClick={() => deleteImageMutation.mutate(image)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded hover:bg-red-700"
                  >
                    🗑
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
        >
          Назад
        </button>
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
