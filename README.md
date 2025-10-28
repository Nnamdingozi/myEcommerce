# FamilyShop E-Commerce Platform

![FamilyShop Homepage Screenshot](link-to-your-screenshot.png)

A complete, full-stack e-commerce application built from the ground up with a modern, type-safe technology stack. This project showcases a complete migration from a legacy stack (Sequelize) to a professional, production-grade architecture using Prisma, Next.js, and Docker, deployed on Vercel and Render.

**Live Demo:**
*   **Frontend (Vercel):** [https://my-ecommerce-three-steel.vercel.app/](https://my-ecommerce-three-steel.vercel.app/)
*   **Backend API (Render):** [https://myecommerce-la62.onrender.com/api/products](https://myecommerce-la62.onrender.com/api/products)

---

## 🚀 Key Accomplishments & Architectural Decisions

This project represents a significant architectural refactor and demonstrates proficiency in:

*   **Full-Stack Migration:** Successfully migrated the entire backend ORM from **Sequelize to Prisma**, including a complete database schema overhaul and data model refactoring.
*   **Modern Frontend Development:** Built a responsive, server-component-driven frontend with **Next.js 14 (App Router)**, using React Context for global state management.
*   **Professional UI/UX:** Implemented a beautiful and consistent design system using **shadcn/ui**, **Tailwind CSS**, and **Framer Motion** for animations.
*   **Secure Authentication:** Architected a robust, secure authentication system using **Passport.js** with a **JWT strategy**, storing session tokens in secure, **HttpOnly cookies** to prevent XSS attacks.
*   **Database Security:** Secured the PostgreSQL database (hosted on **Supabase**) at the database level using **Row Level Security (RLS)** policies, ensuring users can only access their own data.
*   **Production Deployment & DevOps:**
    *   Containerized the backend application using a multi-stage **Dockerfile** for optimized, secure production builds.
    *   Deployed the backend service to **Render** and the frontend to **Vercel**, demonstrating a modern, decoupled deployment strategy.
    *   Implemented a production-grade logging system on the backend using **Pino**.
*   **Third-Party API Integration:** Integrated the **Paystack API** for a complete, end-to-end payment and order verification flow.

---

## 🛠️ Technology Stack

*   **Frontend:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Axios, Sonner (Toasts)
*   **Backend:** Node.js, Express.js, TypeScript, Prisma, Passport.js, Pino (Logger)
*   **Database:** PostgreSQL (hosted on Supabase)
*   **Deployment:** Vercel (Frontend), Render (Backend), Docker

---

## 📋 Getting Started Locally

### Prerequisites
- Node.js v22+
- Docker Desktop
- A Supabase account

### Backend Setup
1.  Navigate to the `backend` directory: `cd backend`
2.  Install dependencies: `npm install`
3.  Create a `.env` file and populate it with your Supabase `DATABASE_URL`, `JWT_SECRET`, etc.
4.  Run migrations: `npx prisma migrate dev`
5.  Start the development server: `npm run dev`

### Frontend Setup
1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Create a `.env.local` file and set `NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api`.
4.  Start the development server: `npm run dev`
