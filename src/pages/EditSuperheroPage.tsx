import { useEditSuperhero } from "../hooks/useEditSuperhero.ts";
import { SuperheroForm } from "../components/SuperheroForm.tsx";
import { ImageGallery } from "../components/ImageGallery.tsx";
import { Button } from "../components/Button.tsx";
import { useNavigate } from "react-router-dom";

const EditSuperheroPage = () => {
  const {
    superhero,
    isLoading,
    initialData,
    updateMutation,
    deleteMutation,
    deleteImageMutation,
  } = useEditSuperhero();

  const navigate = useNavigate();

  if (isLoading || !superhero || !initialData) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Редагування Супергероя
      </h1>

      <SuperheroForm
        initialData={initialData}
        onSubmit={(data, files) => updateMutation.mutate({ data, files })}
        isSubmitting={updateMutation.isPending}
        submitText="Оновити"
      />

      <h3 className="text-xl font-semibold mt-6 mb-2">Фото героя</h3>
      <ImageGallery
        images={superhero.images}
        onDelete={(img) => deleteImageMutation.mutate(img)}
      />

      <div className="mt-8 flex justify-between">
        <Button
          onClick={() => deleteMutation.mutate()}
          isLoading={deleteMutation.isPending}
          variant="danger"
          className="mt-6"
        >
          Видалити Супергероя
        </Button>

        <Button onClick={() => navigate("/")} variant="subtle" size="md">
          Назад
        </Button>
      </div>
    </div>
  );
};

export default EditSuperheroPage;
