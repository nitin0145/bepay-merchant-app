# bepay Merchant Dashboard & Payment Links Platform

**Take‑home assignment – Frontend Engineer**

---

## Project Overview

The bepay Merchant Dashboard is a single‑page application that enables merchants to monitor payments, review transaction history, and manage payment links. The UI reproduces a set of high‑fidelity Figma designs and provides a polished, responsive experience for merchants to:

* View key payment KPIs at a glance.
* Search, filter, and paginate through transaction records.
* Create, list, and inspect payment links with validation and copy‑to‑clipboard support.

The application is built entirely with modern frontend tooling and uses **Mock Service Worker (MSW)** to simulate the backend API.

---

## Features

### Dashboard

| Feature | Description |
|---------|-------------|
| **Total Received** | Aggregate amount of successful payments. |
| **Successful Payments** | Count of completed transactions. |
| **Pending Payments** | Count of awaiting settlements. |
| **Failed Payments** | Count of declined/errored transactions. |
| **Recent Transactions** | List of the latest 5‑10 transactions with status badges. |
| **Filters** | Drawer for date range, status, network, token, etc. |
| **Refresh Actions** | Manual refresh button to re‑fetch dashboard summary. |

### Payment History

| Feature | Description |
|---------|-------------|
| **Search** | Keyword search across transaction IDs, addresses, etc. |
| **Status Filters** | Filter by `PENDING`, `COMPLETED`, `FAILED`, `EXPIRED`. |
| **Pagination** | Server‑side pagination with a reusable `Pagination` component. |
| **Transaction Detail Drawer** | Slide‑out drawer showing full transaction metadata. |

### Payment Links

| Feature | Description |
|---------|-------------|
| **Payment Link Listing** | Table view with copy‑to‑clipboard, status badge, and actions. |
| **Search** | Real‑time filtering of links by name or URL. |
| **Filters** | Drawer for status, network, token, date range, and extra UI‑only settings. |
| **Create Payment Link** | Modal with a multi‑step form (basic + additional settings). |
| **Form Validation** | Powered by **React Hook Form** + **Zod** schema. |
| **Success Modal** | Confirmation with visual illustration and copy‑link button. |
| **Copy Link** | One‑click copy to clipboard with toast feedback. |
| **Payment Link Detail Page** | Detailed view of a specific link and its transaction history. |
| **Active / Paid / Expired States** | Clear status badges using the shared `StatusBadge` component. |

---

## Tech Stack

| Technology | Why it was chosen |
|------------|-------------------|
| **React** | Declarative UI library with a massive ecosystem; perfect for component‑driven architecture. |
| **TypeScript** | Guarantees type safety across the codebase, reduces runtime errors, and improves IDE support. |
| **Vite** | Lightning‑fast dev server & bundler; HMR speeds up iteration during the take‑home. |
| **TailwindCSS** | Utility‑first styling enables rapid, consistent UI creation without CSS drift. |
| **shadcn/ui** | Provides accessible, opinionated, and theme‑compatible component primitives (e.g., dialog, form). |
| **React Router** | Handles client‑side routing for dashboard, transactions, and payment‑link pages. |
| **TanStack Query** | Abstracts data fetching, caching, and background refetching; eliminates manual state handling for async data. |
| **React Hook Form** + **Zod** | Lightweight form management with schema‑based validation, offering great performance and developer ergonomics. |
| **MSW (Mock Service Worker)** | Enables realistic API mocking at the network layer, allowing the frontend to be fully functional without a real backend. |

---

## Architecture

1. **Feature‑based folder structure** – each domain (dashboard, transactions, payment‑links) lives under `src/features/<feature>/`.  
2. **Service layer abstraction** – `src/services/api-client.ts` centralises fetch logic; domain‑specific services (e.g., `payment-link.service.ts`) compose API URLs.  
3. **Query hooks** – custom hooks (`useDashboardSummary`, `useTransactions`, `usePaymentLinks`, etc.) encapsulate TanStack Query usage and expose a clean API to components.  
4. **Reusable UI components** – generic components (`Pagination`, `StatusBadge`, `MetricCard`) are placed in `src/components/ui/` and reused across features.  
5. **Type‑safe domain models** – TypeScript interfaces (`Transaction`, `PaymentLink`, `DashboardSummary`) live in `src/types/domain.ts`, ensuring compile‑time guarantees throughout the app.

---

## Folder Structure

