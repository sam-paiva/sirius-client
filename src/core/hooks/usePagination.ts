import { useState } from 'react';

export const usePagination = (limit: number) => {
  const [page, setPage] = useState(1);

  return { page, setPage, limit };
};
