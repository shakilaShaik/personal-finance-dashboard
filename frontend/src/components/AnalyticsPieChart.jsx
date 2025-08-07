// src/components/AnalyticsPieChart.jsx

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsPieChart = ({ summary }) => {
  if (!summary) return <p>No data available</p>;

  const categories = ['food', 'travel', 'shopping', 'daily_needs', 'other'];

  const data = {
    labels: categories.map((cat) => cat.replace('_', ' ').toUpperCase()),
    datasets: [
      {
        label: '% of Income',
        data: categories.map((cat) => summary[cat]?.percentage || 0),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',     // Red
          'rgba(54, 162, 235, 0.6)',     // Blue
          'rgba(255, 206, 86, 0.6)',     // Yellow
          'rgba(75, 192, 192, 0.6)',     // Green
          'rgba(153, 102, 255, 0.6)',    // Purple
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Spending Breakdown (% of Income)
      </h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default AnalyticsPieChart;
