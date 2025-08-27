# Task Management Application

A full-stack task management application with user authentication built with React, Express, TypeScript, and PostgreSQL.

## Features

- **User Authentication**: Register, login, and logout with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Secure**: Users can only access their own tasks
- **Form Validation**: Frontend and backend validation with Zod
- **Responsive Design**: Built with TailwindCSS
- **Testing**: Comprehensive test coverage for both frontend and backend

## Technology Stack

### Frontend
- React (Vite)
- TypeScript
- TailwindCSS
- Redux Toolkit
- React Hook Form + Zod
- Axios
- Jest + React Testing Library

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- Jest + Supertest

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Database Setup**
   - Create a PostgreSQL database
   - Update the database connection in `backend/.env`:
     ```
     DATABASE_URL="postgresql://username:password@localhost:5432/taskmanager"
     JWT_SECRET="your-secret-key"
     ```

4. **Run Database Migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

### Development Mode

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on http://localhost:3001

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on http://localhost:5173

### Production Build

1. **Build Backend**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Test Coverage
```bash
# Backend coverage
cd backend
npm run test:coverage

# Frontend coverage
cd frontend
npm run test:coverage
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "number",
    "username": "string"
  }
}
```

#### POST /api/auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "number",
    "username": "string"
  }
}
```

### Task Endpoints (Require Authentication)

All task endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

#### GET /api/tasks
Get all tasks for the authenticated user.

**Response:**
```json
[
  {
    "id": "number",
    "title": "string",
    "description": "string | null",
    "status": "pending" | "completed",
    "userId": "number",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

#### POST /api/tasks
Create a new task.

**Request Body:**
```json
{
  "title": "string",
  "description": "string | null",
  "status": "pending" | "completed"
}
```

**Response:**
```json
{
  "id": "number",
  "title": "string",
  "description": "string | null",
  "status": "pending" | "completed",
  "userId": "number",
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### PUT /api/tasks/:id
Update an existing task.

**Request Body:**
```json
{
  "title": "string",
  "description": "string | null",
  "status": "pending" | "completed"
}
```

**Response:**
```json
{
  "id": "number",
  "title": "string",
  "description": "string | null",
  "status": "pending" | "completed",
  "userId": "number",
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### DELETE /api/tasks/:id
Delete a task.

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## Database Schema

### Users Table
- id: Int (Primary Key)
- username: String (Unique)
- password: String (Hashed)
- createdAt: DateTime
- updatedAt: DateTime

### Tasks Table
- id: Int (Primary Key)
- title: String
- description: String? (Optional)
- status: String (Enum: 'pending', 'completed')
- userId: Int (Foreign Key to Users)
- createdAt: DateTime
- updatedAt: DateTime

## Project Structure

```
task-management-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── tests/
│   │   └── index.ts
│   ├── prisma/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── store/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── __tests__/
│   │   └── main.tsx
│   ├── public/
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request
