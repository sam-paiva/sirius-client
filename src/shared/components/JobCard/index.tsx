import { Avatar, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import premiumImage from '../../../assets/premium.svg';
import { ContractTypes } from '../../../core/enums/contractTypes';
import { Job } from '../../../core/models/job';
import { getEnumKey } from '../../utils/enumUtils';
import Badge from '../Badge';

interface Props {
  job: Job;
  onSwitch?: (jobId: string) => void;
}

const JobCard: React.FC<Props> = ({ job }) => {
  const navigate = useNavigate();
  return (
    <Card className="mb-2 h-auto rounded-xl shadow-sm">
      <CardHeader className={`flex gap-3  bg-cyan-900 rounded-xl`}>
        <div className="flex flex-col gap-2 w-full rounded-xl">
          <div className="flex justify-between w-full rounded-xl">
            <div className="flex justify-between w-full rounded-xl">
              <div className="flex justify-start items-center gap-4 rounded-xl">
                <Avatar className="bg-white" src={job.company.logoUrl} />
                <h1 onClick={() => navigate(`/position-details/${job.id}`)} className="text-2xl text-default-100 font-bold cursor-pointer">
                  {job.title}
                </h1>
                {job.userBundle.sponsored && <img src={premiumImage} />}
              </div>
              <div className="flex gap-1 rounded-xl">
                <Badge fontColor="text-default-500 text-center" color="bg-white" content={moment(job.createdDate).fromNow()} />
                {job.userBundle.sponsored && <Badge color="bg-orange-400 text-center" content={'Sponsored'} />}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="rounded-xl">
        <div className="flex items-start w-[100%] gap-3">
          <div className="flex items-center gap-1">
            <span className="text-default-800">{job.company.name}</span>
          </div>
        </div>
        <div className="flex items-end justify-start">
          {job.tags.map((tag, key) => (
            <div key={key} className="bg-[#6787AD] max-w-[100px text-tiny text-default border-1 rounded-3xl px-2 py-1 m-1">
              {tag}
            </div>
          ))}
          <div className="bg-[#6787AD] max-w-[100px text-tiny text-default rounded-3xl px-2 py-1 m-1">
            {getEnumKey(ContractTypes, job.contractType)}
          </div>
          <div className="bg-[#6787AD] max-w-[100px text-tiny text-default rounded-3xl px-2 py-1 m-1 sm:hidden">{job.budget}</div>
        </div>
      </CardBody>
      <Divider />
    </Card>
  );
};

export default JobCard;
