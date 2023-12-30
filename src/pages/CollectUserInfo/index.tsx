import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaAddressCard } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { addRoleAction } from '../../store/users/usersActions';


const CollectUserInfo: React.FC = () => {

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const isLoading = useAppSelector(c => c.users.isLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const roles = [{
    name: 'Recruiter',
    icon: <FaAddressCard className='text-4xl' />,
  }, {
    name: 'Applicant',
    icon: <MdOutlineWork className='text-4xl' />,
  }]


  return (
    <div className="flex min-w-[60%] justify-center mx-auto items-center p-8 sm:p-14">
      <div className='mt-28 h-auto w-[100%] flex flex-col justify-center items-center bg-white p-8 sm:p-12 rounded-md shadow'>
        <h1 className='font-bold text-3xl text-justify'>Please, select your role</h1>
        <h2 className='mt-4 max-w-md text-gray-800 text-opacity-80 text-justify'>We would like to know more about you, this way,
          we can provide you with the best features our app could offer.
        </h2>
        <div className='flex justify-center gap-5 mt-12'>
          {roles.map((role, key) => {
            return <React.Fragment key={key}>
              <Button onClick={() => setSelectedRole(role.name)} key={key}
                className={`${selectedRole === role.name ? `bg-orange-500 text-white` : `bg-transparent text-black`} h-70 text-lg flex flex-col justify-center 
                items-center w-auto gap-0 p-12 border border-solid border-orange-500`}>
                {role.icon}
                {role.name}
              </Button>
            </React.Fragment>
          })}
        </div>
        <div className='mt-14 w-[100%] flex justify-center'>
          <Button
            isLoading={isLoading}
            onClick={() => dispatch(addRoleAction({ role: selectedRole, navigate }))} radius='full' className='disabled:bg-transparent text-large h-10 w-[40%] bg-orange-500
             text-white' disabled={!selectedRole}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CollectUserInfo;
