# WealthRadar — AI-Powered Portfolio Intelligence Platform

---

## Project Description

**WealthRadar** is a full-stack AI portfolio analysis platform that converts uploaded investment reports into actionable portfolio intelligence.

Users upload a broker export (currently supports Groww portfolio reports). The platform performs secure ingestion, parsing, context construction, concern detection, AI-powered reasoning, conversational analysis, and alert generation.

Our goal is to help retail investors understand portfolio health, diversification, risk exposure, and performance concerns through explainable AI-driven insights.

---

## Selected Problem Statement

This project addresses problem statement no. 3:  
**"AI Agents for real world problems"**

**Challenge:**  
Portfolio reports are often difficult for retail investors to interpret. Users can view holdings, but lack meaningful insights into diversification quality, concentration risk, macro sensitivity, or actionable reasoning.

**WealthRadar Solution:**  
AI-based context engineering, advanced analytics, and conversational interfaces power actionable, explainable portfolio analysis.

---

## Demo Video Link

[Demo Video (YouTube/Google Drive) — link to be added here]

---

## Tech Stack Used

**Frontend:**  
- Angular
- TypeScript
- Signals
- RxJS
- Responsive Dashboard UI

**Backend:**  
- FastAPI (Python)
- Pydantic
- Uvicorn

**AI / Models:**  
- Google Gemini 2.5 Flash
- Prompt-engineered reasoning agents

**Core Libraries:**  
- openpyxl
- pandas
- python-dotenv
- python-multipart

---

## System Architecture

**Frontend (Angular):**  
Acts as a dashboard and interaction layer.

Key pages:
- Dashboard
- Insights
- Simulation
- Macro
- Alerts

Responsibilities:
- Secure file upload
- Portfolio analysis and health visualization
- Pipeline & alert status rendering
- Portfolio chat interface

**Backend (FastAPI):**  
Modular, service-oriented architecture.

**REST Endpoints:**
- `/upload` — Portfolio file ingestion
- `/chat` — Conversational portfolio Q&A
- `/analyze` — Analysis and summary

**Core Services:**
- `redaction_service.py`: Privacy protection, redacts sensitive data
- `parser_service.py`: Parses Groww exports to structured data (holdings/summary)
- `context_service.py`: Generates enriched portfolio context
- `alert_service.py`: Generates alert signals
- `gemini_service.py`: Hosts Gemini config and reasoning logic
- `concern_agent.py`: AI agent for concern detection, e.g., diversification/concentration risk

---

## Implementation Approach & Workflow

1. **Upload:** User uploads Groww report.
2. **Redaction:** Backend generates privacy-protected, redacted copy before storage.
3. **Parsing:** Data extracted into holdings and summary metrics.
4. **Context Building:** Structured context generated for downstream systems.
5. **Alerts:** Signals generated for potential concerns.
6. **AI Analysis:** Gemini-powered reasoning and interpretations.
7. **Concern Detection:** AI identifies and describes key risks.
8. **Conversational Insights:** Natural language Q&A using AI and live data.

---

## Features & Functionalities

**Implemented:**
- Secure portfolio upload
- Automatic PII redaction
- Groww report parsing
- Dynamic health dashboard
- Portfolio pipeline/status tracking
- AI-driven insights and interpretation
- Natural language portfolio chat
- Concern detection and generation of warning cards
- Alert engine for portfolio risks

**Insights Page:**  
Conversational Q&A about portfolio, grounded in uploaded data.

**Alerts Page:**  
Visual concern cards showing risks, warnings, and session summaries.

**Dashboard:**  
Shows upload status, portfolio health, analysis, and metrics.

**Planned/Partial:**
- **Macro Intelligence Module:** Link portfolio analysis with macroeconomic factors — e.g., interest rates, market trends, external shocks.
- **Simulation Module:** "What-if" scenario analysis — e.g., rate changes, allocation tweaks, stress tests.

---

## APIs / Models / Tools Used

- **AI:** Google Gemini 2.5 Flash
- **Backend:** FastAPI, Uvicorn
- **Frontend:** Angular, RxJS, TypeScript
- **Parsing/Data:** openpyxl, pandas
- **Environment:** python-dotenv

---

## Setup Instructions to Run Locally

### Backend

```bash
# 1. Navigate to backend root
cd backend

# 2. Create python virtual environment
python3 -m venv venv
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create .env file
cp .env.example .env
# Edit with your GEMINI_API_KEY

# 5. Start FastAPI server
uvicorn main:app --reload
```

### Frontend

```bash
# 1. Navigate to frontend root
cd frontend

# 2. Install dependencies
npm install

# 3. Run development server
ng serve
```

By default, frontend runs at http://localhost:4200  
Backend at http://localhost:8000

---

## Environment Variables

Provide these in your `.env` file (backend):

```dotenv
GEMINI_API_KEY=your_api_key_here
```

Refer to `.env.example` for required/optional keys.

---

## Installation Steps

1. **Clone the repository:**
   ```
   git clone https://github.com/mathuranika/WealthRadar.git
   ```
2. **Install dependencies** for both backend and frontend as above.
3. **Configure environment variables** by creating and editing `.env`.
4. **Run the backend and frontend servers.**
5. **Access the dashboard** at [http://localhost:4200](http://localhost:4200).

---

## Screenshots

_Add screenshots of the dashboard, portfolio upload, alerts, and chat here if desired._

---

## Demo Video

[Link to demo video will go here]
