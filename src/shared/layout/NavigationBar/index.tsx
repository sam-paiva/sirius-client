import { Image, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo-light.svg';
import usePreviousLocation from '../../../core/hooks/usePreviousLocation';

interface Props {
  isAuthenticated: boolean;
}

const NavigationBar: React.FC<Props> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let currentPathName = location.pathname;
  let isSignIn = currentPathName === 'sign-in';
  const pagesWithoutNavbar = ['/sign-in', '/callback'];
  const previousLocation = usePreviousLocation();
  const linkClass = 'hover:text-black text-default-500 transition duration-300 hover:border-b-2 hover:border-black';

  return (
    <>
      {!pagesWithoutNavbar.includes(currentPathName) && (
        <Navbar maxWidth="xl" className="bg-[#fff] h-[87px] border-b">
          <NavbarBrand>
            <Image onClick={() => navigate('/home')} alt="logo" src={logo} width={180} className="mt-2 cursor-pointer" />
          </NavbarBrand>
          <NavbarContent className="sm:flex gap-4" justify="center"></NavbarContent>
          <NavbarContent justify="end" className="gap-20 sm:gap-4">
            <NavbarItem className="lg:flex">
              <Link className={linkClass} to={`/search-jobs`} state={{ from: previousLocation }}>
                Search
              </Link>
            </NavbarItem>
            <NavbarItem className="lg:flex">
              <Link className={linkClass} to={`/prices`} state={{ from: previousLocation }}>
                Prices
              </Link>
            </NavbarItem>
            {!isAuthenticated && !isSignIn && (
              <NavbarItem className="lg:flex">
                <Link className={linkClass} to={`/sign-in`} state={{ from: previousLocation }}>
                  Sign In
                </Link>
              </NavbarItem>
            )}
            {isAuthenticated && (
              <NavbarItem isActive>
                <Link className={linkClass} to="/profile" aria-current="page">
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
