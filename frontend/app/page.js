"use client";
import { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../services/api';
import Link from 'next/link';

export default function HomePage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await fetchUsers();
        setUsers(data);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
            loadUsers();
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Users List</h1>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Interests</th>
                        <th className="p-3">Age</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="border-b">
                            <td className="p-3">{user.user}</td>
                            <td className="p-3">{user.interest.join(', ')}</td>
                            <td className="p-3">{user.age}</td>
                            <td className="p-3 space-x-2">
                                <Link href={`/user/${user._id}`} className="text-blue-600">View</Link>
                                <Link href={`/user/edit/${user._id}`} className="text-green-600">Edit</Link>
                                <button onClick={() => handleDelete(user._id)} className="text-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
