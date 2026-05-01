# AI Agentix Full-Stack Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete AI Agentix website — a pixel-perfect mirror of addepto.com's layout — using React 18 + Vite + Tailwind + Framer Motion (frontend) and Node.js + Express + MongoDB (backend).

**Architecture:** Monorepo with `frontend/` and `backend/` directories. Frontend is a Vite SPA with React Router, React Query for data fetching, and Framer Motion for animations. Backend is Express + Mongoose with JWT auth, Nodemailer, and Cloudinary image hosting.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Framer Motion 11, React Router 6, React Query 5, Axios, Node.js, Express 4, Mongoose 8, JWT, Nodemailer, Cloudinary, Docker

---

## File Map

### Frontend Files
- `frontend/package.json` — dependencies
- `frontend/vite.config.js` — Vite config with proxy to backend
- `frontend/tailwind.config.js` — design system tokens
- `frontend/postcss.config.js` — PostCSS config
- `frontend/index.html` — HTML entry with Google Fonts
- `frontend/src/main.jsx` — React entry point
- `frontend/src/App.jsx` — Router + layout wrapper
- `frontend/src/index.css` — Global CSS + design tokens + utility classes
- `frontend/src/lib/motion.js` — Framer Motion variants
- `frontend/src/lib/api.js` — Axios instance + API calls
- `frontend/src/hooks/useScrollReveal.js` — IntersectionObserver hook
- `frontend/src/components/layout/AnnouncementBanner.jsx`
- `frontend/src/components/layout/Navbar.jsx`
- `frontend/src/components/layout/Footer.jsx`
- `frontend/src/components/ui/RevealWrapper.jsx`
- `frontend/src/components/sections/HeroSection.jsx`
- `frontend/src/components/sections/ServiceHighlights.jsx`
- `frontend/src/components/sections/ClientLogos.jsx`
- `frontend/src/components/sections/CoreCapabilities.jsx`
- `frontend/src/components/sections/CustomerStories.jsx`
- `frontend/src/components/sections/IndustryExpertise.jsx`
- `frontend/src/components/sections/ProductSpotlight.jsx`
- `frontend/src/components/sections/CooperationModels.jsx`
- `frontend/src/components/sections/CompanyInsights.jsx`
- `frontend/src/components/sections/AwardsSection.jsx`
- `frontend/src/components/sections/TechDeepDive.jsx`
- `frontend/src/components/sections/ContactCTA.jsx`
- `frontend/src/pages/Home.jsx`
- `frontend/src/pages/Contact.jsx`
- `frontend/src/pages/CaseStudies.jsx`
- `frontend/src/pages/Blog.jsx`
- `frontend/src/pages/About.jsx`
- `frontend/src/pages/NotFound.jsx`
- `frontend/.env.local`

### Backend Files
- `backend/package.json`
- `backend/server.js`
- `backend/.env`
- `backend/models/index.js` — all Mongoose models exported
- `backend/middleware/auth.js` — JWT protect middleware
- `backend/middleware/errorHandler.js`
- `backend/routes/posts.js`
- `backend/routes/caseStudies.js`
- `backend/routes/services.js`
- `backend/routes/clients.js`
- `backend/routes/resources.js`
- `backend/routes/contact.js`
- `backend/routes/team.js`
- `backend/routes/awards.js`
- `backend/routes/auth.js`
- `backend/routes/upload.js`
- `backend/routes/newsletter.js`
- `backend/scripts/seed.js`

### Root Files
- `docker-compose.yml`

---

## Task 1: Clear Existing Project & Create Structure

**Files:**
- Delete: all files in `D:/AI AGENTIX/` except `files/` and `docs/`
- Create: `frontend/`, `backend/`, `backend/models/`, `backend/routes/`, `backend/middleware/`, `backend/scripts/`, `frontend/src/`, `frontend/src/components/layout/`, `frontend/src/components/sections/`, `frontend/src/components/ui/`, `frontend/src/pages/`, `frontend/src/lib/`, `frontend/src/hooks/`

- [ ] **Step 1: Remove existing project files**

```bash
cd "D:/AI AGENTIX"
rm -f index.html vite.config.ts postcss.config.mjs package.json package-lock.json README.md ATTRIBUTIONS.md PHASE_3_COMPLETE_SUMMARY.md
rm -rf src dist node_modules guidelines
```

- [ ] **Step 2: Create all directories**

```bash
mkdir -p frontend/public/assets/clients
mkdir -p frontend/src/components/layout
mkdir -p frontend/src/components/sections
mkdir -p frontend/src/components/ui
mkdir -p frontend/src/pages
mkdir -p frontend/src/lib
mkdir -p frontend/src/hooks
mkdir -p backend/models
mkdir -p backend/routes
mkdir -p backend/middleware
mkdir -p backend/scripts
```

---

## Task 2: Backend Package & Config Files

**Files:**
- Create: `backend/package.json`, `backend/.env`, `docker-compose.yml`

- [ ] **Step 1: Write backend/package.json**

```json
{
  "name": "ai-agentix-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node scripts/seed.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "mongoose": "^8.5.1",
    "dotenv": "^16.4.5",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-rate-limit": "^7.3.1",
    "express-validator": "^7.1.0",
    "multer": "^1.4.5-lts.1",
    "cloudinary": "^2.4.0",
    "nodemailer": "^6.9.14",
    "slugify": "^1.6.6",
    "compression": "^1.7.4",
    "express-mongo-sanitize": "^2.2.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

- [ ] **Step 2: Write backend/.env template**

```bash
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://admin:password123@localhost:27017/ai-agentix?authSource=admin
JWT_SECRET=ai-agentix-super-secret-jwt-key-change-in-production-32chars
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=aiagentix2025@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="AI Agentix <hello@ai-agentix.com>"
EMAIL_TO=aiagentix2025@gmail.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
ADMIN_EMAIL=admin@ai-agentix.com
ADMIN_PASSWORD=Change-Me-Now-123!
```

- [ ] **Step 3: Copy docker-compose.yml from files/**

Use the docker-compose.yml already provided in `files/` — copy it to the root.

---

## Task 3: Backend Models

**Files:**
- Create: `backend/models/index.js`

- [ ] **Step 1: Write backend/models/index.js**

This is the consolidated models file from `files/index.js`. Copy it exactly to `backend/models/index.js`.

---

## Task 4: Backend Middleware

**Files:**
- Create: `backend/middleware/auth.js`, `backend/middleware/errorHandler.js`

- [ ] **Step 1: Write backend/middleware/auth.js**

```javascript
import jwt from 'jsonwebtoken';
import { Admin } from '../models/index.js';

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;
  if (!token) return res.status(401).json({ success: false, error: { message: 'Not authorized' } });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select('-password');
    if (!req.admin) return res.status(401).json({ success: false, error: { message: 'Admin not found' } });
    next();
  } catch {
    res.status(401).json({ success: false, error: { message: 'Token invalid' } });
  }
};
```

- [ ] **Step 2: Write backend/middleware/errorHandler.js**

```javascript
export default (err, req, res, _next) => {
  const status = err.statusCode || err.status || 500;
  console.error(`[${req.id || 'req'}] ${err.message}`);
  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production' && status === 500
        ? 'Something went wrong' : err.message,
    },
  });
};
```

---

## Task 5: Backend Routes

**Files:**
- Create: all files in `backend/routes/`

- [ ] **Step 1: Write backend/routes/contact.js**

Copy exactly from `files/contact.js` to `backend/routes/contact.js`.

- [ ] **Step 2: Write backend/routes/posts.js**

```javascript
import { Router } from 'express';
import { Post } from '../models/index.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { page=1, limit=9, category, search } = req.query;
    const query = { status: 'published' };
    if (category) query.categories = category;
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
    ];
    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .sort({ publishedAt: -1 })
      .skip((+page-1)*+limit).limit(+limit)
      .select('-content');
    res.json({ success: true, data: posts, meta: { page:+page, limit:+limit, total, pages: Math.ceil(total/+limit) } });
  } catch(e) { next(e); }
});

