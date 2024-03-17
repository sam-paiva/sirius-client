import { Checkbox, CheckboxGroup, Select, SelectItem } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ContractTypes } from '../../core/enums/contractTypes';
import { PositionLevels } from '../../core/enums/positionLevels';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { getJobsAction } from '../../core/store/jobs/jobsActions';
import Empty from '../../shared/components/Empty';
import Filters from '../../shared/components/Filters';
import JobCard from '../../shared/components/JobCard';
import { Spinner } from '../../shared/components/Spinner';
import { getEnumKey } from '../../shared/utils/enumUtils';
import { contractTypes, levels, salaryRanges } from '../../shared/utils/enums';

export interface FiltersFormValues {
  searchText: string;
  location: string;
  budget?: string;
  experienceLevels: string[];
  contractTypes: string[];
}

const SearchJobs: React.FC = () => {
  const jobs = useAppSelector((c) => c.jobs.jobs);
  const isLoading = useAppSelector((c) => c.jobs.isLoading);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, control, reset } = useForm<FiltersFormValues>();

  useEffect(() => {
    const filter = '$orderby=UserBundle/Sponsored desc, CreatedDate desc&count=true&top=30&$filter=PositionFilled eq false';
    dispatch(getJobsAction(filter));
  }, []);

  const handleSearch: SubmitHandler<FiltersFormValues> = (data, event) => {
    event?.preventDefault();

    let filter = `$orderby=UserBundle/Sponsored desc, CreatedDate desc&count=true&top=50&$filter=PositionFilled eq false`;

    if (data?.searchText)
      filter += ` and (contains(tolower(Title), '${data.searchText.toLowerCase()}') or contains(tolower(Description), '${data.searchText.toLowerCase()}'))`;

    if (data?.location) {
      filter += ` and (contains(tolower(Location/City), '${data.location.toLowerCase()}') or contains(tolower(Location/Country), '${data.location.toLowerCase()}'))`;
    }

    if (data?.contractTypes && data.contractTypes.length > 0) {
      const enumFilter = data.contractTypes.map((value) => `'${getEnumKey(ContractTypes, Number(value))}'`).join(',');
      filter += ` and (ContractType in (${enumFilter}))`;
    }

    if (data?.experienceLevels && data.experienceLevels.length > 0) {
      const enumFilter = data.experienceLevels.map((value) => `'${getEnumKey(PositionLevels, Number(value))}'`).join(',');
      filter += ` and (PositionLevel in (${enumFilter}))`;
    }

    if (data?.budget) {
      filter += ` and (Budget eq '${salaryRanges[Number(data.budget)].label}')`;
    }

    dispatch(getJobsAction(filter));
  };

  const resetFilters = () => {
    reset();
    handleSubmit(handleSearch);
  };

  return (
    <>
      <div className="flex flex-col gap-10 justify-between mx-auto max-w-7xl px-8 h-full w-[100%] mt-12">
        <div className="flex flex-col w-fit">
          <h1 className="text-left text-cyan-800 font-medium w-auto">Search for your positions</h1>
          <span className="text-end text-cyan-600">Find your new job today</span>
        </div>
        <form onSubmit={handleSubmit(handleSearch)}>
          <div className="flex gap-20 sm:flex-col w-full">
            <div className="bg-white p-8 w-[30%] sm:w-full h-auto shadow-md rounded-3xl flex flex-col">
              <div className="flex justify-between items-center sm:flex-col sm:items-start sm:justify-start">
                <h3 className="font-semibold text-default-600">Advanced Search</h3>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span onClick={resetFilters} className="hover:border-b-1 hover:transition w-fit cursor-pointer">
                  Clear Filters
                </span>
                <span onClick={handleSubmit(handleSearch)} className="hover:border-b-1 hover:transition w-fit cursor-pointer">
                  Apply Filters
                </span>
              </div>
              <div className="mt-8">
                <span className="text-cyan-900 font-semibold">Salary</span>
                <Controller
                  name="budget"
                  control={control}
                  render={({ field }) => {
                    console.log(field.value);
                    return (
                      <Select placeholder="Select the salary range" className="max-w-xs mt-2" {...field} selectedKeys={field.value ?? []}>
                        {salaryRanges.slice(0, -1).map((range, key) => (
                          <SelectItem key={key} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </Select>
                    );
                  }}
                />
              </div>

              <div className="mt-8">
                <span className="text-cyan-900 font-semibold">Experience Level</span>
                <Controller
                  name="experienceLevels"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <CheckboxGroup {...field} className="mt-2">
                      {levels.map((level) => {
                        return (
                          <Checkbox key={level.value} value={level.value.toString()}>
                            {level.label}
                          </Checkbox>
                        );
                      })}
                    </CheckboxGroup>
                  )}
                />
              </div>

              <div className="mt-8">
                <span className="text-cyan-900 font-semibold">Contract Types</span>
                <Controller
                  name="contractTypes"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <CheckboxGroup {...field} className="mt-2">
                      {contractTypes.map((contract) => {
                        return (
                          <Checkbox key={contract.value} value={contract.value.toString()}>
                            {contract.label}
                          </Checkbox>
                        );
                      })}
                    </CheckboxGroup>
                  )}
                />
              </div>
            </div>

            <div className="w-[60%] sm:w-full">
              <div className="mb-12">
                <Filters register={register} />
              </div>
              {!isLoading && jobs?.items.map((job) => <JobCard job={job} key={job.id} />)}
              {isLoading && <Spinner />}
              {!isLoading && jobs?.items.length === 0 && <Empty />}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchJobs;
