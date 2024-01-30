import { Button } from '@nextui-org/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import gif from '../../../assets/payment-success.gif';
const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-5xl px-8 w-[50%] mt-14 bg-white p-8 border-1 border-gray-300 rounded-md">
      <div className="flex flex-col items-center justify-center w-auto">
        <h1 className="text-center text-3xl font-bold">Payment Successfull</h1>
        <img className="mt-5 w-[80px]" src={gif} alt="Success gif" />
        <Button className="bg-black mt-10 text-xl" color="primary" onClick={() => navigate('/admin/bundles')}>
          See my bundles
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
