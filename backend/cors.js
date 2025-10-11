// config/corsOptions.js

const allowedOrigins = [
  "https://mb-react-web-admin.vercel.app",
  /^https:\/\/mb-react-web-admin.*\.vercel\.app$/,
  "http://localhost:5173", // local frontend
  'http://localhost:5174'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow REST tools or server-to-server calls (no origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies and auth headers
  optionsSuccessStatus: 200,
};

export default corsOptions;
