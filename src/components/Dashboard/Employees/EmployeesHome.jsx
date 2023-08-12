import React from 'react';
import { Link } from 'react-router-dom';

const EmployeesHome = () => {
    return (
        <div className='grid grid-cols-3'>
            
            <Link to='/dashboard/employees/AssignedForPickups' ><button className="btn btn-info m-10 w-60 h-36 text-2xl">Pickup Requests</button></Link>
            
            <Link to='/dashboard/employees/Picked'><button className="btn btn-success m-10 w-60 h-36 text-2xl">Picked</button></Link>
            
            <Link to='/dashboard/employees/AssignedForDeliveries'><button className="btn btn-warning m-10 w-60 h-36 text-2xl">Delivery Requests</button></Link>
            <Link to='/dashboard/employees/Delivered' ><button className="btn btn-error m-10 w-60 h-36 text-2xl">Delivered</button></Link>
            
            
            
            
            
        </div>
    );
};

export default EmployeesHome;