import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { AppDispatch } from '../../store';
import { logoutAction } from '../../store/users/usersActions';

const getJwtToken = () => Cookies.get('Token');

export const checkifUserIsAuthenticated = () => {
  const token = getJwtToken();
  if (token) {
    const decodedToken = jwtDecode(getJwtToken()!);

    if (decodedToken && decodedToken.exp! * 1000 > Date.now()) return true;
  }

  return false;
};

export const getDecodedToken = () => {
  const token = getJwtToken();
  if (!token) {
    return null;
  }

  const decodedToken = jwtDecode<any>(getJwtToken()!);

  return decodedToken;
};

export const logout = (dispatch: AppDispatch) => {
  dispatch(logoutAction());
};
