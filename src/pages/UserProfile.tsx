import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  date_joined: string;
  last_login: string;
}

export const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('auth_token');  // Obtener el token desde localStorage

      if (!token) {
        Swal.fire('Error', 'No token found. Please login again.', 'error');
        return;
      }

      const response = await axios.get(`http://localhost:8000/api/users/update/${userId}/`, {
        headers: {
          Authorization: `Token ${token}`,  // Asegúrate de enviar "Token" seguido del valor del token
        },
      });

      const userData = response.data;
      setUser(userData);
      setEmail(userData.email);
      setUsername(userData.username);
      setIsActive(userData.is_active);
      setLoading(false);
    } catch (err) {
      Swal.fire('Error', 'Failed to fetch user details', 'error');
      setLoading(false);
    }
  };

  // Update user details
  const updateUserDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: 'Confirm Update',
        text: 'Do you want to save the changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
      });

      if (result.isConfirmed) {
        const token = localStorage.getItem('auth_token'); // Obtener el token de localStorage o estado global

        await axios.put(`http://localhost:8000/api/users/update/${userId}/`, {
          email,
          username,
          is_active: isActive,
        }, {
          headers: {
            Authorization: `Token ${token}`, // Enviar el token en el encabezado
          }
        });

        Swal.fire('Updated!', 'User details have been updated.', 'success');
        fetchUserDetails(); // Refresh user details
        setIsModalOpen(false); // Close modal
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to update user details', 'error');
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  if (!user) {
    return <p className="text-white text-center">User not found.</p>;
  }

  return (
    <>
  <div className="bg-gray-900 min-h-screen p-6">
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
          <span className={user.is_active ? 'text-green-500' : 'text-red-500'}>
            {user.is_active ? ' Active' : ' Inactive'}
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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full">
          <h3 className="text-white text-lg mb-4">Edit User</h3>
          <form onSubmit={updateUserDetails}>
            <div className="text-white space-y-4">
              <div>
                <strong>Email:</strong>
                <input
                  type="email"
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <strong>Username:</strong>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <strong>Status:</strong>
                <div className="flex items-center space-x-4">
                  <label className="text-green-500 flex items-center">
                    <input
                      type="radio"
                      className="mr-2"
                      checked={isActive}
                      onChange={() => setIsActive(true)}
                    />
                    Active
                  </label>
                  <label className="text-red-500 flex items-center">
                    <input
                      type="radio"
                      className="mr-2"
                      checked={!isActive}
                      onChange={() => setIsActive(false)}
                    />
                    Inactive
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
</>

  );

};
