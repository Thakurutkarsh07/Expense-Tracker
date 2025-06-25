import React, { useEffect, useState } from 'react';
import api from '../api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Dashboard from '../components/Dashboard';
import CsvImporter from '../components/CsvImporter';
import ForecastAI from '../components/ForecastAI';
import SavingPlanner from '../components/SavingPlanner';

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [editData, setEditData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleImport = async (importedExpenses) => {
    for (let exp of importedExpenses) {
      try {
        await api.post('/expenses', exp);
      } catch (error) {
        console.error('Failed to import expense:', exp, error);
      }
    }
    fetchExpenses();
  };

  const fetchExpenses = async () => {
    const res = await api.get('/expenses');
    const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date)); // recent first
    setExpenses(sorted);
  };

  const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const summarizeExpenses = (expenses) => {
    const summary = {};
    expenses.forEach((e) => {
      const month = e.date.slice(0, 7);
      if (!summary[month]) summary[month] = {};
      if (!summary[month][e.category]) summary[month][e.category] = 0;
      summary[month][e.category] += Number(e.amount);
    });
    return summary;
  };

  const expenseSummary = summarizeExpenses(expenses);

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-indigo-700 drop-shadow-sm">
            Expense Tracker
          </h1>
          <p className="text-gray-600 mt-2">
            Track and manage your spending effortlessly
          </p>
        </header>

        {/* Form and Forecast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editData ? 'Edit Expense' : 'Add Expense'}
            </h2>
            <ExpenseForm
              fetchExpenses={fetchExpenses}
              editData={editData}
              setEditData={setEditData}
            />
            <CsvImporter onImport={handleImport} />
          </div>
          <ForecastAI expenseSummary={expenseSummary} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md ">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Expenses by Category
            </h2>
            <div style={{ width: '70%', height: 300 }}>
              <Dashboard expenses={expenses} chart="pie" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Monthly Expenses
            </h2>
            <div style={{ width: '100%', height: 350 }}>
              <Dashboard expenses={expenses} chart="bar" />
            </div>
          </div>
        </div>
<SavingPlanner averageSpending={expenseSummary} />

        {/* Paginated Expense List */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Expenses</h2>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page
              }}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              {[5, 10, 25, 50].map((count) => (
                <option key={count} value={count}>
                  Show {count}
                </option>
              ))}
            </select>
          </div>

          <ExpenseList
            expenses={currentExpenses}
            onEdit={setEditData}
            onDelete={deleteExpense}
          />

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
