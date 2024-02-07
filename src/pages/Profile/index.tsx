import { Avatar, Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { BsBuilding, BsTicket, BsTools } from 'react-icons/bs';
import { IoLogOutOutline } from 'react-icons/io5';
import { LiaPlusCircleSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { getDecodedToken } from '../../infra/services/auth/authService';
import JobCard from '../../shared/components/JobCard';
import { Spinner } from '../../shared/components/Spinner';
import { logoutAction } from '../../store/users/usersActions';

const Profile: React.FC = () => {
  const user = getDecodedToken()!;
  const dispatch = useAppDispatch();
  const userJobs = useAppSelector((c) => c.jobs.userJobs);
  const isLoading = useAppSelector((c) => c.jobs.isLoading);
  const linkClass = 'cursor-pointer text-md text-black font-light p-1';

  useEffect(() => {
    //dispatch(getJobsByUserAction());
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
          <Card className="max-w-[400px] max-h-[500px] h-[500px]">
            <CardHeader className="flex gap-3 items-centers justify-start bg-sky-300">
              <div className="flex flex-col items-start justify-start">
                <Avatar size="lg" src={user.picture ?? ''} />
                <p className="text-md mt-4">{`${user.given_name} ${user.unique_name}`}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col justify-between">
              <div className="flex flex-col w-[100%]">
                <div className="flex w-[100%] items-center">
                  <LiaPlusCircleSolid />
                  <Link to={'/post-job'} className={linkClass}>
                    Post Job
                  </Link>
                </div>
                <div className="flex w-[100%] items-center">
                  <BsBuilding />
                  <Link to={'/companies'} className={linkClass}>
                    Companies
                  </Link>
                </div>
                <div className="flex w-[100%] items-center">
                  <BsTicket />
                  <Link to={'/profile/bundles'} className={linkClass}>
                    My Bundles
                  </Link>
                </div>
                <div className="flex w-[100%] items-center">
                  <BsTools />
                  <Link to={'/profile/bundles'} className={linkClass}>
                    Settings
                  </Link>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex h-auto w-auto items-center gap-1 justify-start">
                <IoLogOutOutline />
                <p className="cursor-pointer text-md p-0 m-0" onClick={() => dispatch(logoutAction())}>
                  Logout
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="col-span-3">{!isLoading ? renderJobs() : <Spinner />}</div>
      </div>
    </div>
  );
};

export default Profile;
