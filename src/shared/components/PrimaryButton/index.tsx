import { Button } from '@nextui-org/react';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: (data?: any) => void;
  disabled?: boolean;
  type?: 'submit' | 'button';
  isLoading?: boolean;
}

const PrimaryButton: React.FC<Props> = ({ children, onClick, disabled, type, isLoading }) => {
  return (
    <Button
      isLoading={isLoading ?? false}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="text-md bg-[#6787AD] text-white rounded-md shadow-2xl min-w-[200px] w-auto"
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
