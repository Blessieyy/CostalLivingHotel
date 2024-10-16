import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePay } from '@fortawesome/free-brands-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { db } from './firebase';

const PaymentForm = () => {
    const [email, setEmail] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Card');
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('SA'); // Default country

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserName(userData.userName);
                    setSurname(userData.surname);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        navigate('/success'); // Redirect to success page
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        if (!postalCode || postalCode.length < 4) {
            setErrorMessage('Please enter a valid postal code.');
            return;
        }


        setIsProcessing(true);

        const cardElement = elements.getElement(CardElement);

        // Log billing details for debugging
        console.log('Billing Details:', {
            email,
            postalCode,
            country,
        });

        // Create the payment method with billing details
        const { error, paymentMethod: newPaymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: email,
                address: {
                    postal_code: postalCode, // Postal code
                    country: country,        // Country
                },
            },
        });

        if (error) {
            console.error('[PaymentMethod Error]', error);
            setErrorMessage(error.message);
            setIsProcessing(false);
            return;
        }

        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethodId: newPaymentMethod.id,
                amount: 9000, // Example amount in cents
                postalCode: postalCode, // Pass postal code to backend
            }),
        });

        const result = await response.json();
        if (result.error) {
            console.error(result.error);
            setErrorMessage(result.error);
            setIsProcessing(false);
        } else {
            console.log('Payment Successful:', result.paymentIntent);
            alert('Payment successful!');
            setIsProcessing(false);

        }
    };

    return (
        <div className='payment-container'>
            <header className="header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faBackward} />
                </button>
                <h1 className="room-header">Payment Form</h1>
                <div className="username-section">
                    <i className="fas fa-user-circle"></i>
                    <span>{userName} {surname}</span>
                </div>
            </header>

            <div className="payment-form">
                <h1 className='payhead'>Payment Form</h1>
                <div className="payment-methods">
                    <button
                        className={paymentMethod === 'Card' ? 'active' : ''}
                        onClick={() => setPaymentMethod('Card')}
                    >
                        💳 Card
                    </button>
                    <button
                        className={paymentMethod === 'ApplePay' ? 'active' : ''}
                        onClick={() => setPaymentMethod('ApplePay')}
                    >
                         Apple Pay
                    </button>
                    <button
                        className={paymentMethod === 'GooglePay' ? 'active' : ''}
                        onClick={() => setPaymentMethod('GooglePay')}
                    >
                        <FontAwesomeIcon icon={faGooglePay} /> Google Pay
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Card number:</label>
                        <CardElement id="card-element" />
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country:</label>
                        <select id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                            <option value="US">United States</option>
                            <option value="SA">South Africa</option>
                            <option value="DE">Germany</option>
                            <option value="UK">United Kingdom</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="postal-code">Postal Code:</label>
                        <input
                            type="text"
                            id="postal-code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="12345"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isProcessing || !stripe} jh>
                        {isProcessing ? 'Processing...' : 'Pay Now'}

                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
