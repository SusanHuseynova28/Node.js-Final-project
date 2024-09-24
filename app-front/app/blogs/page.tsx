"use client";
import useSWR from "swr";
import { useState } from "react";
import { Collection } from "@/app/types/collection";
import Navbar from "../_featured/header";

import Footer from "../_featured/footer";
import { FaTrash, FaEdit } from "react-icons/fa";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminPanel() {
  const { data: collections, mutate } = useSWR<Collection[]>(
    "http://localhost:3001/api/collections",
    fetcher
  );
  const [editingItem, setEditingItem] = useState<Collection | null>(null);
  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    description: "",
    imageUrl: "",
    hoverImageUrl: "",
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (!collections) return <div>Loading collections...</div>;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addNewItem = async () => {
    const formData = new FormData();
    formData.append("title", newItem.title);
    formData.append("price", newItem.price);
    formData.append("description", newItem.description);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    console.log(formData);

    const response = await fetch("http://localhost:3001/api/collections", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      mutate();
      setNewItem({
        title: "",
        price: "",
        description: "",
        imageUrl: "",
        hoverImageUrl: "",
      });
      setImageFile(null);
      setPreviewImage(null);
      setIsCreateModalOpen(false);
    }
  };

  const deleteItem = async (id: string) => {
    const response = await fetch(
      `http://localhost:3001/api/collections/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      mutate();
    }
  };

  const startEditing = (item: Collection) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const saveItem = async () => {
    if (!editingItem) return;

    const formData = new FormData();
    formData.append("title", editingItem.title);
    formData.append("price", editingItem.price);
    formData.append("description", editingItem.description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(
      `http://localhost:3001/api/collections/${editingItem._id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (response.ok) {
      mutate();
      setEditingItem(null);
      setIsEditModalOpen(false);
    }
  };

  const filteredCollections = collections.filter((collection) =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container mx-auto py-8">
        <div className="text-center mb-8 flex justify-between gap-4 p-6 ">
          <input
            type="text"
            placeholder="Search collections by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 w-[250px] mb-4"
          />
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-black text-white p-2 h-[40px]"
          >
            Add New Collection
          </button>
        </div>

        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-center">Image</th>
              <th className="border px-4 py-2 text-center">Title</th>
              <th className="border px-4 py-2 text-center">Price</th>
              <th className="border px-4 py-2 text-center">Description</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCollections.map((collection) => (
              <tr key={collection._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">
                  <img
                    src={collection.imageUrl}
                    alt={collection.title}
                    className="h-20 w-20 object-cover mx-auto"
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  {collection.title}
                </td>
                <td className="border px-4 py-2 text-center">
                  ${collection.price}
                </td>
                <td className="border px-4 py-2 text-center">
                  {collection.description}
                </td>
                <td className="border px-4 py-2 text-center flex justify-center">
                  <FaTrash
                    onClick={() => deleteItem(collection._id)}
                    className="text-red-500 cursor-pointer mx-2"
                    title="Delete"
                  />
                  <FaEdit
                    onClick={() => startEditing(collection)}
                    className="text-blue-500 cursor-pointer mx-2"
                    title="Edit"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isCreateModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl mb-4">Add New Collection</h3>
              <input
                type="text"
                placeholder="Title"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                placeholder="Description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                className="border p-2 mb-4 w-full"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="border p-2 mb-4 w-full"
                accept="image/*"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-20 w-20 object-cover mx-auto mb-4"
                />
              )}
              <div className="flex justify-end">
                <button
                  onClick={addNewItem}
                  className="bg-black text-white px-4 py-2 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditModalOpen && editingItem && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl mb-4">Edit Collection</h3>
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, title: e.target.value })
                }
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                value={editingItem.price}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, price: e.target.value })
                }
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                value={editingItem.description}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    description: e.target.value,
                  })
                }
                className="border p-2 mb-4 w-full"
              />
              <div className="flex justify-end">
                <button
                  onClick={saveItem}
                  className="bg-black text-white px-4 py-2 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
