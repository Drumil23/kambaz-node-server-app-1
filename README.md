# Kambaz Node Server App

A RESTful API server for the Kambaz learning management system, built with Node.js and Express for CS 5610.

## Features

- **User Authentication**: Session-based authentication with signup, signin, and profile management
- **Course Management**: CRUD operations for courses with enrollment support
- **Assignments**: Full assignment lifecycle management (create, read, update, delete)
- **Modules**: Course module organization and management
- **CORS Support**: Configured for cross-origin requests with credentials
- **Session Management**: Secure session handling with express-session

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Drumil23/kambaz-node-server-app.git
cd kambaz-node-server-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=4000
CLIENT_URL=http://localhost:3000
SESSION_SECRET=your-secure-secret-key
SERVER_ENV=development
```

## Running the Server

### Development
```bash
npm start
```

The server will start on `http://localhost:4000` (or the PORT specified in `.env`).

## API Endpoints

### Users
- `POST /api/users/signup` - Create a new user account
- `POST /api/users/signin` - Sign in with credentials
- `POST /api/users/signout` - Sign out current user
- `POST /api/users/profile` - Get current user profile
- `PUT /api/users/:userId` - Update user information
- `GET /api/users/current/courses` - Get courses for current user

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a new course
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

### Assignments
- `GET /api/assignments` - Get all assignments (optional `?course=<courseId>`)
- `GET /api/assignments/:assignmentId` - Get assignment by ID
- `POST /api/assignments` - Create a new assignment
- `PUT /api/assignments/:assignmentId` - Update an assignment
- `DELETE /api/assignments/:assignmentId` - Delete an assignment

### Modules
- `GET /api/courses/:cid/modules` - Get modules for a course
- `POST /api/courses/:cid/modules` - Create a new module
- `PUT /api/modules/:id` - Update a module
- `DELETE /api/modules/:id` - Delete a module

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `4000` | No |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` | Yes (Production) |
| `SESSION_SECRET` | Secret for session encryption | `kambaz` | Yes (Production) |
| `SERVER_ENV` | Environment mode | `development` | No |
| `SERVER_URL` | Server URL for cookie domain | - | No |

### Production Configuration

For production deployment (e.g., Render), set:
```env
CLIENT_URL=https://your-frontend-url.vercel.app
SESSION_SECRET=your-secure-random-string
SERVER_ENV=production
```

## Security Features

- **CORS**: Configured to accept requests from specified origins with credentials
- **Session Management**: Secure session cookies with `sameSite` and `secure` flags in production
- **Environment Variables**: Sensitive data stored in environment variables

## Dependencies

- **express**: ^5.1.0 - Web framework
- **cors**: ^2.8.5 - CORS middleware
- **express-session**: ^1.18.2 - Session management
- **dotenv**: ^17.2.3 - Environment variable management
- **uuid**: ^9.0.1 - UUID generation for assignments

## Important Notes

### In-Memory Database
This server uses an **in-memory database** for development purposes:
- Data is stored in JavaScript objects
- **All data is lost when the server restarts**
- Users created on one server instance won't exist on another
- Not suitable for production use without implementing persistent storage

### Session Store
The server uses `express-session` with the default MemoryStore:
- Sessions are stored in memory
- **Sessions are lost on server restart**
- For production, consider using a persistent session store (Redis, MongoDB, etc.)

## Troubleshooting

### CORS Errors
If you encounter CORS errors:
1. Verify `CLIENT_URL` environment variable includes `https://` protocol
2. Ensure the URL matches exactly (no trailing slashes or paths)
3. Check that the client is using `withCredentials: true` in requests

### 401 Unauthorized
- In-memory database means users created on local server won't exist on deployed server
- Sign up on the same instance where you're trying to sign in

### Session Issues
- Ensure `SESSION_SECRET` is set in production
- Verify `SERVER_ENV` is set to `production` for deployed environments
- Check that cookies are enabled in your browser

## Author

**Drumil Kotecha**

## License

ISC License

Copyright (c) 2025 Drumil Kotecha

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

## Related Projects

- [Kambaz Next.js Frontend](https://github.com/Drumil23/kambaz-next-js) - The React/Next.js frontend for this API
