import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
const Callback: React.FC = () => {
  const [searchParams, _] = useSearchParams();
  const redirectUrl = searchParams.get('returnUrl');

  useEffect(() => {
    localStorage.setItem('redirect_url', redirectUrl!);
    window.opener.postMessage(redirectUrl, window.location.origin);

    window.close();
  }, []);

  return <div />;
};

export default Callback;
