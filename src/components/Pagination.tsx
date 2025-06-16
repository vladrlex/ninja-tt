import { Button } from "./Button.tsx";

const Pagination = ({ totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      {pages.map((page) => (
         <Button
    key={page}
    onClick={() => onPageChange(page)}
    variant="outline"
    size="sm"
  >
    {page}
  </Button>
      ))}
    </div>
  );
};

export default Pagination;
