import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import SuperheroForm from "../components/SuperheroForm.tsx";
import { getSuperhero, updateSuperhero } from "../services/api";
import { SuperheroFormData } from "../types/types";

const EditSuperheroPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: superheroData, isLoading } = useQuery({
    queryKey: ["superhero", id],
    queryFn: () => getSuperhero(id!).then((res) => res.data),
    enabled: Boolean(id),
  });

  const mutation = useMutation({
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

  if (isLoading || !superheroData) {
    return (
      <p className="text-center text-gray-500 mt-10">Завантаження Супергероя</p>
    );
  }

  const initialData: SuperheroFormData = {
    nickname: superheroData.nickname || "",
    real_name: superheroData.real_name || "",
    origin_description: superheroData.origin_description || "",
    catch_phrase: superheroData.catch_phrase || "",
    superpowers: Array.isArray(superheroData.superpowers)
      ? superheroData.superpowers.join(", ")
      : superheroData.superpowers,
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 hover:underline"
      >
        ← Назад
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">Редагування Героя</h1>
      <SuperheroForm
        initialData={initialData}
        onSubmit={(data, files) => mutation.mutate({ data, files })}
        isSubmitting={mutation.isPending}
        submitText="Update"
      />
    </div>
  );
};

export default EditSuperheroPage;
