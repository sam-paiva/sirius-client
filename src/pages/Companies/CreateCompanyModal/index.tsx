import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CompanyFormValues } from '..';
import { isValidUrl } from '../../../shared/utils/stringUtils';

interface Props {
  show: boolean;
  onClose: () => void;
  preLoadedCompanies: [];
  isLoading: boolean;
  onSubmit: (data: CompanyFormValues) => void;
}
const CreateCompanyModal: React.FC<Props> = ({ show, onClose, isLoading, onSubmit }) => {
  const requiredMessage = 'Required field';
  const [message, setMessage] = useState('');
  const [base64String, setBase64String] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const disableFormSubmit = () => {
    return Object.keys(errors).length > 0 || !isDirty;
  };
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty }
  } = useForm<CompanyFormValues>({ mode: 'onChange' });
  const logo = watch('logo');

  const handleButtonClick = () => {
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const submit = (data: CompanyFormValues) => {
    const values: CompanyFormValues = {
      name: data.name,
      website: data.website,
      logo: data.logo
    };

    onSubmit(values);
  };

  return (
    <Modal placement="top-center" isOpen={show} onClose={onClose} isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit(submit)}>
              <ModalHeader className="flex flex-col gap-1 text-sky-500 font-bold">New Company</ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  isInvalid={errors.name?.message ? true : false}
                  errorMessage={errors.name?.message}
                  {...register('name', { required: requiredMessage })}
                  type="text"
                  label="Company Name"
                />

                <Input
                  isRequired
                  isInvalid={errors.website?.message ? true : false}
                  errorMessage={errors.website?.message}
                  {...register('website', {
                    required: true,
                    validate: (value) => isValidUrl(value) || 'Enter a valid URL'
                  })}
                  type="text"
                  label="Company Website"
                  placeholder="Example: https://youwebsite.com"
                />

                <Controller
                  name="logo" // Nome do campo de arquivo
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <input
                      {...field}
                      key={selectedFile?.name ?? ''}
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(event) => {
                        onChange(event.target.files![0]);
                      }}
                      accept=".png, .jpg, .jpeg, .ico"
                      type="file"
                    />
                  )}
                />
                {logo && <p>{logo.name}</p>}
                <Button onClick={handleButtonClick}>Upload Logo</Button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isLoading} disabled={disableFormSubmit()} color="primary">
                  Create
                </Button>
              </ModalFooter>
            </form>{' '}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateCompanyModal;
