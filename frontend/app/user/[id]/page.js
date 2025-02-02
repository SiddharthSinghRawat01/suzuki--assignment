"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserById } from "../../../services/api";

export default function UserDetail() {
    const { id } = useParams(); // ✅ Get params correctly in Next.js 15
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            if (!id) return;
            try {
                const data = await fetchUserById(id);
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, [id]);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    if (!user) return <p className="text-red-500 text-center">User not found</p>;

    return (
        <div className="max-w-md mx-auto bg-white p-5 rounded shadow">
            <h1 className="text-xl font-bold">User Details</h1>
            <p><strong>Name:</strong> {user.user}</p>
            <p><strong>Interests:</strong> {user.interest.join(", ")}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
}
