"use client";
import { useState } from "react";

interface ContactFormProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof onSubmit === "function") {
      onSubmit(formData);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      console.error("onSubmit is not a function");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-4xl text-center mb-8">
        Have a question? Contact us!
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="col-span-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          type="text"
          placeholder="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          className="col-span-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Write your comment..."
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
        ></textarea>
        <button
          type="submit"
          className="col-span-2 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
