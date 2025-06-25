// src/components/CsvImporter.js
import React from 'react';
import Papa from 'papaparse';

const CsvImporter = ({ onImport }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        // Adjust these keys to match Paytm/PhonePe CSV format
        const parsedExpenses = results.data.map(row => ({
          amount: parseFloat(row.Amount || row['Txn Amount']),
          category: row.Category || 'Imported',
          date: row.Date || row['Txn Date'],
          description: row.Description || row['Narration'] || '',
        }));
        onImport(parsedExpenses);
      },
    });
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">Import CSV</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
    </div>
  );
};

export default CsvImporter;
