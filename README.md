
# Full Stack Application - Run Instructions

This project contains two parts:
1. **Backend**: A Node.js API that serves server time and Prometheus metrics.
2. **Frontend**: A React-based single-page application that displays data from the backend.

Follow the steps below to set up and run the project.

---

## Prerequisites

1. Install **Node.js** (LTS version recommended): [Download here](https://nodejs.org/)
2. Ensure **npm** (Node Package Manager) is installed (comes with Node.js).
3. Install **Git**: [Download here](https://git-scm.com/)

---

## Setup Instructions

### Clone the Repository

1. Open your terminal and run the following commands:
   ```bash
   git clone https://github.com/Abenaesha/cnx-test.git
   cd cnx-test
   ```

---

## Backend Setup

The backend is located in the `backend` directory.

### Step 1: Install Dependencies
Navigate to the `backend` folder and install the required dependencies:
```bash
cd backend
npm install
```

### Step 2: Environment Configuration
Create a `.env` file in the `backend` directory with the following content:
```plaintext
PORT=3000
AUTH_TOKEN=mysecrettoken
```

### Step 3: Run the Backend

#### Development Mode
Run the backend in development mode:
```bash
npm run dev
```

The backend server will run at:
```
http://localhost:3000
```

#### Production Mode
1. Build the backend for production:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

The backend server will run at:
```
http://localhost:3000
```

### API Endpoints

#### **GET /time**
- Returns the current server time in epoch seconds.
- Requires the `Authorization` header with the value `mysecrettoken`.

Example response:
```json
{
  "epoch": 1732732045
}
```

#### **GET /metrics**
- Serves Prometheus-format metrics, including default metrics and custom metrics (e.g., HTTP request counts).

Example response:
```plaintext
# HELP custom_http_requests_total Total number of HTTP requests
# TYPE custom_http_requests_total counter
custom_http_requests_total{method="GET",route="/metrics",status="200"} 10
```

---

## Frontend Setup

The frontend is located in the `frontend` directory.

### Step 1: Install Dependencies
Navigate to the `frontend` folder and install the required dependencies:
```bash
cd ../frontend
npm install
```

### Step 3: Run the Frontend

#### Development Mode
Run the frontend in development mode:
```bash
npm start
```

The frontend will run at:
```
http://localhost:3000
```

#### Production Mode
1. Build the frontend for production:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

The production frontend will be available at:
```
http://localhost:3000
```

---

## Troubleshooting

### Common Issues

1. **Backend Port Already in Use**
   - If the backend port is in use, terminate the process using the port:
     ```bash
     lsof -i :3000
     kill -9 <PID>
     ```

2. **CORS Issues**
   - Ensure the backend CORS configuration allows requests from the frontend. Update the CORS settings in `backend/src/app.ts` if necessary.

3. **Dependencies Not Installed**
   - Run `npm install` in both the `backend` and `frontend` directories.

4. **Frontend Not Connecting to Backend**
   - Ensure the backend is running and that the `REACT_APP_BACKEND_URL` in the frontend `api.ts` file points to the correct backend URL.
