import { Button, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react';
import { animated, useSpring } from '@react-spring/web';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gifSuccess from '../../../assets/payment-success.gif';
import MessageBanner from '../../../shared/components/MessageBanner';
import PrimaryButton from '../../../shared/components/PrimaryButton';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const navigate = useNavigate();

  const props = useSpring({
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: { opacity: 0, transform: 'translate(0px, -180px)' }
  });

  const successModal = () => {
    return (
      <Modal
        placement={'top-center'}
        isDismissable={false}
        onClose={() => navigate('/profile')}
        isOpen={showSuccessDialog}
        hideCloseButton={true}
        onOpenChange={setShowSuccessDialog}
      >
        <ModalContent>
          {(_) => (
            <>
              <ModalBody>
                <h1 className="text-center mt-10 text-green-500">Payment Succeeded</h1>
                <animated.div style={props} className={'mx-auto my-0 max-w-5xl px-8 w-[100%]'}>
                  <img src={gifSuccess} />
                </animated.div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="light"
                  onClick={() => {
                    setShowSuccessDialog(false);
                    navigate('/profile');
                  }}
                >
                  Go to My Profile
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error && (error.type === 'card_error' || error.type === 'validation_error')) {
      setMessage(error.message!);
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      setShowSuccessDialog(true);
    }

    setIsLoading(false);
  };

  const paymentElementOptions: any = {
    layout: 'tabs'
  };
  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        {message && (
          <div className="mb-10">
            {' '}
            <MessageBanner problems={[{ propertyName: 'card', errorMessage: message ?? '' }]} />
          </div>
        )}
        <PaymentElement id="payment-element" options={paymentElementOptions} />

        <div className="mt-10">
          <PrimaryButton isLoading={isLoading} type="submit" disabled={!stripe || !elements}>
            Buy Now
          </PrimaryButton>
        </div>
      </form>
      {successModal()}
    </>
  );
};

export default CheckoutForm;
