import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { saveJwtTokenToLocal } from '../../infra/services/auth/authService';
import api from '../../infra/services/axios';
const Callback: React.FC = () => {
  const [searchParams, _] = useSearchParams();
  const redirectUrl = searchParams.get('returnUrl');
  const code = searchParams.get('authorization_code');

  useEffect(() => {
    api.get('/auth/token', { params: { code } }).then((resp) => {
      localStorage.setItem('redirect_url', redirectUrl!);
      saveJwtTokenToLocal(resp.data!);
      window.opener.postMessage(redirectUrl, window.location.origin);
      window.close();
    });
  }, []);

  return <div />;
};

export default Callback;
