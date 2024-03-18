import * as signalR from '@microsoft/signalr';
import { getJwtToken } from '../auth/authService';

class SignalRService {
  private hubConnection: signalR.HubConnection | null = null;
  private onReceiveMessageCallbacks: ((message: string) => void)[] = [];

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl(import.meta.env.VITE_SIGNALR_ENDPOINT, { accessTokenFactory: () => getJwtToken() ?? '' })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connected succesfully');
        this.startListening();
      })
      .catch((err) => console.error(`Error starting connection: ${err}`));
  };

  private startListening = () => {
    this.hubConnection?.on('SendPaymentProcessCompleted', (message: string) => {
      this.notifySubscribers(message);
    });
  };

  subscribeToReceiveMessage = (callback: (message: string) => void) => {
    this.onReceiveMessageCallbacks.push(callback);
  };

  private notifySubscribers = (message: string) => {
    this.onReceiveMessageCallbacks.forEach((callback) => callback(message));
  };

  stopConnection = () => {
    this.hubConnection?.stop().then(() => console.log('Connection stopped'));
  };
}

export default new SignalRService();
