import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { getJobsAction } from '../../core/store/jobs/jobsActions';
import ContainerWrapper from '../../shared/components/ContainerWrapper';
import Empty from '../../shared/components/Empty';
import Filters, { FilterFormValues } from '../../shared/components/Filters';
import JobCard from '../../shared/components/JobCard';
import { Spinner } from '../../shared/components/Spinner';

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
      <ContainerWrapper>
        <div>
          <h1 className="text-2xl">Search Open Positions</h1>
          <Filters onSubmit={handleSearch} />
        </div>
      </ContainerWrapper>
      <div className="flex flex-col justify-center mx-auto max-w-5xl px-8 w-[100%] mt-14">
        {!isLoading && jobs?.items.map((job) => <JobCard job={job} key={job.id} />)}
        {isLoading && <Spinner />}
        {!isLoading && jobs?.items.length === 0 && <Empty />}
      </div>
    </>
  );
};

export default SearchJobs;
