import { Checkbox, CheckboxGroup, Select, SelectItem } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { getJobsAction } from '../../core/store/jobs/jobsActions';
import Empty from '../../shared/components/Empty';
import Filters, { FilterFormValues } from '../../shared/components/Filters';
import JobCard from '../../shared/components/JobCard';
import { Spinner } from '../../shared/components/Spinner';
import { contractTypes, levels, salaryRanges } from '../../shared/utils/enums';

const SearchJobs: React.FC = () => {
  const jobs = useAppSelector((c) => c.jobs.jobs);
  const isLoading = useAppSelector((c) => c.jobs.isLoading);
  const dispatch = useAppDispatch();
  ``;

  useEffect(() => {
    const filter = '$orderby=UserBundle/Sponsored desc, CreatedDate desc&count=true&top=30&$filter=PositionFilled eq false';
    dispatch(getJobsAction(filter));
  }, []);

  const handleSearch = (data: FilterFormValues) => {
    let filter = `$orderby=UserBundle/Sponsored desc, CreatedDate desc&count=true&top=50&$filter=PositionFilled eq false and `;
    filter += `(contains(tolower(Title), '${data.searchText.toLowerCase()}') or contains(tolower(Description), '${data.searchText.toLowerCase()}'))`;

    if (data.location) {
      filter += ` and (contains(tolower(Location/City), '${data.location.toLowerCase()}') or contains(tolower(Location/Country), '${data.location.toLowerCase()}'))`;
    }
    dispatch(getJobsAction(filter));
  };

  return (
    <>
      <div className="flex flex-col gap-10 justify-between mx-auto max-w-7xl px-8 h-full w-[100%] mt-12">
        <div className="flex flex-col w-[551px]">
          <h1 className="text-left text-cyan-800 font-medium w-auto">Search for your positions</h1>
          <span className="text-end text-cyan-600">Find your new job today</span>
        </div>
        <div className="flex gap-20 sm:flex-col w-full">
          <div className="bg-white p-8 w-[30%] h-auto shadow-md rounded-3xl flex flex-col">
            <h3 className="font-semibold text-default-600">Advanced Search</h3>
            <div className="mt-8">
              <span className="text-cyan-900 font-semibold">Salary</span>
              <Select
                isRequired
                placeholder="Select the salary range"
                className="max-w-xs mt-2"
                //onChange={(e) => onChange(salaryRanges[Number(e.target.value)])}
                //errorMessage={errors.positionLevel && 'Field is required'}
              >
                {salaryRanges.map((range, key) => (
                  <SelectItem key={key} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="mt-8">
              <span className="text-cyan-900 font-semibold">Experience Level</span>
              <CheckboxGroup className="mt-2">
                {levels.map((level) => {
                  return (
                    <Checkbox key={level.value} value={level.value.toString()}>
                      {level.label}
                    </Checkbox>
                  );
                })}
              </CheckboxGroup>
            </div>

            <div className="mt-8">
              <span className="text-cyan-900 font-semibold">Experience Level</span>
              <CheckboxGroup className="mt-2">
                {contractTypes.map((contract) => {
                  return (
                    <Checkbox key={contract.value} value={contract.value.toString()}>
                      {contract.label}
                    </Checkbox>
                  );
                })}
              </CheckboxGroup>
            </div>
          </div>

          <div className="w-[60%] sm:w-full">
            <div className="mb-12">
              <Filters onSubmit={handleSearch} />
            </div>
            {!isLoading && jobs?.items.map((job) => <JobCard job={job} key={job.id} />)}
            {isLoading && <Spinner />}
            {!isLoading && jobs?.items.length === 0 && <Empty />}
          </div>
        </div>
      </div>

      {/* <ContainerWrapper>
        <div>
          <h1 className="text-2xl">Search Open Positions</h1>
          <Filters onSubmit={handleSearch} />
        </div>
      </ContainerWrapper>
      <div className="flex flex-col justify-center mx-auto max-w-5xl px-8 w-[100%] mt-14">
        {!isLoading && jobs?.items.map((job) => <JobCard job={job} key={job.id} />)}
        {isLoading && <Spinner />}
        {!isLoading && jobs?.items.length === 0 && <Empty />}
      </div> */}
    </>
  );
};

export default SearchJobs;
