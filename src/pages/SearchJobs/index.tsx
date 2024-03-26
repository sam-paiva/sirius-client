import { Adsense } from '@ctrl/react-adsense';
import { Checkbox, CheckboxGroup, Select, SelectItem } from '@nextui-org/react';
import React, { useEffect, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ContractTypes } from '../../core/enums/contractTypes';
import { PositionLevels } from '../../core/enums/positionLevels';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { usePagination } from '../../core/hooks/usePagination';
import { getJobsAction } from '../../core/store/jobs/jobsActions';
import Empty from '../../shared/components/Empty';
import Filters from '../../shared/components/Filters';
import JobCard from '../../shared/components/JobCard';
import Pagination from '../../shared/components/Pagination';
import CardSkeleton from '../../shared/components/Skeletons/CardSkeleton';
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
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, control, reset } = useForm<FiltersFormValues>();
  const { page, setPage, limit } = usePagination(20);

  const displayPositionsCount = () => {
    return jobs!.total;
  };

  useEffect(() => {
    const filter = `$orderby=UserBundle/Sponsored desc, CreatedDate desc&count=true&$top=${limit}&$skip=${
      (page - 1) * limit
    }&$filter=PositionFilled eq false`;
    dispatch(getJobsAction(filter));

    return () => {
      const filter = '$orderby=UserBundle/Sponsored desc, CreatedDate desc&count=true&top=30&filter=PositionFilled eq false';
      dispatch(getJobsAction(filter));
    };
  }, [page]);

  const handleSearch: SubmitHandler<FiltersFormValues> = (data) => {
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
    formRef.current!.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const displayJobs = () => {
    return (
      <>
        {jobs?.items.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
        {jobs?.total! > 0 && Math.ceil(jobs?.total! / limit) !== 1 && (
          <Pagination
            page={page}
            total={jobs?.total!}
            topLimit={limit}
            onChange={(page) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setPage(page);
            }}
          />
        )}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-10 justify-between mx-auto max-w-7xl px-8 h-full w-[100%] mt-12">
        <div className="flex flex-col w-fit">
          <h1 className="text-[#415A77] font-semibold">Search for your positions</h1>
          <span className="text-end text-cyan-600">Find your new job today</span>
        </div>
        <div className="flex items-center p-2">
          {jobs && jobs.total! > 0 && <span className="text-cyan-900 text-2xl font-medium mr-1">{displayPositionsCount()}</span>}
          {jobs?.total! > 0 && <h2 className="text-2xl font-medium text-cyan-900">open position(s)🚀</h2>}
        </div>
        <form ref={formRef} id="search-form" onSubmit={handleSubmit(handleSearch)}>
          <div className="flex gap-20 sm:flex-col w-full">
            <div className="bg-white p-8 w-[30%] sm:w-full h-[695px] shadow-md rounded-3xl flex flex-col top-12">
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
              <Adsense client="ca-pub-6150895851927867" slot="7259870550" style={{ display: 'block' }} layout="in-article" format="fluid" />
            </div>

            <div className="w-[60%] sm:w-full">
              <div className="mb-12">
                <Filters register={register} />
              </div>
              {!isLoading && displayJobs()}
              {isLoading && (
                <div className="flex flex-col gap-8">
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              )}
              {!isLoading && jobs?.items.length === 0 && <Empty />}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchJobs;
