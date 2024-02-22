import { Button } from '@nextui-org/react';
import moment from 'moment';
import { useEffect } from 'react';
import { BsBuilding } from 'react-icons/bs';
import { GiAncientSword, GiMoneyStack } from 'react-icons/gi';
import { IoLocationOutline } from 'react-icons/io5';
import { LiaFileContractSolid } from 'react-icons/lia';
import { useParams } from 'react-router-dom';
import { ContractTypes } from '../../core/enums/contractTypes';
import { PositionLevels } from '../../core/enums/positionLevels';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { getJobByIdAction } from '../../core/store/jobs/jobsActions';
import Badge from '../../shared/components/Badge';
import { Spinner } from '../../shared/components/Spinner';
import { getEnumKey } from '../../shared/utils/enumUtils';

const PositionDetails = () => {
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
    <div className="flex flex-col justify-center mx-auto my-0 max-w-5xl px-8 w-[100%] mt-14">
      {!loading && job ? (
        <div className="bg-white p-4 rounded-md shadow-sm mb-10 w-[100%] flex-wrap">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl text-sky-500 font-bold">{job!.title}</h1>
            <div className="flex gap-1">
              <Badge content={moment(job!.createdDate).fromNow()} />
              {job.userBundle.sponsored && <Badge color="bg-orange-400" content={'Sponsored'} />}
            </div>
            <div className="flex items-center">
              {job.tags.map((tag, key) => (
                <div key={key} className="bg-blue-500 max-w-[100px] text-white rounded px-2 py-1 m-1">
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start w-[100%] gap-3 mt-6">
            <div className="flex items-center gap-1">
              <GiMoneyStack />
              <span className="text-gray-500">{job!.budget}</span>
            </div>
            <div className="flex items-center gap-1">
              <IoLocationOutline />
              <span className="text-gray-500">
                {job!.location.country}/{job!.location.city}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BsBuilding />
              <span className="text-gray-500">{job!.company.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <LiaFileContractSolid />
              <span className="text-gray-500">{getEnumKey(ContractTypes, job!.contractType)}</span>
            </div>
            <div className="flex items-center gap-1">
              <GiAncientSword />
              <span className="text-gray-500">{getEnumKey(PositionLevels, job.positionLevel)}</span>
            </div>
          </div>
          <div className="flex flex-col w-[100%] text-justify p-2 mt-10">
            <div className="w-[100%] overflow-ellipsis max-w-full" dangerouslySetInnerHTML={{ __html: job!.description }} />
          </div>

          <div className="mt-10">
            <Button onClick={handleButtonClick} className="text-md bg-sky-500 text-white rounded-none min-w-[200px]">
              {getApplyButtonText()}
            </Button>
          </div>
          {/* <ApplyModal show={showApplyModal} onClose={() => setShowApplyModal(false)} onApply={handleApply} job={job} /> */}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PositionDetails;
