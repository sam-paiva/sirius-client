import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/storeHooks';
import { getJobsAction } from '../../../core/store/jobs/jobsActions';
import { updateBundlesAfterPayment } from '../../../core/store/users/userSlice';
import { getUserBundlesAction } from '../../../core/store/users/usersActions';
import Router from '../../../infra/routes';
import { checkifUserIsAuthenticated } from '../../../infra/services/auth/authService';
import signalRService from '../../../infra/services/signalr/signalRService';
import { showToast } from '../../utils/toast';
import NavigationBar from '../NavigationBar';

const MainWrapper: React.FC = () => {
  const isAuthenticated = useAppSelector((c) => c.users.isAuthenticated);
  const dispatch = useAppDispatch();
  const filter = '$orderby=UserBundle/Sponsored desc, CreatedDate desc';

  useEffect(() => {
    dispatch(getJobsAction(filter));

    signalRService.startConnection();
    signalRService.subscribeToReceiveMessage(handlePaymentProcessedMessage);
    return () => {
      signalRService.stopConnection();
    };
  }, []);

  useEffect(() => {
    if (checkifUserIsAuthenticated()) dispatch(getUserBundlesAction());
  }, [isAuthenticated]);

  const handlePaymentProcessedMessage = (message: string) => {
    showToast('Bundle Added', 'success');
    dispatch(updateBundlesAfterPayment(JSON.parse(message)));
  };

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
