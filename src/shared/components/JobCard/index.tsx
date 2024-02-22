import { Card, CardBody, CardHeader, Checkbox, Divider, Tooltip } from '@nextui-org/react';
import moment from 'moment';
import React from 'react';
import { GiAncientSword } from 'react-icons/gi';
import { IoLocationOutline } from 'react-icons/io5';
import { LiaFileContractSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';
import { ContractTypes } from '../../../core/enums/contractTypes';
import { PositionLevels } from '../../../core/enums/positionLevels';
import { Job } from '../../../core/models/job';
import { getEnumKey } from '../../utils/enumUtils';
import Badge from '../Badge';

interface Props {
  job: Job;
  onSwitch?: (jobId: string) => void;
}

const JobCard: React.FC<Props> = ({ job, onSwitch }) => {
  const navigate = useNavigate();
  return (
    <Card className="mb-6 max-h-[400px] h-[400px]">
      <CardHeader className={`flex gap-3 ${job.userBundle.sponsored && 'bg-orange-200'}`}>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between w-full">
            <h1 onClick={() => navigate(`/position-details/${job.id}`)} className="text-2xl text-sky-500 font-bold cursor-pointer">
              {job.title}
            </h1>
            <Tooltip
              children={
                <>
                  {onSwitch && (
                    <Checkbox
                      isDisabled={job.positionFilled}
                      className="text-white"
                      radius="none"
                      isSelected={job.positionFilled}
                      onChange={() => onSwitch(job.id)}
                    >
                      {job.positionFilled ? 'Position Filled' : 'Mark as Fullfiled'}
                    </Checkbox>
                  )}
                </>
              }
              content={
                'If you switch the flag, the position will be considered as fullfilled and it will not appear anymore in the available jobs and you will not be able to unde this action'
              }
            />
          </div>
          <div className="flex gap-1">
            <Badge content={moment(job.createdDate).fromNow()} />
            {job.userBundle.sponsored && <Badge color="bg-orange-400" content={'Sponsored'} />}
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="max-h-[500px]">
        <div className="flex items-start w-[100%] gap-3">
          <div className="flex items-center gap-1">
            <img className="w-[12px] h-[16px]" src={job.company.logoUrl} />
            <span className="text-gray-500">{job.company.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <IoLocationOutline />
            <span className="text-gray-500">
              {job.location.country}/{job.location.city}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LiaFileContractSolid />
            <span className="text-gray-500">{getEnumKey(ContractTypes, job.contractType)}</span>
          </div>
          <div className="flex items-center gap-1">
            <GiAncientSword />
            <span className="text-gray-500">{getEnumKey(PositionLevels, job.positionLevel)}</span>
          </div>
        </div>

        <div className="flex flex-col w-[100%] h-full text-justify p-2">
          <div
            className="w-[100%] font-light overflow-ellipsis max-w-full max-h-[150px] overflow-hidden"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </div>

        <div className="flex items-center h-auto">
          {job.tags.map((tag, key) => (
            <div key={key} className="bg-blue-500 max-w-[100px text-tiny text-white rounded px-2 py-1 m-1">
              {tag}
            </div>
          ))}
        </div>
      </CardBody>
      <Divider />
    </Card>
  );
};

export default JobCard;
