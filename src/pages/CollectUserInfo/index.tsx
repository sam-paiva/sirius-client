import { Button } from '@nextui-org/react';
import React from 'react';
import background from '../../assets/office.png';

const CollectUserInfo: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-[100%] h-[100%]">
      <div className="h-[100%] mt-20 gap-3">
        <h1 className="mb-10 text-sky-800">We want to know more about</h1>
        <Button className="text-lg text-white bg-orange-500 border-1 border-solid border-sky-500 w-[80%] h-20">
          I want to Work
        </Button>
        <Button className="text-lg text-white bg-orange-500 border-1 border-solid border-sky-500 w-[80%] h-20">
          I want to Hire
        </Button>
      </div>
      <div
        style={{
          background: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
        }}
      ></div>
    </div>
  );
};

export default CollectUserInfo;
