import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface UserClaims {
  picture: string | null;
  given_name: string;
  unique_name: string;
  role: string;
  sub: string;
  email: string;
}

const TOKEN = 'token';

const getJwtTokenFromCookie = () => Cookies.get('Token');

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

export const saveJwtTokenToLocal = () => {
  const token = getJwtTokenFromCookie();

  if (!token) {
    console.log('cookie cant be accessed in the server', token);
    return;
  }

  localStorage.setItem(TOKEN, token);
};

export const getJwtToken = () => localStorage.getItem(TOKEN);
export const removeToken = () => localStorage.removeItem(TOKEN);
