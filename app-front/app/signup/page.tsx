'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = ({ target }: any) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3001/api/auth/signup"; 
      const requestData = {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong");
        return;
      }

      const res = await response.json();
      console.log("Signup successful:", res);
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-[400px] p-8 bg-white rounded-lg shadow-lg">
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
          {error && (
            <div className="p-3 mb-4 text-center text-white bg-red-500 rounded-md">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="p-3 mb-4 text-white font-bold rounded-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
          >
            Sign Up
          </button>
          <div className="flex justify-between text-sm text-gray-600 mb-6">
            <Link href="/login">
              Already have an account? <span className="text-blue-500">Sign In</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
