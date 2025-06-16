import React from "react";
import { Link } from "react-router-dom";
import { Eye } from "../assets/icons/eye.tsx";
import { Edit } from "../assets/icons/edit.tsx";
import { Delete } from "../assets/icons/delete.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSuperhero } from "../services/api";
import { Button } from "./Button.tsx";

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
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteSuperhero(hero._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superheroes"] });
    },
    onError: () => alert("Не вдалося видалити героя"),
  });

  const handleDelete = () => {
    const confirmed = window.confirm("Ви точно хочете видалити цього героя?");
    if (confirmed) {
      deleteMutation.mutate();
    }
  };

  const imageUrl = hero.images?.[0]
    ? `${API_URL}/images/${hero.images[0]}`
    : null;

  return (
    <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 text-gray-100 rounded-xl border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:border-slate-600">
      <Button variant="icon" size="icon" onClick={handleDelete}>
        {" "}
        <Delete />{" "}
      </Button>

      <div className="relative h-52 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={hero.nickname}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}

        <div
          className={`${
            imageUrl ? "hidden" : "flex"
          } w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 items-center justify-center`}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-3 mx-auto border border-cyan-500/30">
              <span className="text-cyan-400 text-2xl font-bold">
                {hero.nickname.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-slate-400 text-sm">Немає фото</span>
          </div>
        </div>

        {hero.images && hero.images.length > 1 && (
          <div className="absolute top-3 left-3 bg-black/70 text-cyan-400 text-xs px-2 py-1 rounded-full border border-cyan-500/30">
            +{hero.images.length - 1}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
      </div>

      <div className="absolute bottom-16 left-0 right-0 px-4">
        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
          <span className="block truncate">{hero.nickname}</span>
        </h3>
      </div>

      <div className="flex flex-col gap-2 p-4 bg-slate-800/50 backdrop-blur-sm">
        <Link
          to={`/edit/${hero._id}`}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-gray-200 hover:text-white rounded-lg text-sm font-medium transition-all duration-200 border border-slate-600 hover:border-slate-500"
        >
          <Edit />
          Змінити
        </Link>
        <Link
          to={`/superheroes/${hero._id}`}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Eye />
          Огляд
        </Link>
      </div>

      {deleteMutation.isPending && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl backdrop-blur-sm">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-600 border-t-cyan-400 mx-auto mb-2"></div>
            <span className="text-sm">Видалення...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperheroItem;
