import { Elements } from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import api from '../../infra/services/axios';
import { formatter } from '../../shared/utils/currencyFormatter';
import CheckoutForm from './CheckoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51OcXdnLEoatTAXb2yiP9FZcEsUAX2KsSDarfn6zlDXSJOghKUHQglFpWxfLT4TzftQpp7iTPFE2yT3k8QXi9K71B00lgrNQ0lt'
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { id } = useParams();

  const { state } = useLocation();
  const selectedBundle = state.bundle;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    api
      .post('/checkout/start-checkout', { id })

      .then((resp) => setClientSecret(resp.data));
  }, []);

  const appearance: Appearance = {
    theme: 'stripe'
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-5xl px-8 w-[100%] mt-14 bg-white p-8 border-1 border-gray-300 rounded-md">
      <div className="w-auto h-auto mb-10">
        <h1>{selectedBundle?.name} Bundle</h1>
        <h2 className="text-gray-500 mt-2 text-2xl">{formatter.format(selectedBundle?.price!)}</h2>
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
