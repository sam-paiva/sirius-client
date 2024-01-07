import React from 'react';
import { MdError } from 'react-icons/md';
import { Problem } from '../../../core/models/problem';

interface Props {
  problems: Problem[];
}

const MessageBanner: React.FC<Props> = (props) => {
  const { problems } = props;
  return (
    <div className="flex flex-col justify-start bg-red-200 w-[100%] h-auto p-4 rounded mb-1">
      {problems.map((problem, key) => (
        <div key={key} className="flex items-center gap-1">
          <MdError style={{ fill: 'red' }} />
          <p className="text-red-600 font-bold">{problem.errorMessage}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageBanner;
