import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

// ── Security ───────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(mongoSanitize());
app.use(compression());

// ── CORS ────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://ai-agentix.com',
  'https://www.ai-agentix.com',
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('CORS blocked'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.options('*', cors());

// ── Rate Limiting ───────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 200,
  message: { success: false, error: { message: 'Too many requests, please slow down.' } },
  standardHeaders: true, legacyHeaders: false,
});
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, max: 3,
  message: { success: false, error: { message: 'Too many contact submissions. Try again in 1 hour.' } },
});
app.use('/api/', globalLimiter);

// ── Body Parsing ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Logging ──────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// ── Request ID ───────────────────────────────────────────────
app.use((req, _res, next) => {
  req.id = `req_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
  next();
});

// ── ROUTES ───────────────────────────────────────────────────
import postRoutes       from './routes/posts.js';
import caseStudyRoutes  from './routes/caseStudies.js';
import serviceRoutes    from './routes/services.js';
import clientRoutes     from './routes/clients.js';
import resourceRoutes   from './routes/resources.js';
import teamRoutes       from './routes/team.js';
import awardRoutes      from './routes/awards.js';
import authRoutes       from './routes/auth.js';
import uploadRoutes     from './routes/upload.js';
import newsletterRoutes from './routes/newsletter.js';
import contactRoutes    from './routes/contact.js';

app.use('/api/v1/posts',         postRoutes);
app.use('/api/v1/case-studies',  caseStudyRoutes);
app.use('/api/v1/services',      serviceRoutes);
app.use('/api/v1/clients',       clientRoutes);
app.use('/api/v1/resources',     resourceRoutes);
app.use('/api/v1/team',          teamRoutes);
app.use('/api/v1/awards',        awardRoutes);
app.use('/api/v1/auth',          authRoutes);
app.use('/api/v1/upload',        uploadRoutes);
app.use('/api/v1/newsletter',    newsletterRoutes);
app.use('/api/v1/contact',       contactLimiter, contactRoutes);

// ── Health ────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({
  status: 'ok',
  timestamp: new Date().toISOString(),
  env: process.env.NODE_ENV,
  db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
}));

// ── 404 ───────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({
  success: false,
  error: { code: 'NOT_FOUND', message: 'Route not found' }
}));

// ── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, _next) => {
  const statusCode = err.statusCode || err.status || 500;
  console.error(`[${req.id}] ${err.message}`, err.stack);
  res.status(statusCode).json({
    success: false,
    error: {
      code:    err.code || 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production' && statusCode === 500
        ? 'Something went wrong' : err.message,
    },
  });
});

// ── DB + Server Start ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅  MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀  Server running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
    console.log(`🌐  Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  });
})
.catch(err => {
  console.error('❌  MongoDB connection error:', err.message);
  process.exit(1);
});

export default app;
