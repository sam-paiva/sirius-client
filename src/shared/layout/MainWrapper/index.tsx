import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/storeHooks';
import Router from '../../../infra/routes';
import { getJobsAction } from '../../../store/jobs/jobsActions';
import NavigationBar from '../NavigationBar';

const MainWrapper: React.FC = () => {
  const isAuthenticated = useAppSelector((c) => c.users.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getJobsAction(null));
  }, []);

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
