# Reviwa V2 - Clean Architecture

This is a complete rebuild of the Reviwa waste management platform with improved code quality, maintainability, and consistent design.

## 🎯 What's New in V2

### Architecture Improvements

- **Clean MVC Structure**: Proper separation of models, controllers, and routes
- **ES6 Modules**: Modern JavaScript throughout (import/export)
- **Consistent Error Handling**: Centralized error middleware
- **Better Code Organization**: Logical folder structure

### Frontend

- **Modern React**: Hooks, Context API, functional components
- **Tailwind CSS**: Consistent, utility-first styling
- **Framer Motion**: Smooth animations
- **Clean Components**: Reusable, maintainable code
- **Responsive Design**: Mobile-first approach

### Backend

- **RESTful API**: Proper HTTP methods and status codes
- **JWT Authentication**: Secure token-based auth
- **Mongoose Models**: Clean schema definitions with validation
- **Geospatial Indexing**: Efficient location queries
- **Role-based Access**: Admin and user permissions

## 📁 Project Structure

```
reviwa/
├── server-v2/
│   ├── config/          # Database & third-party configs
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── server.js        # Entry point
│
└── client-v2/
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── context/     # React contexts
    │   ├── pages/       # Page components
    │   ├── App.jsx      # Main app
    │   └── main.jsx     # Entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- MongoDB running locally or connection string

### Server Setup

```bash
cd server-v2
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Client Setup

```bash
cd client-v2
npm install
npm run dev
```

## 🔑 Key Features

### Authentication

- JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes

### Reports

- Create waste reports with location
- Upload images (ready for Cloudinary)
- Filter by status, type, severity
- Real-time status updates
- Geolocation tracking

### Gamification

- Eco-points system
- Leaderboard
- Rewards for verified reports

### User Experience

- Clean, modern UI
- Smooth animations
- Mobile responsive
- Loading states
- Error handling

## 📊 API Endpoints

### Auth

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (protected)

### Reports

- `GET /api/reports` - Get all reports (with filters)
- `GET /api/reports/:id` - Get single report
- `POST /api/reports` - Create report (protected)
- `PATCH /api/reports/:id/status` - Update status (protected)
- `DELETE /api/reports/:id` - Delete report (protected)
- `GET /api/reports/stats/dashboard` - Get statistics

### Users

- `GET /api/users/:id` - Get user profile
- `PATCH /api/users/:id` - Update profile (protected)
- `GET /api/users/leaderboard` - Get top users

## 🎨 Design System

### Colors

- **Primary**: Green (#16a34a) - Environmental theme
- **Secondary**: Blue - Info and actions
- **Status Colors**: Yellow (pending), Green (resolved), Red (rejected)

### Components

- Buttons: Primary, Secondary, Outline, Danger
- Cards: White background with hover effects
- Badges: Status indicators
- Forms: Clean inputs with validation

## 🔐 Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/reviwa-v2
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

## 📝 Next Steps

1. Set up MongoDB connection
2. Configure Cloudinary for image uploads
3. Test authentication flow
4. Create sample reports
5. Deploy to production

## 🤝 Contributing

This is a cleaner, more maintainable codebase. Follow these principles:

- Write clean, readable code
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused
- Test before committing

## 📄 License

MIT
