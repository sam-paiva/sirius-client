import React from 'react';
import PrimaryButton from '../PrimaryButton';

interface Props {
  handleAccept: () => void;
  handleDecline: () => void;
}

const CookieBanner: React.FC<Props> = ({ handleAccept, handleDecline }) => {
  return (
    <div className="w-full h-auto flex sm:flex-col md:flex-col justify-between bg-white shadow-2xl p-8 items-center gap-16 z-50 bottom-0 fixed">
      <div className="flex w-auto flex-col">
        <h1 className="text-lg font-bold">This website uses cookies</h1>
        <p className="text-justify text-medium mt-5">
          We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share
          information about your use of our site with our social media, advertising and analytics partners who may combine it with other
          information that you’ve provided to them or that they’ve collected from your use of their services. You can read more in our{' '}
          <a href="https://www.termsfeed.com/live/b59718c0-6e9a-41dc-80fd-d232df8a4f12" target="_blank">
            Privacy Policy Terms
          </a>
        </p>
      </div>
      <div className="flex flex-col w-auto gap-4">
        <PrimaryButton onClick={handleAccept}>Consent</PrimaryButton>
        <PrimaryButton onClick={handleDecline}>Reject</PrimaryButton>
      </div>
    </div>
  );
};

export default CookieBanner;
