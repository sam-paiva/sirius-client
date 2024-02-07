import { Button } from '@nextui-org/react';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: (data?: any) => void;
  disabled?: boolean;
  type?: 'submit' | 'button';
}

const PrimaryButton: React.FC<Props> = ({ children, onClick, disabled, type }) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled} className="text-md bg-sky-500 text-white rounded-none min-w-[200px]">
      {children}
    </Button>
  );
};

export default PrimaryButton;
