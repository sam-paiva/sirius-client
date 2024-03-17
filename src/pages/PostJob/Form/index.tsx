import { Autocomplete, AutocompleteItem, Input, Select, SelectItem } from '@nextui-org/react';
import React, { ChangeEvent, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { ContractTypes } from '../../../core/enums/contractTypes';
import { PositionLevels } from '../../../core/enums/positionLevels';
import { useGetCompaniesQuery } from '../../../infra/services/companies/companiesApi';
import SubmitButton from '../../../shared/components/PrimaryButton';
import { contractTypes, levels, salaryRanges } from '../../../shared/utils/enums';
import { urlToFile } from '../../../shared/utils/fileUtils';
import { isValidUrl } from '../../../shared/utils/stringUtils';

export interface FormValues {
  title: string;
  description: string;
  budget: string;
  city: string;
  country: string;
  companyName: string;
  contractType: ContractTypes;
  positionLevel: PositionLevels;
  positionUrl: string;
  companyLogo: string;
  companyWebsite: string;
}

interface Props {
  onSubmit: (data: FormValues) => void;
  handleKeyDown: (e: any) => void;
  quillRef: React.RefObject<ReactQuill>;
  companyLogo: File | null;
  setLogo: (file: File) => void;
  handleDrop: (e: any) => void;
  onDragOver: (e: any) => void;
  setDescription: (value: string) => void;
  tagValue: string;
  setTagValue: (value: string) => void;
  isBundleSelected: boolean;
  onSelectCompanyId: (id: string | null) => void;
}

const Form: React.FC<Props> = ({
  onSubmit,
  handleKeyDown,
  quillRef,
  companyLogo,
  handleDrop,
  onDragOver,
  setDescription,
  tagValue,
  setTagValue,
  onSelectCompanyId,
  isBundleSelected,
  setLogo
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isDirty }
  } = useForm<FormValues>({ mode: 'onChange' });

  const requiredMessage = 'Field is required';
  const disableFormSubmit = () => {
    return Object.keys(errors).length > 0 || !quillRef.current?.value || !isDirty || !isBundleSelected;
  };
  const [selectedFile, _] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const companyNameField = watch('companyName');
  const { data, isLoading } = useGetCompaniesQuery(`$filter=contains(toLower(Name), '${companyNameField?.toLowerCase()}')&$top=10`, {
    skip: !companyNameField
  });

  const setCompanyAfterSelection = (value: string) => {
    const company = data?.find((c) => c.id === value);
    if (company) {
      setValue('companyWebsite', company?.websiteUrl!, { shouldDirty: true, shouldValidate: true, shouldTouch: true });
      urlToFile(company.logoUrl, setLogo);
      onSelectCompanyId(value.toString());
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];

    if (file) {
      setLogo(file);
    }
  };

  const openFileSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <form onKeyDown={handleKeyDown} className="mt-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            isRequired
            isInvalid={errors.title?.message ? true : false}
            errorMessage={errors.title?.message}
            {...register('title', { required: requiredMessage, maxLength: 70 })}
            type="text"
            label="Title"
            placeholder="Example: Software Engineer, QA Tester"
          />

          <Controller
            name="budget"
            control={control}
            rules={{ required: true }} // Add your validation rules here
            render={({ field: { onChange, onBlur } }) => (
              <Select
                isRequired
                placeholder="Select the salary range"
                className="max-w-xs"
                onBlur={onBlur}
                onChange={(e) => onChange(salaryRanges[Number(e.target.value)])}
                errorMessage={errors.positionLevel && 'Field is required'}
              >
                {salaryRanges.map((range, key) => (
                  <SelectItem key={key} value={range.label}>
                    {range.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            name="contractType"
            control={control}
            rules={{ required: true }} // Add your validation rules here
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                isRequired
                placeholder="Select the contract type"
                className="max-w-xs"
                onBlur={onBlur}
                onChange={onChange}
                errorMessage={errors.contractType && 'Field is required'}
                selectedKeys={value ? [value] : []}
              >
                {contractTypes.map((contract) => (
                  <SelectItem key={contract.value} value={contract.value}>
                    {contract.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            name="positionLevel"
            control={control}
            rules={{ required: true }} // Add your validation rules here
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                isRequired
                placeholder="Select a position level"
                className="max-w-xs"
                onBlur={onBlur}
                onChange={onChange}
                errorMessage={errors.positionLevel && 'Field is required'}
                selectedKeys={value ? [value] : []}
              >
                {levels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <Input
            value={tagValue}
            onChange={(e) => setTagValue(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            label="Tags (optional)"
            placeholder="Tap the tag name and press Enter"
          />

          <Input
            isRequired
            isInvalid={errors.country?.message ? true : false}
            required
            {...register('country', { required: requiredMessage, maxLength: 50 })}
            type="text"
            label="Country"
            placeholder=""
          />

          <Input
            isRequired
            isInvalid={errors.city?.message ? true : false}
            required
            {...register('city', { required: requiredMessage, maxLength: 50 })}
            type="text"
            label="City"
            placeholder=""
          />

          <Input
            isRequired
            isInvalid={errors.positionUrl?.message ? true : false}
            errorMessage={errors.positionUrl?.message}
            {...register('positionUrl', {
              required: true,
              validate: (value) => isValidUrl(value) || 'Enter a valid URL'
            })}
            type="text"
            label="Position URL"
            placeholder="Example: https://youwebsite.com/your-position"
          />

          <div className="group flex flex-col w-full">
            <h2 className="mb-8 mt-10">Job Description*</h2>
            <ReactQuill ref={quillRef} placeholder="place your description here" theme="snow" onChange={(e) => setDescription(e)} />
          </div>

          <div className="group flex flex-col w-full gap-3">
            <h2 className="mb-8 mt-10">Company Details</h2>
            <Controller
              name="companyName"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  allowsCustomValue
                  isRequired
                  onKeyDown={(e: any) => e.continuePropagation()}
                  onSelectionChange={(value) => setCompanyAfterSelection(value.toString())}
                  onInputChange={onChange}
                  isLoading={isLoading}
                  label="Company Name"
                  placeholder=""
                  defaultItems={data ?? []}
                >
                  {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
                </Autocomplete>
              )}
            />

            <Input
              isRequired
              isInvalid={errors.companyName?.message ? true : false}
              {...register('companyWebsite', { required: true, validate: (value) => isValidUrl(value) || 'Enter a valid URL' })}
              type="text"
              label="Company Website"
              placeholder="Example: https://youwebsite.com"
              value={watch('companyWebsite')}
            />
            <input
              key={selectedFile?.name ?? ''}
              ref={fileInputRef}
              className="hidden"
              onChange={(event) => handleFileInputChange(event)}
              accept=".png, .jpg, .jpeg, .ico"
              type="file"
              placeholder="Choose your Resume"
            />
            <div
              onClick={openFileSelection}
              className="drop-area bg-gray-100 h-56 flex justify-center items-center"
              onDrop={handleDrop}
              onDragOver={onDragOver}
            >
              <div className="flex flex-col items-center cursor-pointer">
                <p>Drag and drop your Company's logo or click to select a file</p>
                <p>Recommended size: 100px x 100px</p>
                {companyLogo ? <p>{companyLogo.name}</p> : <p className="text-default-400">Acceptable formats: .jpg, .png, .ico, .jpeg'</p>}
                {companyLogo && <img className="w-[100px]" src={URL.createObjectURL(companyLogo)} id="logo-content" alt="Preview" />}
              </div>
            </div>
          </div>

          <div className="flex w-[100%] justify-end mt-10">
            <SubmitButton disabled={disableFormSubmit()} type="submit">
              Review and Submit
            </SubmitButton>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
