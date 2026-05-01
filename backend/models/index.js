import mongoose from 'mongoose';

// ══════════════════════════════════════════════════════════════
// POST (Blog)
// ══════════════════════════════════════════════════════════════
const PostSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, index: true },
  excerpt:     { type: String, required: true, maxlength: 400 },
  content:     { type: String, required: true },
  coverImage:  { type: String, default: '' },
  categories:  [{ type: String, trim: true }],
  tags:        [{ type: String, trim: true }],
  author: {
    name:   { type: String, required: true },
    role:   { type: String, default: '' },
    avatar: { type: String, default: '' },
  },
  status:      { type: String, enum: ['draft','published','archived'], default: 'draft' },
  featured:    { type: Boolean, default: false },
  views:       { type: Number, default: 0 },
  readTime:    { type: Number, default: 5 },
  publishedAt: { type: Date },
  metaTitle:   { type: String },
  metaDesc:    { type: String },
}, { timestamps: true });
PostSchema.index({ slug:1, status:1, publishedAt:-1 });
PostSchema.pre('save', function(next) {
  if (this.status === 'published' && !this.publishedAt) this.publishedAt = new Date();
  next();
});
export const Post = mongoose.model('Post', PostSchema);


// ══════════════════════════════════════════════════════════════
// CASE STUDY
// ══════════════════════════════════════════════════════════════
const CaseStudySchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, index: true },
  client:      { type: String, required: true },
  clientLogo:  { type: String, default: '' },
  industry:    { type: String, required: true },
  service:     { type: String, default: '' },
  tags:        [{ type: String }],
  challenge:   { type: String, required: true },
  solution:    { type: String, required: true },
  result:      { type: String, required: true },
  fullContent: { type: String, default: '' },
  quote: {
    text:   { type: String, default: '' },
    author: { type: String, default: '' },
    role:   { type: String, default: '' },
  },
  metrics: [{
    value: { type: String },
    label: { type: String },
  }],
  coverImage:  { type: String, default: '' },
  status:      { type: String, enum: ['draft','published'], default: 'draft' },
  featured:    { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
  metaTitle:   { type: String },
  metaDesc:    { type: String },
}, { timestamps: true });
export const CaseStudy = mongoose.model('CaseStudy', CaseStudySchema);


// ══════════════════════════════════════════════════════════════
// SERVICE
// ══════════════════════════════════════════════════════════════
const ServiceSchema = new mongoose.Schema({
  title:     { type: String, required: true, trim: true },
  slug:      { type: String, required: true, unique: true, index: true },
  category:  { type: String, required: true,
               enum: ['Discover','Organize Data','Develop','Deploy'] },
  shortDesc: { type: String, required: true, maxlength: 250 },
  fullDesc:  { type: String, default: '' },
  icon:      { type: String, default: '' },
  image:     { type: String, default: '' },
  features:  [{ type: String }],
  active:    { type: Boolean, default: true },
  order:     { type: Number, default: 0 },
  pageTitle: { type: String },
  pageDesc:  { type: String },
}, { timestamps: true });
export const Service = mongoose.model('Service', ServiceSchema);


// ══════════════════════════════════════════════════════════════
// CLIENT (Logo strip)
// ══════════════════════════════════════════════════════════════
const ClientSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  logo:     { type: String, required: true },
  website:  { type: String, default: '' },
  industry: { type: String, default: '' },
  active:   { type: Boolean, default: true },
  order:    { type: Number, default: 0 },
}, { timestamps: true });
export const Client = mongoose.model('Client', ClientSchema);


// ══════════════════════════════════════════════════════════════
// RESOURCE (Whitepapers, eBooks, Webinars)
// ══════════════════════════════════════════════════════════════
const ResourceSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, index: true },
  type:        { type: String, required: true,
                 enum: ['whitepaper','ebook','webinar','guide','report'] },
  category:    { type: String, default: 'Artificial Intelligence' },
  description: { type: String, default: '' },
  excerpt:     { type: String, maxlength: 300 },
  coverImage:  { type: String, default: '' },
  downloadUrl: { type: String, default: '' },
  gated:       { type: Boolean, default: true },
  downloads:   { type: Number, default: 0 },
  active:      { type: Boolean, default: true },
  order:       { type: Number, default: 0 },
}, { timestamps: true });
export const Resource = mongoose.model('Resource', ResourceSchema);


// ══════════════════════════════════════════════════════════════
// TEAM MEMBER
// ══════════════════════════════════════════════════════════════
const TeamMemberSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  role:       { type: String, required: true },
  bio:        { type: String, default: '' },
  avatar:     { type: String, default: '' },
  linkedin:   { type: String, default: '' },
  twitter:    { type: String, default: '' },
  department: { type: String, default: 'Engineering' },
  active:     { type: Boolean, default: true },
  order:      { type: Number, default: 0 },
}, { timestamps: true });
export const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);


// ══════════════════════════════════════════════════════════════
// AWARD / BADGE
// ══════════════════════════════════════════════════════════════
const AwardSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  issuer: { type: String, default: '' },
  year:   { type: Number },
  badge:  { type: String, default: '' },
  url:    { type: String, default: '' },
  active: { type: Boolean, default: true },
  order:  { type: Number, default: 0 },
}, { timestamps: true });
export const Award = mongoose.model('Award', AwardSchema);


// ══════════════════════════════════════════════════════════════
// CONTACT SUBMISSION
// ══════════════════════════════════════════════════════════════
const ContactSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true, trim: true, lowercase: true },
  company: { type: String, trim: true, default: '' },
  phone:   { type: String, default: '' },
  service: { type: String, default: '' },
  message: { type: String, required: true },
  budget:  { type: String, default: '' },
  source:  { type: String, default: '' },
  status:  { type: String,
             enum: ['new','contacted','qualified','proposal','closed'],
             default: 'new' },
  notes:   { type: String, default: '' },
  ip:      { type: String, default: '' },
  userAgent:{ type: String, default: '' },
}, { timestamps: true });
ContactSchema.index({ email: 1, createdAt: -1 });
export const Contact = mongoose.model('Contact', ContactSchema);


// ══════════════════════════════════════════════════════════════
// NEWSLETTER SUBSCRIBER
// ══════════════════════════════════════════════════════════════
const SubscriberSchema = new mongoose.Schema({
  email:     { type: String, required: true, unique: true, lowercase: true },
  confirmed: { type: Boolean, default: false },
  source:    { type: String, default: 'website' },
  token:     { type: String },
  name:      { type: String, default: '' },
}, { timestamps: true });
export const Subscriber = mongoose.model('Subscriber', SubscriberSchema);


// ══════════════════════════════════════════════════════════════
// ADMIN USER
// ══════════════════════════════════════════════════════════════
import bcrypt from 'bcryptjs';
const AdminSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role:     { type: String, enum: ['admin','superadmin'], default: 'admin' },
  active:   { type: Boolean, default: true },
  lastLogin:{ type: Date },
}, { timestamps: true });
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
AdminSchema.methods.comparePassword = async function(candidate) {
  return bcrypt.compare(candidate, this.password);
};
export const Admin = mongoose.model('Admin', AdminSchema);
