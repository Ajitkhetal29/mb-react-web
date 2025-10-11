// config/corsOptions.js

const allowedOrigins = [
  "https://mb-react-web-admin.vercel.app", // production frontend (Vercel)
  "http://localhost:3000", // local frontend for development
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies, auth headers, etc.
  optionsSuccessStatus: 200, // some legacy browsers choke on 204
};

export default corsOptions;