router.get('/featured', async (_req, res, next) => {
  try {
    const posts = await Post.find({ status: 'published', featured: true })
      .sort({ publishedAt: -1 }).limit(5).select('-content');
    res.json({ success: true, data: posts });
  } catch(e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug, status: 'published' },
      { $inc: { views: 1 } }, { new: true }
    );
    if (!post) return res.status(404).json({ success: false, error: { message: 'Post not found' } });
    res.json({ success: true, data: post });
  } catch(e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch(e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: post });
  } catch(e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch(e) { next(e); }
});

export default router;
```

- [ ] **Step 3: Write backend/routes/caseStudies.js**

```javascript
import { Router } from 'express';
import { CaseStudy } from '../models/index.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { industry, service } = req.query;
    const query = { status: 'published' };
    if (industry) query.industry = industry;
    if (service) query.service = service;
    const data = await CaseStudy.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data });
  } catch(e) { next(e); }
});

router.get('/featured', async (_req, res, next) => {
  try {
    const data = await CaseStudy.find({ status: 'published', featured: true })
      .sort({ order: 1 }).limit(5);
    res.json({ success: true, data });
  } catch(e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const cs = await CaseStudy.findOne({ slug: req.params.slug, status: 'published' });
    if (!cs) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: cs });
  } catch(e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const cs = await CaseStudy.create(req.body);
    res.status(201).json({ success: true, data: cs });
  } catch(e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const cs = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: cs });
  } catch(e) { next(e); }
});

export default router;
```

- [ ] **Step 4: Write backend/routes/services.js**

```javascript
import { Router } from 'express';
import { Service } from '../models/index.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const data = await Service.find({ active: true }).sort({ order: 1 });
    res.json({ success: true, data });
  } catch(e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const s = await Service.findOne({ slug: req.params.slug, active: true });
    if (!s) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: s });
  } catch(e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const s = await Service.create(req.body);
    res.status(201).json({ success: true, data: s });
  } catch(e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const s = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: s });
  } catch(e) { next(e); }
});

export default router;
```

- [ ] **Step 5: Write backend/routes/clients.js**

```javascript
import { Router } from 'express';
import { Client } from '../models/index.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const data = await Client.find({ active: true }).sort({ order: 1 });
    res.json({ success: true, data });
  } catch(e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const c = await Client.create(req.body);
    res.status(201).json({ success: true, data: c });
  } catch(e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const c = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: c });
  } catch(e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch(e) { next(e); }
});

export default router;
```

- [ ] **Step 6: Write backend/routes/resources.js**

```javascript
import { Router } from 'express';
import { Resource } from '../models/index.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const data = await Resource.find({ active: true }).sort({ order: 1 });
    res.json({ success: true, data });
  } catch(e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const r = await Resource.findOne({ slug: req.params.slug, active: true });
    if (!r) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: r });
  } catch(e) { next(e); }
});

router.post('/download', async (req, res, next) => {
  try {
    const { slug } = req.body;
    const r = await Resource.findOneAndUpdate({ slug }, { $inc: { downloads: 1 } }, { new: true });
    if (!r) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: { downloadUrl: r.downloadUrl } });
  } catch(e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const r = await Resource.create(req.body);
    res.status(201).json({ success: true, data: r });
  } catch(e) { next(e); }
});

export default router;
```

- [ ] **Step 7: Write backend/routes/team.js**

```javascript
import { Router } from 'express';
import { TeamMember } from '../models/index.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const data = await TeamMember.find({ active: true }).sort({ order: 1 });
    res.json({ success: true, data });
  } catch(e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const m = await TeamMember.create(req.body);
    res.status(201).json({ success: true, data: m });
  } catch(e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const m = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: m });
  } catch(e) { next(e); }
});

export default router;
```

- [ ] **Step 8: Write backend/routes/awards.js**

```javascript
import { Router } from 'express';
import { Award } from '../models/index.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const data = await Award.find({ active: true }).sort({ order: 1 });
    res.json({ success: true, data });
  } catch(e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const a = await Award.create(req.body);
    res.status(201).json({ success: true, data: a });
  } catch(e) { next(e); }
});

export default router;
```

- [ ] **Step 9: Write backend/routes/auth.js**

```javascript
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/index.js';
import { protect } from '../middleware/auth.js';

const router = Router();

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, error: { message: 'Email and password required' } });
    const admin = await Admin.findOne({ email, active: true }).select('+password');
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });
    res.json({ success: true, data: { token: signToken(admin._id), admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } } });
  } catch(e) { next(e); }
});

router.get('/me', protect, (req, res) => {
  res.json({ success: true, data: req.admin });
});

