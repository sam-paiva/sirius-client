import React from 'react';
import noData from '../../../assets/no-result.png';

const Empty: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <span className="text-2xl font-semibold">No data has been found</span>
      <img src={noData} width={400} height={300} alt="no-data" />
    </div>
  );
};

export default Empty;
