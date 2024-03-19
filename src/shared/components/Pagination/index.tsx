import { Pagination as CustomPagination } from '@nextui-org/react';
import React from 'react';

interface Props {
  page: number;
  total: number;
  onChange: (page: number) => void;
  topLimit: number;
}

const Pagination: React.FC<Props> = ({ page, total, onChange, topLimit }) => {
  return (
    <CustomPagination
      isDisabled={Math.ceil(total / topLimit) === 1}
      classNames={{ item: ['bg-gray-400 text-white rounded-full'], cursor: ['bg-sky-600 rounded-full hover:opacity-0'] }}
      page={page}
      total={Math.ceil(total / topLimit)}
      onChange={onChange}
      isCompact={false}
    />
  );
};

export default Pagination;