```
src/
├─ components/
│   ├─ layout/
│   │   └─ Sidebar.tsx
│   └─ ui/
│       ├─ MetricCard.tsx
│       ├─ Pagination.tsx          ← shared UI component
│       └─ StatusBadge.tsx
├─ features/
│   ├─ dashboard/
│   │   └─ pages/DashboardPage.tsx
│   ├─ transactions/
│   │   ├─ pages/TransactionsPage.tsx
│   │   └─ components/
│   │       ├─ FilterDrawer.tsx
│   │       ├─ TransactionsTable.tsx
│   │       └─ TransactionDetailDrawer.tsx
│   └─ payment-links/
│       ├─ pages/
│       │   ├─ PaymentLinksPage.tsx
│       │   └─ PaymentLinkDetailPage.tsx
│       └─ components/
│           ├─ CreatePaymentLinkModal.tsx
│           ├─ PaymentLinksFilterDrawer.tsx
│           ├─ PaymentLinksTable.tsx
│           └─ SuccessModal.tsx
├─ routes/
│   ├─ index.tsx
│   └─ paths.ts
├─ services/
│   └─ api-client.ts
├─ hooks/
│   └─ (optional shared hooks)
├─ mocks/
│   ├─ db.ts
│   └─ handlers/
│       ├─ dashboard.handlers.ts
│       ├─ transaction.handlers.ts
│       └─ payment-link.handlers.ts
├─ schemas/
│   └─ common.ts
├─ types/
│   └─ domain.ts
└─ index.css
```

---

## API Layer

| Method | Endpoint | Purpose |
|--------|----------|---------|
| **GET** | `/api/dashboard/summary` | Returns aggregated KPI data for the dashboard. |
| **GET** | `/api/transactions?status=&search=&page=&limit=` | Paginated list of transactions with optional status & search filters. |
| **GET** | `/api/transactions/:id` | Retrieves full details for a single transaction (used by the detail drawer). |
| **GET** | `/api/payment-links?status=&search=&page=&limit=` | Paginated list of payment links with filter support. |
| **POST** | `/api/payment-links` | Creates a new payment link; body validated by Zod schema. |
| **GET** | `/api/payment-links/:id` | Retrieves a specific payment link and its metadata. |

### MSW Mock Backend

* **`src/mocks/db.ts`** holds in‑memory collections for transactions, payment links, and dashboard aggregates.  
* Request handlers (`dashboard.handlers.ts`, `transaction.handlers.ts`, `payment-link.handlers.ts`) implement the above endpoints, respecting query parameters and pagination logic.  
* MSW intercepts `fetch` calls in the browser, providing deterministic responses without a real server, enabling end‑to‑end UI testing and development.

---

## State Management

All server state is managed by **TanStack Query**:

* **Caching** – data is cached per query key; subsequent navigations instantly display cached data.  
* **Automatic refetch** – on window focus or manual refresh actions.  
* **Stale‑while‑revalidate** – ensures UI shows the most recent data without flicker.  
* **Error handling** – query hooks expose `error`, `isLoading`, and `isFetching` flags that drive loading spinners, error messages, and retry UI.

---

## Form Validation

* **React Hook Form** handles form state with minimal re‑renders.  
* **Zod** schemas define the shape and constraints (required fields, numeric ranges, URL format, etc.).  
* Integration via `resolver: zodResolver(schema)` provides instant, type‑safe validation feedback.

The `CreatePaymentLinkModal` uses this stack, guaranteeing that only valid payloads are sent to the mock `POST /api/payment-links` endpoint.

---

## Responsive Design

The UI is built with Tailwind’s responsive utilities:

| Breakpoint | Width (px) | Adjustments |
|------------|-----------|-------------|
| **Mobile** | ≤ 375 | Vertical stacking, hidden side navigation, full‑screen drawers. |
| **Tablet** | 768 – 1023 | Two‑column layouts for tables, side navigation collapses to a hamburger. |
| **Desktop** | 1024 – 1439 | Standard three‑column layout, persistent sidebar, wider tables. |
| **Large Desktop** | ≥ 1440 | Additional whitespace, larger font sizes, UI elements scale gracefully. |

No horizontal overflow is observed at any breakpoint; tables become scrollable on smaller screens, and drawers/modals occupy the full viewport height on mobile.

---

## Accessibility

* **ARIA roles** – `role="dialog"` and `aria-modal="true"` on all modals and drawer containers.  
* **`aria-labelledby`** links titles to dialogs for screen readers.  
* **Keyboard navigation** – focus is trapped inside open dialogs/drawers; `Esc` key closes them.  
* **Semantic HTML** – proper heading hierarchy, `<button>` elements instead of generic `<div>`.  
* **Color contrast** – Tailwind’s default palette meets WCAG AA contrast ratios.  
* **Focus outlines** – preserved and clearly visible on interactive elements.

