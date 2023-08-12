import React, { useState, useEffect } from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';

const Tracking = () => {
    const [orderId, setOrderId] = useState('');
    const [orderStatus, setOrderStatus] = useState('Order Placed');
    const [showOrderStatus, setShowOrderStatus] = useState(false); // New state for visibility

    const handleTrackOrder = () => {
        // Fetch order status for the specified _id from the API
        fetch(`http://localhost:5000/orders?_id=${orderId}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                // Assuming the API returns an array of orders and you want to get the status of the first order
                if (Array.isArray(data) && data.length > 0) {
                    setOrderStatus(data[0].status);
                } else {
                    setOrderStatus('Order not found');
                }
            })
            .catch(error => {
                console.error(error);
                setOrderStatus('Error fetching order status');
            })
            .finally(() => {
                setShowOrderStatus(true); // Show order status after fetch, whether successful or not
            });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">

            <SectionTitle heading={"Tracking"} />
            <div className="my-4 mx-4">
                <label className="label">
                    <span className="label-text text-lg">Enter Tracking Id:</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter _id"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="input input-bordered w-64"
                />
                <button
                    onClick={handleTrackOrder}
                    className="btn btn-primary ml-2"
                >
                    Track Order
                </button>
            </div>
            {showOrderStatus && (
                <ul className="steps flex justify-center">

                    <li className={`step ${orderStatus === 'Order Placed' || orderStatus === 'Ready For Pickup' || orderStatus === 'Picked' || orderStatus === 'Ready For Delivery' || orderStatus === 'Delivered' ? 'step-primary' : ''} w-32`}>Order Placed</li>

                    <li className={`step ${orderStatus === 'Ready For Pickup' || orderStatus === 'Picked' || orderStatus === 'Ready For Delivery' || orderStatus === 'Delivered' ? 'step-primary' : ''} w-32`}>Ready For Pickup</li>


                    <li className={`step ${ orderStatus === 'Picked' || orderStatus === 'Ready For Delivery' || orderStatus === 'Delivered' ? 'step-primary' : ''} w-32`}>Picked</li>

                    <li className={`step ${ orderStatus === 'Ready For Delivery' || orderStatus === 'Delivered' ? 'step-primary' : ''} w-32`}>Ready For Delivery</li>

                    <li className={`step ${orderStatus === 'Delivered' ? 'step-primary' : ''} w-32`}>Delivered</li>
                </ul>
            )}
        </div>
    );
};

export default Tracking;
