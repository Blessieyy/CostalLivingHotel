import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../PaymentForm';


// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51Q50mBJYx4FshoLlHxuSfgacLycuB4DLpcJFveklJDgdGTIwOfzYK89XdiKSmH8XkRYbTVarASCAZ7aK7Y9kw4EM00YbUurlxV');

const StripeWrapper = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default StripeWrapper;
