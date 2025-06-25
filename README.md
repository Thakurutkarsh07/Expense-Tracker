---

# 💸 Expense Tracker App

A full-stack expense tracking application that allows users to securely log, view, and visualize their daily expenses. Built using the **MERN** stack with **JWT** and **Google OAuth 2.0** authentication.

---

### 🌍 Deployed Version

Try the live app without setup:  
👉 [https://expense-tracker-1-70ug.onrender.com](https://expense-tracker-1-70ug.onrender.com)

> ⏳ The server may take 1–2 minutes to load due to Render's free tier sleep policy.

---

## 🔧 Tech Stack

* **Frontend:** React, Tailwind CSS, Chart.js (react-chartjs-2), Axios, React Router
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT (local) + Google OAuth 2.0
* **AI Assistant:** Gemini-1.5-flash via Google Generative AI
* **Visualization:** Chart.js, custom UI components

---

## 🚀 Features

✅ Add, edit, delete expenses
✅ Filter and list expenses by date and category
✅ **Paginate and control number of expenses shown per page**
✅ **Visualize spending via Pie and Bar Charts**
✅ **AI-powered budget forecasting for next month**
✅ **AI-powered savings planner based on user goals**
✅ Secure login with email/password or Google OAuth
✅ Fully responsive and mobile-friendly UI
✅ User-specific data using JWT sessions

---

## 🧠 AI Features

* **Savings Planner:** Input income and savings goal → Get tailored budget with category suggestions (increase/reduce).
* **Forecast Generator:** Uses last 5 months' spending to project July 2025 budget with breakdown and total.
* **Gemini API:** All suggestions come from Google Generative AI.

---

## 📂 Folder Structure

```
root/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── auth/
│   ├── controllers/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── api.js
│   ├── App.js
│   ├── .env
│   └── package.json
```

---

## 🛠️ Setup Instructions

### 📦 Prerequisites

* Node.js (v16+)
* MongoDB (Atlas)
* Google Cloud account (for OAuth + Gemini API)

---

### 🔁 1. Clone the Repository

```bash
git clone https://github.com/Thakurutkarsh07/Expense-Tracker.git
cd Expense-Tracker
```

---
## 🔑 Google OAuth Setup

To enable Google login, you need to obtain a **Client ID** and **Client Secret** from Google Cloud Console:

### 🔧 Steps:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → Create a new one (or choose existing)
3. On the left menu, go to **APIs & Services > OAuth consent screen**
   - Choose **External** for user type
   - Fill in App Name, Support Email, and Developer Info
   - Save and continue (scopes & test users can be skipped or filled as needed)
4. Now go to **Credentials > Create Credentials > OAuth Client ID**
   - Choose **Web Application**
   - Add authorized redirect URIs:
     ```
     http://localhost:5000/auth/google/callback
     ```
   - Add authorized JavaScript origins:
     ```
     http://localhost:5173
     ```
   - Click **Create**

5. Copy the generated **Client ID** and **Client Secret**
---

### 🖥️ 2. Start the Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GEMINI_API_KEY=your_google_generative_ai_key
```

Run the backend:

```bash
node server.js
```

---

### 🌐 3. Start the Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the frontend:

```bash
npm run dev
```

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:5000`

---

## 🔐 Authentication Flow

* **JWT:** Used for email/password login
* **Google OAuth:** Handled via Passport.js + redirects with JWT
* On login, token is stored in `localStorage` and sent via `x-auth-token` on every API call

---

## 📊 Visualizations

* **Pie Chart:** Distribution of expenses by category
* **Bar Chart:** Total monthly spending over time
* **Smart Layout:** Charts automatically resize and adjust based on screen size

---

## 🤖 AI Intelligence

* **Smart Forecasting**: Get monthly forecast based on historical data (July 2025 and beyond)
* **Savings Advisor**: Generate practical category-wise budgets to meet monthly savings targets
* **Real-time AI Results**: All calculations are done via Gemini AI and returned as structured JSON for display

---

## 💡 Future Enhancements

* Export reports to PDF/Excel
* Add recurring expenses & subscriptions
* Multi-user budget comparisons
* Dark mode and theming
* AI trend detection over time
* Weekly email reports via cron jobs

---

## 🙋‍♂️ Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---



