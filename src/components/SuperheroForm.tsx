import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
} from "react";
import { SuperheroFormData } from "../types/types";

type Props = {
  initialData?: SuperheroFormData;
  onSubmit: (
    data: Omit<SuperheroFormData, "superpowers"> & { superpowers: string[] },
    files: File[]
  ) => void;
  isSubmitting: boolean;
  submitText: string;
};

const SuperheroForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  submitText,
}: Props) => {
  const [formData, setFormData] = useState<SuperheroFormData>(
    initialData || {
      nickname: "",
      real_name: "",
      origin_description: "",
      catch_phrase: "",
      superpowers: "",
    }
  );

  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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
    onSubmit(dataToSend, images);
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-6 bg-white p-6 rounded-2xl shadow-lg"
    >
      {[
        { label: "Прізвисько", name: "nickname", type: "text" },
        { label: "Справжнє ім'я", name: "real_name", type: "text" },
        { label: "Опис", name: "origin_description", type: "textarea" },
        { label: "Суперсила", name: "superpowers", type: "text" },
        { label: "Популярна фраза", name: "catch_phrase", type: "text" },
      ].map((field) => (
        <div key={field.name}>
          <label className="block font-medium mb-1">{field.label}</label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={formData[field.name as keyof SuperheroFormData]}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name as keyof SuperheroFormData]}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
        </div>
      ))}

      <div>
        <label className="block font-medium mb-1">Фото</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {isSubmitting ? "Saving..." : submitText}
      </button>
    </form>
  );
};

export default SuperheroForm;
