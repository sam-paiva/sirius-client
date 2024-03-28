import ReactGA from 'react-ga4';

export const initializeAnalytics = () => {
  if (import.meta.env.MODE === 'production') {
    ReactGA.initialize(import.meta.env.VITE_GOOGLE_MEASUREMENT_ID);
  }
};
