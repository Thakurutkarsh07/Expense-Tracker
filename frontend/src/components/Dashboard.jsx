import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = ({ expenses, chart }) => {
  const categories = [...new Set(expenses.map(e => e.category))];

  const pieData = {
    labels: categories,
    datasets: [
      {
        label: 'Category Distribution',
        data: categories.map(cat =>
          expenses
            .filter(e => e.category === cat)
            .reduce((sum, e) => sum + parseFloat(e.amount), 0)
        ),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E7E9ED',
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const monthlyTotals = Array(12).fill(0);
  expenses.forEach(exp => {
    const month = new Date(exp.date).getMonth();
    monthlyTotals[month] += parseFloat(exp.amount);
  });

  const barData = {
    labels: monthNames,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlyTotals,
        backgroundColor: '#6366f1',
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="w-full">
      {chart === 'pie' ? (
        <Pie data={pieData} />
      ) : (
        <Bar
          data={barData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
