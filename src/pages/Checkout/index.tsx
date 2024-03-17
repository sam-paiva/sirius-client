import { Elements } from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useBundleIcon } from '../../core/hooks/useBundleIcon';
import { Bundle } from '../../core/models/bundle';
import api from '../../infra/services/axios';
import { formatter } from '../../shared/utils/currencyFormatter';
import { showToast } from '../../shared/utils/toast';
import CheckoutForm from './CheckoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY, { locale: 'auto' });

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { id } = useParams();
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const { svgIcon } = useBundleIcon(selectedBundle?.name!);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    api.post('/checkout/start-checkout', { id }).then((resp) => setClientSecret(resp.data));

    api.get('/bundles').then((response) => {
      if (response.status !== 200) {
        showToast('Bundle not found', 'error');
      }

      const bundle = response.data.find((c: Bundle) => c.id === id);

      setSelectedBundle(bundle);
    });
  }, []);

  const appearance: Appearance = {
    theme: 'stripe'
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-5xl px-8 w-[100%] mt-14 p-8 rounded-md">
      <div className="w-auto h-auto mb-10">
        {selectedBundle && (
          <>
            <div className="flex items-center gap-4">
              {svgIcon && <img src={svgIcon} width={40} />}
              <h1 className="text-[#415A77]">{selectedBundle?.name} Bundle</h1>
            </div>
            <h2 className="text-[#415A77] font-light mt-2 text-2xl">{formatter.format(selectedBundle?.price!)}</h2>
          </>
        )}
      </div>
      {clientSecret && selectedBundle && (
        <Elements options={options} stripe={stripePromise}>
          <div className="bg-white p-8 rounded shadow-2xl">
            <div className="mb-12 text-[#415A77]">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <BsCheck className="bg-green" />
                  <span>Post up to {selectedBundle.positionsCreation} positions</span>
                </div>

                {selectedBundle.sponsored && (
                  <div className="flex items-center">
                    <BsCheck className="bg-green" />
                    <span>Sponsored tag</span>
                  </div>
                )}
              </div>

              <div className="flex items-center mt-4">
                <BsCheck className="bg-green" />
                <span>Logo Included</span>
              </div>
              <div className="mt-8">
                <span>
                  Take advantage of the ticket opportunity now and begin your journey to find the perfect team of talented individuals to
                  collaborate with.
                </span>
              </div>
            </div>
            <CheckoutForm />
          </div>
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
