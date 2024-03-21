import { Avatar, Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
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
  onFulFill?: (jobId: string, jobDescription: string) => void;
}

const JobCard: React.FC<Props> = ({ job, onFulFill }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="mb-8 h-auto rounded-xl shadow-sm">
        <CardHeader className={`flex gap-3 ${job.positionFilled ? 'bg-[#D2D0D0]' : 'bg-[#415A77]'} rounded-xl`}>
          <div className="flex flex-col gap-2 w-full rounded-xl">
            <div className="flex justify-between w-full rounded-xl">
              <div className="flex justify-start items-center gap-4 rounded-xl">
                <Avatar className="bg-white" src={job.company.logoUrl} />
                <h1
                  onClick={() => navigate(`/position-details/${job.id}`)}
                  className="text-xl sm:text-xl max-w-[60%] overflow-ellipsis overflow-hidden text-default-100 font-bold cursor-pointer"
                >
                  {job.title}
                </h1>
              </div>
              <div className="flex gap-1 rounded-xl items-center">
                <Badge fontColor="sm:hidden text-default-500 text-center" color="bg-white" content={moment(job.createdDate).fromNow()} />
                {job.userBundle.sponsored && <Badge color="bg-orange-400 sm:hidden text-center" content={'Promoted'} />}
                {job.positionFilled && <Badge color="bg-red-400 text-center" content={'Fulfilled'} />}
              </div>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="rounded-xl w-full p-4">
          <div className="flex items-start w-[100%]">
            <div className="flex flex-col items-start gap-3">
              {onFulFill && !job.positionFilled && (
                <Button color="primary" variant="light" onPress={() => onFulFill(job.id, job.title)}>
                  Mark as Fulfilled
                </Button>
              )}
              <span className="hidden sm:flex text-[#415A77] items-center gap-1">
                {job.userBundle.sponsored && (
                  <>
                    <img src={premiumImage} /> <p>Promoted</p>
                  </>
                )}
              </span>
              <span className="text-[#415A77] hidden sm:block">Posted {moment(job.createdDate).fromNow()}</span>
              <span className="text-[#415A77]">{job.budget}</span>
              <div className="flex justify-center gap-2">
                <span className="text-default-800 w-fit flex gap-1">
                  {job.company.name} - <p className="text-[#415A77]">{getEnumKey(ContractTypes, job.contractType)}</p>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-start mt-2 w-32">
            {job.tags.map((tag, key) => (
              <div key={key} className="bg-[#6787AD] w-auto text-sm text-white border-1 rounded-3xl px-2 py-1 m-1">
                {tag}
              </div>
            ))}
            <div className="bg-[#6787AD] text-sm w-auto text-white border-1 rounded-3xl px-2 py-1 m-1">
              {getEnumKey(ContractTypes, job.contractType)}
            </div>
          </div>
        </CardBody>
        <Divider />
      </Card>
    </>
  );
};

export default JobCard;
