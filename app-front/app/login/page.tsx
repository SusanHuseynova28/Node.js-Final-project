'use client';
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => {
  const [data, setData] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error ${response.status}: ${errorData.message || "Login failed"}`);
        
        // Show error toast
        toast.error(errorData.message || "Login failed. Please try again.");
        return;
      }

      const resData = await response.json();
      
      // Token və istifadəçi adını localStorage-a yazın
      localStorage.setItem("token", resData.token);
      localStorage.setItem("username", data.username);  // Username saxlanır

      // Show success toast
      toast.success("Login successful!");

      // Redirect to home page after successful login
      setTimeout(() => {
        router.push("/home");
      }, 2000); // Delay to allow toast to be displayed
    } catch (error) {
      setError(`An error occurred: ${(error as Error).message}`);

      // Show error toast
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-white">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg flex">
        {/* Left Side: Login Form */}
        <div className="w-1/2 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
            <input
              type="text"
              placeholder="Email Address"
              name="username"
              onChange={handleChange}
              value={data.username}
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
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-blue-500 text-sm">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="p-3 mb-4 bg-black text-white font-bold rounded-md"
            >
              Login
            </button>
            <div className="flex justify-between text-sm text-gray-600">
              <Link href="/" className="text-black">
                Don't have an account?
              </Link>
              <Link href="/signup" className="text-blue-500">
                Sign Up
              </Link>
            </div>
          </form>
        </div>

        {/* Right Side: Illustration */}
        <div className="w-1/2 flex items-center justify-center flex-col">
          <span className="text-3xl font-semibold">Alukas Collection</span>
          <img
            src="https://demo-alukas.myshopify.com/cdn/shop/files/alk1_5.jpg?v=1710149492"
            alt="Illustration"
            className="w-3/4 mt-4"
          />
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer />
    </div>
  );
};

export default Login;
