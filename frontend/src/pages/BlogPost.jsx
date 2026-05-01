import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaCircleXmark,
  FaHourglassHalf,
  FaLink,
  FaCheck,
  FaLinkedinIn,
  FaXTwitter,
  FaArrowLeft,
  FaTag,
} from 'react-icons/fa6';
import { fetchPostBySlug } from '../lib/api.js';
import { format } from 'date-fns';

/* ─── Fade-in animation wrapper ─── */
function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Author initials avatar ─── */
function Avatar({ name }) {
  const initials = (name || 'AI')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <span className="w-10 h-10 rounded-full bg-[#F26522] flex items-center justify-center text-white text-[13px] font-black shrink-0">
      {initials}
    </span>
  );
}

/* ─── Loading skeleton ─── */
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
      <div className="w-full max-w-[620px] px-8 space-y-5">
        <div className="h-4 w-24 rounded-full bg-[#1A3050] animate-pulse" />
        <div className="h-10 w-full rounded-lg bg-[#1A3050] animate-pulse" />
        <div className="h-10 w-3/4 rounded-lg bg-[#1A3050] animate-pulse" />
        <div className="h-4 w-48 rounded-full bg-[#1A3050] animate-pulse mt-6" />
        <div className="mt-8 space-y-3">
          <div className="h-3 w-full rounded bg-[#1A3050] animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-[#1A3050] animate-pulse" />
          <div className="h-3 w-4/5 rounded bg-[#1A3050] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/* ─── Error / not-found state ─── */
function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0D1E3A] border border-[#1A3050] rounded-2xl px-12 py-16 max-w-[480px] w-full text-center"
      >
        <FaCircleXmark className="text-[#F26522] text-[52px] mx-auto mb-6" />
        <h1 className="font-display font-black text-white text-[26px] mb-3">
          Article Not Found
        </h1>
        <p className="text-[#888] text-[15px] leading-relaxed mb-8">
          This article may have been moved or removed. Browse our latest content below.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 bg-[#F26522] hover:bg-[#d9561b] text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          <FaArrowLeft className="text-[13px]" />
          Back to Blog
        </Link>
      </motion.div>
    </div>
  );
}

