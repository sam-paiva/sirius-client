import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/storeHooks';
import Router from '../../../infra/routes';
import { checkifUserIsAuthenticated } from '../../../infra/services/auth/authService';
import signalRService from '../../../infra/services/signalr/signalRService';
import { updateBundlesAfterPayment } from '../../../store/users/userSlice';
import { getUserBundlesAction } from '../../../store/users/usersActions';
import { showToast } from '../../utils/toast';
import NavigationBar from '../NavigationBar';

const MainWrapper: React.FC = () => {
  const isAuthenticated = useAppSelector((c) => c.users.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //dispatch(getJobsAction(null));
    if (checkifUserIsAuthenticated()) dispatch(getUserBundlesAction());

    signalRService.startConnection();
    signalRService.subscribeToReceiveMessage(handlePaymentProcessedMessage);
    return () => {
      signalRService.stopConnection();
    };
  }, []);

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
