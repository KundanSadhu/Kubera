# KUBERA — Development Process

## 1. Branching & Commits

```
main (protected) ← feat/crm-pipeline ← pr #12
      ← fix/gst-calculation  ← pr #13
      ← docs/architecture    ← pr #14
```

- Branch: `feat/*`, `fix/*`, `docs/*`, `chore/*`
- Commit: `feat(crm): add lead status FSM` ; `fix(invoice): CGST split rounding` ; `docs(arch): add heartbeat diagram`
- PR checklist: `[ ] lint`, `[ ] typecheck/pyright`, `[ ] pytest`, `[ ] no secrets`

## 2. Tooling

| Check | Command | Config |
|---|---|---|
| Python lint/format | `ruff check . && ruff format .` + `black` | `backend/pyproject.toml` |
| Type check | `pyright` (or `mypy`) | `backend/pyproject.toml` |
| Frontend lint | `npm run lint` (ESLint flat) | `frontend/eslint.config.js` |
| Tests | `pytest -q` (backend), `npm test` (frontend if any) | `backend/pytest.ini` |
| Pre-commit | `pre-commit install` | `.pre-commit-config.yaml` |

Run `pre-commit run --all-files` before pushing.

## 3. Database Workflow

- **Never** edit DB directly. Use Alembic:
  ```bash
  cd backend
  alembic revision --autogenerate -m "add leads table"
  alembic upgrade head
  alembic downgrade -1  # if needed
  ```
- Models at `backend/app/models/*.py` (SQLAlchemy 2.0 async). Schemas at `schemas/*.py` (Pydantic v2).

## 4. Code Conventions

- **No magic numbers** — centralize at `backend/app/core/limits.py` (mirrors `markus/packages/shared/src/limits.ts:584` pattern).
- **Error handling:** No empty `except: pass`. Log with `logger.debug/warning` + re-raise or return typed error.
- **Secrets:** No `sk-` placeholder commits. Use `SECRET_KEYS` regex masking (inspired by `markus/packages/shared/src/utils/crash.ts:91`).
- **Absolute paths:** In prompts only if tool-enforced.

## 5. Testing Strategy

| Layer | Tool | Target |
|---|---|---|
| Unit | `pytest` | `gst.py` (SGST/CGST edge), `security.py` JWT, `limits.py` |
| Integration | `pytest-asyncio` + `httpx` | `POST /crm/leads` → `GET /crm/leads`, FSM `pending→completed` |
| E2E manual | Checklist `docs/features.md:7` | Lead→invoice→PDF→approve |

Coverage: aim 60% MVP (not Markus `vitest.config.ts: thresholds 75/65/78/80` — adjust for Python).

## 6. Review Workflow (Dogfood)

KUBERA agents review their own PRs only for capstone demo — human approval still gates merge. Mimics Markus `submit_review → review → merge` but simplified: agent → `review` comment, human clicks Approve.

## 7. Release & Tags

- Tag: `v0.1.0-mvp` (after P3), `v0.9.0-demo` (after P6), `v1.0.0` capstone.
- `RELEASELOG.md` at root — bilingual note per version (follow `markus/RELEASELOG.md` style).

## 8. Academic Integrity Checklist

- [ ] No copy of `markus/packages/*` code — rewrite from concepts.
- [ ] `README.md` attribution paragraph present.
- [ ] `docs/architecture.md` cites Markus docs as reference, not source.
- [ ] License MIT for `kubera/` (Markus is Apache-2.0 — distinct).
- [ ] Report References section lists Markus, FastAPI, LiteLLM, Chroma papers.

## 9. Incident Playbook

- **Secrets leaked:** rotate `JWT_SECRET` + `OPENAI_API_KEY`, `git reset` + force push (only on personal fork before evaluation).
- **DB migration conflict:** `alembic merge` then `upgrade`.
- **Ollama OOM (4GB):** switch `LITELLM_MODEL=openai/gpt-4o-mini` for that session, document limitation.

## 10. Roles

Single developer — but act as 3Hat: `Builder` (writes), `Reviewer` (checks `process.md:4`), `Ops` (runs `working.md`). Log decisions in `TODO.md`.
