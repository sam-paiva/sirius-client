import { Button } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../core/hooks/storeHooks';
import { loginCallbackAction } from '../../core/store/users/usersActions';
import GoogleIcon from '../../shared/Icons/GoogleIcon';

const SignIn: React.FC = () => {
  const apiURL = import.meta.env.VITE_API_URL;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleUnload = () => {
    const redirectUrl = localStorage.getItem('redirect_url');
    dispatch(loginCallbackAction({ navigate, from: redirectUrl }));
  };

  useEffect(() => {
    // Add a message event listener to receive messages from child windows
    const handleMessage = (event: any) => {
      if (event.origin === window.location.origin) {
        handleUnload();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      // Remove the event listener when the component is unmounted
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch]);

  const signInWithGoogle = () => {
    window.open(
      `${apiURL}/auth/google-signin?returnUrl=${location.state.from ?? ''}`,
      '_blank',
      'location=yes,height=570,width=520,scrollbars=yes,status=yes'
    );
  };
  return (
    <div className="flex flex-col w-[100%]">
      <div className="bg-white mt-12 mx-auto max-w-screen-lg min-w-[30%] min-h-full rounded-xl shadow-sm">
        <h1 className="mt-12 text-center">Login</h1>
        <div className="my-8 p-5 text-center w-[100%]">
          <div>
            <form onSubmit={signInWithGoogle}>
              <Button type="submit" radius="full" isIconOnly={false} color="default" aria-label="sign in with google">
                <GoogleIcon />
                Continue with Google
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
