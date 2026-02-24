# Auth Microservice

## Description

The Auth Microservice handles user authentication for the project. It allows clients to:

- **Register** a new user with a username and password
- **Log in** an existing user and receive an authentication token
- Use the token with other microservices (e.g., CRUD service) for authenticated requests

The service uses HTTP and JSON for all communication. It runs on **port 4000** and stores users in memory. No database is required.

---

## How to REQUEST Data from the Microservice

All requests must use `Content-Type: application/json`.

### Register a New User

- **Method:** POST
- **URL:** `http://localhost:4000/register`
- **Headers:** `Content-Type: application/json`
- **Body:** `{ "username": string, "password": string }`

**Example Request (JavaScript fetch):**

```javascript
fetch("http://localhost:4000/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "mike", password: "1234" })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### Log In

- **Method:** POST
- **URL:** `http://localhost:4000/login`
- **Headers:** `Content-Type: application/json`
- **Body:** `{ "username": string, "password": string }`

**Example Request (JavaScript fetch):**

```javascript
fetch("http://localhost:4000/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "mike", password: "1234" })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## How to RECEIVE Data from the Microservice

### Register Response

**Success (HTTP 201):**

```json
{
  "message": "User registered successfully"
}
```

**Failure (HTTP 400) – Username already exists:**

```json
{
  "message": "Username already exists"
}
```

**Failure (HTTP 400) – Missing fields:**

```json
{
  "message": "Username and password are required"
}
```

### Login Response

**Success (HTTP 200):**

```json
{
  "message": "Login successful",
  "token": "mike-token"
}
```

The token format is `{username}-token`. Store this token and send it in the `Authorization` header when calling other microservices (e.g., the CRUD service).

**Failure (HTTP 401):**

```json
{
  "message": "Invalid username or password"
}
```

## Setup

1. Install dependencies: `npm install`
2. Run the service: `npm start`
3. Service runs at `http://localhost:4000`
