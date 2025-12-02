import express from 'express';
import mongoose from "mongoose";

import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import session from "express-session"; 
import "dotenv/config"; 
const app = express()

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.CLIENT_URL,
            "http://localhost:3000"
        ];
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

// Body parsing middleware
app.use(express.json());

// Session configuration (single definition)
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

// If not in development, adjust cookie settings for cross-site cookies
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  // Derive a domain without protocol or trailing slash if SERVER_URL provided
  let cookieDomain;
  if (process.env.SERVER_URL) {
    cookieDomain = process.env.SERVER_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: cookieDomain,
  };
}

// Session middleware after CORS
app.use(session(sessionOptions));

UserRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);
Lab5(app);
// Root route: helpful message for browser requests to '/'
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Kambaz Node Server is running. Use /api endpoints.' });
});
ModuleRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

