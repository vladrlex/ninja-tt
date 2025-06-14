import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import SuperheroForm from "../components/SuperheroForm.tsx";
import { createSuperhero } from "../services/api";
import { SuperheroFormData } from "../types/types";

const CreateSuperheroPage = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
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

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 hover:underline"
      >
        ← Назад
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">Create Superhero</h1>
      <SuperheroForm
        onSubmit={(data, files) => mutation.mutate({ data, files })}
        isSubmitting={mutation.isPending}
        submitText="Create"
      />
    </div>
  );
};

export default CreateSuperheroPage;
