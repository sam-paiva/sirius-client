import { Button } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/storeHooks';
import GoogleIcon from '../../shared/Icons/GoogleIcon';
import { loginCallbackAction } from '../../store/users/usersActions';

const SignIn: React.FC = () => {
  const apiURL = import.meta.env.VITE_API_URL;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUnload = () => {
    dispatch(loginCallbackAction(navigate));
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
      `${apiURL}/auth/signin-google`,
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
              <Button
                type="submit"
                radius="full"
                isIconOnly={false}
                color="default"
                aria-label="sign in with google"
              >
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
