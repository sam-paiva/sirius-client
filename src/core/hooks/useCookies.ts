import { Cookies } from 'react-cookie-consent';
import { useDispatch } from 'react-redux';
import { initializeAnalytics } from '../../infra/services/google/googleService';
import { saveCookieConsent } from '../../infra/services/localStorage/localStorage';
import { setCookieConsent } from '../store/users/userSlice';
import { useAppSelector } from './storeHooks';

export const useCookies = () => {
  const userAgreed = useAppSelector((c) => c.users.cookiesConsent);
  const dispatch = useDispatch();

  const handleAccept = () => {
    saveCookieConsent(true);
    dispatch(setCookieConsent(true));
    initializeAnalytics();
  };

  const handleDecline = () => {
    Cookies.remove('_ga');
    Cookies.remove('_gat');
    Cookies.remove('_gid');
    saveCookieConsent(false);
    dispatch(setCookieConsent(true));
  };

  return { userAgreed, handleAccept, handleDecline };
};
