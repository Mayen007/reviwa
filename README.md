# ♻️ Reviwa – Smart Waste Management & Clean City Platform

**Reviwa** is a MERN-stack web application designed to make urban waste management smarter, more transparent, and community-driven.
The platform empowers citizens to **report waste sites**, **track cleanup progress**, and **earn eco-points** for verified contributions — creating cleaner, safer, and more sustainable cities.

---

## 🌍 SDG Alignment

**Primary Goal:**
🟢 **SDG 11 – Sustainable Cities and Communities**

> Make cities inclusive, safe, resilient, and sustainable.

**Supporting Goals:**

- **SDG 12 – Responsible Consumption and Production**
- **SDG 13 – Climate Action**

---

## 💡 Problem Statement

Urban areas across developing nations face rising challenges in **waste collection, disposal, and community awareness**.
Overflowing dumpsites, illegal waste burning, and uncoordinated cleanup efforts threaten both the environment and public health.

**Reviwa** bridges the gap between **citizens, city councils, and environmental NGOs** — using technology to enable real-time reporting, monitoring, and collaboration.

---

## 🚀 Project Scope (MVP)

The MVP focuses on waste reporting and community engagement.

### Core Features

- 🗑️ **Report Waste Sites:** Upload photos (up to 5 images with auto-compression), add description, and mark location
- 📍 **Geolocation Tracking:** Browser-based GPS to identify exact dump sites
- 📊 **User Dashboard:** Track your reports, eco-points, and community impact
- 🌍 **Interactive Map:** Visualize waste sites with Leaflet mapping
- � **Eco-Points System:** Earn points for verified cleanup actions (10 points per report)
- 👤 **User Profiles:** Dynamic avatars with initials, stats tracking
- 🔐 **Secure Authentication:** JWT-based auth with protected routes
- 📱 **Mobile Responsive:** Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Real-time Updates:** Dynamic data fetching with loading states
- 🎨 **Modern UI/UX:** Glassmorphism effects, smooth animations, emerald color scheme

---

## 🧠 Technology Stack

| Layer               | Technology                                  |
| ------------------- | ------------------------------------------- |
| **Frontend**        | React 18.3.1, Vite 6.0.1, Tailwind CSS 3.4  |
| **Backend**         | Node.js, Express 4.19.2, ES6 Modules        |
| **Database**        | MongoDB 8.3.0 (Atlas)                       |
| **Auth**            | JWT (bcryptjs, jsonwebtoken)                |
| **File Storage**    | Cloudinary (image uploads & optimization)   |
| **Maps**            | Leaflet, React Leaflet 4.2.1                |
| **UI/Animations**   | Framer Motion 11.11, Heroicons 2.2          |
| **API Client**      | Axios 1.7.7                                 |
| **Hosting**         | Vercel (client) + Render / Railway (server) |
| **Version Control** | Git & GitHub                                |

---

## 📈 Market Analysis

- **Global Smart Waste Management Market:** Expected to reach **$5.5 billion by 2027** (Allied Market Research, 2024).
- **African Urban Waste Projection:** Expected to **triple by 2050** (World Bank).
- **Opportunity:** No dominant citizen-centered waste tracking platform currently exists in most African cities.

### Target Users

- Urban residents (citizens, youth, environmental activists)
- Municipal waste management authorities
- Environmental NGOs and CSR partners

---

## 💰 Monetization Model

| Revenue Stream             | Description                                                   |
| -------------------------- | ------------------------------------------------------------- |
| **Municipal Partnerships** | Subscription model for cities to use Reviwa dashboards.       |
| **CSR Sponsorships**       | Corporate partners fund cleanup drives & user rewards.        |
| **Data Analytics Access**  | Insights sold to NGOs & policy institutions.                  |
| **Gamified Rewards**       | Points redeemable via partner brands (eco products, airtime). |

---

## 🧬 Repository Structure

```
reviwa/
├── client/              # React 18.3 frontend (Vite + Tailwind)
│   ├── public/          # Static assets, logos, favicon
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Page components (Dashboard, Reports, etc.)
│       ├── context/     # React Context (AuthContext)
│       ├── hooks/       # Custom React hooks (useGeolocation)
│       └── App.jsx      # Main application component
├── server/              # Express 4.19 backend (ES6 modules)
│   ├── config/          # Database, Cloudinary, environment config
│   ├── controllers/     # Business logic (auth, reports, users)
│   ├── models/          # Mongoose schemas (User, Report)
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, upload, error handling
│   └── server.js        # Express server entry point
├── docs/                # Documentation, planning, and diagrams
├── .env.example         # Environment variables template
├── package.json         # Root package configuration
├── README.md            # This file
└── LICENSE              # MIT License
```

├── .env.example
├── package.json
├── README.md
└── LICENSE

````

---

## � Key Technical Features

### Backend Architecture
- **Clean MVC Pattern:** Separation of concerns with controllers, models, and routes
- **ES6 Modules:** Modern JavaScript with import/export syntax
- **JWT Authentication:** Secure token-based auth with bcrypt password hashing
- **Mongoose ODM:** MongoDB object modeling with schema validation
- **Geospatial Indexing:** 2dsphere indexes for location-based queries
- **Multer Middleware:** File upload handling with memory storage
- **Cloudinary Integration:** Cloud-based image storage with automatic optimization
- **Error Handling:** Centralized error middleware with detailed messages
- **CORS Configuration:** Cross-origin resource sharing for API security

