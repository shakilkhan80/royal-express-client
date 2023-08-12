import React from 'react';
import { Link } from 'react-router-dom';

const UserHome = () => {
    return (
        <div className='grid grid-cols-3'>
            <Link to='/dashboard/user/UserSendPickupRequest'><button className="btn btn-info m-10 w-60 h-36 text-2xl">Send Pickup Request</button></Link>
            <Link to='/dashboard/user/UserMyRequests'><button className="btn btn-success m-10 w-60 h-36 text-2xl">My Requests</button></Link>
            <Link to='/dashboard/user/UserDeliveredOrders'><button className="btn btn-warning m-10 w-60 h-36 text-2xl">Delivered Orders</button></Link>
           
            
        </div>
    );
};

export default UserHome;