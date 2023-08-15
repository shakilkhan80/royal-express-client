import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';


const UserMyRequests = () => {
    const { user } = useContext(AuthContext);

    const { data: allOrders = [], refetch } = useQuery({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/orders?email=${user?.email}`);
            const data = await res.json();
            return data;
        },
    });

    useEffect(() => {
        refetch();
    }, [user]);

    // Filter orders by status "Order Placed"
    const orderPlacedOrders = allOrders.filter((order) => order.status === 'Order Placed');
    console.log(orderPlacedOrders)

    return (
        <div className='w-full'>
            <div className='pt-24'>
                <section>
                    <header className='text-4xl font-bold text-center'>My Requests</header>
                    <div className='divider'></div>

                </section>
                <div className='md:grid-cols-3 justify-between my-8 '>
                    <div>
                        <div className='m-3 flex justify-end'>
                            <Link to="/dashboard/payment"><button className='btn btn-sm btn-primary justify-end'>Make Payment</button></Link>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr className='font-bold text-2xl bg-slate-300'>
                                    <th>#</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Date</th>
                                    <th>Tracking Id</th>
                                    <th>Charge</th>
                                    <th>Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {orderPlacedOrders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{order.fromName}</td>
                                        <td>{order.toName}</td>
                                        <td>{order.date}</td>
                                        <td>{order._id}</td>
                                        <td>{order.price}</td>
                                        <td>{order.status}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default UserMyRequests;