/* ─── Share sidebar widget ─── */
function ShareWidget({ title }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title || '')}`;

  return (
    <div className="bg-[#0D1E3A] border border-[#1A3050] rounded-xl p-6 mb-6">
      <p className="text-[11px] uppercase tracking-widest text-[#888] font-semibold mb-4">
        Share this article
      </p>
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-between gap-3 border border-[#1A3050] hover:border-[#F26522] text-[#888] hover:text-[#F26522] rounded-lg px-4 py-3 text-[13px] transition-colors mb-3"
      >
        <span className="flex items-center gap-2">
          {copied ? <FaCheck className="text-green-400" /> : <FaLink />}
          {copied ? 'Link copied!' : 'Copy link'}
        </span>
      </button>
      <div className="flex gap-3">
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#0077B5] hover:bg-[#005f91] text-white rounded-lg px-4 py-3 text-[13px] font-medium transition-colors"
        >
          <FaLinkedinIn />
          LinkedIn
        </a>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#14171A] hover:bg-[#2c2f33] border border-[#1A3050] text-white rounded-lg px-4 py-3 text-[13px] font-medium transition-colors"
        >
          <FaXTwitter />
          X / Twitter
        </a>
      </div>
    </div>
  );
}

/* ─── Related topics sidebar widget ─── */
const RELATED_TOPICS = [
  'AI Agents',
  'Enterprise Automation',
  'Machine Learning',
  'Workflow Optimization',
  'LLM Integration',
];

function RelatedTopics() {
  return (
    <div className="bg-[#0D1E3A] border border-[#1A3050] rounded-xl p-6 mb-6">
      <p className="text-[11px] uppercase tracking-widest text-[#888] font-semibold mb-4">
        Related Topics
      </p>
      <ul className="space-y-2">
        {RELATED_TOPICS.map((topic) => (
          <li key={topic}>
            <Link
              to="/blog"
              className="flex items-center gap-2 text-[14px] text-[#aaa] hover:text-[#F26522] transition-colors group"
            >
              <FaTag className="text-[10px] text-[#1A3050] group-hover:text-[#F26522] transition-colors" />
              {topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Subscribe sidebar widget ─── */
function SubscribeWidget() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <div className="bg-gradient-to-br from-[#0D1E3A] to-[#0A1628] border border-[#1A3050] rounded-xl p-6">
      <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-2">
        Newsletter
      </p>
      <p className="text-white font-display font-bold text-[17px] mb-1">
        Stay ahead in AI
      </p>
      <p className="text-[#888] text-[13px] mb-5 leading-relaxed">
        Monthly insights on enterprise AI, delivered to your inbox.
      </p>
      {submitted ? (
        <div className="flex items-center gap-2 text-green-400 text-[14px] font-medium">
          <FaCheck />
          You're subscribed!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#0A1628] border border-[#1A3050] focus:border-[#F26522] text-white placeholder-[#555] rounded-lg px-4 py-3 text-[13px] outline-none transition-colors"
          />
          <button
            type="submit"
            className="w-full bg-[#F26522] hover:bg-[#d9561b] text-white font-semibold rounded-lg px-4 py-3 text-[13px] transition-colors"
          >
            Subscribe →
          </button>
        </form>
      )}
    </div>
  );
}

/* ─── Main page component ─── */
export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPostBySlug(slug),
  });

  if (isLoading) return <LoadingSkeleton />;
  if (isError || !post) return <ArticleNotFound />;

  const authorName = post.authorName || 'AI Agentix Team';
  const formattedDate = post.publishedAt
    ? format(new Date(post.publishedAt), 'MMMM d, yyyy')
    : null;

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Helmet>
        <title>{post.title} — AI Agentix Blog</title>
        <meta
          name="description"
          content={post.excerpt || 'AI Agentix blog article on enterprise AI, agents, and automation.'}
        />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ''} />
        {post.coverImage && <meta property="og:image" content={post.coverImage} />}
        <link rel="canonical" href={`https://ai-agentix.com/blog/${post.slug}`} />
      </Helmet>

      {/* ── ARTICLE HERO ── */}
      <section className="bg-[#0A1628] pt-[120px] pb-0">
        <div className="max-w-[900px] mx-auto px-8">
          <FadeIn>
            {post.categories?.[0] && (
              <span className="inline-block bg-[#F26522] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                {post.categories[0]}
              </span>
            )}
            <h1
              className="font-display font-black text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex items-center gap-4 mb-8">
              <Avatar name={authorName} />
              <div>
                <p className="text-white text-[14px] font-semibold">{authorName}</p>
                <div className="flex items-center gap-3 text-[13px] text-[#888] mt-0.5">
                  {formattedDate && <span>{formattedDate}</span>}
                  {post.readTime && (
                    <>
                      <span className="text-[#1A3050]">·</span>
                      <span>{post.readTime} min read</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Orange divider */}
            <div className="h-[3px] w-[60px] bg-[#F26522] rounded-full mb-0" />
          </FadeIn>
        </div>
      </section>

      {/* ── COVER IMAGE ── */}
      {post.coverImage ? (
        <FadeIn delay={0.1}>
          <div className="w-full overflow-hidden mt-10">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-[420px] object-cover"
            />
          </div>
        </FadeIn>
      ) : (
        <div className="w-full h-[200px] bg-gradient-to-r from-[#0D1E3A] to-[#1A3050] flex items-center justify-center mt-10">
          {post.categories?.[0] && (
            <span className="text-[#888] text-[13px] uppercase tracking-widest font-semibold">
              {post.categories[0]}
            </span>
          )}
        </div>
      )}

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div className="max-w-[1100px] mx-auto px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">

          {/* LEFT: Article content */}
          <div>
            {/* Excerpt */}
            {post.excerpt && (
              <FadeIn>
                <p className="text-[19px] text-[#888] italic border-l-4 border-[#F26522] pl-6 mb-10 leading-relaxed">
                  {post.excerpt}
                </p>
              </FadeIn>
            )}

            {/* Content */}
            <FadeIn delay={0.05}>
              {post.content ? (
                <div
                  className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-[#aaa] prose-p:leading-relaxed prose-a:text-[#F26522] prose-strong:text-white prose-code:text-[#38BDF8] prose-pre:bg-[#0D1E3A] prose-blockquote:border-[#F26522] prose-blockquote:text-[#888] prose-li:text-[#aaa]"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#1A3050] rounded-xl">
                  <FaHourglassHalf className="text-[#F26522] text-[36px] mb-4" />
                  <p className="text-white font-display font-bold text-[18px] mb-2">
                    Full article coming soon
                  </p>
                  <p className="text-[#555] text-[14px]">
                    We're putting the finishing touches on this piece. Check back shortly.
                  </p>
                </div>
              )}
            </FadeIn>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <FadeIn delay={0.1}>
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-[#1A3050]">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#e5e5e5] border-opacity-20 text-[#888] px-3 py-1 rounded text-[12px] uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Author bio card */}
            <FadeIn delay={0.12}>
              <div className="mt-10 bg-[#0D1E3A] border border-[#1A3050] rounded-xl p-6 flex gap-5 items-start">
                <Avatar name={authorName} />
                <div>
                  <p className="text-white font-semibold text-[15px] mb-0.5">{authorName}</p>
                  <p className="text-[#888] text-[13px] mb-3">AI Agentix Team</p>
                  <Link
                    to="/blog"
                    className="text-[#F26522] text-[13px] font-medium hover:underline"
                  >
                    Read all posts →
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT: Sidebar */}
          <aside className="lg:sticky lg:top-24 self-start space-y-0">
            <FadeIn delay={0.15}>
              <ShareWidget title={post.title} />
              <RelatedTopics />
              <SubscribeWidget />
            </FadeIn>
          </aside>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#0D1E3A] py-16">
        <div className="max-w-[680px] mx-auto px-8 text-center">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-3">
              Stay in the loop
            </p>
            <h2 className="font-display font-black text-white text-[28px] md:text-[34px] mb-4">
              Enjoyed this article?
            </h2>
            <p className="text-[#888] text-[16px] mb-8 leading-relaxed">
              Subscribe for monthly AI insights, case studies, and practical automation guides from our team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#F26522] hover:bg-[#d9561b] text-white font-semibold px-8 py-4 rounded-full transition-colors text-[15px]"
            >
              Subscribe for monthly AI insights →
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
