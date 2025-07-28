# Uber Clone Backend

This is the backend for an Uber-like ride-sharing application, built with Node.js, Express, and MongoDB. It handles user and captain authentication, ride management, and integrates with Google Maps APIs for location and routing services.

## 🚀 Technologies Used

*   **Node.js**: JavaScript runtime
*   **Express.js**: Web application framework
*   **MongoDB**: NoSQL database (via Mongoose ODM)
*   **Mongoose**: MongoDB object data modeling for Node.js
*   **bcrypt**: For password hashing
*   **jsonwebtoken**: For JWT-based authentication
*   **express-validator**: For request data validation
*   **axios**: Promise-based HTTP client for API calls (e.g., Google Maps)
*   **cookie-parser**: Middleware for parsing cookies
*   **cors**: Middleware for enabling Cross-Origin Resource Sharing
*   **Socket.IO**: For real-time, bidirectional communication
*   **dotenv**: For loading environment variables from a `.env` file

## ⚙️ Setup Instructions

1.  **Clone the repository:**
    \`\`\`bash
    git clone <repository-url>
    cd backend
    \`\`\`

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    \`\`\`

3.  **Create a `.env` file** in the root directory and add the following environment variables:

    \`\`\`env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/Uber
    JWT_SECRET=your_jwt_secret_key_here
    GOOGLE_MAPS_API=your_google_maps_api_key_here
    \`\`\`
    *   `PORT`: The port your server will run on.
    *   `MONGO_URI`: Your MongoDB connection string.
    *   `JWT_SECRET`: A strong, random string for signing JWTs.
    *   `GOOGLE_MAPS_API`: Your Google Maps Platform API key (ensure Geocoding API, Places API, and Distance Matrix API are enabled and billing is set up).

4.  **Start the server:**
    \`\`\`bash
    npm start
    \`\`\`
    The server will run on `http://localhost:5000` (or your specified PORT).

## 🗺️ API Endpoints

All API endpoints are prefixed with `/users`, `/captains`, `/maps`, or `/rides`.

### **User Routes (`/users`)**

Handles user authentication and profile management.

