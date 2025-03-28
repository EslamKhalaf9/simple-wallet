# 💰 Simple Wallet API

A simple backend API for a fintech wallet application that supports account creation, balance inquiries, deposits, and withdrawals.

Built using **Express**, **Prisma**, and **PostgreSQL**, and containerized with **Docker**.

---

## 🚀 Features

- ✅ Create an account
- ✅ Deposit funds
- ✅ Withdraw funds
- ✅ Check account balance
- 🔒 Atomic transactions to ensure data consistency
- 🧪 Input validation with `zod`
- 🐳 Dockerized for easy setup

---

## 📚 Tech Stack

- [Express](https://expressjs.com/) - Backend framework
- [Prisma](https://www.prisma.io/) - ORM for PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) - Relational DB
- [Zod](https://zod.dev/) - Schema validation
- [Docker](https://www.docker.com/) - Containerization

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/EslamKhalaf9/simple-wallet.git
cd simple-wallet
```

### 2. Setup Environment Variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/simple_wallet
```

> You can customize `docker-compose.yml` if you want to change DB credentials.

### 3. Run with Docker

```bash
docker-compose up --build
```

This will start the PostgreSQL database and the Express API.

---

## 🧪 API Endpoints

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| POST   | `/auth/login`            | Login               |
| GET    | `/auth/me`               | Get current user    |
| POST   | `/account`               | Create new account  |
| GET    | `/account/balance`       | Get account balance |
| POST   | `/transactions/deposit`  | Deposit funds       |
| POST   | `/transactions/withdraw` | Withdraw funds      |

> All endpoints accept and return JSON. Input is validated using `zod`.

---

## ✅ Acceptance Criteria

- [x] Opening an account returns a valid Account ID.
- [x] Depositing funds returns a valid Transaction ID.
- [x] Withdrawing funds returns a valid Transaction ID.
- [x] Checking balance returns the correct amount.

---

## 🧪 Testing (To Be Added)

> Unit and integration tests will be included using `Jest`.

To run tests:

```bash
npm run test
```

---

## 🧠 Design Decisions

- Prisma was chosen for its speed, developer productivity and great development experience.
- Zod is used for strict runtime validation.
- Transactions ensure accurate balance updates without race conditions.
- The system is designed with separation of concerns between modules for better maintainability using clean architecture.

---

## ⚠️ Known Limitations

- No Authorization is implemented.
- No users table, I assume that accounts are the actual users, so one account per user.

---

## 📌 To Improve

- Add Swagger/OpenAPI documentation
- Add rate limiting
- Add full test coverage
- Add account transaction history with pagination

---

## 🧑‍💻 Author

[Eslam Khalaf](https://github.com/EslamKhalaf9)

---

## 📄 License

This project is licensed under the MIT License.
