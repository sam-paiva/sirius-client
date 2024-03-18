import * as signalR from '@microsoft/signalr';
import { useEffect, useRef, useState } from 'react';
import { getJwtToken } from '../../infra/services/auth/authService';

export const METHOD_NAMES = {
  sendPaymentProcessCompleted: 'SendPaymentProcessCompleted'
};

const useSignalR = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  const hubUrl = import.meta.env.VITE_SIGNALR_ENDPOINT;

  useEffect(() => {
    connectionRef.current = new signalR.HubConnectionBuilder().withUrl(hubUrl, { accessTokenFactory: () => getJwtToken()! }).build();

    connectionRef.current
      .start()
      .then(() => {
        console.log('SignalR connected');
        setIsConnected(true);
      })
      .catch((error) => {
        console.error('SignalR connection error:', error);
      });

    connectionRef.current.onclose(() => {
      console.log('SignalR connection closed');
      setIsConnected(false);
    });

    setConnection(connectionRef.current);

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, [hubUrl]);

  const subscribeToHub = (methodName: string, callback: (message: any) => void) => {
    if (connectionRef.current) {
      connectionRef.current.on(methodName, callback);
    }
  };

  return { connection, isConnected, subscribeToHub };
};

export default useSignalR;
