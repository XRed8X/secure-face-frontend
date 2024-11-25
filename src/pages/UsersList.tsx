// src/pages/UsersList.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  date_joined: string;
  last_login: string;
}

const users: User[] = [
  {
    id: 1,
    email: 'fjavierme818@gmail.com',
    username: 'FJavier',
    is_active: true,
    date_joined: '2024-11-24T00:17:13.387773Z',
    last_login: '2024-11-24T21:41:07.748929Z',
  },
  {
    id: 2,
    email: 'maria123@example.com',
    username: 'Maria123',
    is_active: false,
    date_joined: '2024-11-22T10:12:13.387773Z',
    last_login: '2024-11-22T15:30:07.748929Z',
  },
  {
    id: 3,
    email: 'johndoe@example.com',
    username: 'JohnDoe',
    is_active: true,
    date_joined: '2024-11-20T08:00:10.387773Z',
    last_login: '2024-11-24T18:00:07.748929Z',
  },
];

export const UsersList: React.FC = () => {
  const [usersState, setUsers] = useState<User[]>(users);

  // Función para eliminar un usuario (preparada para conectar con la API)
  const deleteUser = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
        console.log(`Usuario con ID ${userId} eliminado`);
      } else {
        console.error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="bg-black min-h-screen p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl mb-6">Registered Users</h2>
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
              <th className="border-b-2 border-gray-600 p-4 text-left">Profile</th>
              <th className="border-b-2 border-gray-600 p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersState.map((user) => (
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
                    className="text-blue-400 hover:text-blue-600"
                  >
                    View Profile
                  </Link>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
