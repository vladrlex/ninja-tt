import { useNavigate, useParams } from "react-router-dom";
import {
  getSuperhero,
  updateSuperhero,
  deleteSuperhero,
  deleteSuperheroImage,
} from "../services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Superhero, SuperheroFormData } from "../types/types";

const API_URL = process.env.REACT_APP_API_URL;

const EditSuperheroPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<SuperheroFormData>({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
  });
  const [newImages, setNewImages] = useState<File[]>([]);

  const { data: superhero, isLoading } = useQuery<Superhero>({
    queryKey: ["superhero", id],
    queryFn: () => getSuperhero(id!).then((res) => res.data),
    enabled: !!id,
  });

  useEffect(() => {
    if (superhero) {
      setFormData({
        nickname: superhero.nickname,
        real_name: superhero.real_name,
        origin_description: superhero.origin_description,
        superpowers: superhero.superpowers.join(", "),
        catch_phrase: superhero.catch_phrase,
      });
    }
  }, [superhero]);

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
      files,
    }: {
      id: string;
      data: Omit<Superhero, "_id" | "images" | "superpowers"> & {
        superpowers: string[];
      };
      files: File[];
    }) => updateSuperhero(id, data, files),
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      superpowers: formData.superpowers
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
    };
    updateMutation.mutate({ id: id!, data: dataToSend, files: newImages });
  };

  const handleDeleteHero = () => {
    deleteMutation.mutate();
  };

  const handleImageDelete = (img: string) => {
    deleteImageMutation.mutate(img);
  };

  if (isLoading || !superhero) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Superhero</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="Nickname"
        />
        <input
          name="real_name"
          value={formData.real_name}
          onChange={handleChange}
          placeholder="Real Name"
        />
        <textarea
          name="origin_description"
          value={formData.origin_description}
          onChange={handleChange}
          placeholder="Origin Description"
        />
        <input
          name="superpowers"
          value={formData.superpowers}
          onChange={handleChange}
          placeholder="Superpowers (comma-separated)"
        />
        <input
          name="catch_phrase"
          value={formData.catch_phrase}
          onChange={handleChange}
          placeholder="Catch Phrase"
        />
        <input type="file" multiple onChange={handleImageChange} />
        <button type="submit" disabled={updateMutation.isPending}>
          {updateMutation.isPending ? "Updating..." : "Update"}
        </button>
      </form>

      <h3>Current Images:</h3>
      <div>
        {superhero.images.map((img) => (
          <div key={img}>
            <img src={`${API_URL}/uploads/${img}`} alt="" />
            <button onClick={() => handleImageDelete(img)}>Delete</button>
          </div>
        ))}
      </div>

      <button onClick={handleDeleteHero} disabled={deleteMutation.isPending}>
        {deleteMutation.isPending ? "Deleting..." : "Delete Superhero"}
      </button>
    </div>
  );
};

export default EditSuperheroPage;
