"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchUserById, updateUser } from "../../../../services/api";

export default function EditUser() {
    const { id } = useParams(); // ✅ Get params correctly in Next.js 15
    const router = useRouter();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedUser = {
            user: formData.get("user"),
            interest: formData.get("interest").split(",").map(i => i.trim()),
            age: parseInt(formData.get("age")),
            mobile: parseInt(formData.get("mobile")),
            email: formData.get("email")
        };
        await updateUser(id, updatedUser);
        router.push("/");
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    if (!user) return <p className="text-red-500 text-center">User not found</p>;

    return (
        <div className="max-w-md mx-auto bg-white p-5 rounded shadow">
            <h1 className="text-xl font-bold mb-4">Edit User</h1>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input name="user" defaultValue={user.user} className="w-full p-2 border rounded"/>
                <input name="interest" defaultValue={user.interest.join(", ")} className="w-full p-2 border rounded"/>
                <input type="number" name="age" defaultValue={user.age} className="w-full p-2 border rounded"/>
                <input type="number" name="mobile" defaultValue={user.mobile} className="w-full p-2 border rounded"/>
                <input type="email" name="email" defaultValue={user.email} className="w-full p-2 border rounded"/>
                <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">Update</button>
            </form>
        </div>
    );
}
