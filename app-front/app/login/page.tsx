'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Her submit işleminde error mesajını sıfırlayalım.

    try {
      const url = "http://localhost:3001/api/auth/login"; // Giriş API'si URL
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Gönderilen verilerin JSON formatında olduğundan emin olun
      });

      if (!response.ok) {
        // Hata durumunda dönen veriyi alın ve ekrana yazdırın
        const errorData = await response.json();
        setError(`Error ${response.status}: ${errorData.message || "Something went wrong"}`);
        return;
      }

      // Login başarılı olursa, home sayfasına yönlendir
      router.push("/home");
    } catch (error) {
      setError(`An error occurred: ${error.message}`); // Hata durumunu detaylı göster
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-[400px] h-[500px] p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={data.username}
            required
            className="p-3 mb-4 border-b-2 mt-6 border-gray-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className="p-3 mb-6 border-b-2 mt-2 border-gray-300 focus:outline-none"
          />
          {error && (
            <div className="p-3 mb-4 text-center text-white bg-red-500 rounded-md">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="p-3 mb-4 mt-4 text-white font-bold rounded-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
          >
            Login
          </button>
          <div className="flex justify-between text-sm text-gray-600 mb-6 mt-2">
            <a href="/forgot-password" className="text-blue-500">Forgot Password?</a>
            <a href="/signup" className="text-blue-500">Don't have an account? Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
