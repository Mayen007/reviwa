# Reviwa V2 Server

Clean, modern backend for the Reviwa waste management platform.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (image uploads)
- Resend (email notifications)

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

**Email Setup (Resend):**

- Sign up at [Resend.com](https://resend.com)
- Get your API Key
- Add to `.env`: `RESEND_API_KEY=re_123...`
- Set `EMAIL_FROM=onboarding@resend.dev` (for testing) or your verified domain.

4. Start server:

```bash
npm run dev
```

Server runs on http://localhost:5000

## API Documentation

See main README.md for full API documentation.
