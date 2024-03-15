import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/storeHooks';
import useSignalR, { METHOD_NAMES } from '../../../core/hooks/useSignalR';
import { getJobsAction } from '../../../core/store/jobs/jobsActions';
import { updateBundlesAfterPayment } from '../../../core/store/users/userSlice';
import Router from '../../../infra/routes';
import { showToast } from '../../utils/toast';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';

const Initializer = () => {
  const isAuthenticated = useAppSelector((c) => c.users.isAuthenticated);
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar isAuthenticated={isAuthenticated} />
      <main className="min-h-[853px]">
        <Router />
      </main>
      <Footer />
    </div>
  );
};

const MainWrapper: React.FC = () => {
  const isAuthenticated = useAppSelector((c) => c.users.isAuthenticated);
  const jobs = useAppSelector((c) => c.jobs.userJobs);
  const dispatch = useAppDispatch();

  const { subscribeToHub, isConnected } = useSignalR();

  useEffect(() => {
    const filter = '$orderby=UserBundle/Sponsored desc, CreatedDate desc&count=true&top=30&filter=PositionFilled eq false';
    dispatch(getJobsAction(filter));
  }, [isAuthenticated, jobs]);

  useEffect(() => {
    if (isConnected) subscribeToHub(METHOD_NAMES.sendPaymentProcessCompleted, handlePaymentProcessedMessage);
  }, [isConnected]);

  const handlePaymentProcessedMessage = (message: string) => {
    showToast('Bundle Added', 'success');
    dispatch(updateBundlesAfterPayment(JSON.parse(message)));
  };

  return (
    <BrowserRouter>
      <Initializer />
    </BrowserRouter>
  );
};

export default MainWrapper;
