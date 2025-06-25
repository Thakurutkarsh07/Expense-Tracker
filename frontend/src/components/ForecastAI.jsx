import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, TrendingUp, IndianRupee, AlertTriangle } from 'lucide-react';

const ForecastAI = ({ expenseSummary }) => {
  const [forecast, setForecast] = useState(null);
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
const getNextMonthForecastTitle = () => {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const monthName = nextMonth.toLocaleString('default', { month: 'long' });
  const year = nextMonth.getFullYear();

  return `${monthName} ${year} Forecast (AI)`;
};
  // 🧠 Convert expense object into human-readable string
  const formatSummary = (data) => {
    return Object.entries(data)
      .map(([month, categories]) => {
        const categoryLines = Object.entries(categories)
          .map(([cat, value]) => `${cat}: ₹${value}`)
          .join(', ');
        return `${month}: ${categoryLines}`;
      })
      .join('\n');
  };

  // 📊 Parse AI forecast result
  const parseForecast = (text) => {
    const categoryRegex = /^\s*[*-]?\s*(.+?):\s*₹?(\d+)/gm;
    const categories = [];
    let match;

    while ((match = categoryRegex.exec(text)) !== null) {
      const name = match[1]?.trim();
      const value = Number(match[2]);
      if (name && !isNaN(value)) {
        categories.push({ name, value });
      }
    }

    const totalLine = categories.find(c => /total/i.test(c.name));
    const total = totalLine ? totalLine.value : categories.reduce((sum, c) => sum + c.value, 0);
    const filtered = categories.filter(c => !/total/i.test(c.name));

    return { categories: filtered, total };
  };

  // 🚀 Send formatted data to backend
  const getForecast = async () => {
    setLoading(true);
    const formattedSummary = formatSummary(expenseSummary);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/forecast', {
        summary: formattedSummary,
      });

      const text = res.data.result || '';
      setRawText(text);
      console.log('Raw AI Forecast:', text);

      setForecast(parseForecast(text));
    } catch (error) {
      setRawText('Error fetching forecast: ' + error.message);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
      <h3 className="text-xl font-bold mb-4 text-indigo-700 flex items-center gap-2">
        <TrendingUp className="text-indigo-500" /> {getNextMonthForecastTitle()}
      </h3>

      <button
        onClick={getForecast}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Generate Forecast'}
      </button>

      {forecast && (
        <div className="mt-6 space-y-4">
          <p className="text-gray-600 text-sm">
            Based on your last 5 months of expenses, here’s your projected July spend:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {forecast.categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl shadow-sm"
              >
                <div className="text-sm text-gray-500">{cat.name}</div>
                <div className="text-lg font-semibold text-indigo-800 flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" /> {cat.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right text-indigo-700 font-bold text-lg">
            Total Forecast: ₹{forecast.total.toLocaleString()}
          </div>
        </div>
      )}

      {!forecast && rawText && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4 flex items-start gap-2 text-sm text-yellow-800">
          <AlertTriangle className="w-5 h-5 mt-1" />
          <pre className="whitespace-pre-wrap">{rawText}</pre>
        </div>
      )}
    </div>
  );
};

export default ForecastAI;
