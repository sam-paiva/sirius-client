import { Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react';
import React from 'react';
import { BsBuilding } from 'react-icons/bs';
import { GiAncientSword, GiMoneyStack } from 'react-icons/gi';
import { IoLocationOutline } from 'react-icons/io5';
import { LiaFileContractSolid } from 'react-icons/lia';

const CompanyCard: React.FC = () => {
  return (
    <Card className="mb-6 max-h-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-sky-500 font-bold"></h1>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="max-h-[300px]">
        <div className="flex items-start w-[100%] gap-3">
          <div className="flex items-center gap-1">
            <GiMoneyStack />
          </div>
          <div className="flex items-center gap-1">
            <IoLocationOutline />
            <span className="text-gray-500"></span>
          </div>
          <div className="flex items-center gap-1">
            <BsBuilding />
          </div>
          <div className="flex items-center gap-1">
            <LiaFileContractSolid />
          </div>
          <div className="flex items-center gap-1">
            <GiAncientSword />
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CompanyCard;
