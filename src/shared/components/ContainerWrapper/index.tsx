import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ContainerWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center mx-auto max-w-6xl px-8 w-[100%] mt-14">
      <div className="p-8 rounded">{children}</div>
    </div>
  );
};

export default ContainerWrapper;
