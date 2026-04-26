# 🎤 Voice-Based POS Billing System (Deterministic NLU)

A research-grade full-stack **Point-of-Sale (POS) billing platform** that enables **voice-driven retail billing** using a deterministic rule-based Natural Language Understanding engine.

This system is designed for **low-latency retail environments** and ensures uninterrupted billing through **manual billing fallback** when voice recognition fails.

The project demonstrates a complete **MERN stack architecture** with evaluation, benchmarking, analytics, and modern dashboard UI.

---

# 🌟 Highlights

* Deterministic Voice Command Billing
* Real-time Cart and Inventory Management
* Premium SaaS-style Dashboard UI
* Research Evaluation Modules
* Noise Robustness Testing
* Low Latency Command Processing
* Modular Scalable Architecture

---

# 🎯 Problem Statement

Retail billing systems often require fast interaction, low training overhead, and operational efficiency.

This project explores whether **deterministic rule-based voice command systems** can:

* Reduce billing friction
* Maintain high transparency
* Operate in noisy environments
* Provide measurable performance metrics

---

# 🧠 Research Goals

* Deterministic NLU design
* Real-time POS suitability
* Reproducible performance evaluation
* Noise tolerance analysis
* Transparent logic pipeline

---

# 🏗 System Architecture

Voice Input
→ Speech-to-Text Engine
→ Deterministic NLU Parser
→ Billing Engine
→ MongoDB Database
→ React Dashboard UI

---

# 🧩 Core Modules

## 🎙 Voice Billing Engine

* Keyword-based intent detection
* Gazetteer product matching
* Alias recognition
* Quantity parsing (numeric / words / fractional)
* Fuzzy similarity scoring
* Configurable sensitivity threshold

## 🛒 Billing System

* Cart state management
* Add / remove product operations
* Tax calculation
* Payment workflow
* Transaction persistence
* Real-time stock deduction

## 📦 Product Management

* Add / edit / delete products
* Category filtering
* Voice alias configuration
* Inventory tracking

## 📊 Analytics Dashboard

* Daily revenue metrics
* Top selling products
* Order statistics
* Low stock alerts

## 📜 Reporting System

* Sales report export
* Inventory report export
* Excel file generation

## ⚙ Settings Module

* Store configuration
* Tax configuration
* Voice sensitivity tuning

---

# 🛠 Technology Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* Chart.js
* Lucide Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Speech Recognition

* Web Speech API (Browser)

---

# ⚡ Performance Characteristics

* Average command latency ≈ 40 ms
* Cold start latency ≈ 300 ms
* Deterministic processing pipeline
* Real-time POS usability

---

# 🔬 Evaluation Modules

## Intent Classification Performance

* Precision ≈ 97.5%
* Recall ≈ 97.5%
* F1 Score ≈ 97.5%

## Slot Extraction Performance

* Precision ≈ 73.5%
* Recall ≈ 73.5%
* F1 Score ≈ 73.5%

## Noise Robustness

* Clean Accuracy = 100%
* Noisy Accuracy = 100%

---

# ⚙ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/voice-controlled-billing-system.git
cd voice-controlled-billing-system
```

## 2️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

Create `.env` file:

```text
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/voice_bill_db
```

## 3️⃣ Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

---

# 🌱 Seed Grocery Products

```bash
cd server
node seedProducts.js
```

---

# 📁 Project Structure

```
voice-pos-system/
│
├── client/
├── server/
├── docs/
├── README.md
└── LICENSE
```

---

# 🚀 Future Scope

* Multilingual deterministic grammar
* Cloud multi-store deployment
* Real payment gateway integration
* Barcode + voice hybrid billing
* AI sales prediction analytics

---

# 📜 License

MIT License

---

# 👨‍💻 Author

Gajendra Singh
