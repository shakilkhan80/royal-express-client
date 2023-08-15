import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import { useQuery } from 'react-query';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


// TODO use the code from .env.local
const stripePromise = loadStripe('pk_test_51Nd4HlC8pq8DDEmNcMKkW9i8QQxyrAg8wXuAkfUWMxHxMEw6Gj7usXqy0ODE4PjxaDqRFRuJBH3DDaqp3ftoT8lb00a1KqNxW0')

const Payment = () => {

    const { user } = useContext(AuthContext);

    const { data: allOrders = [], refetch } = useQuery({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/orders?email=${user?.email}`);
            const data = await res.json();
            return data;
        },
    });


    const makePayments = allOrders.filter((order) => order.status === 'Unpaid');
    const total = makePayments.reduce((sum, order) => sum + order.price, 0)
    // const amount = 18

    return (
        <div className='w-full m-10'>
            <h1 className='text-3xl font-bold ml-10'>Payment Section:</h1>
            <Elements stripe={stripePromise}>
                <CheckOutForm order={makePayments} price={total}></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;