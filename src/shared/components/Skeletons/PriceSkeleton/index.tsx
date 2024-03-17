import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react';
import React from 'react';

const PriceSkeleton: React.FC = () => {
  return (
    <Card className="w-full h-[400px] space-y-5 p-4" radius="lg">
      <CardHeader className="flex flex-col items-center min-h-[100px]">
        <Skeleton isLoaded={false} className="rounded-lg w-28">
          <div className="h-6 w-full rounded-lg bg-secondary"></div>
        </Skeleton>
      </CardHeader>
      <CardBody className="space-y-3 text-gray-600 flex justify-center items-center">
        <Skeleton isLoaded={false} className="w-3/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary"></div>
        </Skeleton>
        <Skeleton isLoaded={false} className="w-4/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
        </Skeleton>
      </CardBody>
      <Skeleton isLoaded={false} className="rounded-lg">
        <div className="h-12 rounded-lg bg-secondary"></div>
      </Skeleton>
    </Card>
  );
};

export default PriceSkeleton;
