import {
  FaHospital, FaFileMedical, FaBrain, FaLock, FaFileLines, FaMicroscope,
  FaRobot, FaChartBar, FaShieldHalved, FaTriangleExclamation, FaChartLine,
  FaScroll, FaBriefcase, FaFileContract, FaCommentsDollar, FaMagnifyingGlass,
  FaCartShopping, FaBoxesStacked, FaTag, FaArrowsRotate, FaWandMagicSparkles,
  FaDollarSign, FaComments, FaBullseye, FaGear, FaLink, FaEye, FaIndustry,
  FaCalendar, FaGlobe, FaGraduationCap, FaBook, FaPen, FaBolt, FaHandshake,
  FaMobileScreen, FaEnvelope, FaCheck, FaUsers, FaDatabase, FaCode,
  FaMap, FaBuilding, FaNetworkWired, FaFlask, FaChartPie, FaStar, FaLayerGroup,
  FaLinkedinIn, FaXTwitter, FaFacebookF, FaInstagram, FaYoutube, FaGithub,
  FaCircleCheck, FaClipboardList, FaLightbulb, FaRocket,
  FaStethoscope, FaChartArea, FaCloud, FaClock,
  FaMoneyBillWave, FaPlane, FaTruck,
  FaServer, FaWrench, FaBoxOpen,
} from 'react-icons/fa6';

const iconMap = {
  // Healthcare
  hospital: FaHospital,
  'file-medical': FaFileMedical,
  stethoscope: FaStethoscope,
  microscope: FaMicroscope,
  // Business & Finance
  briefcase: FaBriefcase,
  scroll: FaScroll,
  'file-contract': FaFileContract,
  'comments-dollar': FaCommentsDollar,
  'money-bill': FaMoneyBillWave,
  // Data & Tech
  brain: FaBrain,
  robot: FaRobot,
  database: FaDatabase,
  code: FaCode,
  layers: FaLayerGroup,
  network: FaNetworkWired,
  cloud: FaCloud,
  bolt: FaBolt,
  gear: FaGear,
  cog: FaGear,
  flask: FaFlask,
  server: FaServer,
  wrench: FaWrench,
  // Analytics
  'chart-bar': FaChartBar,
  'chart-line': FaChartLine,
  'chart-pie': FaChartPie,
  'chart-area': FaChartArea,
  'chart-up': FaChartLine,
  // Security & Compliance
  lock: FaLock,
  shield: FaShieldHalved,
  check: FaCheck,
  'circle-check': FaCircleCheck,
  // Communication
  comments: FaComments,
  envelope: FaEnvelope,
  handshake: FaHandshake,
  // Navigation & UI
  'magnifying-glass': FaMagnifyingGlass,
  search: FaMagnifyingGlass,
  eye: FaEye,
  link: FaLink,
  map: FaMap,
  globe: FaGlobe,
  'arrows-rotate': FaArrowsRotate,
  // Commerce & Retail
  'cart-shopping': FaCartShopping,
  cart: FaCartShopping,
  tag: FaTag,
  'boxes-stacked': FaBoxesStacked,
  'dollar-sign': FaDollarSign,
  bullseye: FaBullseye,
  // Manufacturing & Industry
  industry: FaIndustry,
  calendar: FaCalendar,
  clock: FaClock,
  // Education
  'graduation-cap': FaGraduationCap,
  book: FaBook,
  pen: FaPen,
  'clipboard-list': FaClipboardList,
  // Content & Marketing
  mobile: FaMobileScreen,
  'wand-sparkles': FaWandMagicSparkles,
  sparkle: FaWandMagicSparkles,
  lightbulb: FaLightbulb,
  rocket: FaRocket,
  star: FaStar,
  // General
  building: FaBuilding,
  users: FaUsers,
  triangle: FaTriangleExclamation,
  warning: FaTriangleExclamation,
  'file-lines': FaFileLines,
  'file-alt': FaFileLines,
  'box-open': FaBoxOpen,
  // Transport & Industry
  plane: FaPlane,
  truck: FaTruck,
  // Social
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
  github: FaGithub,
};

export function Icon({ name = '', size = 20, className = '', style = {} }) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} className={className} style={style} />;
}

export { iconMap };
export default Icon;
