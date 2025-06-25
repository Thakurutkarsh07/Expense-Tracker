import React from 'react';

const ExpenseList = ({ expenses, onEdit, onDelete }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Expense List</h3>
    {expenses.length === 0 ? (
      <p className="text-gray-500">No expenses recorded yet.</p>
    ) : (
      expenses.map((exp) => (
        <div
          key={exp._id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition"
        >
          <div className="text-gray-700 space-y-1">
            <p className="text-lg font-medium">₹{exp.amount}</p>
            <p className="text-sm">
              <span className="font-semibold">Category:</span> {exp.category}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Date:</span> {exp.date.slice(0, 10)}
            </p>
          </div>
          <div className="mt-2 md:mt-0 flex gap-2">
            <button
              onClick={() => onEdit(exp)}
              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(exp._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);

export default ExpenseList;
