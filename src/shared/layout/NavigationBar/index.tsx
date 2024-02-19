import { Image, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/background-dark.png';
import usePreviousLocation from '../../../core/hooks/usePreviousLocation';

interface Props {
  isAuthenticated: boolean;
}

const NavigationBar: React.FC<Props> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let currentPathName = location.pathname;
  let isSignIn = currentPathName === 'sign-in';
  const pagesWithoutNavbar = ['/sign-in', '/collect-info'];
  const previousLocation = usePreviousLocation();

  return (
    <>
      {!pagesWithoutNavbar.includes(currentPathName) && (
        <Navbar>
          <NavbarBrand>
            <Image onClick={() => navigate('/home')} alt="logo" src={logo} width={180} className="mt-2 cursor-pointer" />
          </NavbarBrand>
          <NavbarContent className="sm:flex gap-4" justify="center"></NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="lg:flex">
              <Link className="text-black" to={`/prices`} state={{ from: previousLocation }}>
                Prices
              </Link>
            </NavbarItem>
            {/* <NavbarItem className="lg:flex">
              <Link className="text-black" to={`/about`} state={{ from: previousLocation }}>
                About
              </Link>
            </NavbarItem> */}
            {!isAuthenticated && !isSignIn && (
              <NavbarItem className="lg:flex">
                <Link to={`/sign-in`} state={{ from: previousLocation }}>
                  Sign In
                </Link>
              </NavbarItem>
            )}
            {isAuthenticated && (
              <NavbarItem isActive>
                <Link to="/profile" aria-current="page">
                  Profile
                </Link>
              </NavbarItem>
            )}
          </NavbarContent>
        </Navbar>
      )}
    </>
  );
};

export default NavigationBar;
