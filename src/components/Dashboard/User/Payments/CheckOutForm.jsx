import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const CheckOutForm = ({ order, price }) => {

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if (price > 0) {
            const fetchData = async () => {
                try {
                    const res = await fetch('http://localhost:5000/create-payment-intent', {
                        method: 'POST',
                        headers: {
                            'content-Type': 'application/json',
                        },
                        body: JSON.stringify({ price }),
                    });

                    const data = await res.json();
                    setClientSecret(data.clientSecret);
                } catch (error) {
                    console.error('Error creating PaymentIntent:', error);
                }
            };

            fetchData();
        }
    }, [price]);



    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }
        // console.log('card', card);
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.log('error', error)
            setCardError(error.message)
        }
        else {
            setCardError('')
        }
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message)
            console.log(confirmError)
        }
        else {
            setProcessing(false)
            setCardError('')
            console.log('paymentIntent', paymentIntent)

            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                Swal.fire({
                    icon: 'success',
                    title: 'Your Payment has been done',
                    showConfirmButton: false,
                    timer: 1500
                })
                // save payment information to database
                const payment = {
                    email: user?.email,
                    transactionId: paymentIntent.id,
                    price,
                    quantity: order.length,
                }
                try {
                    const res = await fetch('http://localhost:5000/payments', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(payment)
                    });

                    if (res.ok) {
                        const data = await res.json();
                        console.log(data);
                    } else {
                        console.error('Failed to save payment information:', res.status, res.statusText);
                    }
                } catch (error) {
                    console.error('Error saving payment information:', error);
                }
            }
        }

    }

    return (
        <div className='my-10 mx-44'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='flex justify-center'>
                    <button className='btn btn-primary btn-sm my-10' type="submit" disabled={!stripe || !clientSecret || processing}>
                        Pay
                    </button>
                </div>
            </form>
            {cardError && <p className='text-red-600'>Error: {cardError}</p>}
            {transactionId &&
                <p className='text-green-600'>Your Payment Transaction Id: {transactionId}</p>
            }
            <div className='my-5'>
                <button className='btn btn-sm btn-neutral'>
                    <Link to='/dashboard/admin/PickupRequests'>
                        <div className='flex gap-3'>
                            <span>
                                <FaArrowLeft />
                            </span>
                            <span>
                                Back to see the order location
                            </span>
                        </div>
                    </Link>
                </button>
            </div>

        </div>
    );
};

export default CheckOutForm;