import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface UserClaims {
  picture: string | null;
  given_name: string;
  unique_name: string;
  role: string;
}

const getJwtToken = () => Cookies.get('Token');

export const checkifUserIsAuthenticated = () => {
  const token = getJwtToken();
  if (token) {
    const decodedToken = jwtDecode(getJwtToken()!);

    if (decodedToken && decodedToken.exp! * 1000 > Date.now()) return true;
  }

  return false;
};

export const getDecodedToken = (): UserClaims | null => {
  const token = getJwtToken();
  if (!token) {
    return null;
  }

  const decodedToken = jwtDecode<any>(getJwtToken()!);

  return decodedToken;
};
