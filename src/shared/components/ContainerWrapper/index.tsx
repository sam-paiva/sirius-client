import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ContainerWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-5xl px-8 w-[100%] mt-14 bg-white p-8 border-1 border-gray-300 rounded-md">
      {children}
    </div>
  );
};

export default ContainerWrapper;
