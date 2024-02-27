import { Button, Image } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/background-dark.png';
import { useAppDispatch } from '../../core/hooks/storeHooks';
import { loginCallbackAction } from '../../core/store/users/usersActions';
import GoogleIcon from '../../shared/Icons/GoogleIcon';
import LinkedinIcon from '../../shared/Icons/LinkedinIcon';
import MicrosoftIcon from '../../shared/Icons/MicrosoftIcon';

const SignIn: React.FC = () => {
  const apiURL = import.meta.env.VITE_API_URL;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [originalBackgroundColor, setOriginalBackgroundColor] = useState('');
  const buttonClass = 'text-black flex';

  const handleUnload = () => {
    const redirectUrl = localStorage.getItem('redirect_url');
    dispatch(loginCallbackAction({ navigate, from: redirectUrl }));
  };

  useEffect(() => {
    const root = document.getElementById('root');
    setOriginalBackgroundColor(root?.style.backgroundColor!);
    if (root) root.style.backgroundColor = 'white';
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
      if (root) root.style.backgroundColor = originalBackgroundColor;
    };
  }, [dispatch]);

  const handleExternalSignIn = (provider: string) => {
    window.open(
      `${apiURL}/auth/external-signin?returnUrl=${'/home'}&provider=${provider}`,
      '_blank',
      'location=yes,height=570,width=520,scrollbars=yes,status=yes'
    );
  };
  return (
    <div className="flex flex-col w-[100%]">
      <div className="bg-white mt-12 mx-auto max-w-screen-lg min-w-[30%] min-h-full">
        <div className="flex justify-center flex-col items-center p-4">
          <Image onClick={() => navigate('/home')} alt="logo" src={logo} width={180} className="mt-2 cursor-pointer" />
          <h1 className="font-medium text-2xl">Create an account or sign in.</h1>
          <span className="text-sm text-justify">By creating an account or signing in, you understand and agree to Unjobless's Terms.</span>
          <span className="text-sm text-justify">You also acknowledge our Cookie and Privacy policies.</span>
        </div>

        <div className="my-8 p-5 text-center w-[100%]">
          <div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => handleExternalSignIn('Google')}
                radius="none"
                isIconOnly={false}
                className={buttonClass}
                aria-label="sign in with google"
              >
                <GoogleIcon />
                Continue with Google
              </Button>
              <Button
                onClick={() => handleExternalSignIn('Microsoft')}
                radius="none"
                isIconOnly={false}
                className={buttonClass}
                color="default"
                aria-label="sign in with Microsoft"
              >
                <MicrosoftIcon />
                Continue with Microsoft
              </Button>
              <Button
                radius="none"
                isIconOnly={false}
                className={buttonClass}
                color="default"
                aria-label="sign in with Linkedin"
                onClick={() => handleExternalSignIn('Linkedin')}
              >
                <LinkedinIcon />
                Continue with Linkedin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
