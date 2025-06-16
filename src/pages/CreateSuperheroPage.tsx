import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createSuperhero } from "../services/api";
import { SuperheroFormData } from "../types/types";
import { Button } from "../components/Button.tsx";
import { SuperheroForm } from "../components/SuperheroForm.tsx";

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
      <Button onClick={() => navigate(-1)} variant="ghost" className="mb-6">
        Назад
      </Button>

      <h1 className="text-3xl font-bold mb-6 text-center">Створити Супергероя</h1>
      <SuperheroForm
        onSubmit={(data, files) => mutation.mutate({ data, files })}
        isSubmitting={mutation.isPending}
        submitText="Створити"
      />
    </div>
  );
};

export default CreateSuperheroPage;
