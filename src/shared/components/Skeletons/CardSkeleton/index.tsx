import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react';
import React from 'react';

const CardSkeleton: React.FC = () => {
  return (
    <Card className="max-w-[800px] w-full h-36 flex items-start gap-3 bg-gray-100">
      <CardHeader className=" rounded-xl flex">
        <div>
          <Skeleton isLoaded={false} className="flex rounded-full w-12 h-12" />
        </div>
        <div>
          <Skeleton isLoaded={false} className="flex rounded-md w-full h-12" />
        </div>
      </CardHeader>
      <CardBody className="w-full flex flex-col gap-4">
        <Skeleton isLoaded={false} className="h-3 w-full rounded-lg" />
        <Skeleton isLoaded={false} className="h-3 w-full rounded-lg" />
      </CardBody>
    </Card>
  );
};

export default CardSkeleton;
