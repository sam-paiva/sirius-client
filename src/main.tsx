import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import MainWrapper from './shared/layout/MainWrapper/index.tsx';
import { store } from './store/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainWrapper />
    </Provider>
  </React.StrictMode>
);
