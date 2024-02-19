import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/storeHooks';
import { getJobsAction } from '../../../core/store/jobs/jobsActions';
import { updateBundlesAfterPayment } from '../../../core/store/users/userSlice';
import Router from '../../../infra/routes';
import signalRService from '../../../infra/services/signalr/signalRService';
import { showToast } from '../../utils/toast';
import NavigationBar from '../NavigationBar';

const MainWrapper: React.FC = () => {
  const isAuthenticated = useAppSelector((c) => c.users.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filter = '$orderby=UserBundle/Sponsored desc, CreatedDate desc&count=true&top=30';
    dispatch(getJobsAction(filter));

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
