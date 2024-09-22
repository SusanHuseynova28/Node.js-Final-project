'use client';
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong");

        // Show error toast message
        toast.error(errorData.message || "Signup failed. Please try again.");
        return;
      }

      const resData = await response.json();
      console.log("Signup successful:", resData);

      // Show success toast message
      toast.success("Signup successful!");

      // Redirect to login page after signup
      setTimeout(() => {
        router.push("/login");
      }, 2000); // Redirect after 2 seconds to give time for the toast to show
    } catch (error) {
      setError("Something went wrong. Please try again later.");

      // Show error toast message
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black  to-white">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg flex">
        {/* Left Side: Signup Form */}
        <div className="w-1/2 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
              className="p-3 mb-4 border-b-2 border-gray-300 focus:outline-none"
            />
            <input
              type="text"
              placeholder="First Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className="p-3 mb-4 border-b-2 border-gray-300 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="surname"
              onChange={handleChange}
              value={data.surname}
              required
              className="p-3 mb-4 border-b-2 border-gray-300 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="p-3 mb-4 border-b-2 border-gray-300 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="p-3 mb-6 border-b-2 border-gray-300 focus:outline-none"
            />
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
              type="submit"
              className="p-3 mb-4 bg-black text-white font-bold rounded-md"
            >
              Sign Up
            </button>
            <div className="flex justify-between text-sm text-gray-600 mt-4">
              <span>Already have an account?</span>
              <Link href="/login" className="text-blue-500">Sign in</Link>
            </div>
          </form>
        </div>

        {/* Right Side: Illustration */}
        <div className="w-1/2 flex items-center justify-center flex-col">
          <span className="text-3xl font-semibold mb-10">Alukas Collection</span>
          <img
            src="https://demo-alukas.myshopify.com/cdn/shop/files/alk1_4.jpg?v=1710149492"
            alt="Illustration"
            className="w-[450px]"
          />
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
