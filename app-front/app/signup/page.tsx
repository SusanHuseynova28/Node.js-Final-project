'use client';
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 

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
        return;
      }

      const resData = await response.json();
      console.log("Signup successful:", resData);

    
      router.push("/login");
    } catch (error) {
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
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="p-3 mb-4 bg-blue-500 text-white font-bold rounded-md"
          >
            Sign Up
          </button>
         
          <div className="flex justify-between text-sm text-gray-600 mt-4">
            <span>Already have an account?</span>
            <Link href="/login" className="text-blue-500">Log In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
