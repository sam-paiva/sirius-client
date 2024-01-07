import {
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/background-dark.png';

interface Props {
  isAuthenticated: boolean;
}

const NavigationBar: React.FC<Props> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let currentPathName = location.pathname;
  let isSignIn = currentPathName === 'sign-in';
  const pagesWithoutNavbar = ['/sign-in', '/collect-info'];

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
          <NavbarContent className="sm:flex gap-4" justify="center">

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
              <NavbarItem className="lg:flex">
                <Link to="/sign-in">Sign In</Link>
              </NavbarItem>
            )}
          </NavbarContent>
        </Navbar>
      )}
    </>
  );
};

export default NavigationBar;
