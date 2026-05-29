import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, GraduationCap, Building2, ShoppingCart, Truck, Factory, Hotel,
  Star, ArrowRight, ChevronRight, CheckCircle, Quote, Zap, TrendingUp,
  Clock, X, MapPin, Users, BarChart3, BookOpen, ChevronLeft,
} from 'lucide-react';
import SiteNav from '../../components/layout/SiteNav.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../voice-agent/VoiceAgentWidget.jsx';
import '../../styles/ax-brand.css';

const VP = { once: true, margin: '-80px' };
const up = (d = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

const INDUSTRIES = ['All', 'Healthcare', 'Education', 'Real Estate', 'E-commerce', 'Logistics', 'Hospitality', 'Manufacturing'];

const CASES = [
  {
    id: 'healthcare', industry: 'Healthcare', icon: <Heart size={20} />, color: '#EC4899',
    client: 'Multi-Specialty Clinic Chain', location: 'New Delhi',
    tagline: 'From 35% No-Show Rate to Full Appointment Books',
    readTime: '5 min read',
    excerpt: 'A 12-doctor clinic was losing ₹8L every month to no-shows and overwhelmed front desk staff. Here\'s how AI automation recovered it all in 8 weeks.',
    challenge: 'A 12-doctor clinic losing ₹8L/month to no-shows. Front desk of 4 overwhelmed with 300+ daily calls — reminders and rescheduling consumed 80% of working hours.',
    background: 'The clinic had tried SMS reminders manually, but inconsistent follow-up meant patients simply forgot. Staff morale was low from repetitive calling work. Revenue leakage was consistent and growing.',
    solution: [
      'AI voice agent handling all inbound calls 24/7 with natural Hindi/English conversations',
      'Automated 3-touch reminder sequence (48h, 24h, 2h before appointment)',
      'Smart rescheduling with real-time slot availability from clinic calendar',
      'Post-consultation follow-up flows for prescription reminders and review requests',
      'Google Reviews automation triggered post each successful visit',
    ],
    process: [
      { step: '01', title: 'Audit & Mapping', desc: 'Week 1–2: mapped all patient touchpoints, call scripts, and appointment flows.' },
      { step: '02', title: 'AI Voice Build', desc: 'Week 2–4: built voice agent trained on clinic protocols, specialties, and doctor schedules.' },
      { step: '03', title: 'Integration', desc: 'Week 4–6: connected to clinic management software, Google Calendar, and WhatsApp.' },
      { step: '04', title: 'Launch & Tune', desc: 'Week 6–8: went live, monitored calls daily, refined scripts based on patient responses.' },
    ],
    stats: [
      { v: '65%', l: 'Reduction in no-shows', s: 'From 35% to 12%' },
      { v: '₹8L', l: 'Monthly revenue recovered', s: 'Previously lost to empty slots' },
      { v: '4→1', l: 'Front desk reduction', s: 'One person now handles 4 people\'s work' },
      { v: '4.2★', l: 'Google rating increase', s: 'From 3.1 stars in 4 months' },
    ],
    timeline: '8 weeks',
    quote: 'We went from dreading Mondays to looking forward to them. The AI handles everything our front desk used to dread.',
    quoteBy: 'Dr. Priya Sharma — Medical Director',
    tags: ['Voice AI', 'Appointment Automation', 'WhatsApp', 'Google Reviews'],
  },
  {
    id: 'healthcare-2', industry: 'Healthcare', icon: <Heart size={20} />, color: '#EC4899',
    client: 'Multi-City Dental Chain (8 Clinics)', location: 'Bengaluru, Karnataka',
    tagline: '60% More Bookings Without Adding Staff',
    readTime: '4 min read',
    excerpt: '8-clinic dental chain with scattered appointment systems and zero follow-up. AI unified operations and tripled re-booking rates in 10 weeks.',
    challenge: 'Each clinic ran its own WhatsApp number, no centralized booking, and patients were lost after first visit. Re-visit rate was 22% — far below the industry average of 60%.',
    background: 'The chain expanded from 3 to 8 clinics but the ops never scaled. Reception staff at each clinic were managing calls, WhatsApp, and walk-ins simultaneously with no coordination between branches.',
    solution: [
      'Centralized AI voice agent across all 8 clinic numbers with branch routing',
      'Treatment follow-up automation: post-visit care instructions via WhatsApp',
      'Recall sequences for cleaning, check-up, and ongoing treatments',
      'New patient onboarding flow with digital intake forms via WhatsApp',
      'Doctor availability sync across all 8 locations in real time',
    ],
    process: [
      { step: '01', title: 'Clinic Audit', desc: 'Week 1–2: mapped inbound call volumes, staff time splits, and patient journey gaps per clinic.' },
      { step: '02', title: 'Centralized System Build', desc: 'Week 2–5: built unified voice agent with branch routing and shared appointment calendar.' },
      { step: '03', title: 'Follow-Up Flows', desc: 'Week 5–7: deployed recall and care instruction sequences across all patient segments.' },
      { step: '04', title: 'Intake Digitization', desc: 'Week 7–10: launched WhatsApp digital intake replacing paper forms at all 8 locations.' },
    ],
    stats: [
      { v: '60%', l: 'More bookings', s: 'Without adding reception staff' },
      { v: '58%', l: 'Re-visit rate', s: 'Up from 22% — near industry average' },
      { v: '8→1', l: 'Unified inbox', s: 'All 8 clinic numbers centralized' },
      { v: '₹5.4L', l: 'Monthly revenue increase', s: 'From recalls and re-bookings' },
    ],
    timeline: '10 weeks',
    quote: 'Patients who came once now come back. The recall system remembers things our staff never could.',
    quoteBy: 'Dr. Kavita Nair — Co-Founder, SmilePlus Dental',
    tags: ['Appointment Automation', 'WhatsApp', 'Patient Recall', 'Multi-Location'],
  },
  {
    id: 'healthcare-3', industry: 'Healthcare', icon: <Heart size={20} />, color: '#EC4899',
    client: 'Standalone Diagnostic Centre', location: 'Ahmedabad, Gujarat',
    tagline: 'Report Delivery Automated — Zero Manual Calls',
    readTime: '4 min read',
    excerpt: 'Lab staff spending 3 hours daily calling patients for report status. AI automated the entire post-test communication cycle.',
    challenge: 'Staff making 200+ manual calls daily to inform patients about report readiness. 30% of calls went unanswered, leading to complaints and uncollected reports.',
    background: 'The diagnostic centre was growing from 100 to 300 tests per day but the report notification process was entirely manual. Patients would call repeatedly asking for updates, tying up staff during peak hours.',
    solution: [
      'Automated WhatsApp notification when report is uploaded to the system',
      'AI voice call for patients who don\'t open WhatsApp within 2 hours',
      'Digital report delivery with secure link — eliminates physical collection',
      'Appointment reminder sequence for follow-up consultations',
      'Home collection booking automation with slot and phlebotomist assignment',
    ],
    process: [
      { step: '01', title: 'Workflow Mapping', desc: 'Week 1: documented the full report lifecycle from sample collection to patient delivery.' },
      { step: '02', title: 'LIS Integration', desc: 'Week 1–3: connected to lab information system to trigger notifications on report upload.' },
      { step: '03', title: 'Notification Build', desc: 'Week 3–4: built WhatsApp + voice fallback notification cascade.' },
      { step: '04', title: 'Home Collection', desc: 'Week 4–5: automated home collection booking with phlebotomist calendar sync.' },
    ],
    stats: [
      { v: '0', l: 'Manual report calls', s: 'Down from 200+ per day' },
      { v: '94%', l: 'First-touch delivery', s: 'Patients notified on first attempt' },
      { v: '3 hrs', l: 'Staff time reclaimed daily', s: 'Redeployed to patient care' },
      { v: '₹2.8L', l: 'Monthly overhead saved', s: 'Equivalent to 2 staff salaries' },
    ],
    timeline: '5 weeks',
    quote: 'Patients text us saying they got their report before they even left the parking lot. That\'s the reaction we wanted.',
    quoteBy: 'Manish Agarwal — Director, HealthScan Diagnostics',
    tags: ['Report Automation', 'WhatsApp Delivery', 'Patient Communication', 'Home Collection'],
  },
  {
    id: 'healthcare-4', industry: 'Healthcare', icon: <Heart size={20} />, color: '#EC4899',
    client: 'Pharmacy Chain (15 Outlets)', location: 'Chennai, Tamil Nadu',
    tagline: 'Prescription Refill Revenue Up ₹9L/Month on Autopilot',
    readTime: '5 min read',
    excerpt: 'Pharmacy chain losing repeat customers to online pharmacies. AI-powered refill reminders and doorstep delivery automation changed everything.',
    challenge: 'Losing 40% of repeat prescription customers to online platforms. No system to track when chronic disease patients needed refills. Counter staff too busy to make proactive calls.',
    background: 'The chain had built strong neighbourhood presence but online pharmacies were winning on convenience. Customers with chronic conditions were the highest-value segment — once lost, they rarely returned.',
    solution: [
      'Prescription tracking with automated refill reminders 3 days before medicine runs out',
      'WhatsApp order placement — photo of prescription to order in 60 seconds',
      'Doorstep delivery coordination with WhatsApp tracking link',
      'Loyalty points automation with monthly balance reminders',
      'Doctor referral network — automated sample requests and tie-up management',
    ],
    process: [
      { step: '01', title: 'Patient Database', desc: 'Week 1–2: digitized prescription history for 8,000+ repeat customers across 15 outlets.' },
      { step: '02', title: 'Refill Engine', desc: 'Week 2–4: built refill prediction model and WhatsApp reminder sequences per medication type.' },
      { step: '03', title: 'Order Flow', desc: 'Week 4–6: launched WhatsApp ordering with prescription photo processing and confirmation.' },
      { step: '04', title: 'Delivery Sync', desc: 'Week 6–7: integrated delivery partner API for real-time tracking messages to customers.' },
    ],
    stats: [
      { v: '₹9L', l: 'Refill revenue added/month', s: 'Without adding marketing spend' },
      { v: '68%', l: 'Repeat customer retention', s: 'Up from 42% vs. online competition' },
      { v: '15 outlets', l: 'Fully coordinated', s: 'Single WhatsApp system across all' },
      { v: '4.5★', l: 'Google rating', s: 'After review automation deployed' },
    ],
    timeline: '7 weeks',
    quote: 'Customers who were switching to online pharmacies are now our most loyal. Convenience beats price every time.',
    quoteBy: 'Anand Krishnan — CEO, MedPlus Neighbourhood',
    tags: ['Pharmacy Automation', 'Prescription Refill', 'WhatsApp Commerce', 'Customer Retention'],
  },
  {
    id: 'healthcare-5', industry: 'Healthcare', icon: <Heart size={20} />, color: '#EC4899',
    client: 'Ayurveda & Wellness Retreat', location: 'Thrissur, Kerala',
    tagline: 'International Patient Bookings Up 3x With Zero Travel Agents',
    readTime: '4 min read',
    excerpt: 'A premium Ayurveda retreat attracting wellness tourists from Europe and the Gulf — but losing them to travel agents\' commissions. AI brought them direct.',
    challenge: '70% of international bookings came through travel agents at 25–35% commission. Inquiry response times were 24–48 hours — killing conversions across global time zones.',
    background: 'The retreat had world-class facilities and genuine Ayurvedic credentials, but its digital presence was weak. International wellness tourists would find them, submit an inquiry form, and move on when nobody responded quickly.',
    solution: [
      'Multilingual AI chat (English, German, Arabic) responding to inquiries in under 2 minutes',
      'Automated treatment package recommendations based on health goals submitted in inquiry',
      'Virtual consultation booking for pre-arrival Ayurvedic assessment via WhatsApp Video',
      'Direct booking with payment in INR/USD/EUR via WhatsApp payment link',
      'Post-retreat follow-up with home regimen plans and annual visit reminders',
    ],
    process: [
      { step: '01', title: 'Inquiry Analysis', desc: 'Week 1: analyzed 6 months of email inquiries to identify top questions and drop-off patterns.' },
      { step: '02', title: 'AI Chat Build', desc: 'Week 2–4: built multilingual chat trained on all treatment packages, doctor profiles, and FAQs.' },
      { step: '03', title: 'Booking Flow', desc: 'Week 4–5: configured direct booking with multi-currency payment and calendar integration.' },
      { step: '04', title: 'Post-Visit Automation', desc: 'Week 5–6: launched home regimen delivery and annual return campaign sequences.' },
    ],
    stats: [
      { v: '3x', l: 'International bookings', s: 'Without travel agent dependency' },
      { v: '< 2 min', l: 'First response time', s: 'Down from 24–48 hours' },
      { v: '28%', l: 'Commission savings', s: 'Net margin improvement per booking' },
      { v: '₹12L', l: 'Monthly direct revenue', s: 'Up from ₹4L pre-automation' },
    ],
    timeline: '6 weeks',
    quote: 'A guest in Frankfurt books a 21-day Panchakarma at midnight their time. We wake up to a confirmed booking. That\'s the power.',
    quoteBy: 'Dr. Meera Pillai — Medical Director',
    tags: ['Wellness Tourism', 'Multilingual AI', 'Direct Bookings', 'International Patients'],
  },
  {
    id: 'education', industry: 'Education', icon: <GraduationCap size={20} />, color: '#6366F1',
    client: 'CA & CMA Coaching Institute', location: 'Hyderabad, Telangana',
    tagline: 'Enrollment Conversion Tripled in 90 Days',
    readTime: '6 min read',
    excerpt: '1,200+ monthly enquiries and only 18% converting. Counsellors burning out on repetitive calls. AI transformed this into a lean, high-converting admissions machine.',
    challenge: '1,200+ monthly enquiries. Only 18% converting. Counsellors spending 6hrs/day on repetitive qualification calls, leaving no time for actual counselling.',
    background: 'The institute was running aggressive social media ads but the lead-to-enrollment funnel was leaking badly. Students enquired, got a generic response, and chose a competitor who responded faster or more personally.',
    solution: [
      'Instant lead response (<90 seconds) across WhatsApp, website, and Instagram DMs',
      'AI chat agent with counsellor-quality responses for CA/CMA/CFA track queries',
      'Automated lead scoring and qualification — counsellors only called "hot" leads',
      'Personalized 21-day drip campaign tailored to each exam track',
      'Fee collection via WhatsApp payment links with automated receipt + welcome sequence',
    ],
    process: [
      { step: '01', title: 'Funnel Analysis', desc: 'Week 1: identified exact drop-off points across channels and time-to-respond gaps.' },
      { step: '02', title: 'Knowledge Base Build', desc: 'Week 2–3: trained AI on every course, fee, exam date, and counsellor FAQ.' },
      { step: '03', title: 'Multi-Channel Deploy', desc: 'Week 3–5: deployed across WhatsApp Business, website chat widget, and DM auto-responders.' },
      { step: '04', title: 'Drip Activation', desc: 'Week 5–6: launched segmented nurture sequences for unconverted leads by exam track.' },
    ],
    stats: [
      { v: '55%', l: 'Enrollment conversion', s: 'Up from 18% — 3x improvement' },
      { v: '70%', l: 'Counsellor time saved', s: 'From 6hrs to 1.8hrs/day' },
      { v: '< 90s', l: 'Lead response time', s: 'All 1,200+ enquiries per month' },
      { v: '₹32L', l: 'Additional monthly revenue', s: 'Same marketing spend' },
    ],
    timeline: '6 weeks',
    quote: 'Our counsellors now only talk to students who are genuinely ready to enrol. Conversion went through the roof.',
    quoteBy: 'Rajesh Mehta — Founder & Director',
    tags: ['Lead Automation', 'WhatsApp AI', 'Drip Campaigns', 'EdTech'],
  },
  {
    id: 'education-2', industry: 'Education', icon: <GraduationCap size={20} />, color: '#6366F1',
    client: 'CBSE Day School (2,400 Students)', location: 'Pune, Maharashtra',
    tagline: 'Admission Enquiries Handled 24/7 — Admissions Team Halved',
    readTime: '5 min read',
    excerpt: 'A premier CBSE school with 600+ admission enquiries each January. Staff overwhelmed, follow-up inconsistent. AI fixed all three.',
    challenge: '600+ admission enquiries in a 6-week window. Office staff of 5 handling calls, form processing, and interviews — 30% of hot leads lost to faster-responding competitor schools.',
    background: 'Every January, enquiry season hit the school like a wave. The principal wanted a better parent experience but didn\'t want to add headcount just for 6 weeks.',
    solution: [
      'AI WhatsApp agent answering all admission queries 24/7 — fees, curriculum, facilities, transport',
      'Automated application form dispatch with step-by-step completion guidance',
      'Parent registration for open house events with automated reminders',
      'Principal\'s interview slot booking with calendar integration',
      'Sibling and referral priority tracking with automated confirmation',
    ],
    process: [
      { step: '01', title: 'Query Mapping', desc: 'Week 1: analyzed 3 years of admission call logs to identify top 40 parent questions.' },
      { step: '02', title: 'AI Training', desc: 'Week 2–3: trained WhatsApp agent on school prospectus, admission criteria, and fee structure.' },
      { step: '03', title: 'Application Flow', desc: 'Week 3–4: automated form dispatch, document checklist, and application tracking for parents.' },
      { step: '04', title: 'Event & Interview', desc: 'Week 4–5: launched open house registration and interview scheduling automation.' },
    ],
    stats: [
      { v: '100%', l: 'Enquiries responded', s: 'Within 90 seconds, 24/7' },
      { v: '5→2', l: 'Admissions staff needed', s: 'Same output, half the team' },
      { v: '92%', l: 'Seats filled by week 4', s: 'Vs. week 8 the previous year' },
      { v: '4.8★', l: 'Parent satisfaction score', s: 'Post-admissions survey' },
    ],
    timeline: '5 weeks',
    quote: 'Parents tell us our admission process is better than most private hospitals. That\'s the standard we were aiming for.',
    quoteBy: 'Mrs. Sharma — Principal, Greenwood Academy',
    tags: ['School Admissions', 'Parent Communication', 'WhatsApp AI', 'Event Automation'],
  },
  {
    id: 'education-3', industry: 'Education', icon: <GraduationCap size={20} />, color: '#6366F1',
    client: 'Tier-2 Engineering College', location: 'Nagpur, Maharashtra',
    tagline: 'Campus Placement Rate Jumped from 44% to 71% in One Season',
    readTime: '6 min read',
    excerpt: 'A 1,200-student engineering college with a placement cell stretched thin. AI managed company outreach, student prep, and placement logistics end to end.',
    challenge: 'Placement cell of 3 coordinators managing 1,200 students, 80+ companies, and 5,000+ communications in one season. Student placement rate stuck at 44%.',
    background: 'The placement cell had good company relationships but the volume of coordination — student eligibility tracking, company scheduling, offer letter management — was simply too much for 3 people.',
    solution: [
      'Automated company outreach with personalized JD-matching emails to 300+ firms',
      'Student eligibility tracking dashboard — auto-notified when a JD matches their profile',
      'Interview prep scheduling — coordinators set criteria, AI schedules mock sessions',
      'Offer letter management with digital signing and placement status update to students',
      'Daily placement dashboard for HODs and principal — no manual reporting',
    ],
    process: [
      { step: '01', title: 'Data Cleanup', desc: 'Week 1–2: digitized student profiles, CGPA, backlogs, and skill tags for all 1,200 students.' },
      { step: '02', title: 'Company Outreach', desc: 'Week 2–4: built outreach sequences to 300+ companies with personalized student pool summaries.' },
      { step: '03', title: 'Student Matching', desc: 'Week 4–6: launched auto-matching and notification system for each new JD received.' },
      { step: '04', title: 'Reporting', desc: 'Week 6–7: deployed daily dashboard for leadership and automated offer tracking.' },
    ],
    stats: [
      { v: '71%', l: 'Placement rate', s: 'Up from 44% — in one season' },
      { v: '300+', l: 'Companies reached', s: 'Vs. 80 the previous year' },
      { v: '3 hrs', l: 'Coordinator time saved daily', s: 'From manual communications' },
      { v: '₹4.2L', l: 'Avg. salary package', s: 'Up from ₹3.1L with better company mix' },
    ],
    timeline: '7 weeks',
    quote: 'Companies told us we were the most organized placement cell they\'d worked with. That\'s a first for us.',
    quoteBy: 'Prof. R. Deshmukh — Placement Head',
    tags: ['Campus Placements', 'Company Outreach', 'Student Tracking', 'Automation'],
  },
  {
    id: 'education-4', industry: 'Education', icon: <GraduationCap size={20} />, color: '#6366F1',
    client: 'Online Skill Development Platform', location: 'Bengaluru, Karnataka',
    tagline: 'Course Completion Rate Doubled — Refunds Dropped 70%',
    readTime: '5 min read',
    excerpt: 'A fast-growing EdTech with a completion crisis. 78% of paid students never finished the course. AI engagement automation changed the retention equation.',
    challenge: '78% course drop-off after Week 2. Refund rate of 22%. Support team fielding 400+ monthly "I\'m confused / lost motivation" tickets. NPS of 23.',
    background: 'The platform was great at acquisition — paid traffic, good content, sharp landing pages. But learners felt alone after purchasing. No engagement, no accountability, no nudges.',
    solution: [
      'AI-powered week-by-week check-in via WhatsApp — progress nudges with personalized content links',
      'Peer cohort matching — learners grouped by pace for accountability partner matching',
      'Automated certificate dispatch with LinkedIn posting instructions 24h after completion',
      'Doubt resolution triage — AI handles 70% of FAQs, escalates genuine technical doubts',
      'Re-engagement sequence for learners who haven\'t logged in for 5+ days',
    ],
    process: [
      { step: '01', title: 'Drop-Off Analysis', desc: 'Week 1: mapped exact chapters where learners dropped — 68% dropped in Module 2.' },
      { step: '02', title: 'Engagement Flows', desc: 'Week 2–4: built personalized check-in sequences triggered by LMS activity data.' },
      { step: '03', title: 'Support Triage', desc: 'Week 4–5: deployed FAQ AI trained on all course content, doubt patterns, and instructor notes.' },
      { step: '04', title: 'Completion & Social', desc: 'Week 5–6: launched certificate automation and LinkedIn share flow post-completion.' },
    ],
    stats: [
      { v: '2x', l: 'Course completion rate', s: 'From 22% to 44%' },
      { v: '70%', l: 'Refund reduction', s: 'Fewer disengaged learners dropping' },
      { v: '58', l: 'NPS score', s: 'Up from 23 in 3 months' },
      { v: '400%', l: 'LinkedIn mentions', s: 'From certificate share automation' },
    ],
    timeline: '6 weeks',
    quote: 'We stopped selling courses and started delivering outcomes. AI made that shift operationally possible.',
    quoteBy: 'Arjun Shetty — CEO, SkillForge',
    tags: ['EdTech Retention', 'WhatsApp Engagement', 'LMS Integration', 'Certificate Automation'],
  },
  {
    id: 'education-5', industry: 'Education', icon: <GraduationCap size={20} />, color: '#6366F1',
    client: 'Foreign Language Institute', location: 'Delhi',
    tagline: 'Student Retention at 89% — Highest in Institute History',
    readTime: '4 min read',
    excerpt: 'Language institute losing 35% of students between Level 1 and Level 2. AI built a continuity bridge that made dropping out feel like the wrong choice.',
    challenge: '35% of students didn\'t enroll for Level 2 after completing Level 1. Admin staff manually calling 200+ students each month for renewals — time-consuming with low conversion.',
    background: 'The institute offered 6-level French, German, and Spanish courses. The hardest transition was Level 1 to Level 2 — students felt the initial excitement had worn off.',
    solution: [
      'Personalized Level 2 upsell sequence starting 3 weeks before Level 1 completion',
      'AI chat agent handling batch timing, pricing, and placement test questions 24/7',
      'Progress celebration messages at each milestone — vocabulary, conversation, grammar badges',
      'Alumni outcome stories shared automatically to motivate current learners',
      'Teacher feedback automation — structured weekly report to parents of junior learners',
    ],
    process: [
      { step: '01', title: 'Drop-Off Mapping', desc: 'Week 1: identified exact trigger points where Level 1 students chose not to continue.' },
      { step: '02', title: 'Upsell Sequence', desc: 'Week 2–3: built Level 2 promotion campaign triggered by Level 1 completion milestone.' },
      { step: '03', title: 'Progress Gamification', desc: 'Week 3–4: launched milestone celebration messages and badge delivery via WhatsApp.' },
      { step: '04', title: 'Parent Communication', desc: 'Week 4–5: automated weekly progress reports for junior student parents.' },
    ],
    stats: [
      { v: '89%', l: 'Level 1→2 retention', s: 'Up from 65% — institute record' },
      { v: '3 weeks', l: 'Earlier upsell trigger', s: 'Vs. week-of-completion calls' },
      { v: '₹3.6L', l: 'Monthly renewal revenue', s: 'Previously lost to drop-offs' },
      { v: '4.9★', l: 'Google rating', s: 'Highest-rated language institute in Delhi' },
    ],
    timeline: '5 weeks',
    quote: 'Students tell us they feel celebrated, not sold to. That subtle difference is everything in education.',
    quoteBy: 'Priya Verma — Director, LinguaLearn',
    tags: ['Student Retention', 'WhatsApp Engagement', 'Renewal Automation', 'Language Learning'],
  },
  {
    id: 'real-estate', industry: 'Real Estate', icon: <Building2 size={20} />, color: '#E8631A',
    client: 'Residential Developer — 500-unit Project', location: 'Mumbai, Maharashtra',
    tagline: 'Lead-to-Site-Visit Time Cut from 5 Days to 4 Hours',
    readTime: '7 min read',
    excerpt: '3,000 leads per month across 6 portals, a sales team drowning in manual follow-up, and site visits taking 5 days to book. AI compressed 5 days into 4 hours.',
    challenge: '3,000+ leads/month from 6 portals. Sales team of 12 drowning — each managing 250+ leads with no systematic follow-up. Site visit bookings taking 5+ days.',
    background: 'The developer was spending ₹12L/month on marketing across 99acres, MagicBricks, Housing.com, and Facebook. But ROI was poor because the sales team couldn\'t respond fast enough. Hot leads went cold in hours.',
    solution: [
      'Unified lead capture with automatic deduplication across all 6 portals',
      'AI voice qualification call placed within 5 minutes of any new lead',
      'Automated site visit booking with Google Calendar integration for each salesperson',
      'Long-cycle nurture with project progress updates, EMI calculators, and floor plan shares',
      'Broker onboarding automation + full CRM pipeline management via WhatsApp',
    ],
    process: [
      { step: '01', title: 'Portal Integration', desc: 'Week 1–2: connected all 6 portals to a single unified lead inbox with de-dup logic.' },
      { step: '02', title: 'Voice AI Build', desc: 'Week 2–5: built qualification voice agent trained on project specs, pricing, and FAQs.' },
      { step: '03', title: 'Calendar Sync', desc: 'Week 5–7: integrated salesperson calendars for real-time site visit auto-booking.' },
      { step: '04', title: 'Broker Module', desc: 'Week 7–10: launched broker onboarding automation and broker-specific update flows.' },
    ],
    stats: [
      { v: '4 hrs', l: 'Lead-to-site-visit time', s: 'Down from 5 days (30x faster)' },
      { v: '22%', l: 'Site visit conversion', s: 'Up from 8% — 2.75x improvement' },
      { v: '3x', l: 'Sales productivity', s: 'Same team, 3x more deals' },
      { v: '₹4.2Cr', l: 'Additional quarterly sales', s: 'Attributed to automation' },
    ],
    timeline: '10 weeks',
    quote: 'The AI qualifies leads better than some of our senior salespeople. It asks the right questions and never gets tired.',
    quoteBy: 'Vikram Shah — VP Sales',
    tags: ['Sales AI', 'Lead Qualification', 'Real Estate CRM', 'Site Visit Automation'],
  },
  {
    id: 'real-estate-2', industry: 'Real Estate', icon: <Building2 size={20} />, color: '#E8631A',
    client: 'Commercial Office Leasing Firm', location: 'Hyderabad, Telangana',
    tagline: 'Site Tour Bookings Up 3x, Deal Cycle Shortened by 40%',
    readTime: '5 min read',
    excerpt: 'Commercial leasing with a 90-day average deal cycle. Prospects going cold between site tours and proposals. AI compressed timelines and kept deals alive.',
    challenge: '90-day average lease closure. 60% of qualified prospects went cold between site visit and proposal stage. Relationship managers juggling 80+ live deals with no systematic follow-up.',
    background: 'Commercial leasing is relationship-driven but the volume of deals had outgrown what RMs could track manually. High-value prospects were lost not because competitors were better, but because the firm was slower to respond.',
    solution: [
      'AI-driven lead qualification within 15 minutes of any portal or website inquiry',
      'Automated site tour booking with RM calendar integration and parking/access prep',
      'Post-tour proposal follow-up sequence with floor plans, fit-out cost estimates, and virtual tour links',
      'Long-nurture for 6–12 month lease expiry prospects with market reports and availability alerts',
      'Lease renewal automation for existing tenants 6 months before expiry',
    ],
    process: [
      { step: '01', title: 'Pipeline Audit', desc: 'Week 1–2: mapped all 80+ active deals, identified where each one was stalling.' },
      { step: '02', title: 'Lead Qualification', desc: 'Week 2–4: built AI qualification flow for grade-A vs. grade-B leads with RM routing.' },
      { step: '03', title: 'Tour Automation', desc: 'Week 4–6: integrated RM calendars for site tour auto-booking with pre-tour info packs.' },
      { step: '04', title: 'Nurture Sequences', desc: 'Week 6–8: launched post-tour and long-cycle nurture flows with market intelligence content.' },
    ],
    stats: [
      { v: '3x', l: 'Site tour bookings', s: 'Same team, 3x more tours per month' },
      { v: '40%', l: 'Shorter deal cycle', s: 'Avg. 54 days vs. 90 days' },
      { v: '72%', l: 'Post-tour conversion', s: 'Up from 28% with follow-up automation' },
      { v: '₹8.5Cr', l: 'Pipeline value recovered', s: 'From previously cold prospects' },
    ],
    timeline: '8 weeks',
    quote: 'We stopped losing deals to silence. The AI keeps prospects warm while our RMs focus on the close.',
    quoteBy: 'Suresh Reddy — MD, ProSpace Commercial',
    tags: ['Commercial Leasing', 'Lead Qualification', 'Deal Automation', 'Tenant Retention'],
  },
  {
    id: 'real-estate-3', industry: 'Real Estate', icon: <Building2 size={20} />, color: '#E8631A',
    client: 'Plotted Development (1,200 Plots)', location: 'Bengaluru, Karnataka',
    tagline: '₹24Cr in Plot Sales Closed in 90 Days via WhatsApp',
    readTime: '6 min read',
    excerpt: 'A 1,200-plot township outside Bengaluru. No showroom, no walk-in traffic. Pure digital sales via WhatsApp AI and video site tours — ₹24Cr sold in 90 days.',
    challenge: 'Project site 45km from Bengaluru city. Getting serious buyers to visit was a barrier. Traditional broker network demanded 3–4% commissions. Marketing budget generating poor ROI.',
    background: 'The developer had a compelling RERA-registered project but the distance made site visits rare. 80% of inquiries fizzled because prospects wouldn\'t drive 45km without strong confidence first.',
    solution: [
      'AI WhatsApp agent with 360-degree video tour sharing for qualified leads',
      'Legal document dispatch automation — RERA certificate, title deed, bank approval letters',
      'Instalment plan calculator shared via WhatsApp based on buyer budget inputs',
      'Broker portal automation — commission tracking, marketing kit sharing, and lead claim system',
      'Construction progress updates every 2 weeks with aerial drone footage to plot buyers',
    ],
    process: [
      { step: '01', title: 'Asset Creation', desc: 'Week 1–2: produced 360-degree site video, drone footage, and digital document package.' },
      { step: '02', title: 'WhatsApp Qualifier', desc: 'Week 2–4: built qualification flow — budget, timeline, purpose (investment vs. end use).' },
      { step: '03', title: 'Document Automation', desc: 'Week 4–5: automated legal document dispatch and instalment plan generator.' },
      { step: '04', title: 'Broker Network', desc: 'Week 5–7: launched broker portal with commission visibility and co-marketing assets.' },
    ],
    stats: [
      { v: '₹24Cr', l: 'Plot sales in 90 days', s: 'Without developer showroom' },
      { v: '62%', l: 'Inquiries converted', s: 'Without physical site visit first' },
      { v: '2.1%', l: 'Effective commission cost', s: 'Down from 3.8% via broker channel' },
      { v: '340', l: 'Plots sold (of 1,200)', s: 'In first 90 days of launch' },
    ],
    timeline: '7 weeks',
    quote: 'Buyers in Singapore closed plots without visiting. WhatsApp + the right documentation did what a showroom never could.',
    quoteBy: 'Harsh Gowda — Director, Greenfield Estates',
    tags: ['Plotted Development', 'Digital Sales', 'WhatsApp Commerce', 'Broker Automation'],
  },
  {
    id: 'real-estate-4', industry: 'Real Estate', icon: <Building2 size={20} />, color: '#E8631A',
    client: 'Real Estate Brokerage (22 Agents)', location: 'Mumbai, Maharashtra',
    tagline: 'Each Agent Handles 3x More Clients — Revenue Per Agent Up 2.4x',
    readTime: '5 min read',
    excerpt: 'A 22-agent brokerage drowning in follow-up. Agents spending 60% of their time on admin instead of selling. AI turned every agent into a power broker.',
    challenge: 'Agents spending 60% of time on follow-up calls, sending property matches manually, and chasing documentation. Hot buyer leads going cold while agents were stuck on admin.',
    background: 'The brokerage had experienced agents performing below potential. The best ones were considering going independent to escape the admin chaos. The owner could see talent walking out the door.',
    solution: [
      'AI property matching — new listings sent automatically to buyers matching criteria',
      'Automated follow-up on every client after each site visit with feedback capture',
      'Document checklist automation for each transaction stage (agreement, loan, registry)',
      'Past client annual re-engagement for "are you looking to upgrade?" campaigns',
      'Agent performance dashboard — leads, visits, conversions, revenue per agent',
    ],
    process: [
      { step: '01', title: 'CRM Setup', desc: 'Week 1–2: migrated all buyer and seller data into structured CRM with property preference tagging.' },
      { step: '02', title: 'Matching Engine', desc: 'Week 2–4: built property-buyer matching with automated WhatsApp dispatch per new listing.' },
      { step: '03', title: 'Transaction Automation', desc: 'Week 4–6: deployed document checklist and milestone reminders for active transactions.' },
      { step: '04', title: 'Dashboard', desc: 'Week 6–7: launched agent performance dashboard with weekly automated summary to owner.' },
    ],
    stats: [
      { v: '3x', l: 'Clients per agent', s: 'Without additional working hours' },
      { v: '2.4x', l: 'Revenue per agent', s: 'Year-over-year improvement' },
      { v: '60%→20%', l: 'Admin time reduced', s: 'Agents now spend 80% selling' },
      { v: '₹18L', l: 'Additional monthly GCI', s: 'Gross commission income increase' },
    ],
    timeline: '7 weeks',
    quote: 'My best agent closed 11 deals in one month. Her previous record was 4. Same person, same market, better tools.',
    quoteBy: 'Rajan Mehta — Owner, PropEdge Realty',
    tags: ['Brokerage Automation', 'Property Matching', 'Agent Productivity', 'CRM Integration'],
  },
  {
    id: 'real-estate-5', industry: 'Real Estate', icon: <Building2 size={20} />, color: '#E8631A',
    client: 'Co-working Space (6 Locations)', location: 'Delhi NCR',
    tagline: 'Occupancy Up from 61% to 89% in 4 Months',
    readTime: '4 min read',
    excerpt: 'Six co-working spaces at 61% occupancy losing leads to faster-responding competitors. AI sales automation and member experience flows turned the business around.',
    challenge: '61% average occupancy across 6 locations. Leads from Google getting 24-hour responses — competitors closed them in 2 hours. Member churn at 28% monthly.',
    background: 'The operations team was spread across 6 locations and no one owned the lead follow-up process. Members churned quietly because no one noticed they were disengaged until their desk was empty.',
    solution: [
      'Instant lead response via WhatsApp with floor plan, pricing, and trial day booking',
      'Trial-to-membership conversion sequence — 5-touch nurture during the trial week',
      'Member monthly check-in automation with renewal reminder and upgrade upsell',
      'Meeting room booking bot via WhatsApp — available slots and instant confirmation',
      'Community event invites and cross-location visiting pass automation for members',
    ],
    process: [
      { step: '01', title: 'Churn Analysis', desc: 'Week 1: identified that 70% of churn happened in months 2–3 with no prior warning signals.' },
      { step: '02', title: 'Lead Automation', desc: 'Week 2–3: built instant lead response and trial booking flow with per-location calendars.' },
      { step: '03', title: 'Member Retention', desc: 'Week 3–5: deployed monthly check-in and renewal sequences for all active members.' },
      { step: '04', title: 'Booking Bot', desc: 'Week 5–6: launched WhatsApp meeting room booking across all 6 locations.' },
    ],
    stats: [
      { v: '89%', l: 'Average occupancy', s: 'Up from 61% across 6 locations' },
      { v: '28%→9%', l: 'Monthly churn reduced', s: 'With proactive retention flows' },
      { v: '< 2 min', l: 'Lead response time', s: 'Down from 24 hours' },
      { v: '₹11L', l: 'Monthly revenue increase', s: 'From occupancy and booking automation' },
    ],
    timeline: '6 weeks',
    quote: 'We went from half-empty to waitlisted at two locations. AI didn\'t just improve our sales — it saved our business.',
    quoteBy: 'Neha Kapoor — CEO, WorkHub Spaces',
    tags: ['Co-working', 'Lead Conversion', 'Member Retention', 'Booking Automation'],
  },
  {
    id: 'ecom', industry: 'E-commerce', icon: <ShoppingCart size={20} />, color: '#F59E0B',
    client: 'D2C Fashion Brand', location: 'Bengaluru, Karnataka',
    tagline: 'Support Costs Cut 68% While Ticket Volume Doubled',
    readTime: '5 min read',
    excerpt: '500+ daily support tickets, 6-hour resolution times, and a team burning out every sale season. AI flipped the script — resolving 82% of tickets without any human.',
    challenge: '500+ daily support tickets. 6-hour average resolution time. Support team burning out during sale seasons. Customer satisfaction falling despite more headcount.',
    background: 'The brand was scaling fast but support wasn\'t keeping up. During sale events, response times hit 12+ hours. Social media complaints were hurting the brand. Hiring more agents was not solving the problem.',
    solution: [
      'AI support agent trained on full product catalog, size guides, and return policy',
      'Order status, returns, size queries, and COD queries automated end-to-end',
      'Seamless escalation with full conversation context handed to human agent',
      'Post-purchase review request automation via WhatsApp 5 days after delivery',
      'Abandoned cart recovery sequence via WhatsApp with personalized product images',
    ],
    process: [
      { step: '01', title: 'Ticket Analysis', desc: 'Week 1: categorized 30 days of tickets — 82% fell into 6 query types.' },
      { step: '02', title: 'AI Training', desc: 'Week 1–2: trained AI on catalog, policies, Shopify order data, and escalation rules.' },
      { step: '03', title: 'WhatsApp Deploy', desc: 'Week 2–3: deployed on WhatsApp Business + website chat with live agent handoff.' },
      { step: '04', title: 'Abandoned Cart', desc: 'Week 3–4: launched 3-step abandoned cart recovery sequence with product previews.' },
    ],
    stats: [
      { v: '82%', l: 'Tickets auto-resolved', s: 'Without human intervention' },
      { v: '4 min', l: 'Avg. resolution time', s: 'Down from 6 hours' },
      { v: '₹8L', l: 'Support cost saved/month', s: 'While handling 2x volume' },
      { v: '+18%', l: 'Customer satisfaction', s: 'CSAT score improvement' },
    ],
    timeline: '4 weeks',
    quote: 'Abandoned cart recovery alone recovered ₹12L in the first month. That\'s our entire AI Agentix investment for a year.',
    quoteBy: 'Pooja Malhotra — Founder, StyleCraft',
    tags: ['Customer Support AI', 'Shopify Automation', 'Abandoned Cart', 'WhatsApp Commerce'],
  },
  {
    id: 'ecom-2', industry: 'E-commerce', icon: <ShoppingCart size={20} />, color: '#F59E0B',
    client: 'B2B Wholesale Marketplace', location: 'Surat, Gujarat',
    tagline: 'Reorder Rate Doubled — Sales Team Reduced by 40%',
    readTime: '5 min read',
    excerpt: 'A B2B marketplace with 800+ retailer buyers. Reorders entirely dependent on sales reps calling. AI automated the entire reorder cycle without losing the personal touch.',
    challenge: 'Sales team of 12 reps manually calling 800+ retailers for reorders. Reps spending 5 hours/day on routine reorder calls, leaving no time for new account acquisition.',
    background: 'The marketplace connected textile manufacturers with pan-India retailers. Reorders were the lifeblood of the business but the process was entirely relationship-dependent — if a rep left, the retailer stopped ordering.',
    solution: [
      'AI reorder reminder based on purchase history — retailer gets WhatsApp when stock likely running low',
      'One-tap reorder via WhatsApp with last order summary and quick confirm flow',
      'New product catalog broadcasts targeted by retailer purchase category',
      'Credit limit and outstanding balance visibility for retailers via WhatsApp self-serve',
      'Scheme and discount automation — burst promotions to high-value retailers during slow periods',
    ],
    process: [
      { step: '01', title: 'Purchase Pattern Analysis', desc: 'Week 1–2: analyzed 12 months of order data to map reorder cycles per retailer segment.' },
      { step: '02', title: 'Reorder Engine', desc: 'Week 2–4: built predictive reorder trigger with WhatsApp quick-confirm flow.' },
      { step: '03', title: 'Catalog Automation', desc: 'Week 4–5: deployed category-targeted product launch broadcasts with response tracking.' },
      { step: '04', title: 'Self-Serve Portal', desc: 'Week 5–6: launched WhatsApp self-serve for balance, credit, and order status.' },
    ],
    stats: [
      { v: '2x', l: 'Reorder rate', s: 'From 38% to 76% monthly reorders' },
      { v: '12→7', l: 'Sales team size', s: 'Same revenue, 40% fewer reps needed' },
      { v: '5 hrs', l: 'Daily rep time reclaimed', s: 'From routine reorder calls' },
      { v: '₹22L', l: 'Monthly incremental GMV', s: 'From automated reorder triggers' },
    ],
    timeline: '6 weeks',
    quote: 'Our reps now spend time on new accounts and problem-solving — work that actually requires a human. Reorders take care of themselves.',
    quoteBy: 'Bhavesh Shah — Co-Founder, TextileKart',
    tags: ['B2B Commerce', 'Reorder Automation', 'WhatsApp Commerce', 'Retail Network'],
  },
  {
    id: 'ecom-3', industry: 'E-commerce', icon: <ShoppingCart size={20} />, color: '#F59E0B',
    client: 'D2C Electronics Accessories Brand', location: 'Noida, Uttar Pradesh',
    tagline: 'Amazon Dependence Cut 60% — Own Channel Revenue Tripled',
    readTime: '5 min read',
    excerpt: 'Over-reliant on Amazon with thin margins. AI helped build a direct customer relationship layer that tripled owned-channel revenue in 5 months.',
    challenge: '78% of revenue from Amazon with 30%+ fees eating into margins. No customer data owned. Zero repeat purchase rate on own website. D2C channel completely neglected.',
    background: 'The brand made quality mobile accessories but Amazon owned the customer relationship. When Amazon increased fees, margins collapsed. The founder needed a direct channel but had no playbook.',
    solution: [
      'Post-purchase WhatsApp onboarding for Amazon buyers — warranty registration captures customer data',
      'Product usage tip sequences — turning accessories into a brand experience',
      'Exclusive D2C offer sequences to Amazon buyers — 15% better pricing direct',
      'Referral program automation — WhatsApp share links with tracked discount codes',
      'Bundles and upsell automation based on purchase category (phone → case → charger → cable)',
    ],
    process: [
      { step: '01', title: 'Data Capture', desc: 'Week 1–2: added warranty QR code to packaging — each scan captures buyer WhatsApp.' },
      { step: '02', title: 'Onboarding Sequence', desc: 'Week 2–4: built post-purchase tip sequence that ended with D2C channel offer.' },
      { step: '03', title: 'Referral Engine', desc: 'Week 4–5: launched WhatsApp referral flow with trackable codes and reward automation.' },
      { step: '04', title: 'Upsell Automation', desc: 'Week 5–7: deployed product bundle recommendations based on purchase history.' },
    ],
    stats: [
      { v: '3x', l: 'Own channel revenue', s: 'In 5 months from near zero' },
      { v: '60%', l: 'Amazon dependence reduced', s: 'Revenue mix rebalanced' },
      { v: '42%', l: 'Repeat purchase rate', s: 'On D2C channel (was 0%)' },
      { v: '₹15L', l: 'Monthly margin saved', s: 'By shifting to direct channel' },
    ],
    timeline: '7 weeks',
    quote: 'We built our customer list from 0 to 28,000 in 5 months. Amazon can change their algorithm — they can\'t take our list.',
    quoteBy: 'Siddharth Jain — Founder, AcceZone',
    tags: ['D2C Strategy', 'Amazon Diversification', 'WhatsApp Commerce', 'Referral Automation'],
  },
  {
    id: 'ecom-4', industry: 'E-commerce', icon: <ShoppingCart size={20} />, color: '#F59E0B',
    client: 'Hyperlocal Grocery Delivery App', location: 'Ahmedabad, Gujarat',
    tagline: 'Customer Retention Up 55% — Churn Dropped in 60 Days',
    readTime: '5 min read',
    excerpt: 'A hyperlocal grocery app with a leaky retention bucket. Customers ordered once or twice then switched to Blinkit. AI fixed the retention problem without discounting.',
    challenge: '65% of customers churned after 2 orders. Heavy discount spend not solving the retention problem. Customer support handling 300+ daily order queries manually.',
    background: 'The app had strong first-order acquisition but once the new-user discount expired, there was nothing keeping customers from switching to big players. The team was competing on price instead of relationship.',
    solution: [
      'AI reorder reminder based on purchase pattern — "Your usual potatoes, onions, and milk?" style messages',
      'WhatsApp shopping list assistant — customers dictate list, AI adds to cart',
      'Proactive delay notification before customer asks — builds trust instead of eroding it',
      'Weekly personalised deal based on purchase history — not generic promotions',
      'Post-delivery quality feedback flow with instant resolution for complaints',
    ],
    process: [
      { step: '01', title: 'Churn Analysis', desc: 'Week 1: identified that 70% of churn happened between orders 2 and 3 — not at order 1.' },
      { step: '02', title: 'Reorder Engine', desc: 'Week 2–3: built purchase-pattern reorder reminders with smart product pre-selection.' },
      { step: '03', title: 'WhatsApp Commerce', desc: 'Week 3–5: deployed conversational shopping list assistant on WhatsApp.' },
      { step: '04', title: 'Proactive Service', desc: 'Week 5–6: launched delay notification and quality feedback automation.' },
    ],
    stats: [
      { v: '55%', l: 'Customer retention increase', s: 'At the 30-day mark' },
      { v: '4.1x', l: 'Orders per customer/month', s: 'Up from 1.8x before automation' },
      { v: '70%', l: 'Support queries automated', s: 'Order status handled by AI' },
      { v: '₹6.8L', l: 'Monthly margin recovered', s: 'From reduced discount spend' },
    ],
    timeline: '6 weeks',
    quote: 'Customers now feel like we know them. That\'s what Blinkit can\'t replicate — a local store with AI memory.',
    quoteBy: 'Mitesh Patel — Founder, QuickBasket',
    tags: ['Grocery Delivery', 'Customer Retention', 'WhatsApp Commerce', 'Hyperlocal'],
  },
  {
    id: 'ecom-5', industry: 'E-commerce', icon: <ShoppingCart size={20} />, color: '#F59E0B',
    client: 'Handcrafted Products Brand', location: 'Jaipur, Rajasthan',
    tagline: 'International Export Revenue Up ₹18L/Month via WhatsApp',
    readTime: '4 min read',
    excerpt: 'A Jaipur handicrafts brand selling to international buyers via Instagram DMs and email. AI systematized the chaos and opened up export wholesale as a new channel.',
    challenge: 'International orders coming via Instagram DMs, email, and WhatsApp — no system. Custom piece inquiries taking 3–4 days to respond. Repeat buyers had no easy reorder path.',
    background: 'The brand had genuine craft credibility and a loyal international buyer base — hotels, interior designers, and boutiques in UK, UAE, and USA. But ops were entirely artisanal: handwritten order books and manual bank transfers.',
    solution: [
      'AI WhatsApp catalog with custom-piece inquiry handling and quote automation',
      'International payment link automation — USD/EUR/GBP invoices with PayPal and Wise integration',
      'Order tracking and shipping update automation via WhatsApp and email',
      'Trade buyer onboarding — MOQ, pricing tiers, and sample order automation for B2B buyers',
      'Annual collection launch campaign to 2,000+ international buyer list',
    ],
    process: [
      { step: '01', title: 'Buyer Database', desc: 'Week 1–2: consolidated 2,000+ buyer contacts from DMs, email, and WhatsApp into CRM.' },
      { step: '02', title: 'Catalog & Quote', desc: 'Week 2–4: built WhatsApp catalog with custom-piece inquiry form and auto-quote logic.' },
      { step: '03', title: 'Payment Automation', desc: 'Week 4–5: integrated Wise/PayPal for automated invoice dispatch in buyer currency.' },
      { step: '04', title: 'Trade Program', desc: 'Week 5–6: launched B2B wholesale onboarding with tiered pricing and sample flow.' },
    ],
    stats: [
      { v: '₹18L', l: 'Monthly export revenue', s: 'Up from ₹6L — 3x growth' },
      { v: '2,000+', l: 'International buyers', s: 'In organized CRM for first time' },
      { v: '4 days→4 hrs', l: 'Custom inquiry response', s: 'AI handles initial qualification' },
      { v: '35%', l: 'B2B wholesale share', s: 'New revenue stream activated' },
    ],
    timeline: '6 weeks',
    quote: 'A boutique in London placed a £4,000 order entirely over WhatsApp at 11pm their time. We woke up to a confirmed order.',
    quoteBy: 'Kavita Sharma — Founder, JaipurCraft Co.',
    tags: ['Artisan Commerce', 'Export Automation', 'International Payments', 'B2B Wholesale'],
  },
  {
    id: 'logistics', industry: 'Logistics', icon: <Truck size={20} />, color: '#0EA5E9',
    client: 'Last-Mile Delivery Company', location: 'Delhi NCR',
    tagline: 'Operations Fully Automated — Manager Reviews Exceptions Only',
    readTime: '6 min read',
    excerpt: 'Operations managers wasting 4 hours every morning on manual dispatch, client calls, and invoice reconciliation. Now fully automated before 7 AM.',
    challenge: 'Ops managers spending 4 hours every morning on manual dispatch coordination, client update calls, and invoice reconciliation. No visibility on delays until customers complained.',
    background: 'The company was growing from 500 to 1,000+ daily shipments but headcount wasn\'t scaling. The ops team was stretched thin, errors were rising, and client satisfaction was dropping. They needed to 2x capacity without 2x cost.',
    solution: [
      'AI-driven dispatch with route optimization using real-time traffic data',
      'Automated client shipment status updates via WhatsApp at key milestones',
      'Invoice auto-generation from delivery confirmation data into Tally',
      'Exception alert system — proactive delay notifications before customers ask',
      'Driver performance analytics dashboard updated daily',
    ],
    process: [
      { step: '01', title: 'Ops Audit', desc: 'Week 1: shadowed ops team for a week, mapped every manual step and decision.' },
      { step: '02', title: 'Route AI Build', desc: 'Week 2–4: built dispatch and route optimizer integrated with Google Maps API.' },
      { step: '03', title: 'Client Comms', desc: 'Week 4–5: automated status update flows via WhatsApp at pickup, transit, and delivery.' },
      { step: '04', title: 'Finance Automation', desc: 'Week 5–6: built Tally integration for zero-touch invoice generation and reconciliation.' },
    ],
    stats: [
      { v: '50%', l: 'Faster operations', s: 'Daily ops completed by 7 AM' },
      { v: '35%', l: 'Fewer coordination calls', s: 'Clients get automated updates' },
      { v: '₹6L', l: 'Monthly ops overhead saved', s: 'Equivalent to 3 coordinator roles' },
      { v: '99.2%', l: 'On-time delivery rate', s: 'Up from 91% with proactive alerts' },
    ],
    timeline: '6 weeks',
    quote: 'What took my ops team 4 hours every morning now runs automatically by 7 AM. I just review the exception report.',
    quoteBy: 'Aditya Kumar — CEO, SwiftShip Logistics',
    tags: ['Operations Automation', 'Route Optimization', 'Tally Integration', 'WhatsApp Updates'],
  },
  {
    id: 'logistics-2', industry: 'Logistics', icon: <Truck size={20} />, color: '#0EA5E9',
    client: '3PL Warehouse & Fulfilment Centre', location: 'Bhiwandi, Maharashtra',
    tagline: 'Client Onboarding from 3 Weeks to 3 Days — Capacity Doubled',
    readTime: '5 min read',
    excerpt: 'A 3PL fulfilment centre where onboarding new D2C clients took 3 weeks of back-and-forth. AI compressed it to 3 days and doubled active client capacity.',
    challenge: 'Onboarding new D2C clients was a 3-week process of emails, document collection, system setup, and training. Business development team spending 40% of time on onboarding instead of acquiring new clients.',
    background: 'The warehouse had strong operations but a leaky BD process. Great clients were won, then lost to onboarding friction — some walked away to competitors with faster go-live timelines.',
    solution: [
      'Digital onboarding kit via WhatsApp — SLA templates, integration guides, pricing calculator',
      'API integration assistant — guided Shopify/WooCommerce/Amazon setup documentation',
      'Daily automated shipment report to every D2C client at 8 AM with dispatch summary',
      'Exception alert system — damaged, delayed, or returned shipments notified within 30 minutes',
      'Client satisfaction check-in every 30 days with automated NPS collection',
    ],
    process: [
      { step: '01', title: 'Onboarding Audit', desc: 'Week 1: mapped every step of the current onboarding process and found 14 manual handoffs.' },
      { step: '02', title: 'Digital Kit Build', desc: 'Week 2–3: built automated onboarding document dispatch and integration guide sequences.' },
      { step: '03', title: 'Reporting Automation', desc: 'Week 3–4: connected WMS to automated daily report generation and WhatsApp delivery.' },
      { step: '04', title: 'Exception Alerts', desc: 'Week 4–5: built real-time exception detection and client notification pipeline.' },
    ],
    stats: [
      { v: '3 days', l: 'Client onboarding time', s: 'Down from 3 weeks' },
      { v: '2x', l: 'Active client capacity', s: 'Same BD team, double the clients' },
      { v: '98%', l: 'Client satisfaction rate', s: 'NPS from 18 to 61' },
      { v: '₹14L', l: 'Monthly revenue increase', s: 'From faster new client activation' },
    ],
    timeline: '5 weeks',
    quote: 'We onboarded 6 new clients last month. Our previous record was 2. The bottleneck was our process, not our capacity.',
    quoteBy: 'Deepak Mehta — Director, SwiftFulfil 3PL',
    tags: ['3PL Fulfilment', 'Client Onboarding', 'D2C Logistics', 'Warehouse Automation'],
  },
  {
    id: 'logistics-3', industry: 'Logistics', icon: <Truck size={20} />, color: '#0EA5E9',
    client: 'Courier Aggregator Platform', location: 'Bengaluru, Karnataka',
    tagline: 'Shipper Support Tickets Reduced 80% — NPS Jumped from 22 to 67',
    readTime: '4 min read',
    excerpt: 'A courier aggregator drowning in "where is my shipment" tickets. 600+ daily queries, 8-hour resolution times. AI automated the entire shipment query layer.',
    challenge: '600+ daily support tickets — 90% shipment status queries. 8-hour average resolution time. Support team of 8 burning out. Shippers threatening to move to competitors.',
    background: 'The platform aggregated 12+ courier partners but had no unified tracking experience. Shippers had to log into each courier\'s portal separately. When something went wrong, they only found out when they called in.',
    solution: [
      'Unified tracking bot — one WhatsApp message to check status across all 12 courier partners',
      'Proactive NDR and RTO alerts before shippers discover issues themselves',
      'AI-driven re-delivery scheduling for failed deliveries — shipper approves in one tap',
      'Dispute escalation automation with SLA timers and courier partner follow-up',
      'Shipper monthly performance report — delivery rate, NDR rate, best-performing courier by category',
    ],
    process: [
      { step: '01', title: 'Ticket Analysis', desc: 'Week 1: categorized 30 days of tickets — 91% were status queries, NDR, and RTO related.' },
      { step: '02', title: 'Unified Tracker', desc: 'Week 2–3: built tracking bot integrating all 12 courier APIs with unified status language.' },
      { step: '03', title: 'Proactive Alerts', desc: 'Week 3–4: deployed NDR and RTO detection with instant WhatsApp notifications.' },
      { step: '04', title: 'Re-delivery Flow', desc: 'Week 4–5: built re-delivery scheduling automation with courier partner confirmation.' },
    ],
    stats: [
      { v: '80%', l: 'Support tickets reduced', s: 'From 600+ to 120 daily' },
      { v: '67', l: 'NPS score', s: 'Up from 22 — in 3 months' },
      { v: '< 30 min', l: 'NDR notification time', s: 'Shippers know before customers complain' },
      { v: '₹9L', l: 'Monthly support cost saved', s: 'Team reduced from 8 to 3' },
    ],
    timeline: '5 weeks',
    quote: 'Shippers used to call us angry. Now they message us to say thank you. That shift in relationship changed everything.',
    quoteBy: 'Rahul Nair — CTO, ShipEasy',
    tags: ['Courier Tracking', 'NDR Management', 'Support Automation', 'Shipper Experience'],
  },
  {
    id: 'logistics-4', industry: 'Logistics', icon: <Truck size={20} />, color: '#0EA5E9',
    client: 'Cold Chain Pharmaceutical Logistics', location: 'Hyderabad, Telangana',
    tagline: 'Zero Compliance Violations in 6 Months After AI Documentation',
    readTime: '6 min read',
    excerpt: 'Cold chain logistics with critical temperature monitoring and compliance requirements. Manual documentation causing delays and audit failures. AI automated the entire compliance layer.',
    challenge: 'GDP compliance required documentation at every cold chain handoff — manually done by 12 staff. Audit failures costing ₹4L+ per incident. Pharma clients threatening to cancel contracts.',
    background: 'Cold chain pharma logistics has zero tolerance for documentation errors. One missed temperature log = failed audit = client loss. The company was growing but the manual compliance process wasn\'t scaling.',
    solution: [
      'IoT temperature sensor integration — alerts at every 15-minute reading breach',
      'Digital handoff documentation via WhatsApp — driver confirms, warehouse signs, client receives auto-copy',
      'GDP compliance checklist automation for every shipment — zero manual checklists',
      'Client temperature excursion report auto-generated within 2 minutes of any breach',
      'Regulatory audit report package generated on-demand in 15 minutes for any shipment',
    ],
    process: [
      { step: '01', title: 'Compliance Mapping', desc: 'Week 1–2: mapped all 34 GDP documentation requirements across vehicle, warehouse, and delivery.' },
      { step: '02', title: 'IoT Integration', desc: 'Week 2–4: connected temperature loggers from 3 sensor manufacturers to unified dashboard.' },
      { step: '03', title: 'Digital Handoffs', desc: 'Week 4–5: deployed WhatsApp digital signature flow for all chain-of-custody handoffs.' },
      { step: '04', title: 'Audit Package', desc: 'Week 5–7: built on-demand audit report generator from operational data.' },
    ],
    stats: [
      { v: '0', l: 'Compliance violations', s: 'In 6 months post-deployment' },
      { v: '15 min', l: 'Audit report generation', s: 'Down from 3 days manual compilation' },
      { v: '₹48L', l: 'Penalty exposure eliminated', s: 'Annualized audit failure cost' },
      { v: '3', l: 'New pharma clients won', s: 'Citing compliance capability' },
    ],
    timeline: '7 weeks',
    quote: 'Our regulator auditor said our documentation was the best they\'d seen. That\'s a 180-degree turn from 6 months ago.',
    quoteBy: 'Vijay Rao — CEO, ColdSure Logistics',
    tags: ['Cold Chain', 'GDP Compliance', 'IoT Integration', 'Pharma Logistics'],
  },
  {
    id: 'logistics-5', industry: 'Logistics', icon: <Truck size={20} />, color: '#0EA5E9',
    client: 'International Freight Forwarding Firm', location: 'JNPT, Mumbai',
    tagline: 'Client Shipment Visibility Improved 10x — Zero Surprise Delays',
    readTime: '5 min read',
    excerpt: 'Freight forwarder with exporters and importers constantly calling for shipment updates. AI built a real-time visibility layer that eliminated 80% of inbound calls.',
    challenge: 'Customer service team handling 300+ shipment status calls daily. Key account managers spending 3+ hours on status updates instead of business development.',
    background: 'International freight is opaque by nature — multiple carriers, customs stages, port delays, and documentation milestones. The firm had strong operational knowledge but no way to proactively share it at scale.',
    solution: [
      'Automated milestone updates — booking, loaded, sailing, arrival, customs clearance, delivery',
      'Document readiness automation — BL, invoice, packing list alerts with download links',
      'Customs clearance delay prediction with proactive client advisory',
      'Quotation automation for FCL and LCL inquiries with instant PDF generation',
      'KAM monthly trade summary — shipment volume, costs, transit times for each client',
    ],
    process: [
      { step: '01', title: 'Milestone Mapping', desc: 'Week 1: documented 22 key milestones in a typical FCL export shipment lifecycle.' },
      { step: '02', title: 'Tracking Integration', desc: 'Week 2–4: connected to carrier AIS APIs and customs EDI for real-time milestone triggers.' },
      { step: '03', title: 'Client Comms', desc: 'Week 4–5: built WhatsApp and email milestone notification sequences per shipment type.' },
      { step: '04', title: 'Quotation Bot', desc: 'Week 5–6: deployed instant FCL/LCL quotation with rate card automation and PDF dispatch.' },
    ],
    stats: [
      { v: '80%', l: 'Inbound status calls reduced', s: 'From 300+ to 60 per day' },
      { v: '22', l: 'Milestone auto-notifications', s: 'Per shipment, zero manual updates' },
      { v: '3 hrs', l: 'KAM time reclaimed daily', s: 'Redirected to new client acquisition' },
      { v: '₹7.2L', l: 'New business/month', s: 'From KAMs freed for BD work' },
    ],
    timeline: '6 weeks',
    quote: 'My clients now ask me what\'s next instead of what\'s happening. That\'s the difference between a vendor and an advisor.',
    quoteBy: 'Pradeep Joshi — MD, GlobalLink Freight',
    tags: ['Freight Forwarding', 'Shipment Visibility', 'Customs Automation', 'Export Logistics'],
  },
  {
    id: 'hospitality', industry: 'Hospitality', icon: <Hotel size={20} />, color: '#10B981',
    client: 'Boutique Hotel Chain (12 Properties)', location: 'Rajasthan',
    tagline: 'Direct Booking Revenue Up 41% After AI Concierge Launch',
    readTime: '5 min read',
    excerpt: 'A heritage hotel chain losing direct bookings to OTAs and struggling with pre-arrival guest communication. AI concierge changed the game — 41% more direct revenue.',
    challenge: 'Over 60% of bookings via OTAs costing 18–22% commission. Pre-arrival guest communication was inconsistent. Review management across 12 properties was manual and slow.',
    background: 'The chain had strong repeat customers but couldn\'t convert them to direct bookings. Guest experience post-booking was minimal — no pre-arrival excitement, no upsell, no connection before check-in.',
    solution: [
      'WhatsApp AI concierge activated on every booking confirmation',
      'Pre-arrival personalization: dining preferences, room customisation, local experiences',
      'Upsell automation for spa, airport transfers, and heritage tours',
      'Post-checkout review requests timed for peak sentiment moments',
      'Centralized review monitoring across all 12 properties with AI-drafted responses',
    ],
    process: [
      { step: '01', title: 'Guest Journey Map', desc: 'Week 1–2: documented every guest touchpoint from booking to checkout across all 12 properties.' },
      { step: '02', title: 'WhatsApp Concierge Build', desc: 'Week 2–4: built multilingual concierge (Hindi/English) trained on each property\'s offerings.' },
      { step: '03', title: 'Upsell Logic', desc: 'Week 4–5: configured upsell triggers based on booking type, duration, and guest profile.' },
      { step: '04', title: 'Review System', desc: 'Week 5–6: deployed review automation and AI response system across Google and TripAdvisor.' },
    ],
    stats: [
      { v: '41%', l: 'Direct booking revenue up', s: 'OTA dependency reduced to 38%' },
      { v: '₹3.2L', l: 'Monthly upsell revenue', s: 'From spa, tours, and transfers' },
      { v: '4.7★', l: 'Avg. Google rating', s: 'Across all 12 properties' },
      { v: '2.4x', l: 'Review volume increase', s: 'With automated post-stay requests' },
    ],
    timeline: '6 weeks',
    quote: 'Guests now feel connected before they even arrive. The upsell revenue alone pays for the automation 3x over.',
    quoteBy: 'Sunita Rathore — Group GM',
    tags: ['Hospitality AI', 'WhatsApp Concierge', 'OTA Reduction', 'Review Automation'],
  },
  {
    id: 'hospitality-2', industry: 'Hospitality', icon: <Hotel size={20} />, color: '#10B981',
    client: 'QSR Chain (22 Outlets)', location: 'Mumbai, Maharashtra',
    tagline: 'Online Ordering Revenue Up 48% — Zero Commission on Direct Orders',
    readTime: '5 min read',
    excerpt: 'A 22-outlet QSR chain paying 28% commission to Zomato and Swiggy. AI built a direct ordering channel over WhatsApp — cheaper, faster, and now more popular.',
    challenge: 'Zomato and Swiggy taking 25–30% commissions on 80% of orders. Razor-thin margins on delivery. No customer data owned. Customer relationship entirely mediated by aggregators.',
    background: 'The chain had a loyal local customer base but served them through platforms that charged heavily and owned the relationship. The owner had tried a website ordering system that failed — customers didn\'t want another app. The insight was WhatsApp.',
    solution: [
      'WhatsApp ordering system with menu, customization, and checkout in one conversation',
      'Direct delivery network coordination — own riders for <3km radius orders',
      'Loyalty points automation — earn on WhatsApp orders, redeem via unique codes',
      'Repeat order flow — "Order your usual?" with one-tap confirm for frequent customers',
      'Post-meal review automation — Google and Zomato review requests timed 30 minutes post-delivery',
    ],
    process: [
      { step: '01', title: 'Menu Digitization', desc: 'Week 1: built complete WhatsApp menu with customization logic for all 22 outlet menus.' },
      { step: '02', title: 'Order Flow', desc: 'Week 2–3: deployed ordering, payment, and kitchen KOT system via WhatsApp.' },
      { step: '03', title: 'Rider Network', desc: 'Week 3–5: onboarded own delivery riders with WhatsApp dispatch and customer tracking.' },
      { step: '04', title: 'Loyalty & Reviews', desc: 'Week 5–6: launched points program and post-meal review automation.' },
    ],
    stats: [
      { v: '48%', l: 'Direct ordering revenue up', s: 'Zomato/Swiggy share at 40% (from 80%)' },
      { v: '0%', l: 'Commission on direct orders', s: 'vs. 28% on aggregator orders' },
      { v: '4.6★', l: 'Avg. Google rating', s: 'Across 22 outlets (was 3.8★)' },
      { v: '₹18L', l: 'Monthly margin improvement', s: 'From commission reduction' },
    ],
    timeline: '6 weeks',
    quote: 'The customer who orders via WhatsApp spends 22% more per order. They customize more, they trust us more.',
    quoteBy: 'Ajay Thakkar — Owner, ZestBites QSR',
    tags: ['Restaurant Automation', 'WhatsApp Ordering', 'Zomato Alternative', 'QSR Tech'],
  },
  {
    id: 'hospitality-3', industry: 'Hospitality', icon: <Hotel size={20} />, color: '#10B981',
    client: 'Luxury Resort & Spa', location: 'Lonavala, Maharashtra',
    tagline: 'Weekday Revenue Up 61% — Corporate Retreats Now a Revenue Pillar',
    readTime: '5 min read',
    excerpt: 'A premium resort fully booked on weekends but nearly empty on weekdays. AI demand management and targeted campaigns filled the weekday gap without discounting.',
    challenge: '97% weekend occupancy but only 38% on weekdays. Revenue highly seasonal and volatile. Corporate segment largely untapped. Heavy discount dependency to fill weekday rooms.',
    background: 'The resort was a weekend favourite — proximity to Mumbai, beautiful property, strong word-of-mouth. Weekday promotions attracted price-sensitive guests that hurt brand perception.',
    solution: [
      'Corporate wellness retreat packages promoted to HR leaders of Mumbai-based companies',
      'AI lead generation targeting Mumbai corporate buyers with Lonavala retreat offers',
      'Automated conference inquiry handling with customizable package builder and instant quote',
      'Off-peak stay offers sent to past guests filtered by stay history and preference',
      'Weekday couples package campaign targeting past anniversary and honeymoon guests',
    ],
    process: [
      { step: '01', title: 'Segment Analysis', desc: 'Week 1–2: analysed guest database — 3,200 past guests segmented by purpose, spend, frequency.' },
      { step: '02', title: 'Corporate Outreach', desc: 'Week 2–4: built LinkedIn + WhatsApp outreach to HR heads of 200+ Mumbai companies.' },
      { step: '03', title: 'Conference Package', desc: 'Week 4–5: automated conference inquiry with custom package builder and availability sync.' },
      { step: '04', title: 'Guest Reactivation', desc: 'Week 5–6: launched segmented weekday campaigns to past guests by stay type.' },
    ],
    stats: [
      { v: '61%', l: 'Weekday revenue increase', s: 'From corporate + targeted guest campaigns' },
      { v: '24', l: 'Corporate retreats booked', s: 'In first 90 days — a new revenue stream' },
      { v: '₹28L', l: 'Quarterly revenue added', s: 'From weekday segment alone' },
      { v: '0', l: 'Weekday discounts needed', s: 'Revenue without rate erosion' },
    ],
    timeline: '6 weeks',
    quote: 'We stopped discounting and started targeting. Our weekday guests now spend 40% more than our weekend guests.',
    quoteBy: 'Priya Joshi — General Manager, Hilltop Retreat',
    tags: ['Resort Automation', 'Corporate Events', 'Revenue Management', 'Guest Reactivation'],
  },
  {
    id: 'hospitality-4', industry: 'Hospitality', icon: <Hotel size={20} />, color: '#10B981',
    client: 'Vacation Rental Portfolio (34 Properties)', location: 'Goa',
    tagline: 'Direct Booking Rate Hit 71% — Airbnb Commission Cost Halved',
    readTime: '4 min read',
    excerpt: 'A Goa vacation rental operator with 34 properties. Over-dependent on Airbnb and Booking.com. AI built a direct booking engine via WhatsApp.',
    challenge: '83% of bookings via Airbnb and Booking.com at 15–20% commission. No guest database owned. Repeat guests rebooking through platforms — paying commission every time.',
    background: 'The operator had premium properties, excellent reviews, and loyal repeat guests — but every time a repeat guest booked, Airbnb took commission again. Building a direct relationship required capturing guests during their stay.',
    solution: [
      'WhatsApp check-in message on arrival — builds relationship and captures number',
      'Direct booking offer to past guests — "Book direct for Airbnb-price minus commission"',
      'Property recommendation engine — past guests receive matched property suggestions for next trip',
      'Goa experience curation — curated activity, restaurant, and transport packages boosting spend',
      'Annual Goa trip reminder sequence targeting past guests 8 months after checkout',
    ],
    process: [
      { step: '01', title: 'Guest Database', desc: 'Week 1–2: captured WhatsApp contacts from all active bookings via check-in welcome message.' },
      { step: '02', title: 'Direct Booking Flow', desc: 'Week 2–4: built direct booking offer sequence with WhatsApp payment and availability calendar.' },
      { step: '03', title: 'Experience Upsell', desc: 'Week 4–5: deployed curated experience packages with WhatsApp booking for each activity.' },
      { step: '04', title: 'Retention Campaign', desc: 'Week 5–6: launched annual re-engagement sequences timed to guest\'s original travel season.' },
    ],
    stats: [
      { v: '71%', l: 'Direct booking rate', s: 'Up from 17% — dramatic commission savings' },
      { v: '₹22L', l: 'Commission saved quarterly', s: 'Redirected to property improvement' },
      { v: '2.8x', l: 'Guest lifetime value', s: 'Repeat guests book 2.8x more often' },
      { v: '4.9★', l: 'Avg. rating across platforms', s: 'Consistent across 34 properties' },
    ],
    timeline: '6 weeks',
    quote: 'My guests now text me directly. That relationship is worth more than any platform. We\'re building something platforms can\'t replicate.',
    quoteBy: 'Rohan D\'Souza — Founder, GoaHomes',
    tags: ['Vacation Rental', 'Airbnb Alternative', 'Direct Bookings', 'Guest Retention'],
  },
  {
    id: 'hospitality-5', industry: 'Hospitality', icon: <Hotel size={20} />, color: '#10B981',
    client: 'Wedding & Event Venue', location: 'Jaipur, Rajasthan',
    tagline: 'Inquiry-to-Booking Conversion Rate Doubled in 60 Days',
    readTime: '5 min read',
    excerpt: 'A premium wedding venue converting only 18% of inquiries to bookings. Sales process inconsistent, follow-up manual. AI structured the sales journey and doubled conversion.',
    challenge: '200+ monthly wedding inquiries converting at 18%. Sales team of 3 juggling site tours, proposals, and follow-up. Venue calendar not filling optimally — off-peak dates sitting empty.',
    background: 'Jaipur is one of India\'s top destination wedding markets. The venue had the heritage, the location, and the ambience — but the sales process was artisanal. Couples who enquired heard nothing for 3 days, then got a generic brochure.',
    solution: [
      'AI WhatsApp agent responding to all inquiries within 60 seconds with venue deck and date availability',
      'Site tour booking automation with manager calendar and pre-tour information kit',
      'Post-tour proposal follow-up with custom package builder based on guest count and budget',
      'Vendor network automation — preferred caterer, decorator, and photographer introductions',
      'Booking anniversary and referral campaigns to past couples',
    ],
    process: [
      { step: '01', title: 'Inquiry Analysis', desc: 'Week 1: reviewed 6 months of inquiries — 65% never received a follow-up after first response.' },
      { step: '02', title: 'Response Automation', desc: 'Week 2–3: built WhatsApp instant-response with venue deck dispatch and date check.' },
      { step: '03', title: 'Tour & Proposal', desc: 'Week 3–5: automated site tour booking and post-tour custom proposal flow.' },
      { step: '04', title: 'Vendor & Referral', desc: 'Week 5–6: launched vendor introduction flow and post-wedding referral campaign.' },
    ],
    stats: [
      { v: '38%', l: 'Booking conversion', s: 'Up from 18% — doubled in 60 days' },
      { v: '< 60 sec', l: 'First response time', s: 'To every inquiry, 24/7' },
      { v: '₹34L', l: 'Additional quarterly revenue', s: 'From improved conversion rate' },
      { v: '22%', l: 'Referral bookings', s: 'From past couple campaigns' },
    ],
    timeline: '6 weeks',
    quote: 'Couples used to choose venues that responded fast. Now they choose us because we feel personal from the first message.',
    quoteBy: 'Alok Sharma — Director, Heritage Grand',
    tags: ['Wedding Venue', 'Event Sales', 'Inquiry Automation', 'Vendor Management'],
  },
  {
    id: 'manufacturing', industry: 'Manufacturing', icon: <Factory size={20} />, color: '#8B5CF6',
    client: 'Auto Components Manufacturer', location: 'Pune, Maharashtra',
    tagline: 'Procurement Automation Saved ₹18L/Month in 3 Months',
    readTime: '6 min read',
    excerpt: 'Manual procurement, vendor follow-ups eating hours daily, and no real-time visibility into inventory. AI automated the entire procurement-to-payment cycle.',
    challenge: 'Purchase team of 6 spending 60% of time on vendor follow-ups, PO generation, and invoice reconciliation. No real-time inventory visibility led to frequent stockouts and over-ordering.',
    background: 'The company supplied components to 4 large OEMs with tight JIT schedules. Manual procurement meant delays, penalties, and expensive emergency orders. The team was reactive, not proactive.',
    solution: [
      'AI procurement agent auto-generating POs based on inventory triggers and reorder points',
      'Automated vendor follow-up via WhatsApp and email with escalation logic',
      'Three-way matching (PO, GRN, invoice) automation integrated with Tally ERP',
      'Real-time inventory dashboard with predicted stockout alerts 7 days in advance',
      'Supplier performance scoring updated automatically after each transaction',
    ],
    process: [
      { step: '01', title: 'Inventory Audit', desc: 'Week 1–2: mapped all 340 SKUs, reorder points, and vendor lead times.' },
      { step: '02', title: 'PO Automation', desc: 'Week 2–4: built PO generation engine with approval workflow and Tally sync.' },
      { step: '03', title: 'Vendor Comms', desc: 'Week 4–6: deployed WhatsApp/email follow-up sequences for all active POs.' },
      { step: '04', title: 'Dashboard Build', desc: 'Week 6–8: launched real-time inventory and supplier performance dashboards.' },
    ],
    stats: [
      { v: '₹18L', l: 'Monthly savings', s: 'Procurement + emergency order costs' },
      { v: '0', l: 'Stockouts in 3 months', s: 'Down from avg. 8/month' },
      { v: '75%', l: 'Team time saved', s: 'On manual procurement tasks' },
      { v: '12%', l: 'Better negotiated pricing', s: 'With data-driven vendor reviews' },
    ],
    timeline: '8 weeks',
    quote: 'We used to find out about stockouts when the line stopped. Now the AI tells me 7 days in advance.',
    quoteBy: 'Ramesh Patil — Head of Procurement',
    tags: ['Procurement AI', 'ERP Integration', 'Vendor Management', 'Inventory Automation'],
  },
  {
    id: 'manufacturing-2', industry: 'Manufacturing', icon: <Factory size={20} />, color: '#8B5CF6',
    client: 'Textile Dyeing & Processing Mill', location: 'Surat, Gujarat',
    tagline: 'Order Processing Time Cut from 3 Days to 4 Hours',
    readTime: '5 min read',
    excerpt: 'A dyeing mill with 200+ active buyer accounts. Order placement via WhatsApp, email, and phone — chaotic, error-prone, and slow. AI unified the entire order-to-dispatch flow.',
    challenge: 'Orders arriving via 4 channels — WhatsApp, email, phone, and walk-in. Frequent mix-ups in shade, quantity, and delivery deadline. Order processing taking 2–3 days before production could start.',
    background: 'The mill processed 15,000+ metres of fabric daily for 200+ garment exporters. Each buyer had specific shade requirements, delivery deadlines, and credit terms. Manual order entry was causing costly production errors.',
    solution: [
      'Unified order intake via WhatsApp — buyers submit shade card, quantity, and delivery date',
      'AI order parser converting WhatsApp messages to structured production orders in ERP',
      'Automated order confirmation with shade number, quantity, and delivery commitment',
      'Production status WhatsApp updates at dyeing, finishing, and dispatch milestones',
      'Credit limit check automation — overdue buyer orders flagged before processing',
    ],
    process: [
      { step: '01', title: 'Order Flow Mapping', desc: 'Week 1: documented current order journey from buyer to production — found 12 manual handoff points.' },
      { step: '02', title: 'WhatsApp Intake', desc: 'Week 2–3: built structured order intake with AI parsing for shade, quantity, and deadline.' },
      { step: '03', title: 'ERP Integration', desc: 'Week 3–5: connected WhatsApp order parser to production ERP for automatic order creation.' },
      { step: '04', title: 'Status Automation', desc: 'Week 5–6: deployed production milestone WhatsApp updates to buyers.' },
    ],
    stats: [
      { v: '4 hrs', l: 'Order processing time', s: 'Down from 3 days — 18x faster' },
      { v: '94%', l: 'Order accuracy rate', s: 'Up from 71% with manual intake' },
      { v: '₹6.2L', l: 'Monthly rework savings', s: 'From production error reduction' },
      { v: '200+', l: 'Buyer accounts managed', s: 'On single WhatsApp system' },
    ],
    timeline: '6 weeks',
    quote: 'Buyers used to call 3 times to confirm an order. Now they confirm once and trust the system.',
    quoteBy: 'Haresh Patel — MD, ColourCraft Processors',
    tags: ['Textile Manufacturing', 'Order Automation', 'ERP Integration', 'WhatsApp Commerce'],
  },
  {
    id: 'manufacturing-3', industry: 'Manufacturing', icon: <Factory size={20} />, color: '#8B5CF6',
    client: 'Food Processing & Packaging Plant', location: 'Nasik, Maharashtra',
    tagline: 'FSSAI Compliance Automated — Recall Risk Eliminated',
    readTime: '5 min read',
    excerpt: 'A food processing plant with batch traceability entirely on paper. One FSSAI near-miss recall notice was the trigger — AI automated end-to-end batch traceability.',
    challenge: 'Batch traceability maintained in paper registers. A near-miss recall incident exposed the gap — the team couldn\'t trace a contaminated batch within 24 hours as required by FSSAI.',
    background: 'The plant processed 80+ tonnes of food products monthly for institutional buyers, retail chains, and exports. FSSAI and export market requirements mandate batch-level traceability but the manual system was weeks behind.',
    solution: [
      'QR-code based batch intake — every raw material lot scanned at receiving with supplier and date',
      'Automated batch-to-product mapping in production — traceability from raw material to finished goods',
      'FSSAI-ready batch report generation on demand — any product lot traceable in under 5 minutes',
      'Expiry date tracking and first-expiry-first-out dispatch automation',
      'Supplier quality scorecard updated automatically after each batch receipt',
    ],
    process: [
      { step: '01', title: 'Traceability Mapping', desc: 'Week 1–2: mapped all raw material → production → dispatch touchpoints for complete traceability chain.' },
      { step: '02', title: 'QR System Build', desc: 'Week 2–4: deployed QR scanning at receiving, production, and dispatch points.' },
      { step: '03', title: 'FSSAI Report', desc: 'Week 4–5: built on-demand batch traceability report meeting FSSAI recall investigation standards.' },
      { step: '04', title: 'Expiry & Supplier', desc: 'Week 5–7: launched FEFO dispatch logic and supplier performance automation.' },
    ],
    stats: [
      { v: '5 min', l: 'Full batch trace time', s: 'Down from 24+ hours manual search' },
      { v: '0', l: 'Compliance incidents', s: 'Since deployment — audit-ready always' },
      { v: '₹4.8L', l: 'Monthly waste reduction', s: 'From FEFO dispatch and expiry tracking' },
      { v: '3', l: 'Export audits passed', s: 'EU and US buyer audits, zero findings' },
    ],
    timeline: '7 weeks',
    quote: 'An EU buyer auditor gave us a clean bill. Six months ago we\'d have failed the same audit. AI changed our compliance posture completely.',
    quoteBy: 'Sachin Kadam — Plant Manager, FreshPack Foods',
    tags: ['Food Manufacturing', 'FSSAI Compliance', 'Batch Traceability', 'Export Ready'],
  },
  {
    id: 'manufacturing-4', industry: 'Manufacturing', icon: <Factory size={20} />, color: '#8B5CF6',
    client: 'Speciality Chemical Manufacturer', location: 'Vadodara, Gujarat',
    tagline: 'Sales Cycle Shortened 45% — Repeat Order Revenue Up ₹28L/Month',
    readTime: '5 min read',
    excerpt: 'A speciality chemical company where technical sales required 3–4 weeks of back-and-forth. AI-powered documentation and qualification cut the cycle in half.',
    challenge: 'Sales cycle of 3–4 weeks per new customer — dominated by TDS requests, safety data sheets, trial sample management, and pricing negotiation. Sales team managing 80+ active prospects.',
    background: 'Speciality chemical sales is technical and trust-driven. Industrial buyers need detailed product documentation, regulatory clearances, and trial sample results before committing. The sales team was the bottleneck.',
    solution: [
      'AI technical document dispatch — TDS, SDS, COA sent automatically within minutes of inquiry',
      'Trial sample tracking automation — dispatch notification, transit updates, and follow-up after 7 days',
      'Pricing quote automation with customer tier pricing and bulk discount calculator',
      'Regulatory compliance document package automation for REACH, RoHS, and IS standards',
      'Repeat order schedule automation — AI triggers reorder reminder based on consumption cycle',
    ],
    process: [
      { step: '01', title: 'Document Library', desc: 'Week 1–2: organized all product TDS, SDS, and compliance documents into structured library.' },
      { step: '02', title: 'Inquiry Response', desc: 'Week 2–3: built auto-dispatch flow for technical documents based on product inquiry keywords.' },
      { step: '03', title: 'Trial Management', desc: 'Week 3–5: automated trial sample dispatch, tracking, and post-trial follow-up sequence.' },
      { step: '04', title: 'Reorder Engine', desc: 'Week 5–6: built consumption-based reorder reminders for established customers.' },
    ],
    stats: [
      { v: '45%', l: 'Shorter sales cycle', s: 'From 3–4 weeks to 10–12 days' },
      { v: '₹28L', l: 'Repeat order revenue added', s: 'Monthly from reorder automation' },
      { v: '< 5 min', l: 'Technical document delivery', s: 'Down from 24-hour manual dispatch' },
      { v: '2.1x', l: 'Sales team capacity', s: 'Same 6 people, 2.1x more prospects managed' },
    ],
    timeline: '6 weeks',
    quote: 'Our customers used to wait 2 days for a safety data sheet. Now they get it in 4 minutes. That\'s how we win against larger competitors.',
    quoteBy: 'Nilesh Modi — VP Sales, SpecChem Industries',
    tags: ['Chemical Manufacturing', 'Technical Sales', 'Document Automation', 'B2B Automation'],
  },
  {
    id: 'manufacturing-5', industry: 'Manufacturing', icon: <Factory size={20} />, color: '#8B5CF6',
    client: 'Custom Furniture Manufacturer', location: 'Morbi, Gujarat',
    tagline: 'Production Delays Dropped 70% — Clients Track Orders Like Swiggy',
    readTime: '4 min read',
    excerpt: 'A custom furniture maker losing clients to poor communication during production. AI built transparency into the cycle — clients now track their order in real time.',
    challenge: 'Custom furniture production taking 4–8 weeks. Clients calling daily for updates. Production delays caused by miscommunication between sales, design, and workshop teams.',
    background: 'Custom furniture requires alignment across design approval, material selection, production, and delivery — all involving client decisions. Without a communication system, each stage was a delay waiting to happen.',
    solution: [
      'WhatsApp production tracking — clients see their order move from design to workshop to dispatch',
      'Design approval automation — 3D renders sent for digital approval, signed via WhatsApp',
      'Material selection flow — catalogue sent, selection confirmed, fabric/finish order automated',
      'Installation slot booking automation with follow-up and completion photo delivery',
      'Post-delivery review request timed 7 days after installation with referral ask',
    ],
    process: [
      { step: '01', title: 'Process Mapping', desc: 'Week 1–2: mapped all 11 stages of custom order production and identified 6 delay-causing gaps.' },
      { step: '02', title: 'Tracking System', desc: 'Week 2–3: built WhatsApp order tracking with automated status at each production milestone.' },
      { step: '03', title: 'Approval Flows', desc: 'Week 3–4: deployed digital design approval and material selection automation.' },
      { step: '04', title: 'Post-Delivery', desc: 'Week 4–5: launched installation booking, completion documentation, and referral automation.' },
    ],
    stats: [
      { v: '70%', l: 'Production delays reduced', s: 'Client decisions made faster with automation' },
      { v: '0', l: 'Daily status calls', s: 'Down from 40+/day — clients self-serve' },
      { v: '₹4.5L', l: 'Monthly referral revenue', s: 'From post-delivery referral campaign' },
      { v: '4.8★', l: 'Client satisfaction score', s: 'Up from 3.4★ pre-automation' },
    ],
    timeline: '5 weeks',
    quote: 'Clients used to dread the production period. Now they\'re excited — they\'re watching their furniture get built in real time.',
    quoteBy: 'Jigar Shah — Founder, CraftSpace Furniture',
    tags: ['Custom Manufacturing', 'Production Tracking', 'Client Communication', 'Furniture Industry'],
  },
];

function CaseCard({ cs, onClick, delay }) {
  return (
    <motion.div {...up(delay)}
      onClick={() => onClick(cs)}
      style={{
        background: '#fff', borderRadius: 20, overflow: 'hidden',
        border: '1px solid #F3F4F6', cursor: 'pointer',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'all 0.25s',
        display: 'flex', flexDirection: 'column',
      }}
      whileHover={{ y: -4, boxShadow: `0 16px 40px rgba(0,0,0,0.10)` }}>
      {/* Color band */}
      <div style={{ height: 5, background: `linear-gradient(90deg, ${cs.color}, ${cs.color}88)` }} />
      <div style={{ padding: '28px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `${cs.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cs.color }}>
              {cs.icon}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: cs.color, fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cs.industry}</div>
              <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={9} /> {cs.location}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-body)' }}>
            <BookOpen size={11} /> {cs.readTime}
          </div>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#0D1B2E', lineHeight: 1.3, marginBottom: 12 }}>{cs.tagline}</h3>
        <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65, fontFamily: 'var(--font-body)', flex: 1, marginBottom: 20 }}>{cs.excerpt}</p>

        {/* Stats mini */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
          {cs.stats.slice(0, 2).map(s => (
            <div key={s.l} style={{ padding: '10px 12px', background: `${cs.color}08`, borderRadius: 10, border: `1px solid ${cs.color}18` }}>
              <div style={{ fontFamily: 'var(--font-number)', fontSize: 18, fontWeight: 700, color: cs.color, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 10, color: '#6B7280', fontFamily: 'var(--font-body)', marginTop: 3, lineHeight: 1.3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {cs.tags.slice(0, 3).map(t => (
            <span key={t} style={{ fontSize: 10, color: '#6B7280', background: '#F3F4F6', borderRadius: 100, padding: '3px 9px', fontFamily: 'var(--font-body)' }}>{t}</span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: cs.color, fontFamily: 'var(--font-display)' }}>
          Read Case Study <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}

function ArticleModal({ cs, onClose }) {
  if (!cs) return null;
  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '40px 20px', overflowY: 'auto',
      }}>
      <motion.div
        key="modal-panel"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 24, overflow: 'hidden',
          maxWidth: 860, width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
        }}>

        {/* Article hero */}
        <div style={{ background: `linear-gradient(135deg, #0D1B2E 0%, ${cs.color}22 100%)`, padding: '44px 48px 40px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${cs.color}20`, border: `1px solid ${cs.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cs.color }}>{cs.icon}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: cs.color, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-body)' }}>{cs.industry}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <MapPin size={10} /> {cs.location} · <Clock size={10} /> {cs.readTime} · Deployed in {cs.timeline}
              </div>
            </div>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.8vw,34px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>{cs.tagline}</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: 640 }}>{cs.excerpt}</p>
          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
            {cs.tags.map(t => (
              <span key={t} style={{ fontSize: 11, color: cs.color, background: `${cs.color}15`, border: `1px solid ${cs.color}30`, borderRadius: 100, padding: '4px 12px', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Stat bar */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cs.stats.length}, 1fr)`, background: cs.color }}>
          {cs.stats.map((s, i) => (
            <div key={s.l} style={{ textAlign: 'center', padding: '18px 12px', borderRight: i < cs.stats.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-number)', fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>{s.l}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2, fontFamily: 'var(--font-body)' }}>{s.s}</div>
            </div>
          ))}
        </div>

        {/* Article body */}
        <div style={{ padding: '40px 48px' }}>

          {/* Background / Context */}
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#0D1B2E', marginBottom: 12 }}>The Context</h2>
          <div style={{ padding: 24, background: '#FEF9F0', borderRadius: 14, border: '1px solid #FED7AA', marginBottom: 32 }}>
            <p style={{ fontSize: 14, color: '#92400E', lineHeight: 1.75, fontFamily: 'var(--font-body)', margin: 0 }}>{cs.background}</p>
          </div>

          {/* Challenge */}
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#0D1B2E', marginBottom: 12 }}>The Challenge</h2>
          <div style={{ padding: 24, background: '#FEF2F2', borderRadius: 14, border: '1px solid #FEE2E2', marginBottom: 32 }}>
            <p style={{ fontSize: 14, color: '#991B1B', lineHeight: 1.75, fontFamily: 'var(--font-body)', margin: 0 }}>{cs.challenge}</p>
          </div>

          {/* Solution */}
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#0D1B2E', marginBottom: 16 }}>The Solution</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            {cs.solution.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 18px', background: '#F0FDF4', borderRadius: 12, border: '1px solid #BBF7D0' }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <CheckCircle size={13} color="#fff" />
                </div>
                <span style={{ fontSize: 14, color: '#166534', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Process */}
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#0D1B2E', marginBottom: 16 }}>Implementation Timeline</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 36 }}>
            {cs.process.map((p, i) => (
              <div key={i} style={{ padding: '18px 20px', background: `${cs.color}06`, borderRadius: 14, border: `1px solid ${cs.color}18` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: cs.color, letterSpacing: '0.1em', fontFamily: 'var(--font-body)', marginBottom: 6 }}>PHASE {p.step}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#0D1B2E', marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div style={{ background: '#0D1B2E', borderRadius: 18, padding: '28px 32px', display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 36 }}>
            <Quote size={36} color={`${cs.color}55`} style={{ flexShrink: 0, marginTop: 4 }} />
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 500, color: 'rgba(255,255,255,0.88)', lineHeight: 1.65, marginBottom: 14 }}>"{cs.quote}"</p>
              <div style={{ fontSize: 13, fontWeight: 600, color: cs.color, fontFamily: 'var(--font-body)' }}>— {cs.quoteBy}</div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', paddingTop: 8 }}>
            <p style={{ fontSize: 14, color: '#6B7280', fontFamily: 'var(--font-body)', marginBottom: 20 }}>Want results like this for your business?</p>
            <Link to="/contact" onClick={onClose}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `linear-gradient(90deg, ${cs.color}, #F59E0B)`, color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: `0 6px 24px ${cs.color}40` }}>
              Book a Free Strategy Call <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const VISIBLE_COUNT = 9;

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState('All');
  const [openCase, setOpenCase] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const filtered = filter === 'All' ? CASES : CASES.filter(c => c.industry === filter);
  const showToggle = filter === 'All' && filtered.length > VISIBLE_COUNT;
  const displayed = showToggle && !expanded ? filtered.slice(0, VISIBLE_COUNT) : filtered;

  const handleFilterChange = (ind) => { setFilter(ind); setExpanded(false); };

  return (
    <>
      <Helmet>
        <title>Case Studies — AI Agentix</title>
        <meta name="description" content="Real results from real businesses. See how AI Agentix automated operations across healthcare, education, real estate, e-commerce, logistics, hospitality, and manufacturing." />
      </Helmet>
      <SiteNav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg,#0D1B2E 0%,#0F2240 100%)', minHeight: '52vh', display: 'flex', alignItems: 'center', paddingTop: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '8%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,99,26,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '60px 40px', textAlign: 'center' }}>
          <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <TrendingUp size={13} color="#E8631A" />
            <span style={{ fontSize: 12, color: '#E8631A', fontFamily: 'var(--font-body)', fontWeight: 600 }}>35 Case Studies · Real Numbers</span>
          </motion.div>
          <motion.h1 {...up(0.08)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,60px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
            Real Businesses.<br />
            <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Measurable Results.</span>
          </motion.h1>
          <motion.p {...up(0.14)} style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 36px', fontFamily: 'var(--font-body)' }}>
            No stock photos of happy people in offices. Just documented results from AI deployments across India.
          </motion.p>
          {/* Filter pills */}
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {INDUSTRIES.map(ind => (
              <button key={ind} onClick={() => handleFilterChange(ind)}
                style={{ padding: '7px 18px', borderRadius: 100, border: `1px solid ${filter === ind ? '#E8631A' : 'rgba(255,255,255,0.15)'}`, background: filter === ind ? '#E8631A' : 'transparent', color: filter === ind ? '#fff' : 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'all 0.2s' }}>
                {ind}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section style={{ background: '#F9FAFB', padding: '80px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}>
            <div>
              <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2vw,26px)', fontWeight: 800, color: '#0D1B2E', margin: 0 }}>
                {filter === 'All' ? `All Case Studies (${CASES.length})` : `${filter} — ${filtered.length} Case ${filtered.length === 1 ? 'Study' : 'Studies'}`}
              </motion.h2>
              <motion.p {...up(0.05)} style={{ fontSize: 13, color: '#9CA3AF', fontFamily: 'var(--font-body)', margin: '4px 0 0' }}>Click any card to read the full article</motion.p>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
              {displayed.map((cs, i) => (
                <CaseCard key={cs.id} cs={cs} onClick={setOpenCase} delay={i * 0.06} />
              ))}
            </motion.div>
          </AnimatePresence>

          {showToggle && (
            <motion.div {...up(0.1)} style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 44 }}>
              <button
                onClick={() => { setExpanded(false); window.scrollTo({ top: 480, behavior: 'smooth' }); }}
                style={{
                  padding: '11px 28px', borderRadius: 100,
                  border: '1px solid #E5E7EB',
                  background: expanded ? 'transparent' : '#F3F4F6',
                  color: expanded ? '#6B7280' : '#374151',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
                  cursor: expanded ? 'pointer' : 'default',
                  opacity: expanded ? 1 : 0.45, transition: 'all 0.2s',
                }}>
                ← Read Less
              </button>
              <button
                onClick={() => setExpanded(true)}
                style={{
                  padding: '11px 28px', borderRadius: 100, border: 'none',
                  background: expanded ? '#F3F4F6' : 'linear-gradient(90deg,#E8631A,#F59E0B)',
                  color: expanded ? '#6B7280' : '#fff',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
                  cursor: expanded ? 'default' : 'pointer',
                  opacity: expanded ? 0.45 : 1, transition: 'all 0.2s',
                  boxShadow: expanded ? 'none' : '0 4px 18px rgba(232,99,26,0.3)',
                }}>
                Read More → ({filtered.length - VISIBLE_COUNT} more)
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* AGGREGATE STATS */}
      <section style={{ background: '#060E1A', padding: '80px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Across All Deployments</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,2.8vw,38px)', fontWeight: 800, color: '#fff', marginTop: 12 }}>The Numbers Add Up</h2>
          </motion.div>
          <motion.div {...up(0.1)} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {[
              { v: '200+', l: 'Automations Deployed', s: 'Across 7+ industries' },
              { v: '₹50Cr+', l: 'Revenue Generated', s: 'For our clients combined' },
              { v: '8x', l: 'Average ROI', s: 'Measured at 6 months' },
              { v: '97%', l: 'Client Satisfaction', s: 'Post-deployment score' },
            ].map((s, i) => (
              <div key={s.l} style={{ textAlign: 'center', padding: '0 20px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-number)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 700, color: '#E8631A', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', marginTop: 10 }}>{s.l}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontFamily: 'var(--font-body)' }}>{s.s}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* INDUSTRIES STRIP */}
      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#6366F1', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Industry Coverage</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 800, color: '#0D1B2E', marginTop: 12 }}>We've Automated Across</h2>
          </motion.div>
          <p style={{ fontSize: 14, color: '#9CA3AF', fontFamily: 'var(--font-body)', textAlign: 'center', marginBottom: 32, marginTop: -20 }}>7 industries · 35 documented case studies · Real results from real businesses across India</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {INDUSTRIES.filter(ind => ind !== 'All').map((ind, i) => {
              const industryCases = CASES.filter(c => c.industry === ind);
              const anchor = industryCases[0];
              return (
                <motion.div key={ind} {...up(i * 0.06)}
                  onClick={() => { handleFilterChange(ind); window.scrollTo({ top: 480, behavior: 'smooth' }); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', borderRadius: 16, background: '#F9FAFB', border: `1px solid ${anchor.color}22`, cursor: 'pointer', transition: 'all 0.2s' }}
                  whileHover={{ background: `${anchor.color}08`, borderColor: `${anchor.color}45`, y: -2 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: `${anchor.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: anchor.color, flexShrink: 0 }}>{anchor.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: '#0D1B2E' }}>{ind}</div>
                    <div style={{ fontSize: 11, color: anchor.color, fontFamily: 'var(--font-body)', fontWeight: 600, marginTop: 2 }}>{industryCases.length} case studies</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'var(--font-body)', marginTop: 1 }}>{anchor.stats[0].v} {anchor.stats[0].l}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#F9FAFB', padding: '96px 0', textAlign: 'center' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.5vw,52px)', fontWeight: 800, color: '#0D1B2E', lineHeight: 1.15, marginBottom: 20 }}>
            Your Business Could Be<br />
            <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>The Next Case Study</span>
          </motion.h2>
          <motion.p {...up(0.08)} style={{ fontSize: 17, color: '#6B7280', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Book a free discovery call. We'll identify the highest-impact automation for your workflow and show you the expected ROI before you commit.
          </motion.p>
          <motion.div {...up(0.14)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,#E8631A,#F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 6px 24px rgba(232,99,26,0.3)' }}>
              Book Free Strategy Call <ArrowRight size={17} />
            </Link>
            <Link to="/solutions" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #E5E7EB', color: '#0D1B2E', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, padding: '14px 28px', borderRadius: 12, textDecoration: 'none' }}>
              See Solutions
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {openCase && <ArticleModal cs={openCase} onClose={() => setOpenCase(null)} />}
      </AnimatePresence>

      <SiteFooter />
      <VoiceAgentWidget />

      <style>{`
        @media (max-width: 640px) {
          .ax-container { padding: 0 20px !important; }
        }
      `}</style>
    </>
  );
}
