import { Button } from "./Button.tsx";

type Props = {
  images: string[];
  onDelete: (img: string) => void;
};

export const ImageGallery = ({ images, onDelete }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {images.map((img) => (
        <div
          key={img}
          className="relative w-full aspect-square bg-gray-100 rounded overflow-hidden"
        >
          <img
            src={`${process.env.REACT_APP_API_URL}/uploads/${img}`}
            alt=""
            className="w-full h-full object-contain"
          />
          <Button
            onClick={() => onDelete(img)}
            variant="danger"
            size="sm"
            className="absolute top-0 right-0"
          >
            X
          </Button>
        </div>
      ))}
    </div>
  );
};
