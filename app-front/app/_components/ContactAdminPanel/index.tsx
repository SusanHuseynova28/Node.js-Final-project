"use client";
import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import ContactForm from "../ContactForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function AdminPanel() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch("/api/contact");
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }
    fetchContacts();
  }, []);

  const handleFormSubmit = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    try {
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newContact: Contact = await response.json();
        setContacts((prevContacts) => [...prevContacts, newContact]);
        toast.success("Message sent successfully!");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
      setContacts((contacts) =>
        contacts.filter((contact) => contact._id !== id)
      );
      toast.success("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
   

      <ToastContainer />

      <ContactForm onSubmit={handleFormSubmit} />

      <table className="min-w-full bg-white border mt-8 table-auto">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 text-left">Name</th>
            <th className="px-6 py-3 border-b-2 text-left">Email</th>
            <th className="px-6 py-3 border-b-2 text-left">Subject</th>
            <th className="px-6 py-3 border-b-2 text-left">Message</th>
            <th className="px-6 py-3 border-b-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className="px-6 py-4 border-b">{contact.name}</td>
              <td className="px-6 py-4 border-b">{contact.email}</td>
              <td className="px-6 py-4 border-b">{contact.subject}</td>
              <td className="px-6 py-4 border-b">{contact.message}</td>
              <td className="px-6 py-4 border-b flex space-x-4">
           
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(contact._id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
