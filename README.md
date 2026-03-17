# Procurement Management UI

A modern Angular frontend for the Procurement Management System. Built with **Angular 21**, **Angular Material**, and **TypeScript** — connects to the [Spring Boot REST API](https://github.com/manjunath-hajeri/procurement-management-service).

## Tech Stack

- **Angular 21**
- **Angular Material** (UI components)
- **TypeScript**
- **SCSS**
- **RxJS**
- **JWT Authentication**

## Features

- Login with JWT-based authentication
- Route guard — redirects unauthenticated users to login
- JWT interceptor — automatically attaches Bearer token to every API request
- **Dashboard** — live stats (vendors, orders, pending approvals) + recent orders table
- **Vendor Management** — list with search/filter/pagination, create, edit, delete, status control
- **Purchase Order Management** — list, create with line items, detail view with full approval workflow
- Order status flow: `DRAFT → SUBMITTED → APPROVED → ORDERED → RECEIVED`
- Role-based UI — approve/reject buttons shown based on order status
- Responsive layout with sidenav navigation and toolbar

## Project Structure

```
src/app/
├── core/
│   ├── models/         # TypeScript interfaces (auth, vendor, purchase-order)
│   ├── services/       # AuthService, VendorService, PurchaseOrderService
│   ├── guards/         # authGuard (route protection)
│   └── interceptors/   # jwtInterceptor (auto auth headers)
├── features/
│   ├── auth/login/     # Login page
│   ├── dashboard/      # Dashboard with stats
│   ├── vendors/        # Vendor list + form
│   └── purchase-orders/# Order list, form, detail
├── shared/
│   └── components/
│       └── layout/     # App shell (toolbar + sidenav)
└── environments/       # API URL config per environment
```

## Prerequisites

- Node.js 18+
- Angular CLI 21+
- [procurement-management-service](https://github.com/manjunath-hajeri/procurement-management-service) running on `http://localhost:8080`

## Getting Started

**1. Clone the repository:**
```bash
git clone https://github.com/manjunath-hajeri/procurement-management-ui.git
cd procurement-management-ui
```

**2. Install dependencies:**
```bash
npm install
```

**3. Configure the API URL** (optional — default is `http://localhost:8080/api/v1`):

Edit `src/environments/environment.ts`:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1'
};
```

**4. Start the development server:**
```bash
ng serve
```

Open your browser at `http://localhost:4200`

## Build for Production

```bash
ng build
```

Output will be in the `dist/` directory.

## Backend

This frontend requires the Spring Boot backend to be running.
See: [procurement-management-service](https://github.com/manjunath-hajeri/procurement-management-service)

## Author

**Manjunath Hajeri** — Lead Software Engineer  
[LinkedIn](https://linkedin.com/in/manjunath-hajeri-9985a392) | hajerimanjunath1991@gmail.com