#### 1. **Register User**
*   **Endpoint:** `/users/register`
*   **Method:** `POST`
*   **Description:** Registers a new user account.
*   **Authentication:** None
*   **Request Body:**
    \`\`\`json
    {
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "password": "string"
    }
    \`\`\`
    *   `fullname.firstname`: Required, min 3 characters.
    *   `fullname.lastname`: Optional.
    *   `email`: Required, valid email format.
    *   `password`: Required, min 6 characters.
*   **Success Response (201 Created):**
    \`\`\`json
    {
      "token": "string (JWT)",
      "user": {
        "_id": "string",
        "fullname": { "firstname": "string", "lastname": "string" },
        "email": "string",
        "soketId": "string | null",
        "createdAt": "Date",
        "updatedAt": "Date",
        "__v": 0
      }
    }
    \`\`\`
*   **Error Response (400 Bad Request):**
    \`\`\`json
    { "message": "User already exists" }
    \`\`\`
    or
    \`\`\`json
    { "errors": [{ "msg": "Validation error message", "param": "field", "location": "body" }] }
    \`\`\`

#### 2. **Login User**
*   **Endpoint:** `/users/login`
*   **Method:** `POST`
*   **Description:** Authenticates a user and returns a JWT token.
*   **Authentication:** None
*   **Request Body:**
    \`\`\`json
    {
      "email": "string",
      "password": "string"
    }
    \`\`\`
    *   `email`: Required, valid email format.
    *   `password`: Required, min 6 characters.
*   **Success Response (200 OK):**
    \`\`\`json
    {
      "token": "string (JWT)",
      "user": {
        "_id": "string",
        "fullname": { "firstname": "string", "lastname": "string" },
        "email": "string",
        "soketId": "string | null",
        "createdAt": "Date",
        "updatedAt": "Date",
        "__v": 0
      }
    }
    \`\`\`
*   **Error Response (401 Unauthorized):**
    \`\`\`json
    { "message": "Invalid credentials" }
    \`\`\`
    or
    \`\`\`json
    { "errors": [{ "msg": "Validation error message", "param": "field", "location": "body" }] }
    \`\`\`

#### 3. **Get User Profile**
*   **Endpoint:** `/users/profile`
*   **Method:** `GET`
*   **Description:** Retrieves the authenticated user's profile information.
*   **Authentication:** Required (User JWT in `Authorization` header or `token` cookie)
*   **Success Response (200 OK):**
    \`\`\`json
    {
      "user": {
        "_id": "string",
        "fullname": { "firstname": "string", "lastname": "string" },
        "email": "string",
        "soketId": "string | null",
        "createdAt": "Date",
        "updatedAt": "Date",
        "__v": 0
      }
    }
    \`\`\`
*   **Error Response (401 Unauthorized):**
    \`\`\`json
    { "msg": "Unauthorized" }
    \`\`\`

#### 4. **Logout User**
*   **Endpoint:** `/users/logout`
*   **Method:** `GET`
*   **Description:** Logs out the user by blacklisting their JWT token and clearing the cookie.
*   **Authentication:** Required (User JWT in `Authorization` header or `token` cookie)
*   **Success Response (200 OK):**
    \`\`\`json
    { "message": "Logged out successfully" }
    \`\`\`
*   **Error Response (401 Unauthorized):**
    \`\`\`json
    { "msg": "Unauthorized" }
    \`\`\`

### **Captain Routes (`/captains`)**

Handles captain authentication and profile management.

#### 1. **Register Captain**
*   **Endpoint:** `/captains/register`
*   **Method:** `POST`
*   **Description:** Registers a new captain account with vehicle details.
*   **Authentication:** None
*   **Request Body:**
    \`\`\`json
    {
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "password": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
      }
    }
    \`\`\`
    *   `fullname.firstname`: Required, min 3 characters.
    *   `fullname.lastname`: Optional, min 3 characters.
    *   `email`: Required, valid email format.
    *   `password`: Required, min 6 characters.
    *   `vehicle.color`: Required, min 3 characters.
    *   `vehicle.plate`: Required, min 3 characters.
    *   `vehicle.capacity`: Required, number, min 2.
    *   `vehicle.vehicleType`: Required, enum of "CAR", "BIKE", "AUTO".
*   **Success Response (201 Created):**
    \`\`\`json
    {
      "token": "string (JWT)",
      "captain": {
        "_id": "string",
        "fullname": { "firstname": "string", "lastname": "string" },
        "email": "string",
        "soketId": "string | null",
        "status": "string",
        "vehicle": {
          "color": "string",
          "plate": "string",
          "capacity": "number",
          "vehicleType": "string"
        },
        "location": { "latitude": "number", "longitude": "number" },
        "__v": 0
      }
    }
    \`\`\`
*   **Error Response (400 Bad Request):**
    \`\`\`json
    { "message": "Captain already exists" }
    \`\`\`
    or
    \`\`\`json
    { "errors": [{ "msg": "Validation error message", "param": "field", "location": "body" }] }
    \`\`\`

#### 2. **Login Captain**
*   **Endpoint:** `/captains/login`
*   **Method:** `POST`
*   **Description:** Authenticates a captain and returns a JWT token.
*   **Authentication:** None
*   **Request Body:**
    \`\`\`json
    {
      "email": "string",
      "password": "string"
    }
    \`\`\`
    *   `email`: Required, valid email format.
    *   `password`: Required, min 6 characters.
*   **Success Response (200 OK):**
    \`\`\`json
    {
      "token": "string (JWT)",
      "captain": {
        "_id": "string",
        "fullname": { "firstname": "string", "lastname": "string" },
        "email": "string",
        "soketId": "string | null",
        "status": "string",
        "vehicle": {
          "color": "string",
          "plate": "string",
          "capacity": "number",
          "vehicleType": "string"
        },
        "location": { "latitude": "number", "longitude": "number" },
        "__v": 0
      }
    }
    \`\`\`
*   **Error Response (400 Bad Request):**
    \`\`\`json
    { "message": "Invalid email or password" }
    \`\`\`
    or
    \`\`\`json
    { "errors": [{ "msg": "Validation error message", "param": "field", "location": "body" }] }
    \`\`\`

#### 3. **Get Captain Profile**
*   **Endpoint:** `/captains/profile`
*   **Method:** `GET`
*   **Description:** Retrieves the authenticated captain's profile information.
*   **Authentication:** Required (Captain JWT in `Authorization` header or `token` cookie)
*   **Success Response (200 OK):**
    \`\`\`json
    {
      "captain": {
        "_id": "string",
        "fullname": { "firstname": "string", "lastname": "string" },
        "email": "string",
        "soketId": "string | null",
        "status": "string",
        "vehicle": {
          "color": "string",
          "plate": "string",
          "capacity": "number",
          "vehicleType": "string"
        },
        "location": { "latitude": "number", "longitude": "number" },
        "__v": 0
      }
    }
    \`\`\`
*   **Error Response (401 Unauthorized):**
    \`\`\`json
    { "msg": "Unauthorized" }
    \`\`\`

#### 4. **Logout Captain**
*   **Endpoint:** `/captains/logout`
*   **Method:** `GET`
*   **Description:** Logs out the captain by blacklisting their JWT token and clearing the cookie.
*   **Authentication:** Required (Captain JWT in `Authorization` header or `token` cookie)
*   **Success Response (200 OK):**
    \`\`\`json
    { "message": "Logged out successfully" }
    \`\`\`
*   **Error Response (401 Unauthorized):**
    \`\`\`json
    { "msg": "Unauthorized" }
    \`\`\`

### **Maps Routes (`/maps`)**

Provides Google Maps related services.

#### 1. **Get Coordinates from Address**
*   **Endpoint:** `/maps/get-coordinates`
*   **Method:** `GET`
*   **Description:** Converts a given address string into latitude and longitude coordinates.
*   **Authentication:** Required (User JWT)
*   **Query Parameters:**
    *   `address`: Required, string, min 3 characters.
*   **Success Response (200 OK):**
    \`\`\`json
    {
      "ltd": "number (latitude)",
      "lng": "number (longitude)"
    }
    \`\`\`
*   **Error Response (400 Bad Request):**
    \`\`\`json
    { "errors": [{ "msg": "Validation error message", "param": "address", "location": "query" }] }
    \`\`\`
*   **Error Response (404 Not Found):**
    \`\`\`json
    { "message": "Coordinates not found" }
    \`\`\`
*   **Error Response (500 Internal Server Error):**
    \`\`\`json
    { "message": "Geocoding failed: <status> - <error_message>" }
    \`\`\`

#### 2. **Get Distance and Time between Locations**
*   **Endpoint:** `/maps/get-distance-time`
*   **Method:** `GET`
*   **Description:** Calculates the distance and estimated travel time between an origin and a destination.
*   **Authentication:** Required (User JWT)
*   **Query Parameters:**
    *   `origin`: Required, string, min 3 characters.
    *   `destination`: Required, string, min 3 characters.
*   **Success Response (200 OK):**
    \`\`\`json
    {
      "distance": {
        "text": "string (e.g., \"10.5 km\")",
        "value": "number (meters)"
      },
      "duration": {
        "text": "string (e.g., \"15 mins\")",
        "value": "number (seconds)"
      },
      "status": "string (e.g., \"OK\")"
    }
    \`\`\`
*   **Error Response (400 Bad Request):**
    \`\`\`json
    { "errors": [{ "msg": "Validation error message", "param": "field", "location": "query" }] }
    \`\`\`
*   **Error Response (500 Internal Server Error):**
    \`\`\`json
    { "message": "Internal server error" }
    \`\`\`
    or
    \`\`\`json
    { "message": "Distance matrix failed: <status> - <error_message>" }
    \`\`\`

#### 3. **Get Autocomplete Suggestions**
*   **Endpoint:** `/maps/get-suggestions`
*   **Method:** `GET`
*   **Description:** Provides autocomplete suggestions for an address input.
*   **Authentication:** Required (User JWT)
*   **Query Parameters:**
    *   `input`: Required, string, min 3 characters.
*   **Success Response (200 OK):**
    \`\`\`json
    [
      "string (suggestion 1)",
      "string (suggestion 2)",
      // ...
    ]
    \`\`\`
*   **Error Response (400 Bad Request):**
    \`\`\`json
    { "errors": [{ "msg": "Validation error message", "param": "input", "location": "query" }] }
    \`\`\`
*   **Error Response (500 Internal Server Error):**
    \`\`\`json
    { "message": "Internal server error" }
    \`\`\`
    or
    \`\`\`json
    { "message": "Autocomplete failed: <status> - <error_message>" }
    \`\`\`

### **Rides Routes (`/rides`)**

Manages ride creation, confirmation, and status updates.

#### 1. **Create Ride**
*   **Endpoint:** `/rides/create`
*   **Method:** `POST`
*   **Description:** Creates a new ride request for a user.
*   **Authentication:** Required (User JWT)
*   **Request Body:**
    \`\`\`json
    {
      "pickup": "string",
      "destination": "string",
      "vehicleType": "string"
    }
    \`\`\`
    *   `pickup`: Required, string, min 3 characters.
    *   `destination`: Required, string, min 3 characters.
    *   `vehicleType`: Required, enum of "auto", "car", "moto".
*   **Success Response (201 Created):**
    \`\`\`json
    {
      "_id": "string",
      "user": "string (user ID)",
      "pickup": "string",
      "destination": "string",
      "fare": "number",
      "status": "string (e.g., \"pending\")",
      "otp": "string (6-digit OTP, only returned here for debugging, normally hidden)",
      "__v": 0
    }
    \`\`\`
*   **Error Response (400 Bad Request):**
    \`\`\`json
    { "errors": [{ "msg": "Validation error message", "param": "field", "location": "body" }] }
    \`\`\`
*   **Error Response (500 Internal Server Error):**
    \`\`\`json
    { "message": "Error message" }
    \`\`\`

#### 2. **Get Ride Fare**
*   **Endpoint:** `/rides/get-fare`
*   **Method:** `GET`
*   **Description:** Calculates and returns the estimated fare for different vehicle types between two locations.
*   **Authentication:** Required (User JWT)
*   **Query Parameters:**
    *   `pickup`: Required, string, min 3 characters.
    *   `destination`: Required, string, min 3 characters.
*   **Success Response (200 OK):**
    \`\`\`json
    {
      "auto": "number (fare for auto)",
      "car": "number (fare for car)",
      "moto": "number (fare for moto)"
    }
    \`\`\`
*   **Error Response (400 Bad Request):**
    \`\`\`json
    { "errors": [{ "msg": "Validation error message", "param": "field", "location": "query" }] }
    \`\`\`
*   **Error Response (500 Internal Server Error):**
    \`\`\`json
    { "message": "Error message" }
    \`\`\`

#### 3. **Confirm Ride**
*   **Endpoint:** `/rides/confirm`
*   **Method:** `POST`
*   **Description:** A captain confirms a ride request.
*   **Authentication:** Required (Captain JWT)
*   **Request Body:**
    \`\`\`json
    {
      "rideId": "string (MongoDB ObjectId)"
    }
    \`\`\`
    *   `rideId`: Required, valid MongoDB ObjectId.
*   **Success Response (200 OK):**
    \`\`\`json
    {
      "_id": "string",
      "user": { /* User object */ },
      "captain": { /* Captain object */ },
      "pickup": "string",
      "destination": "string",
      "fare": "number",
      "status": "accepted",
      "otp": "string (6-digit OTP)",
      "__v": 0
    }
    \`\`\`
*   **Error Response (400 Bad Request):**
    \`\`\`json
    { "errors": [{ "msg": "Validation error message", "param": "rideId", "location": "body" }] }
    \`\`\`
*   **Error Response (500 Internal Server Error):**
    \`\`\`json
    { "message": "Error message" }
    \`\`\`

#### 4. **Start Ride**
*   **Endpoint:** `/rides/start-ride`
*   **Method:** `GET`
*   **Description:** A captain starts an accepted ride using an OTP.
*   **Authentication:** Required (Captain JWT)
*   **Query Parameters:**
    *   `rideId`: Required, valid MongoDB ObjectId.
    *   `otp`: Required, string, 6 digits.
*   **Success Response (200 OK):**
    \`\`\`json
    {
      "_id": "string",
      "user": { /* User object */ },
      "captain": { /* Captain object */ },
      "pickup": "string",
      "destination": "string",
      "fare": "number",
      "status": "ongoing",
      "otp": "string (6-digit OTP)",
      "__v": 0
    }
    \`\`\`
*   **Error Response (400 Bad Request):**
    \`\`\`json
    { "errors": [{ "msg": "Validation error message", "param": "field", "location": "query" }] }
    \`\`\`
*   **Error Response (500 Internal Server Error):**
    \`\`\`json
    { "message": "Error message" }
    \`\`\`

#### 5. **End Ride**
*   **Endpoint:** `/rides/end-ride`
*   **Method:** `POST`
*   **Description:** A captain ends an ongoing ride.
*   **Authentication:** Required (Captain JWT)
*   **Request Body:**
    \`\`\`json
    {
      "rideId": "string (MongoDB ObjectId)"
    }
    \`\`\`
    *   `rideId`: Required, valid MongoDB ObjectId.
*   **Success Response (200 OK):**
    \`\`\`json
    {
      "_id": "string",
      "user": { /* User object */ },
      "captain": { /* Captain object */ },
      "pickup": "string",
      "destination": "string",
      "fare": "number",
      "status": "completed",
      "otp": "string (6-digit OTP)",
      "__v": 0
    }
    \`\`\`
*   **Error Response (400 Bad Request):**
    \`\`\`json
    { "errors": [{ "msg": "Validation error message", "param": "rideId", "location": "body" }] }
    \`\`\`
*   **Error Response (500 Internal Server Error):**
    \`\`\`json
    { "message": "Error message" }
    \`\`\`

## ⚡️ Socket.IO Events

The backend uses Socket.IO for real-time communication between users and captains.

### **Client-to-Server Events**

*   **`join`**
    *   **Description:** A user or captain joins their respective room to receive real-time updates.
    *   **Data:**
        
