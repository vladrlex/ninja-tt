import { useForm } from "@tanstack/react-form";
import { SuperheroFormData } from "../types/types";
import { Button } from "./Button.tsx";

type Props = {
  initialData?: SuperheroFormData;
  onSubmit: (
    data: Omit<SuperheroFormData, "superpowers"> & { superpowers: string[] },
    files: File[]
  ) => void;
  isSubmitting: boolean;
  submitText: string;
};

export const SuperheroForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  submitText,
}: Props) => {
  const form = useForm({
    defaultValues: {
      nickname: initialData?.nickname ?? "",
      real_name: initialData?.real_name ?? "",
      origin_description: initialData?.origin_description ?? "",
      catch_phrase: initialData?.catch_phrase ?? "",
      superpowers: initialData?.superpowers ?? "",
      images: [] as File[],
    },
    onSubmit: async ({ value }) => {
      const superpowersArray = value.superpowers
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);

      onSubmit(
        {
          nickname: value.nickname,
          real_name: value.real_name,
          origin_description: value.origin_description,
          catch_phrase: value.catch_phrase,
          superpowers: superpowersArray,
        },
        value.images
      );
    },
  });

  return (
    <form onSubmit={form.handleSubmit} className="space-y-4">
      <form.Field name="nickname">
        {(field) => (
          <div>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Прізвисько"
              className="border px-2 py-1 w-full"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="real_name">
        {(field) => (
          <div>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Справжнє ім'я"
              className="border px-2 py-1 w-full"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="origin_description">
        {(field) => (
          <div>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Опис"
              className="border px-2 py-1 w-full"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="superpowers">
        {(field) => (
          <div>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Суперсили (через кому)"
              className="border px-2 py-1 w-full"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="catch_phrase">
        {(field) => (
          <div>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Фраза"
              className="border px-2 py-1 w-full"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="images">
        {(field) => (
          <div>
            <input
              type="file"
              multiple
              onChange={(e) =>
                field.handleChange(Array.from(e.target.files ?? []))
              }
            />
          </div>
        )}
      </form.Field>

      <Button type="submit" isLoading={isSubmitting}>
        {submitText}
      </Button>
    </form>
  );
};
