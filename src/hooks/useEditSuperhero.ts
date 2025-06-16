import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSuperhero,
  updateSuperhero,
  deleteSuperhero,
  deleteSuperheroImage,
} from "../services/api";
import { Superhero, SuperheroFormData } from "../types/types";

export const useEditSuperhero = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: superhero, isLoading } = useQuery<Superhero>({
    queryKey: ["superhero", id],
    queryFn: () => getSuperhero(id!).then((res) => res.data),
    enabled: !!id,
  });

  const initialData: SuperheroFormData | undefined = superhero && {
    nickname: superhero.nickname,
    real_name: superhero.real_name,
    origin_description: superhero.origin_description,
    catch_phrase: superhero.catch_phrase,
    superpowers: Array.isArray(superhero.superpowers)
      ? superhero.superpowers.join(", ")
      : superhero.superpowers,
  };

  const updateMutation = useMutation({
    mutationFn: ({
      data,
      files,
    }: {
      data: Omit<Superhero, "_id" | "images" | "superpowers"> & {
        superpowers: string[];
      };
      files: File[];
    }) => updateSuperhero(id!, data, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superhero", id] });
      navigate(`/superheroes/${id}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteSuperhero(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superheroes"] });
      navigate("/");
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: (imageName: string) => deleteSuperheroImage(id!, imageName),
    onSuccess: (_, imageName) => {
      queryClient.setQueryData<Superhero>(["superhero", id], (oldData) =>
        oldData
          ? {
              ...oldData,
              images: oldData.images.filter((img) => img !== imageName),
            }
          : oldData
      );
    },
  });

  return {
    superhero,
    isLoading,
    initialData,
    updateMutation,
    deleteMutation,
    deleteImageMutation,
  };
};
