# Reviwa V2 Server

Clean, modern backend for the Reviwa waste management platform.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (image uploads)
- Gmail API (email notifications)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file:

```bash
cp .env.example .env
```

3. Update `.env` with your credentials

**Email Setup (Gmail API):**

- Create project in Google Cloud Console
- Enable Gmail API
- Create OAuth2 Credentials (Client ID & Secret)
- Generate Refresh Token via OAuth Playground
- Add to `.env`: `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`

4. Start server:

```bash
npm run dev
```

Server runs on http://localhost:5000

## API Documentation

See main README.md for full API documentation.
