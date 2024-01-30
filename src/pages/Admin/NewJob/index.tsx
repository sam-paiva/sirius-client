import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { ContractTypes } from '../../../core/enums/contractTypes';
import { PositionLevels } from '../../../core/enums/positionLevels';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/storeHooks';
import { AddJobRequest } from '../../../infra/services/jobs/requests/addJobRequest';
import MessageBanner from '../../../shared/components/MessageBanner';
import { Spinner } from '../../../shared/components/Spinner';
import { showToast } from '../../../shared/utils/toast';
import { addJobAction } from '../../../store/jobs/jobsActions';

interface FormValues {
  title: string;
  description: string;
  budget: string;
  city: string;
  country: string;
  companyName: string;
  contractType: ContractTypes;
  positionLevel: PositionLevels;
  positionUrl: string;
}

const NewJob: React.FC = () => {
  const quillRef = useRef<ReactQuill>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState('');
  const [description, setDescription] = useState('');
  const problems = useAppSelector((c) => c.jobs.createJobsProblems);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty }
  } = useForm<FormValues>();
  const isLoading = useAppSelector((c) => c.jobs.isLoading);
  const requiredMessage = 'Field is required';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const contractTypes = [
    { label: 'On Site', value: 1 },
    { label: 'Hybrid', value: 2 },
    { label: 'Remote', value: 3 }
  ];

  const levels = [
    { label: 'Junior', value: 1 },
    { label: 'Mid-Level', value: 2 },
    { label: 'Senior', value: 3 },
    { label: 'Principal', value: 4 }
  ];

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && tagValue.trim() !== '') {
      if (tags.some((c) => c === tagValue)) {
        showToast('Tag already included', 'warning');
        return;
      }
      setTags([...tags, tagValue.trim()]);
      setTagValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const disableFormSubmit = () => {
    return Object.keys(errors).length > 0 || !description || !isDirty;
  };

  const onSubmit = (data: FormValues) => {
    if (!description) showToast("Job description can't be blank", 'warning');

    const request: AddJobRequest = {
      jobTitle: data.title,
      jobDescription: getHtml()!,
      budget: data.budget,
      companyName: data.companyName,
      contractType: Number(data.contractType) as ContractTypes,
      positionLevels: Number(data.positionLevel) as PositionLevels,
      tags: tags,
      city: data.city,
      country: data.country,
      positionUrl: data.positionUrl
    };

    dispatch(addJobAction({ request, navigate }));
  };

  const getHtml = () => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const htmlContent = quill.root.innerHTML;
      return htmlContent;
    }
  };

  const handleFormKeyDown = (e: any) => {
    // Prevent form submission when Enter key is pressed
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-5xl px-8 w-[100%] mt-14">
      <div className="bg-white p-8 font-semibold text-sky-600 rounded-xl shadow-sm">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex justify-between">
              <h1>New Job Position</h1>
            </div>
            <div className="flex mt-5 mb-1">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-blue-500 max-w-[100px] text-white rounded px-2 py-1 m-1 cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
            {problems.length > 0 && <MessageBanner problems={problems} />}
            <form onKeyDown={handleFormKeyDown} className="mt-12" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  isRequired
                  isInvalid={errors.title?.message ? true : false}
                  errorMessage={errors.title?.message}
                  {...register('title', { required: requiredMessage, maxLength: 70 })}
                  type="text"
                  label="Title"
                />
                <Input
                  errorMessage={errors.companyName?.message}
                  {...register('companyName', { maxLength: 100 })}
                  type="text"
                  label="Company (optional)"
                  placeholder="Enter the company name"
                />
                <Input {...register('budget')} type="text" label="Budget (optional)" placeholder="2000 EUR/monthly" />
                <Controller
                  name="contractType"
                  control={control}
                  rules={{ required: true }} // Add your validation rules here
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select
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
                  required
                  {...register('positionUrl', { required: requiredMessage, maxLength: 50 })}
                  type="text"
                  label="Position URL"
                  placeholder="paste here the position's URL from your website"
                />
                <div className="group flex flex-col w-full">
                  <h2 className="mb-8 mt-10">Job Description*</h2>
                  <ReactQuill ref={quillRef} placeholder="place your description here" theme="snow" onChange={(e) => setDescription(e)} />
                </div>
                <div className="flex w-[100%] justify-end">
                  <Button color="primary" disabled={disableFormSubmit()} type="submit" className="w-[17%] text-right">
                    Post
                  </Button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NewJob;
