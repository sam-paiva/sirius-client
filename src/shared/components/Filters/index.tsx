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
    <div className="flex justify-center mx-auto my-0 max-w-5xl w-[100%] mt-14">
      <form className="w-[100%] flex gap-1 items-center" onSubmit={handleSubmit(onSubmit)}>
        <Input
          startContent={<BsSearch />}
          {...register('searchText', { required: true, maxLength: 70 })}
          size="lg"
          className="w-[100%]"
          type="text"
          label="Search for your position"
          placeholder="type here..."
        />
        <Input
          startContent={<IoLocationOutline />}
          isRequired={false}
          {...register('location', { required: false })}
          size="lg"
          className="w-[100%]"
          type="text"
          label="Location"
          placeholder="type here..."
        />
        <Button disabled={!isValid} type="submit" className="h-[90%] w-[20%] bg-sky-400 text-white">
          Search
        </Button>
      </form>
    </div>
  );
};

export default Filters;
