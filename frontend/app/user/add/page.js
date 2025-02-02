"use client";
import { useForm } from "react-hook-form";
import { createUser } from "../../../services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddUser() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            data.interest = data.interest.split(',').map(i => i.trim()); // ✅ Convert interests to array
            await createUser(data);
            router.push("/");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-5 rounded shadow">
            <h1 className="text-xl font-bold mb-4">Add User</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <input {...register("user", { required: true })} placeholder="Name" className="w-full p-2 border rounded"/>
                {errors.user && <p className="text-red-500">Name is required</p>}

                <input {...register("interest")} placeholder="Interests (comma separated)" className="w-full p-2 border rounded"/>

                <input type="number" {...register("age", { required: true, min: 1 })} placeholder="Age" className="w-full p-2 border rounded"/>
                {errors.age && <p className="text-red-500">Age must be a positive number</p>}

                <input type="number" {...register("mobile", { required: true })} placeholder="Mobile" className="w-full p-2 border rounded"/>
                {errors.mobile && <p className="text-red-500">Mobile number is required</p>}

                <input type="email" {...register("email", { required: true })} placeholder="Email" className="w-full p-2 border rounded"/>
                {errors.email && <p className="text-red-500">Valid email is required</p>}

                <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">Submit</button>
            </form>
        </div>
    );
}