### Frontend Architecture
- **React 18.3:** Modern React with Hooks (useState, useEffect, useContext)
- **Vite Build Tool:** Fast development server with HMR (Hot Module Replacement)
- **React Router 6:** Client-side routing with protected routes
- **Context API:** Global state management (AuthContext for user authentication)
- **Tailwind CSS:** Utility-first CSS with custom emerald color scheme
- **Framer Motion:** Smooth animations and transitions
- **Axios:** HTTP client with interceptors for API calls
- **Leaflet Maps:** Interactive mapping with markers and popups
- **Image Compression:** Client-side image optimization before upload (Canvas API)
- **Responsive Design:** Mobile-first approach with breakpoints

### Data Models
- **User Model:** name, email, password (hashed), avatar, ecoPoints, reportsCount
- **Report Model:** title, description, location (GeoJSON Point), images[], wasteType, severity, status, reportedBy (ref: User)

### Security Features
- Password hashing with bcryptjs (10 salt rounds)
- JWT tokens with expiration (30 days)
- Protected API routes with auth middleware
- Input validation with express-validator
- CORS configured for specific origins
- Environment variables for sensitive data
- File type validation (images only)
- File size limits (10MB per file)

---

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Reports
- `GET /api/reports` - Get all reports (with filters)
- `GET /api/reports/:id` - Get single report
- `POST /api/reports` - Create report (protected, multipart/form-data)
- `PATCH /api/reports/:id/status` - Update report status (protected)
- `DELETE /api/reports/:id` - Delete report (protected)
- `GET /api/reports/user/:userId` - Get user's reports

### Users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/:id/initials` - Get user initials for avatar

---

## �🚀 Implementation Status

**Current Phase:** MVP Development (V2 Architecture Complete)

### MVP Development Progress (Q4 2025)

- [x] ✅ **Phase 1**: Requirements & Planning Complete
- [x] ✅ **Phase 2**: System Design & Architecture Complete
- [x] ✅ **Phase 3**: Core Implementation Complete
  - [x] Clean V2 architecture with ES6 modules
  - [x] JWT authentication system (register, login, protected routes)
  - [x] User management (profiles, eco-points, reports count)
  - [x] Waste reporting API with geolocation
  - [x] Image upload system (Cloudinary + Multer)
  - [x] Client-side image compression (auto-resize for large files)
  - [x] Interactive dashboard with statistics
  - [x] Map integration (Leaflet/React Leaflet)
  - [x] Modern UI with Tailwind CSS + Framer Motion animations
  - [x] Mobile-responsive design with hamburger menu
  - [x] Form validation & error handling
- [ ] 🔄 **Phase 4**: Testing & Deployment (In Progress)
  - [x] Local development environment working
  - [x] MongoDB Atlas connection configured
  - [x] Cloudinary integration tested
  - [ ] End-to-end testing
  - [ ] Production deployment
  - [ ] Domain & SSL setup

## 🦯 Roadmap (MVP → Expansion)

**Phase 1 – MVP (Q4 2025) ✅:**
- ✅ Waste site reporting with image uploads
- ✅ User authentication & authorization
- ✅ Geolocation-based reporting
- ✅ Eco-points reward system
- ✅ Interactive dashboard with statistics
- ✅ Real-time map visualization

**Phase 2 – Enhanced Features (Q1 2026):**
- 🔄 Admin dashboard for report verification
- 🔄 Report status tracking (pending → verified → resolved)
- 🔄 User roles (citizen, verifier, admin)
- 🔄 Report comments & community engagement
- 🔄 Email notifications for report updates
- 🔄 Advanced filtering & search

**Phase 3 – Smart Expansion (Q2 2026):**
- ⏳ Mobile app version (React Native)
- ⏳ AI waste classification using image recognition
- ⏳ IoT bin integration for smart monitoring
- ⏳ Analytics dashboard for municipalities
- ⏳ Gamification features (leaderboards, badges)
- ⏳ Multi-language support

## 🛠️ Quick Start for Developers

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

### Installation

```bash
# Clone the repository
git clone https://github.com/Mayen007/reviwa.git
cd reviwa

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
````

### Environment Setup

**Server (.env in `/server` directory):**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reviwa
JWT_SECRET=your_super_secure_jwt_secret_here
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Client (.env in `/client` directory):**

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Reviwa
```

### Run Development Servers

```bash
# Terminal 1 - Start backend server
cd server
npm start

# Terminal 2 - Start frontend dev server
cd client
npm run dev
```

Visit `http://localhost:5173` to see the application.

See [SETUP.md](SETUP.md) for detailed setup instructions.

---

## 👥 Contributors

| Name                   | Role                                 |
| ---------------------- | ------------------------------------ |
| **Mayen Akech**        | Project Lead / Full Stack Developer  |
| Open for Contributions | UI/UX, Backend, and Data Integration |

---

## 💚 License

This project is licensed under the **MIT License**.
Feel free to fork, improve, and contribute responsibly.

---

## 💬 Contact & Collaboration

Interested in collaborating, funding, or integrating Reviwa into your city program?

📧 **[reviwa.project@gmail.com](mailto:reviwa.project@gmail.com)**
🌐 Coming soon: [reviwa.io](#)

> _"Cleaner cities start with informed citizens." – Reviwa Team_
