# 🏛️ KUBERA — AI-Powered Business Operations Platform

> *"Your Self-Managing Digital Workforce for Indian Businesses"*
> B.Tech CSE Capstone Project | 4th Year

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org) [![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-green.svg)](https://fastapi.tiangolo.com) [![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://postgresql.org) [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

KUBERA is a **self-hosted, AI-powered business operations platform** for Indian MSMEs. Unlike fragmented SaaS tools, KUBERA provides a single dashboard where **role-based AI agents** handle CRM, GST-compliant invoicing, and business automation — with **Hindi + English** support, **PWA offline capability**, and **zero recurring SaaS costs**.

Inspired by [Markus](https://github.com/markus-global/markus) (AI workforce platform) as an **architectural reference**, KUBERA is a **from-scratch rebuild** in Python/FastAPI + React with India-specific business modules.

---

## ✨ Why KUBERA?

| Problem (Indian MSMEs) | KUBERA Solution |
|---|---|
| 5+ apps for CRM/invoicing/tasks | Single unified dashboard |
| Manual data entry & missed follow-ups | AI agents auto-follow leads |
| Expensive SaaS subscriptions | Self-hosted, MIT-licensed |
| English-only tools | EN + HI multi-language |
| Cloud-only breaks on poor internet | PWA offline + installable |

## 📸 Demo

> *Add GIF/screenshot after Phase 3:* `docs/images/dashboard-preview.gif` — agents planning, CRM kanban, GST invoice PDF.

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/yourusername/kubera.git
cd kubera

# 2. One-command (Docker)
docker-compose up --build

# 3. Or manual
# Backend
cd backend && python -m venv venv && source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload  # → http://localhost:8000

# Frontend
cd frontend && npm install && npm run dev  # → http://localhost:5173
```

| Service | URL |
|---|---|
| Web UI | http://localhost:5173 |
| API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| Chroma | http://localhost:8001 |

Default login: `admin@kubera.local` / `kubera123` (change `ADMIN_PASSWORD` in `.env`).

## 🏗️ Architecture (Simplified)

```
React + Vite + PWA (EN/HI)  ──REST+WS──▶  FastAPI Gateway
                                              │
                          ┌───────────────────┼───────────────────┐
                          ▼                   ▼                   ▼
                     PostgreSQL          Agent Runtime        ChromaDB (RAG)
                  (business data)      (Python asyncio)    (semantic memory)
                     tenants,            LLM Router           knowledge
                     leads/deals,        Mailbox/Attention    embeddings
                     invoices,           Tools/Heartbeat
                     tasks/agents
```

See [`docs/architecture.md`](docs/architecture.md) for full C4 diagrams.

## 🤖 Agent Roles (MVP)

| Agent | Role | Tools |
|---|---|---|
| **Sales Guru** | Lead qualification, follow-ups | CRM, WhatsApp (mock), Email |
| **Accountant Ji** | GST invoice, payment tracking | Invoice, PDF, Calculator |
| **Kubera Bot** | Cross-module NL queries | All tools |

## 📚 Documentation

| Doc | Description |
|---|---|
| [Architecture](docs/architecture.md) | System design, DB schema, data flow |
| [Tech Stack](docs/tech-stack.md) | Technology choices & versions |
| [Features](docs/features.md) | MVP vs v2 feature matrix |
| [Workflow](docs/workflow.md) | Task FSM, agent lifecycle |
| [Working](docs/working.md) | Run/debug guide |
| [Process](docs/process.md) | Conventions, branching, testing |
| [Phasewise Plan](docs/phasewiseplan.md) | 18-week Gantt |
| [TODO](TODO.md) | Task tracker |

## 🛠️ Tech Stack

Python 3.11 + FastAPI, React 18 + Vite + Tailwind + shadcn/ui, PostgreSQL 16, ChromaDB, LiteLLM (Ollama 80% + OpenAI for demo), Docker Compose. See [tech-stack.md](docs/tech-stack.md).

## 📄 Attribution & License

> **Academic Integrity:** KUBERA is inspired by **Markus** (`github.com/markus-global/markus`, Apache-2.0) as an architectural reference. KUBERA is a complete from-scratch implementation in Python/React — no Markus code is copied. Markus concepts (Mailbox/Attention, Heartbeat, Task FSM) are reimplemented from descriptions.

Licensed under **MIT** — see [LICENSE](LICENSE). PRD at `docs/PRD.md` (if added).

## 🗺️ Roadmap

- **MVP (this repo):** CRM + GST invoicing + 3 agents + PWA
- **v2:** Inventory, HR, OCR parser, UPI, Telugu, native app

---

<p align="center"><sub>KUBERA — Where Indian Businesses Grow with AI</sub></p>
