import { Avatar } from '@nextui-org/react';
import moment from 'moment';
import { useEffect } from 'react';
import { BsEnvelopePaper } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import locationSvg from '../../assets/location.svg';
import skillSvg from '../../assets/skill.svg';
import { ContractTypes } from '../../core/enums/contractTypes';
import { PositionLevels } from '../../core/enums/positionLevels';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { getJobByIdAction } from '../../core/store/jobs/jobsActions';
import PrimaryButton from '../../shared/components/PrimaryButton';
import JobDetailsSkeleton from '../../shared/components/Skeletons/JobDetailsSkeleton';
import { getEnumKey } from '../../shared/utils/enumUtils';

const JobDetails = () => {
  let { jobId } = useParams();
  const dispatch = useAppDispatch();
  const job = useAppSelector((c) => c.jobs.selectedJob);
  const loading = useAppSelector((c) => c.jobs.isLoading);

  useEffect(() => {
    dispatch(getJobByIdAction(jobId!));
  }, []);

  const handleButtonClick = () => openUrlWithHttps(job?.positionUrl!);

  const getApplyButtonText = () => {
    return 'APPLY';
  };

  const openUrlWithHttps = (url: string) => {
    // Check if the URL starts with "http://" or "https://"
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-7xl px-8 sm:px-1 w-[100%] mt-14 border-gray-300 rounded">
      {!loading && job ? (
        <div className="bg-white p-12 rounded-md shadow-sm mb-10 w-[100%] flex-wrap">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <span>Job From {moment(job!.createdDate).format('LL')}</span>
              <h1 className="text-4xl text-[#415A77] font-bold">{job!.title}</h1>
              <span className="">{job.budget}</span>
              <span className="">{job.company.name}</span>
              <div className="flex items-start flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img src={locationSvg} />
                  <span>
                    {job.location.country} / {job.location.city}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BsEnvelopePaper />
                  <span>{getEnumKey(ContractTypes, job.contractType)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <img src={skillSvg} />
                  <span>{getEnumKey(PositionLevels, job.positionLevel)}</span>
                </div>
              </div>
            </div>

            <div className="sm:hidden">
              <Avatar src={job.company.logoUrl} className="bg-gray-100 w-[150px] h-[150px]" />
            </div>
          </div>

          <div className="flex items-end justify-start mt-4">
            {job.tags.map((tag, key) => (
              <div key={key} className="bg-[#6787AD] text-tiny text-white border-1 rounded-xl px-2 py-1 m-1">
                {tag}
              </div>
            ))}
          </div>
          <div className="flex flex-col w-[100%] text-justify p-2 mt-10">
            <div className="w-[100%] overflow-ellipsis max-w-full" dangerouslySetInnerHTML={{ __html: job!.description }} />
          </div>

          <div className="mt-10 flex justify-end sm:justify-center">
            <PrimaryButton onClick={handleButtonClick}>{getApplyButtonText()}</PrimaryButton>
          </div>
          {/* <ApplyModal show={showApplyModal} onClose={() => setShowApplyModal(false)} onApply={handleApply} job={job} /> */}
        </div>
      ) : (
        <JobDetailsSkeleton />
      )}
    </div>
  );
};

export default JobDetails;
