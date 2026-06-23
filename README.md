# bepay Merchant Dashboard

A merchant dashboard and payment links platform built as a take-home assignment.

🔗 **Live Demo:** https://bepay-merchant-app-ten.vercel.app/

---

## Features

- **Dashboard** — KPI metrics, recent transactions, refresh
- **Payment History** — Search, filters, pagination, detail drawer
- **Payment Links** — List, create, filter, copy link, detail page

---

## Tech Stack

| | |
|---|---|
| React + TypeScript | UI & type safety |
| Vite | Dev server & bundler |
| TailwindCSS + shadcn/ui | Styling & components |
| React Router | Client-side routing |
| TanStack Query | Data fetching & caching |
| React Hook Form + Zod | Form validation |
| MSW | Mock API backend |

---

## Setup

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Production build
```

---

## API Endpoints (mocked via MSW)

```
GET  /api/dashboard/summary
GET  /api/transactions?status=&search=&page=&limit=
GET  /api/transactions/:id
GET  /api/payment-links?status=&search=&page=&limit=
POST /api/payment-links
GET  /api/payment-links/:id
```

---

## Architecture

Feature-based folder structure with a clear separation of:
- **Service layer** — API calls via `api-client.ts`
- **Query hooks** — TanStack Query hooks per feature
- **Shared UI** — `Pagination`, `StatusBadge`, `MetricCard`
- **Mock layer** — MSW handlers + in-memory `db.ts`

---

## Assumptions & Trade-offs

- No authentication (out of scope)
- MSW mock backend runs in production (no real API)
- No automated tests (prioritised UI correctness and type safety)

---

## Future Improvements

- Real backend + authentication
- Role-based permissions
- Real-time updates via WebSocket
- CSV export & advanced analytics
- Unit & integration tests