---

## Prioritisation Decisions

1. **Core UI fidelity** – replicated the Figma designs pixel‑perfectly (layout, spacing, colors).  
2. **Data flow architecture** – built the service layer, query hooks, and MSW mock early to ensure a stable data contract.  
3. **Accessibility** – added ARIA attributes and keyboard support before polishing visual details.  
4. **Code quality** – eliminated duplicate components (e.g., shared `Pagination`) and unused files.

These steps ensured a functional, maintainable, and review‑ready product before adding non‑essential enhancements.

---

## Assumptions

* The merchant is already authenticated; auth flows are out of scope.  
* All data fits comfortably in memory for the mock backend.  
* Payment link creation does not require third‑party integration (e.g., payment provider SDK).  
* Network latency is negligible in the mock environment.

---

## Trade‑offs

* **Mocked backend only** – simplifies development but means real‑world error scenarios (e.g., network failures) are not exercised.  
* **Static routing** – deep linking works, but no lazy loading of the mock data layers (acceptable for a take‑home).  
* **No unit tests** – time constraints limited test coverage; focus was on UI correctness and type safety.  
* **Simplified analytics** – dashboard metrics are calculated from mock data, not from a real analytics pipeline.

---

## Completed Features

- [x] Dashboard UI (+ filters, refresh)  
- [x] Transaction list with search, status filters, pagination, and detail drawer  
- [x] Payment Links list, search, filters, create modal (form + validation), success modal, copy‑link, detail page, status badges  
- [x] Reusable UI components (`Pagination`, `StatusBadge`, `MetricCard`)  
- [x] Service layer + query hooks (TanStack Query)  
- [x] MSW mock backend covering all required endpoints  
- [x] Full responsive breakpoints (mobile → large desktop)  
- [x] Accessibility enhancements (ARIA, keyboard navigation)  
- [x] TypeScript‑strict project with no compile errors

---

## Incomplete Features

_Nothing critical remains; all assignment scope items are complete._

Potential future work items are listed below.

---

## Future Improvements

| Area | Potential Enhancements |
|------|------------------------|
| **Real backend integration** | Replace MSW with actual REST endpoints, add Axios or fetch wrappers with auth headers. |
| **Authentication** | JWT‑based login flow, protected routes, token refresh. |
| **Role‑based permissions** | Granular UI enable/disable based on merchant roles (admin, accountant, viewer). |
| **Real‑time updates** | WebSocket or Server‑Sent Events for instant transaction status changes. |
| **CSV export** | Export transaction or payment‑link lists for reporting. |
| **Advanced analytics** | Charts for revenue trends, cohort analysis, and funnel visualisations. |
| **Testing** | Unit & integration tests with Jest + React Testing Library + MSW. |
| **Internationalisation (i18n)** | Multi‑language support using `react-i18next`. |

---

## Setup Instructions

```bash
# Clone the repository
git clone <repo-url>
cd bepay-tech-assesment

# Install dependencies (uses npm; pnpm/yarn also work)
npm install
```

---

## Running Development Server

```bash
npm run dev
# Vite dev server starts at http://localhost:5173
```

The MSW worker automatically starts and intercepts API calls.

---

## Build Instructions

```bash
npm run build
# Production assets are emitted to the `dist/` folder
```

---

## Testing Instructions

The project does not include automated tests, but manual verification steps are:

1. **Dashboard** – Verify KPI cards update on refresh.  
2. **Transactions** – Search, apply status filters, paginate, and open a transaction detail drawer.  
3. **Payment Links** – Search, filter, create a new link (validation errors appear when required fields are missing), confirm the success modal, copy the link, and navigate to the detail page.  
4. **Responsive** – Resize the browser to 375 px, 768 px, 1024 px, and 1440 px; ensure no horizontal scrolling and proper layout adjustments.  
5. **Accessibility** – Tab through interactive elements, ensure focus trapping inside modals/drawers, and verify screen‑reader announcements for dialogs.

---

## Deployment

The app can be deployed to any static‑hosting service (Vercel, Netlify, Cloudflare Pages, etc.) that serves the `dist/` folder.

```
Live URL:
<TO_BE_ADDED_AFTER_VERCEL_DEPLOY>
```

---

## Walkthrough Video

A short walkthrough demonstrating the main user flows (dashboard overview, transaction search, payment‑link creation, and responsive behavior) will be added here:

```
Video URL:
<TO_BE_ADDED_AFTER_RECORDING>
```

---

### Thank you for reviewing my submission!

Feel free to reach out with any questions or feedback.
