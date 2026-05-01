import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../lib/api.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaArrowRight, FaClock, FaTag, FaRss,
} from 'react-icons/fa6';

const STATIC_POSTS = [
  {
    _id: 's1', slug: '#', categories: ['Agentic AI'],
    publishedAt: '2026-03-15', readTime: 8,
    title: 'Building Production-Ready AI Agents: Architecture Patterns That Scale',
    excerpt: 'The gap between a demo agent and a production agent is enormous. We break down the architecture decisions that determine whether your AI agent survives real-world usage.',
    featured: true,
  },
  {
    _id: 's2', slug: '#', categories: ['LLM Integration'],
    publishedAt: '2026-03-01', readTime: 6,
    title: 'RAG vs Fine-Tuning: The Decision Framework We Use With Every Client',
    excerpt: 'After 40+ RAG deployments and dozens of fine-tuning projects, here is how we actually decide which approach fits each use case — and when to combine both.',
  },
  {
    _id: 's3', slug: '#', categories: ['n8n Automation'],
    publishedAt: '2026-02-18', readTime: 10,
    title: 'n8n at Enterprise Scale: How We Handle 2M+ Workflow Executions Per Month',
    excerpt: 'Most n8n guides cover the basics. This post covers what happens when your workflows hit production scale — error handling, monitoring, and performance at volume.',
  },
  {
    _id: 's4', slug: '#', categories: ['MLOps'],
    publishedAt: '2026-02-05', readTime: 7,
    title: 'MLOps in 2026: What Actually Matters and What Is Just Tooling Noise',
    excerpt: 'The MLOps landscape is crowded with tools. We cut through the noise and explain the practices that prevent model degradation, reduce incident response time, and keep AI systems reliable.',
  },
  {
    _id: 's5', slug: '#', categories: ['AI Strategy'],
    publishedAt: '2026-01-22', readTime: 5,
    title: 'The AI Readiness Assessment: How to Honestly Evaluate Your Organisation',
    excerpt: 'Before you invest in AI, you need to understand where you actually stand. This is the readiness framework we use in every consulting engagement.',
  },
  {
    _id: 's6', slug: '#', categories: ['Generative AI'],
    publishedAt: '2026-01-10', readTime: 9,
    title: 'Guardrails for Enterprise GenAI: A Practical Implementation Guide',
    excerpt: 'Hallucinations, prompt injection, and data leakage are real production risks. Here is how to build guardrails that actually work without destroying your LLM\'s capability.',
  },
  {
    _id: 's7', slug: '#', categories: ['AI Agents'],
    publishedAt: '2025-12-18', readTime: 11,
    title: 'Multi-Agent Systems: When to Use Them and How to Keep Them from Going Off the Rails',
    excerpt: 'Multi-agent architectures can handle complex tasks but introduce coordination failures, infinite loops, and cost explosions. Learn what we have learned the hard way.',
  },
  {
    _id: 's8', slug: '#', categories: ['Data Engineering'],
    publishedAt: '2025-12-05', readTime: 6,
    title: 'The Modern AI Data Stack: Building a Foundation That Actually Supports Machine Learning',
    excerpt: 'Without good data infrastructure, AI projects fail slowly and expensively. This is the data stack architecture we recommend for teams starting their AI journey.',
  },
  {
    _id: 's9', slug: '#', categories: ['LLM Integration'],
    publishedAt: '2025-11-22', readTime: 8,
    title: 'Prompt Engineering Is Not Dead — It Just Grew Up',
    excerpt: 'Despite claims that "just use GPT-4" is sufficient, production prompt engineering is a real discipline with measurable impact on output quality, reliability, and cost.',
  },
];

const ALL_CATEGORIES = ['All', 'Agentic AI', 'LLM Integration', 'n8n Automation', 'MLOps', 'AI Strategy', 'Generative AI', 'AI Agents', 'Data Engineering'];

