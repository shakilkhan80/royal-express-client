import React, { useState } from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';

const Tracking = () => {
    const [trackingId, setTrackingId] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [showOrderStatus, setShowOrderStatus] = useState(false);
    const [validTrackingId, setValidTrackingId] = useState(true);

    const handleTrackOrder = () => {
        // Fetch order status for the specified trackingId from the API
        fetch(`http://localhost:5000/orders?trackingId=${trackingId}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    const order = data.find(item => item.trackingId === trackingId);
                    if (order) {
                        setOrderStatus(order.status);
                        setValidTrackingId(true);
                    } else {
                        setOrderStatus('Order not found');
                        setValidTrackingId(false);
                    }
                } else {
                    setOrderStatus('Order not found');
                    setValidTrackingId(false);
                }
            })
            .catch((error) => {
                console.error(error);
                setOrderStatus('Error fetching order status');
                setValidTrackingId(false);
            })
            .finally(() => {
                setShowOrderStatus(true);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center my-28">
            <SectionTitle heading={'Tracking'} />
            <div >
                <label className="label">
                    <span className="label-text text-lg">Enter Tracking Id:</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter Tracking Id"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="input input-bordered w-64"
                />
                <button onClick={handleTrackOrder} className="btn btn-primary ml-2">
                    Track Order
                </button>
            </div>
            {showOrderStatus && (
                <ul className="steps flex justify-center">
                    <li className={`step ${orderStatus === 'Order Placed' ? 'step-primary' : ''} w-32`}>Order Placed</li>
                    <li className={`step ${orderStatus === 'Ready For Pickup' ? 'step-primary' : ''} w-32`}>Ready For Pickup</li>
                    <li className={`step ${orderStatus === 'Picked' ? 'step-primary' : ''} w-32`}>Picked</li>
                    <li className={`step ${orderStatus === 'Ready For Delivery' ? 'step-primary' : ''} w-32`}>Ready For Delivery</li>
                    <li className={`step ${orderStatus === 'Delivered' ? 'step-primary' : ''} w-32`}>Delivered</li>
                </ul>
            )}
            {showOrderStatus && !validTrackingId && (
                <p className="text-red-600 font-bold mt-4">Invalid Tracking ID or Order not found</p>
            )}
        </div>
    );
};

export default Tracking;
