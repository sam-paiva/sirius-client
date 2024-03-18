import { Skeleton } from '@nextui-org/react';
import React from 'react';

const JobDetailsSkeleton: React.FC = () => {
  const displayHeaderLines = () => {
    const elements = Array.from({ length: 6 }, (_, index) => (
      <div key={index}>
        <div className="mb-4">
          <Skeleton isLoaded={false} className="flex rounded-full w-36 h-4" />
        </div>
        <div className="mb-4">
          <Skeleton isLoaded={false} className="flex rounded-full w-24 h-4" />
        </div>
      </div>
    ));

    return elements;
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-7xl px-8 w-[100%] mt-14 border-gray-300 rounded">
      <div className="bg-white p-12 rounded-md shadow-sm mb-10 w-[100%] flex-wrap">
        <div className="flex justify-between">
          <div>{displayHeaderLines()}</div>
          <div>
            <Skeleton isLoaded={false} className="flex rounded-full w-36 h-36" />
          </div>
        </div>
        <div className="mt-12">
          <Skeleton isLoaded={false} className="flex rounded-full w-[70%] h-6" />
        </div>
        <div className="mt-4">
          <Skeleton isLoaded={false} className="flex rounded-full w-full h-6" />
        </div>
        <div className="mt-4">
          <Skeleton isLoaded={false} className="flex rounded-full w-[60%] h-6" />
        </div>
        <div className="mt-4">
          <Skeleton isLoaded={false} className="flex rounded-full w-[80%] h-6" />
        </div>
        <div className="mt-4">
          <Skeleton isLoaded={false} className="flex rounded-full w-[90%] h-6" />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSkeleton;
