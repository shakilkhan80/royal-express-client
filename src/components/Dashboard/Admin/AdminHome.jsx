import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    return (
        <div className='grid grid-cols-3'>
            <Link to="/dashboard/admin/PickupRequests"><button className="btn btn-warning m-10 w-60 h-36 text-2xl">Pickup Requests</button></Link>
            <Link to="/dashboard/admin/AssignedForPickup"><button className="btn btn-info m-10 w-60 h-36 text-2xl">Assigned For Pickup</button></Link>
            <Link to="/dashboard/admin/CollectedOrders"><button className="btn btn-success m-10 w-60 h-36 text-2xl">Collected Orders</button></Link>
            <Link to="/dashboard/admin/AssignedForDeliveries"><button className="btn btn-error m-10 w-60 h-36 text-2xl">Assigned For Deliveries</button></Link>
            <Link to="/dashboard/admin/DeliveredOrders"><button className="btn btn-warning m-10 w-60 h-36 text-2xl">Delivered Orders</button></Link>
            
        </div>
    );
};

export default AdminHome;