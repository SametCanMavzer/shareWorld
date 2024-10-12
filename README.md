# ShareWorld REST API

ShareWorld REST API is a backend service developed for a social media sharing platform. It is built using Node.js, Express, and MongoDB.

## Features

- User authentication and authorization (using JWT)
- Create, read, update, and delete operations for posts
- Image upload support
- Post listing with pagination
- Comprehensive error handling
- Unit and integration tests

## Getting Started

These instructions will guide you to set up the project on your local machine for development and testing purposes.

### Prerequisites

The following software needs to be installed to run the project:

- Node.js (v14 or higher)
- npm (usually comes with Node.js)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/SametCanMavzer/shareworld-rest-api.git
   ```

2. Navigate to the project directory:
   ```
   cd shareworld-rest-api
   ```

3. Install the required packages:
   ```
   npm install
   ```

4. Create a `.env` file and set the necessary environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=8080
   JWT_SECRET=your_jwt_secret
   ```

5. Start the application:
   ```
   npm start
   ```

The application will run on `http://localhost:8080` by default.

## API Endpoints

- `PUT /auth/signup`: Register a new user
- `POST /auth/login`: User login
- `GET /feed/posts`: List all posts
- `POST /feed/post`: Create a new post
- `GET /feed/post/:postId`: Get a specific post
- `PUT /feed/post/:postId`: Update a post
- `DELETE /feed/post/:postId`: Delete a post

## Tests and Development

To run tests:
```
npm test
```

To run in development mode:
```
npm start
```

The development mode command uses `nodemon` to start the application and automatically restart on code changes.

