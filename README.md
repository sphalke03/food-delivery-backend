# food-delivery-backend
food-delivery-backend/
├── docker-compose.yml
├── restaurant-user-service/
│   ├── Dockerfile
│   └── src/...
├── user-service/
│   ├── Dockerfile
│   └── src/...
├── delivery-agent-service/
│   ├── Dockerfile
│   └── src/...
├── *.postman_collection.json


# 🍔 Food Delivery Backend (Microservices Architecture)

A scalable backend built with Node.js and Express, using 3 microservices:
- `restaurant-user-service`
- `user-service`
- `delivery-agent-service`

Each service runs independently and communicates via REST APIs. Docker Compose is used to containerize and orchestrate all services.

---

## 🧩 Microservices

| Service                | Port  | Description                          |
|------------------------|-------|--------------------------------------|
| restaurant-user-service | 3001  | Handles restaurant listings & ratings |
| user-service           | 3002  | Manages user registration & auth     |
| delivery-agent-service | 3003  | Assigns orders to delivery agents    |

---

## 🐳 Docker Compose Setup

### 📦 Build and Run

```bash
docker-compose up --build
