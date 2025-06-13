import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createSuperhero,
  updateSuperhero,
  getSuperhero,
} from "../services/api";
import { SuperheroFormData } from "../types/types";

const CreateEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<SuperheroFormData>({
    nickname: "",
    real_name: "",
    origin_description: "",
    catch_phrase: "",
    superpowers: "",
  });

  const [images, setImages] = useState<File[]>([]);

  const { data: superheroData, isLoading } = useQuery({
    queryKey: ["superhero", id],
    queryFn: () => getSuperhero(id!),
    enabled: isEditMode,
  });

  useEffect(() => {
    if (superheroData) {
      const hero = superheroData.data;
      setFormData({
        nickname: hero.nickname || "",
        real_name: hero.real_name || "",
        origin_description: hero.origin_description || "",
        catch_phrase: hero.catch_phrase || "",
        superpowers: (hero.superpowers || []).join(", "),
      });
    }
  }, [superheroData]);

  const createMutation = useMutation({
    mutationFn: ({
      data,
      files,
    }: {
      data: Omit<SuperheroFormData, "superpowers"> & { superpowers: string[] };
      files: File[];
    }) => createSuperhero(data, files),
    onSuccess: () => navigate("/"),
    onError: () => alert("Error creating superhero"),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      data,
      files,
    }: {
      data: Omit<SuperheroFormData, "superpowers"> & { superpowers: string[] };
      files: File[];
    }) => updateSuperhero(id!, data, files),
    onSuccess: () => navigate("/"),
    onError: () => alert("Error updating superhero"),
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
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

    const mutationFn = isEditMode ? updateMutation : createMutation;

    mutationFn.mutate({ data: dataToSend, files: images });
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Назад</button>

      <h1>{isEditMode ? "Edit Superhero" : "Create Superhero"}</h1>

      {isEditMode && isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label>Nickname:</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Real Name:</label>
            <input
              type="text"
              name="real_name"
              value={formData.real_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Origin Description:</label>
            <textarea
              name="origin_description"
              value={formData.origin_description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Superpowers:</label>
            <input
              type="text"
              name="superpowers"
              value={formData.superpowers}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Catch Phrase:</label>
            <input
              type="text"
              name="catch_phrase"
              value={formData.catch_phrase}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Images:</label>
            <input type="file" multiple onChange={handleImageChange} />
          </div>

          <button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {isEditMode
              ? updateMutation.isPending
                ? "Updating..."
                : "Update"
              : createMutation.isPending
              ? "Creating..."
              : "Create"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateEditPage;
