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

export const checkifUserIsAuthenticated = () => {
  const token = getJwtToken();
  if (token) {
    const decodedToken = jwtDecode(getJwtToken()!);

    if (decodedToken && decodedToken.exp! * 1000 > Date.now()) return true;
    else removeToken();
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

export const saveJwtTokenToLocal = (token: string) => {
  if (!token) {
    console.log('token not found', token);
    return;
  }

  localStorage.setItem(TOKEN, token);
};

export const getJwtToken = () => localStorage.getItem(TOKEN);
export const removeToken = () => localStorage.removeItem(TOKEN);
