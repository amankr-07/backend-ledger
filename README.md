# Backend Ledger

A Node.js + Express + MongoDB backend for a simple ledger system with user authentication, account management, and money transfers backed by ledger entries.

## Features

- JWT-based authentication (register, login, logout)
- Protected account APIs for creating and listing user accounts
- Double-entry style transaction handling with ledger records
- Idempotency support for transaction creation
- Optional email notifications for registration and transactions

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Cookies (`cookie-parser`)
- Email (`nodemailer`)

## Project Structure

```txt
backend-ledger/
  server.js
  src/
    app.js
    config/
    controllers/
    middlewares/
    models/
    routes/
    services/
```

## Prerequisites

- Node.js 18+ (recommended)
- MongoDB database (local or cloud)

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment variables file:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

   Or run in normal mode:

   ```bash
   npm start
   ```

Server default URL: `http://localhost:3000`

## Environment Variables

The repository includes `.env.example` with:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10
```

For email notifications, add the following as well:

```env
EMAIL_USER=your_email@gmail.com
CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret
REFRESH_TOKEN=your_google_oauth_refresh_token
```

## API Endpoints

Base URL: `http://localhost:3000/api`

### Auth

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user (token is blacklisted)

### Accounts (Protected)

- `POST /accounts` - Create a new account for the logged-in user
- `GET /accounts` - Get all accounts for the logged-in user
- `GET /accounts/balance/:accountId` - Get account balance

### Transactions

- `POST /transactions` (Protected) - Create a transaction
- `POST /transactions/system/initial-funds` (System user only) - Seed initial funds

## Authentication

Use token from login/register response:

- As cookie: `token`
- Or as bearer token header:

```http
Authorization: Bearer <jwt-token>
```

## Notes

- Transactions require: `fromAccount`, `toAccount`, `amount`, and `idempotencyKey`.
- Transaction flow writes debit/credit ledger entries and marks transaction status.
- This project currently has no automated tests configured (`npm test` is a placeholder).
