const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");


const connectDB = require("./config/db");
const healthRoutes = require("./routes/healthRoutes");
const billingRoutes = require("./routes/billingRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const settingsRoutes = require("./routes/settingsRoutes");


const app = express();

app.use(cors());
app.use(express.json());

// Database connection
connectDB();

app.use("/api/settings", settingsRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/billing", billingRoutes);

const PORT = process.env.PORT || 5000;

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.stack)
  res.status(500).json({ error: err.message })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});