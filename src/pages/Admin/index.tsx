import { Avatar, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { getDecodedToken } from '../../infra/services/auth/authService';
import JobCard from '../../shared/components/JobCard';
import { Spinner } from '../../shared/components/Spinner';
import { getJobsByUserAction } from '../../store/jobs/jobsActions';
import { logoutAction } from '../../store/users/usersActions';

const Admin: React.FC = () => {
  const user = getDecodedToken()!;
  const dispatch = useAppDispatch();
  const userJobs = useAppSelector((c) => c.jobs.userJobs);
  const isLoading = useAppSelector((c) => c.jobs.isLoading);

  console.log(userJobs);

  useEffect(() => {
    dispatch(getJobsByUserAction());
  }, []);

  const renderJobs = () => {
    if (userJobs.length == 0)
      return (
        <>
          <p className="text-center">No jobs found</p>
        </>
      );

    return userJobs.map((job, key) => <JobCard key={key} job={job} />);
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-5xl px-8 w-[100%] mt-14">
      <div className="grid grid-cols-5 gap-4 w-[100%]">
        <div className="col-span-2 overflow-hidden sticky top-[80px] max-h-[500px]">
          <Card className="max-w-[400px] max-h-[600px]">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <Avatar src={user.picture ?? ''} />
                <p className="text-small text-default-500 mt-4">{user.given_name}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Link to={'/admin/new-job'} className="cursor-pointer">
                New Position
              </Link>
              <Link to={'/admin/bundles'} className="cursor-pointer">
                My bundles
              </Link>
              <p className="cursor-pointer mt-5" onClick={() => dispatch(logoutAction())}>
                Logout
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="col-span-3">{!isLoading ? renderJobs() : <Spinner />}</div>
      </div>
    </div>
  );
};

export default Admin;
