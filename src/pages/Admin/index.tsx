import { Avatar, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import React from 'react';
import { useAppDispatch } from '../../hooks/storeHooks';
import { getDecodedToken } from '../../infra/services/authService';
import { logoutAction } from '../../store/users/usersActions';

const Admin: React.FC = () => {

  const user = getDecodedToken()!;
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-5xl px-8 w-[100%] mt-14">
      <div className='grid grid-cols-5 gap-4 w-[100%]'>
        <div className='col-span-2 overflow-hidden sticky top-[80px] max-h-[500px]'>
          <Card className="max-w-[400px] max-h-[600px]">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <Avatar src={user.Picture ?? ''} />
                <p className="text-small text-default-500 mt-4">{user.given_name}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className='cursor-pointer'>New Position</p>
              <p className='cursor-pointer' onClick={() => dispatch(logoutAction())}>Logout</p>
            </CardBody>
          </Card>
        </div>

        <div className='col-span-3 bg-gray-500 h-[1200px]'>
          <p>Test</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
