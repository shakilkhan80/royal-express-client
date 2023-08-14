import React from 'react';
import { useQuery } from 'react-query';

const ManageUsers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users`);
            const data = await res.json();
            return data;
        }
    });

    const handleRole = (role, id) => {
        const body = {
            id: id,
            role: role
        }

        fetch(`http://localhost:5000/update-user-role`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch();
                }
            })
    }
    return (
        <div className='w-full px-6'>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className='font-bold text-2xl bg-slate-300'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <>
                                <tr className="bg-base-200 border-t-2 ">
                                    <td>{index + 1}</td>
                                    <td>{user?.name}</td>
                                    <td>
                                        {user?.role == 'admin' ? 'Admin' : ''}
                                        {user?.role == 'employees' ? 'employees' : ''}
                                        {user?.role == 'user' ? 'user' : ''}
                                    </td>
                                    <td>
                                        <button className="btn btn-xs btn-primary" onClick={() => handleRole('admin', user._id)} disabled={user.role === 'admin'}>Make Admin</button> <br />
                                        <button className="btn btn-xs btn-primary my-2" onClick={() => handleRole('employees', user._id)} disabled={user.role === 'employees'}>Make Employee</button> <br />
                                        <button className="btn btn-xs btn-primary" onClick={() => handleRole('user', user._id)} disabled={user.role === 'user'}>Make User</button>
                                    </td>
                                </tr>
                            </>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;