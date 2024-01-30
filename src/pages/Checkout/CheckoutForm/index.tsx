import { Button } from '@nextui-org/react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { FormEvent, useState } from 'react';
import MessageBanner from '../../../shared/components/MessageBanner';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/checkout/success`
      }
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message!);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions: any = {
    layout: 'tabs'
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {message && (
        <div className="mb-10">
          {' '}
          <MessageBanner problems={[{ propertyName: 'card', errorMessage: message ?? '' }]} />
        </div>
      )}
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <Button isLoading={isLoading} type="submit" className="mt-10 bg-black text-white text-xl" disabled={!stripe || !elements} id="submit">
        Buy Now
      </Button>
      {/* Show any error or success messages */}
    </form>
  );
};

export default CheckoutForm;
