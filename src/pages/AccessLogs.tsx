// src/pages/AccessLogs.tsx
import React from 'react';

// Información de los accesos, simulando que es dinámica
interface AccessLog {
  id: number;
  user: number;
  user_email: string;
  timestamp: string;
  ip_address: string;
  success: boolean;
  message: string;
}

const accessLogs: AccessLog[] = [
  {
    id: 1,
    user: 1,
    user_email: "fjavierme818@gmail.com",
    timestamp: "2024-11-24T23:45:58.911941Z",
    ip_address: "127.0.0.1",
    success: true,
    message: "User logged in successfully."
  },
  {
    id: 2,
    user: 2,
    user_email: "maria123@example.com",
    timestamp: "2024-11-24T23:48:00.911941Z",
    ip_address: "192.168.1.2",
    success: false,
    message: "Login attempt failed. Incorrect password."
  },
  {
    id: 3,
    user: 3,
    user_email: "johndoe@example.com",
    timestamp: "2024-11-24T23:50:30.911941Z",
    ip_address: "203.0.113.3",
    success: true,
    message: "User logged in successfully."
  }
];

export const AccessLogs: React.FC = () => {
  return (
    <div className="bg-black min-h-screen p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-white text-2xl mb-6">Access Logs</h2>

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-white">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-4">User Email</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Status</th>
                <th className="p-4">Message</th>
              </tr>
            </thead>
            <tbody>
              {accessLogs.map(log => (
                <tr key={log.id} className="border-b border-gray-700">
                  <td className="p-4">{log.user_email}</td>
                  <td className="p-4">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="p-4">{log.ip_address}</td>
                  <td className={`p-4 ${log.success ? 'text-green-500' : 'text-red-500'}`}>
                    {log.success ? 'Success' : 'Failure'}
                  </td>
                  <td className="p-4">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
