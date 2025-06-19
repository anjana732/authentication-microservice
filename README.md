# 🔐 Authentication Microservice

This is a robust and secure **Authentication Microservice** built with **Node.js**, **Express**, **MongoDB**, and **JWT**. It provides a modular and scalable foundation for user authentication using **access and refresh tokens**, with full support for user registration and login workflows.

---

## 📦 Features

- 🔑 **JWT-based Authentication** (Access & Refresh Tokens)
- 🔒 **Password Hashing** with Bcrypt
- 📁 Modular Architecture (Routes, Controllers, Services, Models)
- 🧾 Token Revocation & Expiry Handling
- 🛡️ Secure Token Secrets via Environment Variables
- 🧠 Logging with Winston
- 🌐 CORS-enabled for cross-origin support
- 🔌 MongoDB with Mongoose

---

## 🚀 Technologies Used

| Tech          | Description                    |
|---------------|--------------------------------|
| Node.js       | JavaScript runtime             |
| Express.js    | Web framework                  |
| MongoDB       | NoSQL database                 |
| Mongoose      | ODM for MongoDB                |
| JWT           | Token-based authentication     |
| bcryptjs      | Password hashing               |
| dotenv        | Environment variable handling  |
| winston       | Logging system                 |

---

## 📁 Project Structure

```bash
authentication-microservice/
│
├── src/
│   ├── config/               # DB config
│   │   └── db.js
│   ├── controllers/          # Route handlers
│   ├── models/               # Mongoose models (User, RefreshToken)
│   ├── routes/               # Express routes
│   ├── services/             # Business logic
│   ├── utils/                # Token generation, logger
│   ├── app.js                # Express app setup
│   └── server.js             # Entry point
│
├── .env                      # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/anjana732/authentication-microservice.git
```
### Navigate into the project directory

```bash
cd authentication-microservice
```

### Install dependencies

```bash
npm install
```

### Copy and configure environment variables
```bash
cp .env.example .env

```
## ▶️ Running the App

### Start the server
```bash
npm start
```

## 🛠️ API Endpoints

**Base URL:** `http://localhost:3000/api/auth`

| Method | Endpoint  | Description         |
|--------|-----------|---------------------|
| POST   | `/signup` | Register a new user |
| POST   | `/login`  | Authenticate a user |

## ✅ Signup Request Body

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
## ✅ Login Request Body

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}

```

## 🔐 Token Storage & Security

- **Access Tokens** expire in **15 minutes** (configurable via `.env`).
- **Refresh Tokens** are stored in the database with:
  - Expiry date
  - Revocation status
- Tokens are generated using **JWT** and **crypto**.

## 📃 Logging

- All key actions (signup, login, errors) are logged using **Winston**.
- Customize or extend logging in `src/utils/logger.js`.

## ✨ Future Improvements

- 🔁 Token Refresh Endpoint  
- 🚪 Logout & Token Revocation  
- 🛡️ Rate Limiting  
- 🔐 2FA Support  
- 📧 Email Verification & Password Reset  

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to:

- Open issues  
- Submit pull requests  
- Suggest improvements  

## 📫 Contact

- **GitHub:** [@anjana732](https://github.com/anjana732)  
- **Email:** anjanasingh1257@gmail.com
