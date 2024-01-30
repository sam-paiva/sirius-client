import { Card, CardBody, CardFooter, CardHeader, Divider, Link } from '@nextui-org/react';
import moment from 'moment';
import React from 'react';
import { BsBuilding } from 'react-icons/bs';
import { GiAncientSword, GiMoneyStack } from 'react-icons/gi';
import { IoLocationOutline } from 'react-icons/io5';
import { LiaFileContractSolid } from 'react-icons/lia';
import { ContractTypes } from '../../../core/enums/contractTypes';
import { PositionLevels } from '../../../core/enums/positionLevels';
import { Job } from '../../../core/models/job';
import { getEnumKey } from '../../utils/enumUtils';
import Badge from '../Badge';

interface Props {
  job: Job;
}

const JobCard: React.FC<Props> = ({ job }) => {
  return (
    <Card className="mb-6 max-h-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-sky-500 font-bold">{job.title}</h1>
          <Badge content={moment(job.createdDate).fromNow()} />
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="max-h-[300px]">
        <div className="flex items-start w-[100%] gap-3">
          <div className="flex items-center gap-1">
            <GiMoneyStack />
            <span className="text-gray-500">{job.budget ?? 'Not Informed'}</span>
          </div>
          <div className="flex items-center gap-1">
            <IoLocationOutline />
            <span className="text-gray-500">
              {job.location.country}/{job.location.city}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <BsBuilding />
            <span className="text-gray-500">{job.company}</span>
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

        <div className="flex flex-col w-[100%] text-justify p-2">
          <div
            className="w-[100%] overflow-ellipsis max-w-full max-h-[100px] overflow-hidden"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </div>

        <div className="flex items-center">
          {job.tags.map((tag, key) => (
            <div key={key} className="bg-blue-500 max-w-[100px] text-tiny text-white rounded px-2 py-1 m-1">
              {tag}
            </div>
          ))}
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href={`/position-details/${job.id}`}>
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
