import { Button, Input } from '@nextui-org/react';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { FiltersFormValues } from '../../../pages/SearchJobs';

interface Props {
  register: UseFormRegister<FiltersFormValues>;
}

const Filters: React.FC<Props> = ({ register }) => {
  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-5xl w-[100%]">
      <div className="flex gap-4 items-center w-full">
        <Input
          startContent={<BsSearch />}
          {...register('searchText', { required: false, maxLength: 70 })}
          size="sm"
          className="w-[60%] rounded-full shadow-xl"
          classNames={{ inputWrapper: ['bg-white'] }}
          type="text"
          label="Search for your position"
          placeholder="type here..."
        />
        <Input
          startContent={<IoLocationOutline />}
          isRequired={false}
          {...register('location', { required: false })}
          size="sm"
          className="w-[40%] rounded-full shadow-xl"
          classNames={{ inputWrapper: ['bg-white'] }}
          type="text"
          label="Location"
          placeholder="type here..."
        />
      </div>
      <Button type="submit" className="h-[40px] w-[150px] bg-[#6787AD] text-white self-end mt-3 shadow-xl">
        Search
      </Button>
    </div>
  );
};

export default Filters;
