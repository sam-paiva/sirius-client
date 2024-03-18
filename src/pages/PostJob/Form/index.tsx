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
    return Object.keys(errors).length > 0 || !quillRef.current?.value || !isDirty || !isBundleSelected || !companyLogo;
  };
  const [selectedFile, _] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const companyNameField = watch('companyName');
  const { data, isLoading } = useGetCompaniesQuery(`$filter=contains(toLower(Name), '${companyNameField?.toLowerCase()}')&$top=10`, {
    skip: !companyNameField
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      // Add color options to the toolbar
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'] // remove formatting button
    ]
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background',
    'align',
    'script',
    'direction'
  ];

  const setCompanyAfterSelection = (value: string | null) => {
    if (value) {
      const company = data?.find((c) => c.id === value);
      if (company) {
        setValue('companyWebsite', company?.websiteUrl!, { shouldDirty: true, shouldValidate: true, shouldTouch: true });
        urlToFile(company.logoUrl, setLogo);
        onSelectCompanyId(value.toString());
      }
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
        <div className="flex w-full flex-wrap gap-4">
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
            rules={{ required: requiredMessage }} // Add your validation rules here
            render={({ field }) => (
              <Select
                isRequired={true}
                isInvalid={errors.budget?.message ? true : false}
                {...field}
                placeholder="Select the salary range"
                className="max-w-xs"
                selectedKeys={field.value ?? []}
                errorMessage={errors.budget?.message}
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
            rules={{ required: requiredMessage }} // Add your validation rules here
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                isRequired
                isInvalid={errors.contractType?.message ? true : false}
                placeholder="Select the contract type"
                className="max-w-xs"
                onBlur={onBlur}
                onChange={onChange}
                errorMessage={errors.contractType?.message}
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
            rules={{ required: requiredMessage }} // Add your validation rules here
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                isRequired
                isInvalid={errors.positionLevel?.message ? true : false}
                placeholder="Select a position level"
                className="max-w-xs"
                onBlur={onBlur}
                onChange={onChange}
                errorMessage={errors.positionLevel?.message}
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

          <div className="flex flex-col max-h-[300px] w-full gap-6">
            <h2 className="mt-10 text-[#415A77]">Job Description*</h2>
            <ReactQuill
              modules={modules}
              formats={formats}
              className="max-h-[300px] h-[300px] sm:h-[120px] text-default-800 font-normal text-lg"
              ref={quillRef}
              placeholder="place your description here"
              theme="snow"
              onChange={(e) => setDescription(e)}
            />
          </div>
          <div className="flex flex-col w-full mt-40 gap-6">
            <h2 className="text-[#415A77]">Company Details</h2>
            <Controller
              name="companyName"
              control={control}
              rules={{ required: requiredMessage }}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  allowsCustomValue
                  isRequired
                  isInvalid={errors.companyName?.message ? true : false}
                  onKeyDown={(e: any) => e.continuePropagation()}
                  onSelectionChange={(value) => setCompanyAfterSelection(value?.toString())}
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
              isInvalid={errors.companyWebsite?.message ? true : false}
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
              <div className="flex flex-col items-center justify-center cursor-pointer p-4">
                <p className="text-center">Drag and drop your Company's logo or click to select a file</p>
                <p className="text-center">Recommended size: 100px x 100px</p>
                {companyLogo ? (
                  <p className="text-center">{companyLogo.name}</p>
                ) : (
                  <p className="text-default-400 text-center">Acceptable formats: .jpg, .png, .ico, .jpeg'</p>
                )}
                {companyLogo && <img className="w-[100px] mt-5" src={URL.createObjectURL(companyLogo)} id="logo-content" alt="Preview" />}
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
