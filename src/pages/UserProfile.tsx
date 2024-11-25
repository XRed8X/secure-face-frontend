import { useParams } from 'react-router-dom';
import React, { useState } from 'react';

export const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  // Simulando los datos del usuario
  const user = {
    id: 1,
    email: "fjavierme818@gmail.com",
    username: "FJavier",
    is_active: true,
    date_joined: "2024-11-24T00:17:13.387773Z",
    last_login: "2024-11-24T21:41:07.748929Z",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: user.email,
    username: user.username,
    is_active: user.is_active,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "is_active" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Usuario actualizado:", await response.json());
        setIsModalOpen(false); // Cerrar el modal al completar la actualización
      } else {
        console.error("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="bg-black min-h-screen p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt={user.username}
            className="rounded-full border-4 border-gray-600 mb-4 mx-auto"
          />
          <h2 className="text-white text-2xl">{user.username}</h2>
        </div>

        <div className="text-white space-y-4">
          <div>
            <strong>Email:</strong>
            <p>{user.email}</p>
          </div>
          <div>
            <strong>Status:</strong>
            <span className={`${user.is_active ? "text-green-500" : "text-red-500"}`}>
              {user.is_active ? " Active" : " Inactive"}
            </span>
          </div>
          <div>
            <strong>Date Joined:</strong>
            <p>{new Date(user.date_joined).toLocaleString()}</p>
          </div>
          <div>
            <strong>Last Login:</strong>
            <p>{new Date(user.last_login).toLocaleString()}</p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit User
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-white text-xl mb-4">Update User</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Status:</label>
                <select
                  name="is_active"
                  value={formData.is_active.toString()}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
