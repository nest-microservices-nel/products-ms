# 📦 Products Microservice - NestJS

This is the **Products** microservice built with [NestJS](https://nestjs.com/).  
It is part of a microservices architecture and handles product management operations including creation, retrieval, updates, and validation.

---

> ⚠️ **Important Notes:**  
> - This microservice communicates exclusively using **NATS** messaging patterns.
> - Uses a **local SQLite database** for data persistence.
> - **Security Limitation**: Product creation route does not work when running with production Docker images due to security restrictions. It works perfectly in local development mode.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Running with Docker](#-running-with-docker)
- [NATS Message Patterns](#-nats-message-patterns)
- [Additional Notes](#-additional-notes)
- [License](#-license)

---

## 🚀 Features

- Complete CRUD operations for products
- Pagination support for product listings
- Product validation by IDs
- Soft delete functionality (products marked as unavailable)
- NATS-based communication with other microservices
- Local SQLite database with Prisma ORM
- Built for secure and scalable architecture

---

## 🛠️ Tech Stack

| Technology | Description                                |
|------------|--------------------------------------------|
| NestJS     | Backend framework for Node.js              |
| TypeScript | Main language of the project               |
| Prisma     | Database ORM and query builder             |
| SQLite     | Local database for development             |
| NATS       | Message broker for microservice messaging  |
| Class Validator | DTO validation and transformation |

---

## 📁 Project Structure

```
src/
├── products/            # Core product logic and CRUD operations
├── common/              # Shared utilities, DTOs, and pagination
├── config/              # Environment config and validation
├── main.ts              # Entry point of the application
prisma/
├── schema.prisma        # Database schema definition
```

---

## 📦 Installation

To run the microservice locally:

1. **Clone the repository**

```bash
git clone https://github.com/nest-microservices-nel/products-ms.git
cd products-ms
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
DATABASE_URL=file:./dev.db
NATS_SERVERS=nats://nats-server:4222
```

4. **Run database migrations**

```bash
npx prisma migrate dev
```

5. **Run in development mode**

```bash
npm run start:dev
```

---

## 🔐 Environment Variables

| Variable        | Description                                     |
|----------------|-------------------------------------------------|
| `PORT`         | Port where the service will run                 |
| `DATABASE_URL` | SQLite database connection string               |
| `NATS_SERVERS` | NATS server URL for microservice communication  |

---

## 🗄️ Database Setup

This microservice uses a **local SQLite database** managed by Prisma:

1. **Generate Prisma client**
```bash
npx prisma generate
```

2. **Run migrations**
```bash
npx prisma migrate dev
```

3. **View database (optional)**
```bash
npx prisma studio
```

The database file will be created at `./dev.db` as specified in the `DATABASE_URL`.

---

## 🐳 Running with Docker

### Step 1: Build the Docker image

```bash
docker build -t products-ms .
```

### Step 2: Run the container

```bash
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e DATABASE_URL=file:./dev.db \
  -e NATS_SERVERS=nats://nats-server:4222 \
  products-ms
```

> ⚠️ **Production Limitation**: When using production Docker images, the product creation functionality is disabled for security reasons. All read operations work normally.

---

## 📡 NATS Message Patterns

These are the **NATS message patterns** handled by the microservice:

| Pattern                    | Description                           |
|----------------------------|---------------------------------------|
| `create_product`          | Creates a new product                 |
| `find_all_products`       | Retrieves paginated list of products |
| `find_one_product`        | Retrieves a single product by ID     |
| `update_product`          | Updates an existing product          |
| `delete_product`          | Soft deletes a product (marks as unavailable) |
| `validate_products_ids`   | Validates multiple product IDs       |

---

## 📌 Additional Notes

- **Local Database**: This service uses SQLite for local development and testing.
- **Soft Deletes**: Products are not permanently deleted; they are marked as `available: false`.
- **Validation**: All DTOs are validated using class-validator decorators.
- **Pagination**: The `find_all_products` endpoint supports pagination with `page` and `limit` parameters.
- **NATS Only**: This microservice communicates exclusively through NATS message patterns.
- **Security**: Product creation is disabled in production Docker environments for security reasons.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Author

**Nelson G.**  
[GitHub](https://github.com/nelsin-06)  
[LinkedIn](https://www.linkedin.com/in/nelson-gallego-tec-dev)
