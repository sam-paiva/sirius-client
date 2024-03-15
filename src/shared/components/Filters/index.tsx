import { Button, Input } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';

export interface FilterFormValues {
  searchText: string;
  location: string;
}

interface Props {
  onSubmit: (data: FilterFormValues) => void;
}

const Filters: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm<FilterFormValues>();

  return (
    <div className="flex justify-center mx-auto my-0 max-w-5xl w-[100%]">
      <form className="w-[100%] flex flex-col gap-1 items-start" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 items-center w-full">
          <Input
            startContent={<BsSearch />}
            {...register('searchText', { required: true, maxLength: 70 })}
            size="sm"
            className="w-[60%] rounded-full shadow-xl"
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
            type="text"
            label="Location"
            placeholder="type here..."
          />
        </div>
        <Button disabled={!isValid} type="submit" className="h-[30px] w-[150px] bg-cyan-500 text-white self-end mt-3 shadow-xl">
          Search
        </Button>
      </form>
    </div>
  );
};

export default Filters;
