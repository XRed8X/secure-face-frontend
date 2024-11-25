import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

export const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from API
  const fetchUsers = async () => {
    const token = localStorage.getItem('auth_token'); // Obtener el token desde localStorage
  
    console.log("Token found:", token); // Verifica si el token está aquí
  
    if (!token) {
      console.error("Token is not available");
      setError('No token found. Please login first.');
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:8000/api/users/', {
        headers: {
          'Authorization': `Token ${token}`, // Usar el token para autenticar la solicitud
        },
      });
      setUsers(response.data); // Maneja la respuesta y establece la lista de usuarios
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again later.');
    }
  };

  // Delete user by ID with Swal confirmation
  const deleteUser = async (userId: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setError('No token found. Please login first.');
          return;
        }

        await axios.delete(`http://localhost:8000/api/users/update/${userId}/`, {
          headers: {
            'Authorization': `Token ${token}`, // Incluye el token en los headers
          },
        });
        setUsers(users.filter((user) => user.id !== userId));
        await Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      } catch (err) {
        setError('Failed to delete user');
        await Swal.fire('Error!', 'Unable to delete user.', 'error');
      }
    }
  };

  useEffect(() => {
    fetchUsers(); // Llama a la función para obtener los usuarios cuando el componente se monta
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl mb-6">Registered Users</h2>
        {error && <p className="text-red-500">{error}</p>}
        <table className="min-w-full table-auto text-white">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-600 p-4 text-left">#</th>
              <th className="border-b-2 border-gray-600 p-4 text-left">Photo</th>
              <th className="border-b-2 border-gray-600 p-4 text-left">Username</th>
              <th className="border-b-2 border-gray-600 p-4 text-left">Email</th>
              <th className="border-b-2 border-gray-600 p-4 text-left">Status</th>
              <th className="border-b-2 border-gray-600 p-4 text-left">Date Joined</th>
              <th className="border-b-2 border-gray-600 p-4 text-left">Last Login</th>
              <th className="border-b-2 border-gray-600 p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700">
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">
                    <img
                      src="https://via.placeholder.com/50"
                      alt={user.username}
                      className="rounded-full"
                    />
                  </td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`${
                        user.is_active ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4">{new Date(user.date_joined).toLocaleString()}</td>
                  <td className="p-4">{new Date(user.last_login).toLocaleString()}</td>
                  <td className="p-4">
                    <Link
                      to={`/UserProfile/${user.id}`}
                      className="text-blue-400 hover:text-blue-600 mr-4"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-4 text-center text-white">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
