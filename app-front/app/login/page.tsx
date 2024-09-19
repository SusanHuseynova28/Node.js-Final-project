'use client';
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link for navigation

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
        return;
      }

      const resData = await response.json();
      localStorage.setItem("token", resData.token);

      // Redirect to home page after successful login
      router.push("/home");
    } catch (error) {
      setError(`An error occurred: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-[400px] p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
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
            Login
          </button>
          {/* Sign Up Link Restored */}
          <div className="flex justify-between text-sm text-gray-600 mt-4">
            <Link href="/forgot-password" className="text-blue-500">Forgot Password?</Link>
            <Link href="/signup" className="text-blue-500">Don't have an account? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
