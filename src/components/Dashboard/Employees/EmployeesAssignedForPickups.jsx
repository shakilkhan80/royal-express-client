import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from 'react-query';

const EmployeesAssignedForPickups = () => {
    const { user } = useContext(AuthContext);
    const [body, setBody] = useState({});

    const { data: allOrders = [], refetch } = useQuery({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/orders`);
            const data = await res.json();
            return data;
        },
    });

    useEffect(() => {
        fetch(`http://localhost:5000/manage-orders`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                }
            })
    }, [body]);

    const orderPlacedOrders = allOrders.filter((order) => order.status === 'Ready For Pickups');

    /* handle status..........................*/

    const handleStatus = async (btn, id) => {
       
        if (btn === 'Picked') {
            setBody({
                status: 'Picked',
                id: id
            });
        }
    };

    return (
        <div className='w-full'>
            <div className='pt-24'>
                <section>
                    <header className='text-4xl font-bold text-center'>Delivery Requests</header>
                    <div className='divider'></div>
                </section>
                <div className='md:grid-cols-3 justify-between my-8 '>
                    <div>
                        <table className='table'>
                            <thead>
                                <tr className='font-bold text-2xl bg-slate-300'>
                                    <th>#</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Date</th>
                                    <th>Weight</th>
                                    <th>Charge</th>
                                    <th>Status</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderPlacedOrders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{order.fromName}</td>
                                        <td>{order.toName}</td>
                                        <td>{order.date}</td>
                                        <td>{0 + order.kg} KG</td>
                                        <td>{order.price}</td>
                                        <td>
                                            {order?.status == 'Ready For Pickup' ? 'Ready For Pickup' : ''}
                                            {order?.status == 'Picked' ? 'Picked' : ''}
                                        </td>

                                        <td>
                                            {order.status === 'Ready For Delivery' ? (
                                                <button
                                                    className="btn btn-success btn-xs"
                                                    onClick={() => handleStatus('Picked', order._id)}
                                                    disabled={order.status === 'Picked'}
                                                >
                                                    Ready For Delivery
                                                </button>
                                            ) : null}
                                            <br />
                                        </td>
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

export default EmployeesAssignedForPickups;