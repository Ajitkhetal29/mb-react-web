
const allowedOrigins = [
  "https://mb-react-web-admin.vercel.app", 
  "http://localhost:3000", 
  "http://localhost:5173",
  "https://mb-react-web-frontend.vercel.app",
  "http://localhost:5174"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;