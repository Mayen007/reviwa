# 🗺️ Reviwa Development Roadmap

## 📋 **Overview**

Reviwa is a smart waste management platform transforming urban environmental sustainability through community engagement. This roadmap outlines the development journey from planning to a scalable, end-to-end environmental impact platform.

---

## 🎯 **Current Status: Phase 1 MVP Complete — Phase 2 Enhancement In Progress**

### **✅ Completed Phases**

- **Phase 1**: Requirements & Planning (100%) ✅
- **Phase 2**: System Design & Architecture (100%) ✅
- **Phase 3**: Backend Infrastructure (100%) ✅
- **Phase 4**: Frontend Development (100%) ✅
- **Phase 5**: Testing & Deployment (100%) ✅

---

### **🎉 Phase 1 MVP — COMPLETED**

**✅ Production Deployment:**

- [x] Live application: https://reviwa.netlify.app/
- [x] MongoDB Atlas production database with 2dsphere geospatial indexing
- [x] Cloudinary image storage & CDN integration
- [x] Netlify (frontend) + Render (backend) deployment
- [x] Environment variables configured across staging & production
- [x] SSL/HTTPS enabled & CORS configuration
- [x] Sentry error monitoring & performance tracing (@sentry/react & @sentry/node)

**✅ Complete Feature Set (MVP):**

- [x] User authentication & JWT authorization with role-based access (user/admin)
- [x] Waste reporting with multi-image upload (up to 5 images, client-side auto-compression)
- [x] Browser-based geolocation tracking
- [x] Interactive Leaflet map with color-coded markers, popup previews, and marker clustering
- [x] User dashboard with statistics and eco-points tracking
- [x] Eco-points reward system (10 per report, 20 for verification, 50 for resolution)
- [x] Community leaderboard (admins excluded from rankings)
- [x] Admin dashboard with comprehensive controls & system metrics
- [x] Report management with status workflow (`pending` → `verified` → `in-progress` → `resolved` → `rejected`)
- [x] Admin notes system for internal report tracking
- [x] User role management (promotion/demotion)
- [x] Advanced filtering (status, waste type, severity)
- [x] Mobile-responsive design with glassmorphism UI & Framer Motion animations
- [x] Profile pages with impact statistics
- [x] Image carousel with thumbnail navigation, keyboard controls, and full-screen lightbox viewer
- [x] Socket.io real-time infrastructure for live report status updates & admin notifications
- [x] Multi-city and pan-African seeding scripts

**✅ Recently Completed:**

- [x] **Email Notification System**
  - ✅ Welcome email on user registration with onboarding guidance
  - ✅ Report status update notifications (`verified`, `in-progress`, `resolved`, `rejected`)
  - ✅ Eco-points milestone celebrations (10, 50, 100, 250, 500 points)
  - ✅ Admin notifications for new reports requiring verification
  - ✅ Nodemailer + Resend integration with Gmail/SMTP support
  - ✅ Responsive HTML email templates with Reviwa branding
  - ✅ Environment-based configuration with graceful fallback to console logging
  - ✅ Non-blocking async email dispatching
- [x] **Landing Page & Navigation UX Optimization**
  - ✅ Enhanced hero section with direct exploratory "Explore Map" CTA for new visitors
  - ✅ Streamlined authentication entry points in header and action banners
  - ✅ Real-time impact counter integration

---

## 🚀 **Phase 2: Scale, Community & Operational Excellence**

### **🎯 Sprint 6: Security & Account Management (Immediate Priority)**

- [ ] **Password Reset & Recovery Flow**
  - [ ] Backend: `POST /api/auth/forgot-password` (crypto token generation + email dispatch)
  - [ ] Backend: `POST /api/auth/reset-password/:token` (token validation & secure password update)
  - [ ] Frontend: "Forgot Password" modal/page + "Reset Password" page
- [ ] **User Profile Enhancement**
  - [ ] Custom avatar image upload directly to Cloudinary
  - [ ] Edit profile information (display name, bio, notification preferences)
  - [ ] In-app change password tab
  - [ ] Account deletion / GDPR data export option
- [ ] **API Security Hardening**
  - [ ] `express-rate-limit` on auth endpoints (`/login`, `/register`, `/forgot-password`)
  - [ ] Helmet security headers configuration
  - [ ] Refresh token rotation / sliding session expiration

---

### **🎯 Sprint 7: Community Engagement & Social Proof**

- [ ] **Report Comments & Community Discussion**
  - [ ] `Comment.model.js` schema (`reportId`, `userId`, `content`, `createdAt`)
  - [ ] REST API endpoints (`GET /api/reports/:id/comments`, `POST`, `DELETE`)
  - [ ] Real-time comment broadcasting via Socket.io
  - [ ] Comment thread UI in `ReportDetail.jsx` with user avatars & timestamps
  - [ ] Admin comment moderation tools (delete/hide spam)
- [ ] **Community Verification & Upvoting**
  - [ ] "Confirm this site" upvoting button for nearby community members
  - [ ] Upvote counter to help admins prioritize severe/frequently confirmed sites
- [ ] **Badges & Gamification Milestones**
  - [ ] Visual achievement badges ("First Cleanup", "Eco Champion - 100 Points", "City Guardian")
  - [ ] Badge display on user profile and leaderboard entries
  - [ ] Milestone celebration popups on dashboard

---

### **🎯 Sprint 8: Operational Cleanup Loop & Municipal Workflows**

