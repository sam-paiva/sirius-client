import {
  Button,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/background-dark.png';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { logout } from '../../../infra/services/authService';

interface Props {
  isAuthenticated: boolean;
}

const NavigationBar: React.FC<Props> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  let currentPathName = location.pathname;
  let isSignIn = currentPathName === 'sign-in';
  const pagesWithoutNavbar = ['/sign-in', '/collect-info'];
  console.log(currentPathName);

  return (
    <>
      {!pagesWithoutNavbar.includes(currentPathName) && (
        <Navbar>
          <NavbarBrand>
            <Image
              onClick={() => navigate('/home')}
              alt="logo"
              src={logo}
              width={180}
              className="mt-2 cursor-pointer"
            />
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {!isSignIn && (
              <NavbarItem>
                <Link className="text-black" color="foreground" to="/">
                  I want to post
                </Link>
              </NavbarItem>
            )}
            {!isSignIn && (
              <NavbarItem>
                <Link className="text-black" color="foreground" to="/about">
                  About us
                </Link>
              </NavbarItem>
            )}
            {isAuthenticated && (
              <NavbarItem isActive>
                <Link to="/admin" aria-current="page">
                  Admin
                </Link>
              </NavbarItem>
            )}
          </NavbarContent>
          <NavbarContent justify="end">
            {!isAuthenticated && !isSignIn && (
              <NavbarItem className="hidden lg:flex">
                <Link to="/sign-in">Login</Link>
              </NavbarItem>
            )}
            {isAuthenticated && (
              <NavbarItem className="hidden lg:flex">
                <Button onClick={() => logout(dispatch)}>Logout</Button>
              </NavbarItem>
            )}
          </NavbarContent>
        </Navbar>
      )}
    </>
  );
};

export default NavigationBar;