const CATEGORY_GRADIENTS = {
  'Agentic AI':     'linear-gradient(135deg, #F26522 0%, #C93D00 100%)',
  'LLM Integration':'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
  'n8n Automation': 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
  'MLOps':          'linear-gradient(135deg, #34D399 0%, #059669 100%)',
  'AI Strategy':    'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
  'Generative AI':  'linear-gradient(135deg, #F472B6 0%, #DB2777 100%)',
  'AI Agents':      'linear-gradient(135deg, #F26522 0%, #38BDF8 100%)',
  'Data Engineering':'linear-gradient(135deg, #6EE7B7 0%, #10B981 100%)',
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function FeaturedCard({ post }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const cat = post.categories?.[0] || 'Article';
  const gradient = CATEGORY_GRADIENTS[cat] || CATEGORY_GRADIENTS['Agentic AI'];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] overflow-hidden rounded-2xl border border-[#1A3050] group hover:border-[#F26522]/50 transition-all duration-300">
        {/* Left — gradient visual */}
        <div
          className="relative min-h-[280px] flex items-center justify-center overflow-hidden"
          style={{ background: gradient }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 text-center px-10">
            <span className="inline-block text-[11px] uppercase tracking-widest bg-white/20 text-white font-bold px-4 py-1.5 rounded-full mb-4">
              Featured Article
            </span>
            <p className="text-white/80 text-[13px]">{formatDate(post.publishedAt)}</p>
          </div>
          {/* Large decorative number */}
          <span className="absolute bottom-4 right-6 text-[120px] font-black text-white/10 leading-none select-none font-display">
            01
          </span>
        </div>

        {/* Right — content */}
        <div className="bg-[#0D1E3A] p-10 flex flex-col justify-center">
          <span
            className="inline-block text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full mb-5 w-fit"
            style={{ background: 'rgba(242,101,34,0.15)', color: '#F26522' }}
          >
            {cat}
          </span>
          <h2 className="font-display font-black text-white text-[1.6rem] leading-snug mb-4 group-hover:text-[#F26522] transition-colors">
            {post.title}
          </h2>
          <p className="text-[#7A8FA6] text-[15px] leading-relaxed mb-6">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-[12px] text-[#4A6080]">
              <span className="flex items-center gap-1.5"><FaClock size={11} /> {post.readTime} min read</span>
            </div>
            <span className="flex items-center gap-2 text-[#F26522] font-semibold text-[13px] group-hover:gap-3 transition-all">
              Read article <FaArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PostCard({ post, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const cat = post.categories?.[0] || 'Article';
  const gradient = CATEGORY_GRADIENTS[cat] || CATEGORY_GRADIENTS['Agentic AI'];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ delay: (index % 3) * 0.08 }}
      className="h-full"
    >
      <div className="flex flex-col h-full rounded-xl border border-[#1A3050] bg-[#0D1E3A] overflow-hidden group hover:border-[#F26522]/40 hover:-translate-y-1 transition-all duration-300">
        {/* Top color bar */}
        <div className="h-1.5 w-full" style={{ background: gradient }} />

        <div className="p-7 flex flex-col flex-1">
          {/* Category + date */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(242,101,34,0.12)', color: '#F26522' }}
            >
              {cat}
            </span>
            <span className="text-[11px] text-[#4A6080]">
              {formatDate(post.publishedAt)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-white text-[16px] leading-snug mb-3 group-hover:text-[#F26522] transition-colors flex-1">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[13px] text-[#5A7090] leading-relaxed mb-5">
            {(post.excerpt || '').slice(0, 120)}{post.excerpt?.length > 120 ? '…' : ''}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1A3050]">
            <span className="flex items-center gap-1.5 text-[11px] text-[#4A6080]">
              <FaClock size={10} /> {post.readTime} min
            </span>
            <span className="text-[12px] font-semibold text-[#F26522] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              Read more <FaArrowRight size={10} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data, isLoading } = useQuery({
    queryKey: ['posts', { page: 1 }],
    queryFn: () => fetchPosts({ page: 1, limit: 9 }),
  });
  const apiPosts = data?.data || [];
  const allPosts = apiPosts.length > 0 ? apiPosts : STATIC_POSTS;

  const featuredPost = allPosts.find(p => p.featured) || allPosts[0];
  const filtered = activeCategory === 'All'
    ? allPosts.filter(p => p._id !== featuredPost?._id)
    : allPosts.filter(p => p.categories?.[0] === activeCategory && p._id !== featuredPost?._id);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Helmet>
        <title>Blog — AI Agentix Insights & Research</title>
        <meta name="description" content="Insights, research, and practical guides on AI agents, n8n automation, LLM integration, and enterprise AI from the AI Agentix team." />
        <link rel="canonical" href="https://ai-agentix.com/blog" />
      </Helmet>

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative border-b border-[#1A3050] overflow-hidden" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #F26522 0%, transparent 70%)' }}
        />

        <div className="max-w-[1240px] mx-auto px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] uppercase tracking-widest text-[#F26522] font-bold mb-4 inline-flex items-center gap-2">
              <FaRss size={10} /> Insights & Research
            </span>
            <h1
              className="font-display font-black text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.025em' }}
            >
              The AI Agentix <span style={{ color: '#F26522' }}>Blog</span>
            </h1>
            <div className="w-12 h-1 bg-[#F26522] rounded-full mb-5" />
            <p className="text-[#7A8FA6] text-lg max-w-xl leading-relaxed">
              No fluff. Practical deep-dives on building production AI systems — from agentic architectures to MLOps to enterprise LLM integration.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-8 mt-10"
          >
            {[
              { value: '50+', label: 'Articles published' },
              { value: '8', label: 'Topic categories' },
              { value: 'Monthly', label: 'New content' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-[22px] font-display font-black text-[#F26522]">{stat.value}</p>
                <p className="text-[11px] text-[#4A6080] uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ──────────────────── */}
      <div className="sticky top-[72px] z-10 bg-[#0A1628] border-b border-[#1A3050]">
        <div className="max-w-[1240px] mx-auto px-12 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-wide transition-all duration-200"
              style={{
                background: activeCategory === cat ? '#F26522' : 'transparent',
                color: activeCategory === cat ? '#fff' : '#4A6080',
                border: activeCategory === cat ? '1px solid #F26522' : '1px solid #1A3050',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── FEATURED POST ────────────────────── */}
      {featuredPost && activeCategory === 'All' && (
        <section className="max-w-[1240px] mx-auto px-12 pt-14 pb-10">
          <p className="text-[11px] uppercase tracking-widest text-[#4A6080] font-semibold mb-6">Featured</p>
          <FeaturedCard post={featuredPost} />
        </section>
      )}

      {/* ── POSTS GRID ───────────────────────── */}
      <section className="max-w-[1240px] mx-auto px-12 pb-20" style={{ paddingTop: activeCategory === 'All' ? '0' : '48px' }}>
        {activeCategory !== 'All' && (
          <p className="text-[11px] uppercase tracking-widest text-[#4A6080] font-semibold mb-6 flex items-center gap-2">
            <FaTag size={10} /> {activeCategory}
          </p>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl border border-[#1A3050] bg-[#0D1E3A] h-64 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#4A6080] text-[16px]">No articles in this category yet.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 text-[#F26522] font-semibold text-[14px] hover:underline"
            >
              View all articles →
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((post, i) => (
                <PostCard key={post._id} post={post} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* ── NEWSLETTER CTA ───────────────────── */}
      <section
        className="border-t border-[#1A3050] py-20"
        style={{ background: 'linear-gradient(135deg, #0D1E3A 0%, #0A1628 100%)' }}
      >
        <div className="max-w-[1240px] mx-auto px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] uppercase tracking-widest text-[#F26522] font-bold mb-4 inline-block">
              Stay Updated
            </span>
            <h2 className="font-display font-black text-white text-3xl mb-3">
              Get new posts in your inbox
            </h2>
            <p className="text-[#7A8FA6] mb-8 max-w-md mx-auto">
              Monthly digest of our best AI engineering insights — no spam, unsubscribe any time.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#F26522] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#FF7A3D] transition-colors text-[15px]"
            >
              Subscribe via Contact <FaArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
