# System Architecture

## Overview

The proposed system is a deterministic voice-based Point-of-Sale (POS) billing platform designed for controlled retail environments.  
The architecture follows a layered modular design to ensure scalability, reproducibility, and research defensibility.

The system enables retail operators to perform billing operations using voice commands while maintaining manual billing fallback to ensure uninterrupted POS workflow.

---

## Architectural Layers

The system is divided into four major layers.

### 1. Presentation Layer (Frontend)

The frontend is implemented using React (Vite) and provides a modern SaaS-style POS dashboard.

Main UI modules:

- Voice Billing Console  
- Manual Product Search  
- Cart Management Panel  
- Billing Summary Panel  
- Product Management Page  
- Transactions Viewer  
- Sales Analytics Dashboard  
- Reports Export Page  
- System Settings Panel  

The interface uses component-based architecture with glassmorphism design and gradient visual hierarchy.

---

### 2. Application Layer (Backend API)

The backend is implemented using Node.js and Express.js following the MVC pattern.

Controllers include:

- Billing Controller  
- Product Controller  
- Transaction Controller  
- Analytics Controller  
- Settings Controller  

Responsibilities:

- API routing  
- request validation  
- orchestration of billing operations  
- persistence coordination  

---

### 3. Logic Layer (Core Services)

#### Deterministic NLU Engine

- Keyword-based intent detection  
- Gazetteer product matching  
- Voice alias recognition  
- Fuzzy similarity scoring  
- Quantity parsing (numeric, word, fractional)  
- Stop-unit filtering  
- Configurable sensitivity threshold  

#### Billing Engine

- Cart state management  
- Add / remove item operations  
- Tax and total computation  
- Real-time stock deduction  
- Transaction persistence  

#### Analytics Engine

- Sales aggregation  
- Top selling product detection  
- Revenue trend calculation  
- Low stock monitoring  

---

### 4. Data Layer (MongoDB)

MongoDB is used as the persistent storage system.

Collections:

- Products  
- Cart  
- Transactions  
- Settings  

Product names are indexed to support efficient deterministic lookup.

---

## Voice Processing Pipeline

Microphone Input  
→ Browser Speech-to-Text  
→ Transcript Normalization  
→ Deterministic NLU Parsing  
→ Billing Engine Execution  
→ MongoDB Update  
→ UI State Refresh  

This pipeline ensures low latency and transparent decision making suitable for real-time POS environments.

---

## Modularity and Extensibility

Each module follows the single responsibility principle enabling:

- reproducible evaluation  
- latency benchmarking  
- future feature expansion  

The architecture supports future integration of multilingual grammars, payment gateways, and cloud deployment.

---

## Scalability

The system was evaluated using an expanded grocery dataset (~100 products).  
Performance measurements indicate deterministic parsing latency remains within real-time operational limits.

---

## Architectural Advantages

- Fully deterministic logic  
- Explainable command interpretation  
- Low computational cost  
- Real-time retail usability  
- Research-grade evaluation capability