import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface AccessLog {
  id: number;
  user: number; // User ID
  user_email: string;
  timestamp: string;
  ip_address: string;
  success: boolean;
  message: string;
}

export const AccessLogList: React.FC = () => {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch access logs
  const fetchAccessLogs = async () => {
    const token = localStorage.getItem('auth_token'); // Obtener el token desde localStorage

    if (!token) {
      setError('No token found. Please login first.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/access-logs/logs/', {
        headers: {
          'Authorization': `Token ${token}`, // Usar el token para autenticar la solicitud
        },
      });
      setLogs(response.data);
      setLoading(false);
    } catch (err) {
      Swal.fire('Error', 'Failed to fetch access logs', 'error');
      setError('Failed to fetch logs');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessLogs();
  }, []);

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-white text-center">{error}</p>;
  }

  if (logs.length === 0) {
    return <p className="text-white text-center">No logs available.</p>;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-white text-2xl mb-4">Access Logs</h2>
        <table className="min-w-full text-white">
          <thead>
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">User Email</th>
              <th className="py-2 px-4">Timestamp</th>
              <th className="py-2 px-4">IP Address</th>
              <th className="py-2 px-4">Success</th>
              <th className="py-2 px-4">Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="py-2 px-4">{log.id}</td>
                <td className="py-2 px-4">{log.user_email}</td>
                <td className="py-2 px-4">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="py-2 px-4">{log.ip_address}</td>
                <td className="py-2 px-4">{log.success ? "Success" : "Failure"}</td>
                <td className="py-2 px-4">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
