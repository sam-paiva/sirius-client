import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/storeHooks';
import Router from '../../../infra/routes';
import NavigationBar from '../NavigationBar';

const MainWrapper: React.FC = () => {
  const isAuthenticated = useAppSelector((c) => c.users.isAuthenticated);

  return (
    <BrowserRouter>
      <NavigationBar isAuthenticated={isAuthenticated} />
      <main className="flex justify-start flex-col">
        <Router />
      </main>
    </BrowserRouter>
  );
};

export default MainWrapper;
