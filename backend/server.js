require("./auth/passport");
const passport = require("passport");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const aiRoutes = require("./routes/ai");
const userRoutes = require('./routes/user'); // adjust the path

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: "https://expense-tracker-1-70ug.onrender.com",
  credentials: true
}));

app.use('/auth', require('./routes/auth'));
app.use('/expenses', require('./routes/expenses'));
app.use(passport.initialize());
app.use("/auth", require("./routes/oauth"));
app.use("/api/ai", aiRoutes);
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"));

app.use("/expenses", require("./routes/expenses"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