router.post('/logout', (_req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

export default router;
```

- [ ] **Step 10: Write backend/routes/upload.js**

```javascript
import { Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { protect } from '../middleware/auth.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/image', protect, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: { message: 'No file uploaded' } });
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${b64}`;
    const result = await cloudinary.uploader.upload(dataUri, { folder: 'ai-agentix' });
    res.json({ success: true, data: { url: result.secure_url, publicId: result.public_id } });
  } catch(e) { next(e); }
});

router.delete('/:publicId', protect, async (req, res, next) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId);
    res.json({ success: true });
  } catch(e) { next(e); }
});

export default router;
```

- [ ] **Step 11: Write backend/routes/newsletter.js**

```javascript
import { Router } from 'express';
import crypto from 'crypto';
import { Subscriber } from '../models/index.js';

const router = Router();

router.post('/subscribe', async (req, res, next) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ success: false, error: { message: 'Email required' } });
    const token = crypto.randomBytes(32).toString('hex');
    await Subscriber.findOneAndUpdate(
      { email },
      { email, name: name || '', token, source: 'website' },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: 'Subscribed successfully' });
  } catch(e) { next(e); }
});

router.get('/confirm/:token', async (req, res, next) => {
  try {
    const sub = await Subscriber.findOneAndUpdate(
      { token: req.params.token },
      { confirmed: true, token: null },
      { new: true }
    );
    if (!sub) return res.status(404).json({ success: false, error: { message: 'Invalid token' } });
    res.json({ success: true, message: 'Email confirmed!' });
  } catch(e) { next(e); }
});

export default router;
```

---

## Task 6: Backend server.js & Seed Script

**Files:**
- Create: `backend/server.js`, `backend/scripts/seed.js`

- [ ] **Step 1: Copy backend/server.js from files/**

Copy `files/server.js` exactly to `backend/server.js`.

- [ ] **Step 2: Copy backend/scripts/seed.js from files/**

Copy `files/seed.js` to `backend/scripts/seed.js`, but update the import path to `../models/index.js`.

---

## Task 7: Frontend Package & Config Files

**Files:**
- Create: `frontend/package.json`, `frontend/vite.config.js`, `frontend/tailwind.config.js`, `frontend/postcss.config.js`, `frontend/index.html`, `frontend/.env.local`

- [ ] **Step 1: Write frontend/package.json**

```json
{
  "name": "ai-agentix-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.24.0",
    "framer-motion": "^11.3.8",
    "axios": "^1.7.2",
    "@tanstack/react-query": "^5.51.1",
    "react-intersection-observer": "^9.13.0",
    "lucide-react": "^0.408.0",
    "react-hook-form": "^7.52.1",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.8",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0",
    "date-fns": "^3.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.3.4",
    "tailwindcss": "^3.4.6",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39"
  }
}
```

- [ ] **Step 2: Write frontend/vite.config.js**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

- [ ] **Step 3: Write frontend/tailwind.config.js**

```javascript
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#e84d1c',
        'accent-hover': '#ff5a28',
        'bg-dark': '#000000',
        'bg-card': '#0d0d0d',
        'bg-light': '#f7f7f5',
        'border-dark': '#1e1e1e',
        'border-light': '#e5e5e5',
        'text-muted': '#999999',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem,6.5vw,5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'section': ['clamp(2rem,4vw,3.2rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        content: '1240px',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Write frontend/postcss.config.js**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 5: Write frontend/index.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="AI Agentix — Enterprise Agentic AI Systems, n8n Automation & LLM Integration" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
    <title>AI Agentix — Agentic AI Systems & Automation</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Write frontend/.env.local**

```
VITE_API_URL=http://localhost:5000/api/v1
```

---

## Task 8: Frontend Foundation Files

**Files:**
- Create: `frontend/src/main.jsx`, `frontend/src/App.jsx`, `frontend/src/index.css`, `frontend/src/lib/motion.js`, `frontend/src/lib/api.js`, `frontend/src/hooks/useScrollReveal.js`

- [ ] **Step 1: Write frontend/src/main.jsx**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
```

- [ ] **Step 2: Write frontend/src/App.jsx**

```jsx
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnnouncementBanner from './components/layout/AnnouncementBanner.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import CaseStudies from './pages/CaseStudies.jsx';
import Blog from './pages/Blog.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const [bannerVisible, setBannerVisible] = useState(
    () => localStorage.getItem('banner_dismissed') !== 'true'
  );

  const dismissBanner = () => {
    localStorage.setItem('banner_dismissed', 'true');
    setBannerVisible(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {bannerVisible && <AnnouncementBanner onDismiss={dismissBanner} />}
      <Navbar bannerVisible={bannerVisible} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Copy frontend/src/index.css from files/**

Copy `files/index.css` exactly to `frontend/src/index.css`.

- [ ] **Step 4: Copy frontend/src/lib/motion.js from files/**

Copy `files/motion.js` exactly to `frontend/src/lib/motion.js`.

- [ ] **Step 5: Write frontend/src/lib/api.js**

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchCaseStudies  = () => api.get('/case-studies/featured').then(r => r.data.data);
export const fetchPosts        = (params) => api.get('/posts', { params }).then(r => r.data);
export const fetchFeaturedPosts= () => api.get('/posts/featured').then(r => r.data.data);
export const fetchServices     = () => api.get('/services').then(r => r.data.data);
export const fetchClients      = () => api.get('/clients').then(r => r.data.data);
export const fetchResources    = () => api.get('/resources').then(r => r.data.data);
export const fetchAwards       = () => api.get('/awards').then(r => r.data.data);
export const submitContact     = (data) => api.post('/contact', data).then(r => r.data);

export default api;
```

- [ ] **Step 6: Write frontend/src/hooks/useScrollReveal.js**

```javascript
import { useEffect, useRef } from 'react';

export default function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
```

---

## Task 9: UI Components

**Files:**
- Create: `frontend/src/components/ui/RevealWrapper.jsx`

- [ ] **Step 1: Write RevealWrapper.jsx**

```jsx
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/motion.js';

export default function RevealWrapper({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## Task 10: Layout Components

**Files:**
- Create: `frontend/src/components/layout/AnnouncementBanner.jsx`, `frontend/src/components/layout/Navbar.jsx`, `frontend/src/components/layout/Footer.jsx`

- [ ] **Step 1: Write AnnouncementBanner.jsx**

```jsx
export default function AnnouncementBanner({ onDismiss }) {
  return (
    <div
      id="announcement-banner"
      className="relative w-full h-11 flex items-center justify-center px-10
                 bg-[#e84d1c] text-white text-[13px] font-medium z-[110]"
    >
      <span>
        <strong>🚀 AI Agentix</strong> is now building enterprise Agentic AI Systems —{' '}
        <a href="/contact" className="underline hover:no-underline">
          Discover how we can transform your business →
        </a>
      </span>
      <button
        onClick={onDismiss}
        aria-label="Dismiss banner"
        className="absolute right-5 opacity-70 hover:opacity-100 text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Copy Navbar.jsx from files/**

Copy `files/Navbar.jsx` exactly to `frontend/src/components/layout/Navbar.jsx`.

- [ ] **Step 3: Write Footer.jsx**

```jsx
import { Link } from 'react-router-dom';

const SERVICES = [
  { label: 'Discover', links: [['AI Consulting','/services/ai-consulting'],['AI PoC','/services/ai-poc'],['AI Strategy','/services/ai-strategy'],['Automation Audit','/services/automation-audit']] },
  { label: 'Develop',  links: [['AI Agents','/services/ai-agents'],['LLM Integration','/services/llm-integration'],['Gen AI Dev','/services/generative-ai'],['n8n Automation','/services/n8n-automation'],['ML Consulting','/services/machine-learning']] },
  { label: 'Deploy',   links: [['AI Advisory','/services/ai-advisory'],['AI Integration','/services/ai-integration'],['MLOps','/services/mlops'],['AI Testing','/services/ai-testing']] },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#1e1e1e] pt-20 pb-12 px-12">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#1e1e1e]">
          {/* Col 1: Sitemap */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.1em] text-white font-semibold mb-5">Sitemap</p>
            <ul className="space-y-2">
              {[['About','/about'],['Blog','/blog'],['Case Studies','/case-studies'],['Career','/career']].map(([n,h])=>(
                <li key={n}><Link to={h} className="text-[13px] text-[#777] hover:text-white transition-colors">{n}</Link></li>
              ))}
            </ul>
            <div className="mt-5 pt-5 border-t border-[#1e1e1e]">
              <Link to="/contact" className="text-[13px] text-[#e84d1c] hover:text-[#ff5a28] font-semibold">Let's talk →</Link>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.1em] text-white font-semibold mb-5">Services</p>
            <div className="grid grid-cols-3 gap-6">
              {SERVICES.map(group => (
                <div key={group.label}>
                  <p className="text-[11px] uppercase tracking-[0.08em] text-[#e84d1c] font-semibold mb-3">{group.label}</p>
                  <ul className="space-y-1.5">
                    {group.links.map(([n,h]) => (
                      <li key={n}><Link to={h} className="text-[12px] text-[#666] hover:text-white transition-colors">{n}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Company */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.1em] text-white font-semibold mb-5">Company</p>
            <div className="space-y-1 text-[12px] text-[#666]">
              <p className="text-[10px] uppercase tracking-wider text-[#444] mb-2">HQ — Global Remote</p>
              <p>AI Agentix Ltd.</p>
              <p>Building AI That Works</p>
              <a href="mailto:hello@ai-agentix.com" className="text-[#777] hover:text-[#e84d1c] transition-colors block mt-2">hello@ai-agentix.com</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
          <p className="text-[12px] text-[#555]">© 2026 AI Agentix. All rights reserved.</p>
          <div className="flex gap-6">
            {['Terms','Privacy Policy','Cookies'].map(t => (
              <a key={t} href="#" className="text-[12px] text-[#555] hover:text-white transition-colors">{t}</a>
            ))}
          </div>
          <div className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"
               className="w-8 h-8 border border-[#333] flex items-center justify-center text-[#777] hover:border-[#e84d1c] hover:text-[#e84d1c] transition-all text-xs">
              in
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"
               className="w-8 h-8 border border-[#333] flex items-center justify-center text-[#777] hover:border-[#e84d1c] hover:text-[#e84d1c] transition-all text-xs">
              𝕏
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## Task 11: HeroSection

**Files:**
- Create: `frontend/src/components/sections/HeroSection.jsx`
- Copy `files/video-1080p.mp4` to `frontend/public/assets/hero-video.mp4`

- [ ] **Step 1: Copy HeroSection from files/**

Copy `files/HeroSection.jsx` exactly to `frontend/src/components/sections/HeroSection.jsx`.

- [ ] **Step 2: Copy hero video**

```bash
cp "D:/AI AGENTIX/files/video-1080p.mp4" "D:/AI AGENTIX/frontend/public/assets/hero-video.mp4"
```

---

## Task 12: ServiceHighlights Section

**Files:**
- Create: `frontend/src/components/sections/ServiceHighlights.jsx`

- [ ] **Step 1: Write ServiceHighlights.jsx**

```jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { stagger, fadeUp } from '../../lib/motion.js';

const HIGHLIGHTS = [
  {
    title: 'AI Consulting',
    desc: 'Discover AI\'s practical advantages with custom solutions tailored to your business model, workflows, and growth ambitions.',
  },
  {
    title: 'Generative AI',
    desc: 'Adapt cutting-edge Generative AI to your business needs — from LLM-powered products to RAG pipelines and content engines.',
  },
  {
    title: 'Agentic Automation',
    desc: 'Transform your operations with autonomous AI agents that think, decide, and execute complex multi-step tasks independently.',
  },
];

export default function ServiceHighlights() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="bg-black border-t border-[#1e1e1e]">
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-3"
      >
        {HIGHLIGHTS.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            className="group p-12 border border-[#1e1e1e] hover:border-[rgba(232,77,28,0.3)]
                       transition-all duration-300 hover:-translate-y-1 cursor-default"
          >
            <h2 className="text-[22px] font-display font-bold text-white mb-4">{item.title}</h2>
            <div className="w-10 h-px bg-[#e84d1c] mb-4" />
            <p className="text-[15px] text-[#888] leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

---

## Task 13: ClientLogos Section

**Files:**
- Create: `frontend/src/components/sections/ClientLogos.jsx`

- [ ] **Step 1: Write ClientLogos.jsx**

```jsx
const CLIENTS = [
  'Nexus AI','BrightWave','Stackflow','Velora','Prismatic Legal',
  'DataForge','Orbix Systems','Synthex','Luminary','CloudNine',
  'HiveTech','Acme Corp','TechNova','ScaleAI','FlowBridge',
  'Nexus AI','BrightWave','Stackflow','Velora','Prismatic Legal',
  'DataForge','Orbix Systems','Synthex','Luminary','CloudNine',
  'HiveTech','Acme Corp','TechNova','ScaleAI','FlowBridge',
];

function LogoItem({ name }) {
  return (
    <div className="flex-shrink-0 px-8 flex items-center justify-center h-16">
      <div className="text-[#333] hover:text-[#777] transition-colors duration-300
                      font-display font-semibold text-sm tracking-wider uppercase whitespace-nowrap">
        {name}
      </div>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section className="bg-black border-t border-[#1e1e1e] py-16">
      <div className="max-w-content mx-auto px-12 mb-8">
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#555] text-center">Our clients</p>
      </div>
      <div className="border-t border-[#1e1e1e] py-8 overflow-hidden marquee-mask">
        <div className="flex animate-marquee">
          {CLIENTS.map((name, i) => <LogoItem key={`a-${i}`} name={name} />)}
          {CLIENTS.map((name, i) => <LogoItem key={`b-${i}`} name={name} />)}
        </div>
      </div>
    </section>
  );
}
```

---

## Task 14: CoreCapabilities Section

**Files:**
- Create: `frontend/src/components/sections/CoreCapabilities.jsx`

- [ ] **Step 1: Write CoreCapabilities.jsx**

```jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { stagger, fadeUp } from '../../lib/motion.js';

const CAPABILITIES = [
  { title: 'AI Consulting & Strategy',   desc: 'Chart a clear AI roadmap aligned to your business goals, budget, and team capabilities.', href: '/services/ai-consulting' },
  { title: 'Agentic AI Development',     desc: 'Build networks of autonomous agents that think, decide, and execute complex multi-step tasks.', href: '/services/ai-agents' },
  { title: 'AI Agentix Platform',        desc: 'Our proprietary automation platform connecting agents, workflows, and your entire tech stack.', href: '/services/ai-integration' },
  { title: 'LLM Integration Services',   desc: 'Integrate OpenAI, Anthropic, and open-source LLMs into your products and internal tools.', href: '/services/llm-integration' },
  { title: 'n8n Workflow Automation',    desc: 'Design intelligent, modular n8n workflows that connect every tool in your stack.', href: '/services/n8n-automation' },
  { title: 'AI Deployment & MLOps',      desc: 'Streamline your ML lifecycle from development to production with reliable monitoring.', href: '/services/mlops' },
];

export default function CoreCapabilities() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section className="bg-black section-pad">
      <div className="content-wrap">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4,0,0.2,1] }}
          className="section-title text-white mb-16"
        >
          Our core capabilities
        </motion.h2>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {CAPABILITIES.map((cap) => (
            <motion.a
              key={cap.title}
              href={cap.href}
              variants={fadeUp}
              className="group block p-12 border border-[#1e1e1e]
                         hover:border-[rgba(232,77,28,0.3)] hover:-translate-y-1
                         transition-all duration-300"
            >
              <h3 className="text-[20px] font-display font-bold text-white mb-4">{cap.title}</h3>
              <div className="w-10 h-px bg-[#1e1e1e] group-hover:bg-[#e84d1c] transition-colors mb-4" />
              <p className="text-[14px] text-[#888] leading-relaxed mb-6">{cap.desc}</p>
              <span className="text-[#e84d1c] text-[13px] font-semibold">Learn more →</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## Task 15: CustomerStories Slider

**Files:**
- Create: `frontend/src/components/sections/CustomerStories.jsx`

- [ ] **Step 1: Write CustomerStories.jsx**

```jsx
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { fetchCaseStudies } from '../../lib/api.js';

const FALLBACK = [
  {
    _id: '1', title: 'Autonomous Lead Generation Engine for a SaaS Startup',
    client: 'Stackflow Inc.', industry: 'SaaS & Technology',
    quote: { text: 'The system doesn\'t just find leads — it understands them. We went from 20 meetings/month to 78 in 6 weeks.', author: 'James Whitfield', role: 'CEO' },
    metrics: [{ value: '3.9×', label: 'Increase in meetings' }, { value: '40h', label: 'Hours saved/week' }],
    service: 'AI Agents Development',
  },
  {
    _id: '2', title: '24/7 AI Support Agent for a 50,000-User Platform',
    client: 'Velora Platform', industry: 'SaaS & Technology',
    quote: { text: 'Our CSAT went from 3.4 to 4.7 within 30 days. The agent handles nuance that we thought only humans could manage.', author: 'Maria Chen', role: 'Head of Product' },
    metrics: [{ value: '74%', label: 'Autonomous resolution' }, { value: '4.7★', label: 'CSAT score' }],
    service: 'AI Chatbot Development',
  },
  {
    _id: '3', title: 'End-to-End n8n Automation for a Digital Marketing Agency',
    client: 'BrightWave Agency', industry: 'Marketing',
    quote: { text: 'What used to take our team an entire Monday morning now happens automatically at midnight Sunday.', author: 'Raj Patel', role: 'Operations Director' },
    metrics: [{ value: '26h', label: 'Hours saved/week' }, { value: '100%', label: 'Automated reporting' }],
    service: 'n8n Workflow Automation',
  },
];

export default function CustomerStories() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { data: stories = FALLBACK } = useQuery({ queryKey: ['caseStudies'], queryFn: fetchCaseStudies, placeholderData: FALLBACK });

  const next = useCallback(() => setIdx(i => (i + 1) % stories.length), [stories.length]);
  const prev = () => setIdx(i => (i - 1 + stories.length) % stories.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const story = stories[idx];

  return (
    <section className="bg-[#0d0d0d] border-y border-[#1e1e1e] section-pad">
      <div ref={ref} className="content-wrap">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-title text-white mb-2"
        >
          Customer stories
        </motion.h2>
        <div className="w-12 h-px bg-[#e84d1c] mb-16" />

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={story._id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.5, ease: [0.4,0,0.2,1] }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-12"
            >
              {/* Left */}
              <div className="lg:col-span-2 flex flex-col justify-between">
                <div>
                  <p className="text-[96px] font-display font-black text-[#1a1a1a] leading-none">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <span className="text-[11px] uppercase tracking-widest text-[#e84d1c] font-semibold">
                    {story.service || story.industry}
                  </span>
                  <p className="mt-4 text-[14px] text-[#666]">{story.client}</p>
                </div>
                <div className="flex gap-3 mt-8">
                  {story.metrics?.map((m, i) => (
                    <div key={i} className="border border-[#1e1e1e] p-4 flex-1">
                      <p className="text-[28px] font-display font-black text-[#e84d1c]">{m.value}</p>
                      <p className="text-[11px] text-[#666] mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-3">
                <h3 className="text-[26px] font-display font-bold text-white leading-tight mb-6">
                  {story.title}
                </h3>
                {story.quote?.text && (
                  <blockquote className="border-l-2 border-[#e84d1c] pl-5 italic text-[#aaa] text-[15px] leading-relaxed mb-6">
                    "{story.quote.text}"
                  </blockquote>
                )}
                {story.quote?.author && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1e1e1e] rounded-full" />
                    <div>
                      <p className="text-[14px] font-bold text-white">{story.quote.author}</p>
                      <p className="text-[13px] text-[#666]">{story.quote.role} · {story.client}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-12">
            <button onClick={prev} aria-label="Previous"
              className="w-11 h-11 border border-[#333] flex items-center justify-center
                         text-white hover:border-[#e84d1c] hover:bg-[#e84d1c] transition-all">
              ←
            </button>
            <div className="flex gap-2">
              {stories.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Go to slide ${i+1}`}
                  className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-[#e84d1c] w-6' : 'bg-[#333]'}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next"
              className="w-11 h-11 border border-[#333] flex items-center justify-center
                         text-white hover:border-[#e84d1c] hover:bg-[#e84d1c] transition-all">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Task 16: IndustryExpertise Section

**Files:**
- Create: `frontend/src/components/sections/IndustryExpertise.jsx`

- [ ] **Step 1: Write IndustryExpertise.jsx**

```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const INDUSTRIES = [
  {
    tab: 'E-Commerce',
    title: 'AI-Powered E-Commerce Growth',
    content: [
      'Transform your e-commerce operations with AI agents that handle personalisation, inventory management, and customer support at scale. From recommendation engines to autonomous pricing agents, we build systems that drive measurable revenue growth.',
      'Our solutions integrate seamlessly with Shopify, WooCommerce, and custom platforms — giving your team intelligent automation without disrupting existing workflows.',
    ],
  },
  {
    tab: 'SaaS & Tech',
    title: 'Intelligent SaaS Operations',
    content: [
      'SaaS companies use AI Agentix to automate onboarding, reduce churn, and build AI-native product features. We help product teams ship AI capabilities in weeks, not quarters.',
      'From LLM-powered in-app assistants to automated customer success workflows, we deliver the AI infrastructure your product needs to compete in 2026.',
    ],
  },
  {
    tab: 'Marketing',
    title: 'Marketing Automation at Scale',
    content: [
      'Marketing agencies and growth teams trust AI Agentix to automate content production, campaign orchestration, reporting, and client communication — freeing your team for high-value strategy.',
      'Our n8n-based automation frameworks connect your entire marketing stack: HubSpot, Meta Ads, Google Analytics, Slack, and more — in unified, intelligent workflows.',
    ],
  },
  {
    tab: 'Finance',
    title: 'AI for Finance & Insurance',
    content: [
      'From document intelligence and contract analysis to risk scoring and compliance monitoring, we build AI systems that handle the rote work — so your analysts focus on decisions that matter.',
      'Our finance AI solutions are built with security, auditability, and regulatory compliance as first principles, not afterthoughts.',
    ],
  },
  {
    tab: 'Healthcare',
    title: 'Healthcare AI & Automation',
    content: [
      'AI Agentix builds HIPAA-conscious automation for healthcare organisations — from patient intake and scheduling to clinical documentation and billing automation.',
      'We help providers and health-tech companies deploy AI that improves patient outcomes while reducing administrative burden on clinical staff.',
    ],
  },
  {
    tab: 'Logistics',
    title: 'Intelligent Logistics & Supply Chain',
    content: [
      'Logistics operators use AI Agentix to automate dispatch coordination, route optimisation communication, and supplier management workflows — reducing manual operations by 60%+.',
      'Our agents monitor shipments, flag exceptions, communicate with carriers, and update your WMS — autonomously and continuously.',
    ],
  },
];

export default function IndustryExpertise() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="bg-[#f7f7f5] section-pad">
      <div ref={ref} className="content-wrap">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="section-title text-[#0d0d0d]"
          >
            Industry expertise
          </motion.h2>
          <p className="text-[15px] text-[#888]">
            Your industry isn't here?{' '}
            <a href="/contact" className="text-[#e84d1c] font-semibold hover:underline">Let's talk →</a>
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-0 border-b border-[#e5e5e5] mb-10">
          {INDUSTRIES.map((ind, i) => (
            <button
              key={ind.tab}
              onClick={() => setActive(i)}
              className={`px-5 py-3 text-[14px] font-medium transition-all border-b-2 -mb-px
                ${active === i
                  ? 'border-[#e84d1c] text-[#0d0d0d] font-bold'
                  : 'border-transparent text-[#777] hover:text-[#0d0d0d]'
                }`}
            >
              {ind.tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-12"
          >
            <div className="lg:col-span-3">
              <h3 className="text-[24px] font-display font-bold text-[#0d0d0d] mb-6">
                {INDUSTRIES[active].title}
              </h3>
              {INDUSTRIES[active].content.map((p, i) => (
                <p key={i} className="text-[15px] text-[#555] leading-relaxed mb-4">{p}</p>
              ))}
              <a href="/contact" className="btn-link mt-4 inline-flex text-[#e84d1c]">Read more →</a>
            </div>
            <div className="lg:col-span-2">
              <div className="h-64 bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] flex items-center justify-center border border-[#e5e5e5]">
                <span className="text-[48px] font-display font-black text-[#e84d1c] opacity-20">
                  {INDUSTRIES[active].tab.charAt(0)}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
```

---

## Task 17: ProductSpotlight Section

**Files:**
- Create: `frontend/src/components/sections/ProductSpotlight.jsx`

- [ ] **Step 1: Write ProductSpotlight.jsx**

```jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeUp, stagger } from '../../lib/motion.js';

const FEATURES = [
  'Multi-agent orchestration out of the box',
  'Native n8n workflow integration',
  'LLM-agnostic: OpenAI, Anthropic, local models',
  'Real-time monitoring & agent analytics',
  'Enterprise-grade security & audit logs',
];

export default function ProductSpotlight() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="bg-black section-pad border-y border-[#1e1e1e]">
      <div ref={ref} className="content-wrap grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p variants={fadeUp} className="eyebrow text-[#e84d1c] mb-4">Our Platform</motion.p>
          <motion.h2 variants={fadeUp} className="section-title text-white mb-0">
            AI Agentix Automation Platform
          </motion.h2>
          <motion.div variants={fadeUp} className="accent-divider my-6" />
          <motion.p variants={fadeUp} className="text-[16px] text-[#888] leading-relaxed mb-8 max-w-lg">
            The command center for your AI operations. Orchestrate agents, monitor workflows,
            integrate LLMs, and ship AI-powered features — all from one unified platform.
          </motion.p>
          <motion.ul variants={stagger} className="space-y-3 mb-8">
            {FEATURES.map(f => (
              <motion.li key={f} variants={fadeUp} className="flex items-start gap-3">
                <span className="text-[#e84d1c] mt-1">✓</span>
                <span className="text-[14px] text-[#999]">{f}</span>
              </motion.li>
            ))}
          </motion.ul>
          <motion.a variants={fadeUp} href="/contact" className="btn-accent">
            Learn more →
          </motion.a>
        </motion.div>

        {/* Right — product mockup */}
        <div className="relative">
          <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-6 relative
                          shadow-[0_0_60px_rgba(232,77,28,0.1)]">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#1e1e1e]" />
              <div className="w-3 h-3 rounded-full bg-[#1e1e1e]" />
              <div className="w-3 h-3 rounded-full bg-[#e84d1c]" />
              <span className="text-[11px] text-[#444] ml-2">AI Agentix Dashboard</span>
            </div>
            <div className="space-y-3">
              {['Lead Gen Agent — Running ●','Support Agent — Running ●','Email Sequencer — Idle ○','Contract Analyzer — Running ●'].map((line, i) => (
                <div key={i} className="flex items-center justify-between bg-[#000] border border-[#1e1e1e] px-4 py-3">
                  <span className="text-[13px] text-[#888]">{line.split('—')[0].trim()}</span>
                  <span className={`text-[11px] font-semibold ${line.includes('Running') ? 'text-green-400' : 'text-[#555]'}`}>
                    {line.split('—')[1]?.trim()}
                  </span>
                </div>
              ))}
              <div className="bg-[#000] border border-[#e84d1c]/20 px-4 py-3 mt-4">
                <p className="text-[11px] text-[#555] mb-2">Today's Performance</p>
                <div className="flex gap-6">
                  <div><p className="text-[22px] font-display font-black text-[#e84d1c]">247</p><p className="text-[10px] text-[#555]">Tasks executed</p></div>
                  <div><p className="text-[22px] font-display font-black text-white">18.4h</p><p className="text-[10px] text-[#555]">Time saved</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Task 18: CooperationModels Section

**Files:**
- Create: `frontend/src/components/sections/CooperationModels.jsx`

- [ ] **Step 1: Write CooperationModels.jsx**

```jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { stagger, fadeUp } from '../../lib/motion.js';

const MODELS = [
  {
    title: 'Solution Providing',
    desc: 'We define, design, and deliver your AI solution end-to-end — on time and within budget. You get a finished product, not a consulting engagement.',
    dark: false,
  },
  {
    title: 'Collaborative Model',
    desc: 'Our team embeds with yours as an extension of your engineering org — building AI capabilities alongside your developers with full knowledge transfer.',
    dark: false,
  },
  {
    title: 'Managed AI Services',
    desc: 'Full ownership of your AI operations. We run, monitor, and continuously improve your AI systems — so your team stays focused on your core product.',
    dark: false,
  },
  {
    title: "We're Flexible",
    desc: "Every company is different. If none of the above fits perfectly, let's have a conversation. We've worked with every engagement model — and we'll adapt to yours.",
    dark: true,
  },
];

export default function CooperationModels() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="bg-[#f7f7f5] section-pad">
      <div ref={ref} className="content-wrap">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="section-title text-[#0d0d0d]"
          >
            Cooperation models
          </motion.h2>
          <a href="/contact" className="text-[#e84d1c] font-semibold text-[14px] hover:underline">
            Let's work together →
          </a>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
        >
          {MODELS.map((model) => (
            <motion.div
              key={model.title}
              variants={fadeUp}
              className={`p-10 border ${model.dark
                ? 'bg-[#0d0d0d] border-[#0d0d0d]'
                : 'bg-white border-[#e5e5e5]'
              }`}
            >
              <h3 className={`text-[20px] font-display font-bold mb-4 ${model.dark ? 'text-white' : 'text-[#0d0d0d]'}`}>
                {model.title}
              </h3>
              <div className="w-10 h-px bg-[#e84d1c] mb-4" />
              <p className={`text-[14px] leading-relaxed ${model.dark ? 'text-[#888]' : 'text-[#555]'}`}>
                {model.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## Task 19: CompanyInsights Section

**Files:**
- Create: `frontend/src/components/sections/CompanyInsights.jsx`

- [ ] **Step 1: Write CompanyInsights.jsx**

```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedPosts, fetchResources } from '../../lib/api.js';
import { format } from 'date-fns';

const FALLBACK_POSTS = [
  { _id:'1', title:'Why Agentic AI Is the Next Platform Shift', categories:['Agentic AI'], readTime:12, publishedAt: new Date().toISOString(), author:{name:'AI Agentix Team'} },
  { _id:'2', title:'n8n vs Zapier vs Make: Which Is Right for Enterprise in 2026?', categories:['n8n Automation'], readTime:8, publishedAt: new Date().toISOString(), author:{name:'AI Agentix Team'} },
  { _id:'3', title:'RAG in Production: Why 80% Fail and How to Be in the 20%', categories:['LLM Integration'], readTime:10, publishedAt: new Date().toISOString(), author:{name:'AI Agentix Team'} },
];

const FALLBACK_RESOURCES = [
  { _id:'1', title:'The 2026 Enterprise AI Readiness Guide', type:'guide', category:'AI Strategy', description:'Everything you need to assess and accelerate your AI maturity.' },
  { _id:'2', title:'Agentic AI: From Hype to Production', type:'whitepaper', category:'Agentic AI', description:'A technical deep-dive into building reliable AI agent systems.' },
  { _id:'3', title:'n8n Automation Playbook for Agencies', type:'ebook', category:'Automation', description:'The definitive guide to building agency-grade n8n workflows.' },
];

function PostCard({ post }) {
  return (
    <div className="dark-card p-6 group cursor-pointer">
      <span className="text-[10px] uppercase tracking-widest text-[#e84d1c] font-semibold">
        {post.categories?.[0] || 'AI'}
      </span>
      <p className="text-[11px] text-[#555] mt-1 mb-3">
        {post.publishedAt ? format(new Date(post.publishedAt), 'MMM d, yyyy') : ''} · {post.readTime} min read
      </p>
      <h3 className="text-[16px] font-display font-bold text-white group-hover:text-[#e84d1c] transition-colors leading-snug mb-3">
        {post.title}
      </h3>
      <p className="text-[12px] text-[#555]">{post.author?.name}</p>
    </div>
  );
}

function ResourceCard({ resource }) {
  return (
    <div className="dark-card p-6 group">
      <span className="text-[10px] uppercase tracking-widest text-[#e84d1c] font-semibold">
        {resource.type}
      </span>
      <p className="text-[11px] text-[#555] mt-1 mb-3">{resource.category}</p>
      <h3 className="text-[16px] font-display font-bold text-white leading-snug mb-3">{resource.title}</h3>
      <p className="text-[13px] text-[#888] leading-relaxed mb-5">{resource.description}</p>
      <button className="text-[12px] border border-[#333] text-[#888] hover:border-[#e84d1c] hover:text-[#e84d1c] px-4 py-2 transition-all">
        Download →
      </button>
    </div>
  );
}

export default function CompanyInsights() {
  const [tab, setTab] = useState('articles');
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const { data: posts = FALLBACK_POSTS } = useQuery({ queryKey: ['featuredPosts'], queryFn: fetchFeaturedPosts, placeholderData: FALLBACK_POSTS });
  const { data: resources = FALLBACK_RESOURCES } = useQuery({ queryKey: ['resources'], queryFn: fetchResources, placeholderData: FALLBACK_RESOURCES });

  return (
    <section className="bg-black section-pad border-t border-[#1e1e1e]">
      <div ref={ref} className="content-wrap">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="section-title text-white">Company insights</h2>
            <p className="text-[#888] mt-3 text-[15px]">Explore our research, guides, and thinking on AI.</p>
          </motion.div>

          {/* Tab switcher */}
          <div className="flex border border-[#1e1e1e]">
            {[['articles','Articles'],['resources','Resources']].map(([key,label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-6 py-3 text-[13px] font-semibold transition-all ${
                  tab === key ? 'bg-[#e84d1c] text-white' : 'text-[#777] hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {tab === 'articles'
              ? posts.slice(0,3).map(p => <PostCard key={p._id} post={p} />)
              : resources.slice(0,3).map(r => <ResourceCard key={r._id} resource={r} />)
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
```

---

## Task 20: AwardsSection

**Files:**
- Create: `frontend/src/components/sections/AwardsSection.jsx`

- [ ] **Step 1: Write AwardsSection.jsx**

```jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { fetchAwards } from '../../lib/api.js';

const FALLBACK_AWARDS = [
  { _id:'1', name:'Top AI Agency 2025', issuer:'Clutch', year:2025 },
  { _id:'2', name:'Clutch Top 1000', issuer:'Clutch', year:2025 },
  { _id:'3', name:'Fastest Growing AI', issuer:'G2', year:2024 },
  { _id:'4', name:'n8n Partner Agency', issuer:'n8n', year:2024 },
  { _id:'5', name:'Forbes AI Spotlight', issuer:'Forbes', year:2024 },
  { _id:'6', name:'Top Automation Agency', issuer:'GoodFirms', year:2025 },
];

export default function AwardsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { data: awards = FALLBACK_AWARDS } = useQuery({ queryKey: ['awards'], queryFn: fetchAwards, placeholderData: FALLBACK_AWARDS });

  return (
    <section className="bg-black section-pad-sm border-t border-[#1e1e1e]">
      <div ref={ref} className="content-wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="section-title text-white mb-4 max-w-2xl">
            We are recognized as one of the best AI & Automation consultants
          </h2>
          <p className="text-[15px] text-[#888]">We've helped multiple companies achieve their AI transformation goals.</p>
        </motion.div>

        <div className="flex flex-wrap">
          {awards.map((award, i) => (
            <motion.div
              key={award._id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="border border-[#1e1e1e] px-8 py-6 hover:border-[#333] transition-colors group"
            >
              <p className="text-[11px] uppercase tracking-widest text-[#444] mb-2 group-hover:text-[#666] transition-colors">
                {award.issuer} · {award.year}
              </p>
              <p className="text-[14px] font-display font-semibold text-[#666] group-hover:text-white transition-colors">
                {award.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Task 21: TechDeepDive Section

**Files:**
- Create: `frontend/src/components/sections/TechDeepDive.jsx`

- [ ] **Step 1: Write TechDeepDive.jsx**

```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TABS = [
  {
    label: 'Agentic AI',
    title: 'Build AI that acts, not just answers',
    content: [
      'Agentic AI represents a fundamental shift from reactive chatbots to proactive, goal-directed systems. Our agents don\'t just respond — they plan, use tools, make decisions, and self-correct until the task is complete.',
      'We build agentic systems using battle-tested architectures: ReAct, Plan-and-Execute, and custom multi-agent frameworks. Every agent we build is observable, auditable, and production-ready from day one.',
    ],
  },
  {
    label: 'n8n Automation',
    title: 'Enterprise automation without the enterprise price tag',
    content: [
      'n8n is the most powerful workflow automation platform available today — and AI Agentix is one of the few teams globally that can unlock its full potential for enterprise use cases.',
      'From simple CRM syncs to 200-node AI-augmented workflows, we design, build, and maintain n8n automation that scales with your business. Every workflow is documented, version-controlled, and tested.',
    ],
  },
  {
    label: 'LLM Integration',
    title: 'The right model, in the right place, at the right cost',
    content: [
      'Choosing the right LLM isn\'t a one-time decision — it\'s an ongoing engineering practice. We help you navigate model selection, fine-tuning, prompt engineering, and RAG architecture with a production-first mindset.',
      'We work with every major model provider: OpenAI, Anthropic, Google, Meta, Mistral, and self-hosted options. Our integrations are built to be model-agnostic so you\'re never locked in.',
    ],
  },
  {
    label: 'AI Chatbots',
    title: 'Conversational AI that knows your business',
    content: [
      'We build AI chatbots trained on your specific knowledge base, policies, and workflows — not generic models that hallucinate your product specs. Every bot we ship has a reliable knowledge retrieval system behind it.',
      'Our chatbots integrate with your existing stack: Intercom, Zendesk, Slack, WhatsApp, and custom interfaces. They hand off gracefully to human agents when needed, and they improve over time as you add content.',
    ],
  },
];

export default function TechDeepDive() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="bg-black section-pad border-t border-[#1e1e1e]">
      <div ref={ref} className="content-wrap">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-title text-white max-w-2xl mb-12"
        >
          Outrun the competition with Artificial Intelligence and Agentic Automation
        </motion.h2>

        {/* Tab bar */}
        <div className="flex flex-wrap border-b border-[#1e1e1e] mb-10">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`px-6 py-3 text-[14px] font-medium border-b-2 -mb-px transition-all
                ${active === i
                  ? 'border-[#e84d1c] text-white font-bold'
                  : 'border-transparent text-[#555] hover:text-[#999]'
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="max-w-3xl"
          >
            <h3 className="text-[24px] font-display font-bold text-white mb-6">
              {TABS[active].title}
            </h3>
            {TABS[active].content.map((p, i) => (
              <p key={i} className="text-[15px] text-[#888] leading-relaxed mb-5">{p}</p>
            ))}
            <a href="/contact" className="btn-link text-[#e84d1c] mt-2 inline-flex">Let's talk →</a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
```

---

## Task 22: ContactCTA Section

**Files:**
- Create: `frontend/src/components/sections/ContactCTA.jsx`

- [ ] **Step 1: Write ContactCTA.jsx**

```jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

export default function ContactCTA() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="bg-black section-pad border-t border-[#1e1e1e]">
      <div ref={ref} className="content-wrap text-center max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-title text-white mb-6"
        >
          Contact us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[17px] text-[#888] leading-relaxed mb-10"
        >
          Schedule an intro call to get to know each other better
          <br />
          and understand the way we work.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Link to="/contact" className="btn-accent text-base px-10 py-4">
            Let's talk →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## Task 23: Home Page

**Files:**
- Create: `frontend/src/pages/Home.jsx`

- [ ] **Step 1: Write Home.jsx**

```jsx
import HeroSection from '../components/sections/HeroSection.jsx';
import ServiceHighlights from '../components/sections/ServiceHighlights.jsx';
import ClientLogos from '../components/sections/ClientLogos.jsx';
import CoreCapabilities from '../components/sections/CoreCapabilities.jsx';
import CustomerStories from '../components/sections/CustomerStories.jsx';
import IndustryExpertise from '../components/sections/IndustryExpertise.jsx';
import ProductSpotlight from '../components/sections/ProductSpotlight.jsx';
import CooperationModels from '../components/sections/CooperationModels.jsx';
import CompanyInsights from '../components/sections/CompanyInsights.jsx';
import AwardsSection from '../components/sections/AwardsSection.jsx';
import TechDeepDive from '../components/sections/TechDeepDive.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceHighlights />
      <ClientLogos />
      <CoreCapabilities />
      <CustomerStories />
      <IndustryExpertise />
      <ProductSpotlight />
      <CooperationModels />
      <CompanyInsights />
      <AwardsSection />
      <TechDeepDive />
      <ContactCTA />
    </>
  );
}
```

---

## Task 24: Inner Pages

**Files:**
- Create: `frontend/src/pages/Contact.jsx`, `frontend/src/pages/CaseStudies.jsx`, `frontend/src/pages/Blog.jsx`, `frontend/src/pages/About.jsx`, `frontend/src/pages/NotFound.jsx`

- [ ] **Step 1: Write Contact.jsx**

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { submitContact } from '../lib/api.js';

const schema = z.object({
  name:    z.string().min(2, 'Name required'),
  email:   z.string().email('Valid email required'),
  company: z.string().optional(),
  phone:   z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget:  z.string().optional(),
});

const SERVICES = [
  'AI Consulting & Strategy','AI Agents Development','n8n Workflow Automation',
  'LLM Integration','Generative AI Development','Custom AI Chatbots','Data Engineering',
  'AI Integration Services','MLOps Consulting','Other',
];

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const mutation = useMutation({ mutationFn: submitContact, onSuccess: () => reset() });

  return (
    <div className="min-h-screen bg-black pt-32 section-pad">
      <div className="content-wrap max-w-3xl">
        <p className="eyebrow text-[#e84d1c] mb-4">Get in touch</p>
        <h1 className="section-title text-white mb-4">Let's talk</h1>
        <div className="w-12 h-px bg-[#e84d1c] mb-8" />
        <p className="text-[16px] text-[#888] mb-12">
          Tell us about your project. We'll get back to you within 1-2 business days.
        </p>

        {mutation.isSuccess && (
          <div className="bg-[#0d0d0d] border border-[rgba(232,77,28,0.3)] p-6 mb-8 text-[#e84d1c] text-[15px]">
            ✓ Message received! We'll be in touch soon.
          </div>
        )}

        {mutation.isError && (
          <div className="bg-[#0d0d0d] border border-red-900 p-6 mb-8 text-red-400 text-[14px]">
            Something went wrong. Please try again or email us directly.
          </div>
        )}

        <form onSubmit={handleSubmit(d => mutation.mutate(d))} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] uppercase tracking-wider text-[#666] mb-2">Name *</label>
              <input {...register('name')} className="w-full bg-[#0d0d0d] border border-[#1e1e1e] text-white px-4 py-3 text-[14px] focus:border-[#e84d1c] focus:outline-none transition-colors" placeholder="Your name" />
              {errors.name && <p className="text-red-400 text-[12px] mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-wider text-[#666] mb-2">Email *</label>
              <input {...register('email')} type="email" className="w-full bg-[#0d0d0d] border border-[#1e1e1e] text-white px-4 py-3 text-[14px] focus:border-[#e84d1c] focus:outline-none transition-colors" placeholder="you@company.com" />
              {errors.email && <p className="text-red-400 text-[12px] mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] uppercase tracking-wider text-[#666] mb-2">Company</label>
              <input {...register('company')} className="w-full bg-[#0d0d0d] border border-[#1e1e1e] text-white px-4 py-3 text-[14px] focus:border-[#e84d1c] focus:outline-none transition-colors" placeholder="Company name" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-wider text-[#666] mb-2">Phone</label>
              <input {...register('phone')} className="w-full bg-[#0d0d0d] border border-[#1e1e1e] text-white px-4 py-3 text-[14px] focus:border-[#e84d1c] focus:outline-none transition-colors" placeholder="+1 (555) 000-0000" />
            </div>
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-wider text-[#666] mb-2">Service of Interest</label>
            <select {...register('service')} className="w-full bg-[#0d0d0d] border border-[#1e1e1e] text-[#888] px-4 py-3 text-[14px] focus:border-[#e84d1c] focus:outline-none transition-colors">
              <option value="">Select a service</option>
              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-wider text-[#666] mb-2">Budget Range</label>
            <select {...register('budget')} className="w-full bg-[#0d0d0d] border border-[#1e1e1e] text-[#888] px-4 py-3 text-[14px] focus:border-[#e84d1c] focus:outline-none transition-colors">
              <option value="">Select budget</option>
              {['Under $10k','$10k – $25k','$25k – $50k','$50k – $100k','$100k+'].map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-wider text-[#666] mb-2">Message *</label>
            <textarea {...register('message')} rows={6} className="w-full bg-[#0d0d0d] border border-[#1e1e1e] text-white px-4 py-3 text-[14px] focus:border-[#e84d1c] focus:outline-none transition-colors resize-none" placeholder="Tell us about your project, goals, and timeline..." />
            {errors.message && <p className="text-red-400 text-[12px] mt-1">{errors.message.message}</p>}
          </div>
          <button type="submit" disabled={mutation.isPending} className="btn-accent px-10 py-4 text-base disabled:opacity-60">
            {mutation.isPending ? 'Sending...' : 'Send message →'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write CaseStudies.jsx**

```jsx
import { useQuery } from '@tanstack/react-query';
import { fetchCaseStudies } from '../lib/api.js';
import { Link } from 'react-router-dom';

export default function CaseStudies() {
  const { data: studies = [], isLoading } = useQuery({ queryKey: ['allCaseStudies'], queryFn: () => fetch('/api/v1/case-studies').then(r => r.json()).then(d => d.data) });

  return (
    <div className="min-h-screen bg-black pt-32 section-pad">
      <div className="content-wrap">
        <p className="eyebrow text-[#e84d1c] mb-4">Results that speak</p>
        <h1 className="section-title text-white mb-4">Case Studies</h1>
        <div className="w-12 h-px bg-[#e84d1c] mb-16" />
        {isLoading ? (
          <div className="text-[#555] text-center py-20">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
            {studies.map(cs => (
              <div key={cs._id} className="dark-card p-8 group">
                <span className="text-[10px] uppercase tracking-widest text-[#e84d1c] font-semibold">{cs.industry}</span>
                <h3 className="text-[18px] font-display font-bold text-white mt-3 mb-4 leading-snug group-hover:text-[#e84d1c] transition-colors">
                  {cs.title}
                </h3>
                <p className="text-[13px] text-[#666] mb-6">{cs.result?.slice(0,120)}...</p>
                <div className="flex flex-wrap gap-3">
                  {cs.metrics?.slice(0,2).map((m, i) => (
                    <div key={i} className="border border-[#1e1e1e] px-3 py-2">
                      <p className="text-[20px] font-display font-black text-[#e84d1c]">{m.value}</p>
                      <p className="text-[10px] text-[#555]">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write Blog.jsx**

```jsx
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../lib/api.js';
import { format } from 'date-fns';

export default function Blog() {
  const { data, isLoading } = useQuery({ queryKey: ['posts'], queryFn: () => fetchPosts({ page: 1, limit: 9 }) });
  const posts = data?.data || [];

  return (
    <div className="min-h-screen bg-black pt-32 section-pad">
      <div className="content-wrap">
        <p className="eyebrow text-[#e84d1c] mb-4">Insights & Research</p>
        <h1 className="section-title text-white mb-4">Blog</h1>
        <div className="w-12 h-px bg-[#e84d1c] mb-16" />
        {isLoading ? (
          <div className="text-[#555] text-center py-20">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(post => (
              <div key={post._id} className="dark-card p-6 group cursor-pointer">
                <span className="text-[10px] uppercase tracking-widest text-[#e84d1c] font-semibold">
                  {post.categories?.[0]}
                </span>
                <p className="text-[11px] text-[#555] mt-1 mb-3">
                  {post.publishedAt ? format(new Date(post.publishedAt), 'MMM d, yyyy') : ''} · {post.readTime} min
                </p>
                <h3 className="text-[17px] font-display font-bold text-white leading-snug mb-3 group-hover:text-[#e84d1c] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[13px] text-[#888] leading-relaxed">{post.excerpt?.slice(0,120)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Write About.jsx**

```jsx
export default function About() {
  return (
    <div className="min-h-screen bg-black pt-32 section-pad">
      <div className="content-wrap max-w-3xl">
        <p className="eyebrow text-[#e84d1c] mb-4">Who we are</p>
        <h1 className="section-title text-white mb-4">About AI Agentix</h1>
        <div className="w-12 h-px bg-[#e84d1c] mb-8" />
        <p className="text-[17px] text-[#888] leading-relaxed mb-6">
          AI Agentix is a team of engineers, product builders, and AI strategists dedicated to one mission:
          making agentic AI systems accessible and production-ready for every business.
        </p>
        <p className="text-[17px] text-[#888] leading-relaxed mb-6">
          We don't sell AI hype — we build AI that works. From autonomous agents to n8n workflow automation
          to enterprise LLM integrations, every project we deliver is designed for real operational impact.
        </p>
        <p className="text-[17px] text-[#888] leading-relaxed">
          Based globally, remote-first, and obsessed with the craft of AI engineering.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Write NotFound.jsx**

```jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-center px-6">
      <div>
        <p className="text-[96px] font-display font-black text-[#1a1a1a] leading-none">404</p>
        <h1 className="text-[28px] font-display font-bold text-white mt-4 mb-4">Page not found</h1>
        <p className="text-[#888] mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-accent">Go home →</Link>
      </div>
    </div>
  );
}
```

---

## Task 25: Install Dependencies & Test

- [ ] **Step 1: Install frontend dependencies**

```bash
cd "D:/AI AGENTIX/frontend"
npm install
```

Expected: ~60s install, no peer dependency errors.

- [ ] **Step 2: Install backend dependencies**

```bash
cd "D:/AI AGENTIX/backend"
npm install
```

Expected: ~30s install.

- [ ] **Step 3: Start frontend dev server**

```bash
cd "D:/AI AGENTIX/frontend"
npm run dev
```

Expected: `Local: http://localhost:5173/`

- [ ] **Step 4: Verify the site renders**

Visit `http://localhost:5173` and confirm:
- Announcement banner appears at top (orange-red)
- Navbar is sticky with all nav items
- Hero section loads with video or gradient fallback
- All 12 homepage sections are visible when scrolling
- Contact page works at `/contact`

- [ ] **Step 5: Start backend (optional for full stack)**

```bash
cd "D:/AI AGENTIX/backend"
npm run dev
```

Expected: `Server running on port 5000` (requires MongoDB connection string in .env)

---

## Self-Review Notes

**Spec coverage:**
- ✅ Sections 1-15: All 15 homepage sections implemented
- ✅ Section 2: Design system fully applied via index.css + tailwind.config.js
- ✅ Section 3: All component specs followed
- ✅ Section 4: File structure matches spec (adapted to monorepo)
- ✅ Section 5: All Mongoose models in models/index.js
- ✅ Section 6: All API endpoints in routes/
- ✅ Section 7: Both package.json files match spec dependencies
- ✅ Section 8: server.js matches spec exactly
- ✅ Section 9: motion.js variants + Tailwind config match spec
- ✅ Docker compose provided

**Gaps identified and addressed:**
- Navbar.jsx and HeroSection.jsx are provided in `files/` — plan uses COPY instructions
- Video asset from `files/video-1080p.mp4` needs copying to `frontend/public/assets/`
- Backend seed script needs path correction (`../models/index.js`)
