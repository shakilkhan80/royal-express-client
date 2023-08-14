import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from 'react-query';

const CollectedOrders = () => {
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
    const orderPlacedOrders = allOrders.filter((order) => order.status === 'Picked');

    const handleStatus = async (btn, id) => {
        const body = {
            status: btn,
            id: id
        }

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
    };

    return (
        <div className='w-full'>
            <div className='pt-24'>
                <section>
                    <header className='text-4xl font-bold text-center'>Collected Orders</header>
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
                                            {order?.status == 'Picked' ? 'Picked' : ''}
                                            
                                        </td>

                                        <td>
                                            {order.status === 'Picked' ? (
                                                <button
                                                    className="btn btn-success btn-xs"
                                                    onClick={() => handleStatus('Ready For Delivery', order._id)}
                                                    
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

export default CollectedOrders;