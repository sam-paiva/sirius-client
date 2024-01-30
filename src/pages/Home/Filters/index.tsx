import { Button, Input } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';

interface FormValues {
  searchText: string;
  location: string;
}

const Filters: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty }
  } = useForm<FormValues>();
  const requiredMessage = 'Required Field';

  return (
    <div className="flex justify-center mx-auto my-0 max-w-5xl w-[100%] mt-14">
      <form className="w-[100%] flex gap-1 items-center">
        <Input
          startContent={<BsSearch />}
          isRequired
          isInvalid={errors.searchText?.message ? true : false}
          errorMessage={errors.searchText?.message}
          {...register('searchText', { required: requiredMessage, maxLength: 70 })}
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
        <Button color="primary" type="submit" className="h-[90%] w-[20%]">
          Search
        </Button>
      </form>
    </div>
  );
};

export default Filters;
