const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/forecast", async (req, res) => {
  try {
    const { summary } = req.body;

const prompt = `
You are a smart finance assistant.

Based on the last 5 months of categorized spending below, give a projected budget for July 2025.

Respond ONLY with clean structured data in this format:

Category: Amount (₹)
...
Total Forecast: ₹Amount

Past Expenses:
${req.body.summary}
`;

const result = await model.generateContent(prompt);



    const response = await result.response;
    res.json({ result: response.text() });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch forecast", detail: error.message });
  }
});


router.post("/budget", async (req, res) => {
  try {
    const { averageSpending, goalAmount, income } = req.body;

    const spendingValues = Object.values(averageSpending);
    const currentAverageSpending = spendingValues.reduce((a, b) => a + b, 0);
    const spendingLimit = income - goalAmount;

    const prompt = `
You are a smart budgeting assistant.

Based on this average monthly spending per category:
${JSON.stringify(averageSpending, null, 2)}

User's total income: ₹${income}
User's savings goal: ₹${goalAmount}

Calculate how much they can spend this month: income - savings = ₹${spendingLimit}
Current average spending: ₹${currentAverageSpending}

Suggest a revised budget per category with actions like "Reduce", "Increase", or "Keep". Focus on helping the user save ₹${goalAmount}.

Respond with only valid JSON using this format:

\`\`\`json
{
  "summary": {
    "income": ${income},
    "goal": ${goalAmount},
    "spendingLimit": ${spendingLimit},
    "currentAverageSpending": ${currentAverageSpending}
  },
  "categories": [
    {
      "name": "Food",
      "average": 2996,
      "suggested": 2500,
      "action": "Reduce"
    },
    ...
  ],
  "advice": [
    "Reduce restaurant visits.",
    "Limit impulse shopping."
  ]
}
\`\`\`
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON safely from response
    const match = text.match(/```json([\s\S]*?)```/);
    if (match) {
      const parsed = JSON.parse(match[1]);
      res.json({ result: parsed });
    } else {
      throw new Error("Invalid response format from AI.");
    }

  } catch (error) {
    res.status(500).json({ error: "Failed to generate budget", detail: error.message });
  }
});


module.exports = router;
