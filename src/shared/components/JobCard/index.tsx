import { Avatar, Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import sponsoredCrown from '../../../assets/card-crown.png';
import locationSvg from '../../../assets/location.svg';
import { ContractTypes } from '../../../core/enums/contractTypes';
import { Job } from '../../../core/models/job';
import { getEnumKey } from '../../utils/enumUtils';
import Badge from '../Badge';

interface Props {
  job: Job;
  onFulFill?: (jobId: string, jobDescription: string) => void;
}

const JobCard: React.FC<Props> = ({ job, onFulFill }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="mb-8 h-auto rounded-xl shadow-md">
        <CardHeader className={`flex p-0 gap-3 ${job.positionFilled ? 'bg-[#D2D0D0]' : 'bg-[#415A77]'} rounded-xl`}>
          <div className="flex flex-col gap-2 w-full rounded-xl">
            <div className="flex justify-between w-full rounded-xl">
              <div className="flex p-4 justify-start items-center gap-4 rounded-xl px-4">
                <Avatar className="bg-white" src={job.company.logoUrl} />
                <h1
                  onClick={() => navigate(`/position-details/${job.id}`)}
                  className="text-xl sm:max-w-[200px] md:max-w-[200px] w-full overflow-ellipsis overflow-hidden text-default-100 font-bold cursor-pointer"
                >
                  {job.title}
                </h1>
              </div>
              <div className="flex gap-1 rounded-xl items-start">
                {job.userBundle.sponsored && <Badge color="bg-[#EDC253] text-center" fontColor="text-black" content={'Promoted'} />}
              </div>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="rounded-xl w-full p-4">
          <div className="flex items-start w-[100%]">
            <div className="flex flex-col items-start gap-3">
              {onFulFill && !job.positionFilled && (
                <Button className="bg-[#415A77] text-white max-h-9 min-w-24" onClick={() => onFulFill(job.id, job.title)}>
                  Fulfill
                </Button>
              )}
              {job.positionFilled && <Badge color="bg-[#6787AD] text-center" content={'Fulfilled'} />}
              {job.budget !== 'Prefer not to share' && <span className="text-[#415A77]">{job.budget}</span>}
              <div className="flex justify-center gap-2">
                {job.userBundle.sponsored && <img src={sponsoredCrown} />}
                <div className="flex items-center gap-2">
                  <span className="text-default-800 w-fit flex items-center gap-1">{job.company.name}</span>
                  <span className="text-[#415A77] text-sm">{getEnumKey(ContractTypes, job.contractType)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src={locationSvg} />
                <span>
                  {job.location.country} {Boolean(job.location.city) && `/ ${job.location.city}`}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-10 w-full">
            <div className="flex flex-wrap">
              {job.tags.slice(0, 3).map((tag, key) => (
                <div key={key} className="bg-[#6787AD] text-center w-auto text-sm text-white border-1 rounded-3xl px-2 py-1 m-1">
                  {tag}
                </div>
              ))}
            </div>
            <span className="text-[#6787AD] font-light">{moment(job!.createdDate).fromNow()}</span>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default JobCard;
