# Reviwa Development Setup Guide

## Quick Start

```bash
# 1. Clone and setup
git clone https://github.com/Mayen007/reviwa.git
cd reviwa

# 2. Install root dependencies
npm install

# 3. Setup client (React + Vite)
npm create vite@latest client -- --template react
cd client
npm install
npm install axios react-router-dom @headlessui/react @heroicons/react

# 4. Add Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 5. Setup server
cd ../
mkdir server && cd server
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv express-validator cloudinary multer
npm install -D nodemon

# 6. Copy environment variables
cp ../.env.example .env
cp ../.env.example ../client/.env

# 7. Start development
cd ../
npm run dev
```

## Next Steps After Setup

1. **Configure Tailwind** in `client/tailwind.config.js`
2. **Setup MongoDB Atlas** database
3. **Configure Cloudinary** for image uploads
4. **Create basic authentication routes**
5. **Build the first report form component**

## Development Workflow

- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:5000`
- Both start simultaneously with `npm run dev`

## Project Structure After Setup

```
reviwa/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.jsx
│   ├── package.json
│   └── .env
├── server/                 # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env
├── Planning Documents/
├── package.json
└── README.md
```
