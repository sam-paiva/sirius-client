import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { BsCurrencyEuro, BsTicket } from 'react-icons/bs';
import { IoLogOutOutline } from 'react-icons/io5';
import { LiaPlusCircleSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { usePagination } from '../../core/hooks/usePagination';
import { getJobsByUserAction, updatePositionFilledAction } from '../../core/store/jobs/jobsActions';
import { logoutAction } from '../../core/store/users/usersActions';
import { getDecodedToken } from '../../infra/services/auth/authService';
import Empty from '../../shared/components/Empty';
import JobCard from '../../shared/components/JobCard';
import CardSkeleton from '../../shared/components/Skeletons/CardSkeleton';

interface FulFillModalProps {
  jobId: string | null;
  open: boolean;
  jobDescription: string | null;
}

const Profile: React.FC = () => {
  const user = getDecodedToken()!;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userJobs = useAppSelector((c) => c.jobs.userJobs);
  const isLoading = useAppSelector((c) => c.jobs.isLoading);
  const userBundles = useAppSelector((c) => c.users.userBundles);
  const [fulFillModal, setFulFillModal] = useState<FulFillModalProps>({ open: false, jobId: null, jobDescription: null });
  const linkClass = 'cursor-pointer text-md text-[#415A77] font-normal p-1';
  const { page, setPage, limit } = usePagination(20);

  useEffect(() => {
    const filter = `$orderby=PositionFilled asc,CreatedDate desc&$count=true&$top=${limit}&$skip=${(page - 1) * limit}`;
    dispatch(getJobsByUserAction(filter));
  }, [page]);

  const handleDisableJob = (jobId: string) => {
    dispatch(updatePositionFilledAction(jobId));
  };

  const renderJobs = () => {
    if (userJobs?.items.length == 0) return <Empty />;

    return (
      <>
        <h2 className="text-[#415A77] text-2xl font-light mb-8 sm:mt-10">Manage your posts</h2>
        {userJobs?.items.map((job, key) => (
          <JobCard key={key} job={job} onFulFill={(jobId, jobDescription) => setFulFillModal({ open: true, jobId, jobDescription })} />
        ))}
        {userJobs?.total! > 0 && Math.ceil(userJobs?.total! / limit) !== 1 && (
          <Pagination
            isDisabled={Math.ceil(userJobs?.total! / limit) === 1}
            color="primary"
            page={page}
            total={Math.ceil(userJobs?.total! / limit)}
            onChange={(page) => setPage(page)}
            isCompact={false}
          />
        )}
      </>
    );
  };
  const modalFullfiled = () => {
    return (
      <Modal placement="top-center" isOpen={fulFillModal.open}>
        <ModalContent>
          {(_) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Attention</ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to mark <b>{fulFillModal.jobDescription}</b> as fulfilled? the action can't be undone
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => setFulFillModal({ jobId: null, open: false, jobDescription: null })}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleDisableJob(fulFillModal.jobId!);
                    setFulFillModal({ open: false, jobDescription: null, jobId: null });
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };

  const buyBundlesBanner = () => {
    return (
      <>
        {userBundles?.items.every((c) => c.remainingPositions === 0) && !isLoading && (
          <div className="flex flex-col justify-start bg-orange-200 w-auto h-auto p-4 rounded mb-1">
            <div className="flex items-center justify-between gap-1">
              <p className="text-orange-600 font-bold">You have no valid bundles</p>
              <Button onClick={() => navigate('/prices')} className="bg-orange-300">
                Buy
              </Button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-7xl px-8 w-[100%] mt-14">
      <div className="flex flex-col w-fit p-8">
        <h1 className="text-[#415A77] font-semibold">Profile</h1>
        <span className="self-end pl-8 sm:pl-0 text-cyan-800">Empowering careers, one post at a time.</span>
      </div>
      <div className="flex gap-4 sm:flex-col w-[100%]">
        <div className="w-[40%] sm:w-full overflow-hidden lg:sticky md:sticky top-[100px] max-h-[500px]">
          {buyBundlesBanner()}
          <Card className="max-w-[400px] h-[400px] rounded-3xl shadow-xl p-8">
            <CardHeader className="flex gap-3 items-centers justify-start">
              <div className="flex flex-col items-start justify-start">
                <p className="text-xl text-default-500">Welcome {`${user.unique_name}`}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col justify-between">
              <div className="flex flex-col w-[100%] gap-3">
                <div className="flex w-[100%] items-center">
                  <LiaPlusCircleSolid />
                  <Link to={'/post-job'} className={linkClass}>
                    Post Job
                  </Link>
                </div>
                <div className="flex w-[100%] items-center">
                  <BsTicket />
                  <Link to={'/profile/bundles'} className={linkClass}>
                    My Bundles
                  </Link>
                </div>
                <div className="flex w-[100%] items-center">
                  <BsCurrencyEuro />
                  <Link to={'/prices'} className={linkClass}>
                    Buy Bundle
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
        <div className="w-[60%] sm:w-full">
          {!isLoading ? (
            renderJobs()
          ) : (
            <div className="flex flex-col gap-8">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          )}
        </div>
      </div>
      {modalFullfiled()}
    </div>
  );
};

export default Profile;
