import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, Wallet, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';

const SavingPlanner = ({ averageSpending }) => {
  const [income, setIncome] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!income || !goalAmount) return;

    setLoading(true);
    setPlan(null);
    setError('');

    try {
      const res = await axios.post('https://expense-tracker-fyl2.onrender.com/api/ai/budget', {
        averageSpending,
        goalAmount,
        income,
      });

      setPlan(res.data.result);
    } catch (err) {
      setError('Failed to generate plan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val) => `₹${Number(val).toLocaleString()}`;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
      <h3 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-4">
        <Wallet className="text-green-600" /> Smart Budget & Saving Planner
      </h3>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          placeholder="Monthly Income (₹)"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="number"
          placeholder="Savings Goal (₹)"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Generate Saving Plan'}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 p-4 rounded-md text-sm text-red-700 flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 mt-1" />
          <span>{error}</span>
        </div>
      )}

      {/* Results */}
      {plan && (
        <div className="mt-6 space-y-6">

          {/* Summary */}
          <div className="bg-gray-50 p-4 rounded-md border">
  <p><strong>Total Income:</strong> {formatCurrency(plan.summary.income)}</p>
  <p><strong>Target Savings:</strong> {formatCurrency(plan.summary.goal)}</p>
  <p><strong>Spending Limit:</strong> {formatCurrency(plan.summary.spendingLimit)}</p>
  <p><strong>Current Average Spend:</strong> {formatCurrency(plan.summary.currentAverageSpending)}</p>
</div>


          {/* Suggested Budget Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-md text-sm text-left">
              <thead className="bg-green-100">
                <tr>
                  <th className="p-2">Category</th>
                  <th className="p-2">Avg Spend</th>
                  <th className="p-2">Suggested</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {plan.categories.map((cat, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{cat.name}</td>
                    <td className="p-2">{formatCurrency(cat.average)}</td>
                    <td className="p-2">{formatCurrency(cat.suggested)}</td>
                    <td className="p-2 flex items-center gap-1 text-sm">
                      {cat.action === 'Reduce' ? (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      ) : cat.action === 'Increase' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : null}
                      {cat.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Advice */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-md text-green-900 text-sm">
            <h4 className="font-semibold mb-2">Tips to Save More:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {plan.advice.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default SavingPlanner;