- [ ] **"Before & After" Resolution Proof**
  - [ ] Require resolution proof photo upload when status changes to `resolved`
  - [ ] Side-by-side "Before vs. After" comparison card on `ReportDetail.jsx`
  - [ ] Recognition for cleanup crew / resolving volunteer
- [ ] **Municipal / Partner Dispatch System**
  - [ ] Assignment of reports to specific municipal departments or partner NGOs
  - [ ] Automated email notification dispatch to assigned cleanup team
  - [ ] Cleanup crew status tracking
- [ ] **Data Export & Reporting for Cities**
  - [ ] Export reports to CSV with custom date & status filters
  - [ ] Printable PDF summary reports for municipal environmental departments
  - [ ] Open data API endpoint for city dashboard integrations

---

### **🎯 Sprint 9: Advanced Analytics & Mapping**

- [ ] **Waste Density Heatmap Layer**
  - [ ] Integrate `leaflet.heat` into `Map.jsx`
  - [ ] Heatmap intensity toggle (pollution density hotspots vs. individual pins)
  - [ ] City/neighborhood boundary filters
- [ ] **Interactive Analytics Dashboard**
  - [ ] Chart.js / Recharts integration in `Admin.jsx` & `Dashboard.jsx`
  - [ ] Waste type breakdown (plastic, hazardous, electronic, organic) pie charts
  - [ ] Report resolution velocity & trend line charts
  - [ ] Cleanest neighborhood rankings and municipal turnaround metrics

---

### **🎯 Sprint 10: Mobile Field Experience & PWA**

- [ ] **Progressive Web App (PWA)**
  - [ ] `manifest.json` configuration for "Add to Home Screen"
  - [ ] Service Worker setup for offline asset caching
  - [ ] Offline report drafting with IndexedDB storage & background auto-sync when online
- [ ] **Camera & EXIF Geolocation Extraction**
  - [ ] Extract latitude/longitude from uploaded photo EXIF metadata as fallback
  - [ ] In-app direct camera capture button for mobile browsers

---

### **🎯 Sprint 11: Testing, CI/CD & Production Hardening**

- [ ] **Automated CI/CD Pipeline**
  - [ ] GitHub Actions workflow (`.github/workflows/ci.yml`)
  - [ ] Automated linting, server Vitest suite, and client build checks on pull requests
- [ ] **End-to-End (E2E) Test Suite**
  - [ ] Playwright tests covering critical paths:
    - User registration → Login flow
    - Report submission with photo upload & geolocation
    - Admin verification → Status update → Eco-points allocation
- [ ] **Performance & Database Optimization**
  - [ ] Geospatial query optimization & compound index tuning
  - [ ] Image compression benchmark (< 500KB per photo)
  - [ ] Lighthouse performance score > 90 on mobile & desktop

---

## 🏗️ **Architecture & Tech Stack**

### **Frontend:**
- **Framework**: React 18.3.1 with Vite 6.0.1
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 3.4.14 + Custom Glassmorphism UI
- **Animations**: Framer Motion 11.11.17
- **Mapping**: Leaflet 1.9.4 + React Leaflet 4.2.1 + Marker Clustering
- **Icons**: Heroicons 2.2.0 + Lucide React
- **Real-time**: Socket.io-client 4.8.1
- **Monitoring**: Sentry React SDK

### **Backend:**
- **Runtime**: Node.js with Express 4.19.2 (ES Modules)
- **Database**: MongoDB 8.3.0 with Mongoose (Atlas Cloud + 2dsphere Geo-indexing)
- **Auth**: JWT (`jsonwebtoken`) + Password Hashing (`bcryptjs`)
- **File Storage**: Cloudinary SDK (Image CDN & transformations)
- **Email Service**: Nodemailer + Resend API with HTML templates
- **Real-time**: Socket.io 4.8.1
- **Validation**: `express-validator`
- **Testing**: Vitest + Supertest + MongoDB Memory Server

### **DevOps & Infrastructure:**
- **Frontend Hosting**: Netlify (Automated CI/CD deployments)
- **Backend Hosting**: Render (Continuous deployment)
- **Database**: MongoDB Atlas
- **Image CDN**: Cloudinary
- **Error Tracking**: Sentry

---

## 🌍 **Long-Term Strategic Vision (2026-2028)**

### **Year 1: Regional Expansion (2026)**
- Launch Phase 2 features (comments, heatmaps, before/after proof, password reset, PWA).
- Pilot programs in 3 East African cities (Kampala, Nairobi, Dar es Salaam).
- Partnerships with 3+ local environmental NGOs and municipal sanitation boards.
- Target: 10,000+ active registered users and 5,000+ verified cleanups.

### **Year 2: AI & Smart City Integration (2027)**
- AI-powered waste classification (computer vision model identifying waste types from photos).
- IoT smart bin sensor integration.
- Dedicated Municipal Portal for city council dispatch teams.
- Native mobile applications (React Native for iOS & Android).

### **Year 3: Global Ecosystem Leadership (2028)**
- Open-source civic environmental standard.
- Carbon offset tracking & certified SDG 11 impact reporting.
- Corporate CSR sponsorship marketplace for community cleanups.

---

## 📞 **Get Involved & Contact**

- **Project Lead**: Mayen Akech
- **Repository**: [https://github.com/Mayen007/reviwa](https://github.com/Mayen007/reviwa)
- **Live Demo**: [https://reviwa.netlify.app](https://reviwa.netlify.app)
- **Contact**: reviwa.project@gmail.com

---

> _"Every line of code brings us closer to cleaner, more sustainable cities through environmental action."_ — **The Reviwa Team**
