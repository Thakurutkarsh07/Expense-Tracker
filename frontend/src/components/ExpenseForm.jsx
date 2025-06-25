import React, { useState, useEffect } from 'react';
import api from '../api'; // make sure api is correctly imported

const ExpenseForm = ({ fetchExpenses, editData, setEditData }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const isOtherSelected = category === 'Other';

  useEffect(() => {
    if (editData) {
      setAmount(editData.amount);
      setCategory(editData.category);
      setCustomCategory(editData.category === 'Other' ? '' : editData.category);
      setDescription(editData.description);
      setDate(editData.date ? editData.date.substring(0, 10) : '');
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCategory = isOtherSelected ? customCategory : category;

    const expense = {
      amount,
      category: finalCategory,
      description,
      date,
    };

    if (editData) {
      await api.put(`/expenses/${editData._id}`, expense);
      console.log(editData);
      
      setEditData(null);
    } else {
      await api.post('/expenses', expense);
    }

    fetchExpenses();

    setAmount('');
    setCategory('');
    setCustomCategory('');
    setDescription('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {isOtherSelected && (
        <div>
          <label className="block mb-1 font-medium">Custom Category</label>
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your category"
            required
          />
        </div>
      )}

      <div>
        <label className="block mb-1 font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        {editData ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;
