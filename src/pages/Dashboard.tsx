// src/pages/Dashboard.tsx
import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement // Asegurarse de registrar LineElement
} from 'chart.js';

// Registrar los elementos de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement // Asegurarse de registrar LineElement
);

export const Dashboard: React.FC = () => {
  // Datos para el gráfico de barras
  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales Over Time',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de círculos (Pie chart)
  const pieChartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
      {
        data: [300, 50, 100, 150],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de línea
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Users Growth',
        data: [20, 40, 30, 50, 60],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl text-white text-center mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gráfico de Barras */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl text-white mb-4">Sales Over Time (Bar Chart)</h2>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>

        {/* Gráfico Circular (Pie Chart) */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl text-white mb-4">Product Distribution (Pie Chart)</h2>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>

        {/* Gráfico de Línea */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl text-white mb-4">User Growth (Line Chart)</h2>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};
