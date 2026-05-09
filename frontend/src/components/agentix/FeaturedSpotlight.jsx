import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Edit3, Rocket, Zap, MessageCircle, Search, GitBranch, Cpu, Layers, Shield,
  ArrowRight, Workflow, Activity, Terminal, Share2, Settings, Info
} from 'lucide-react';
import LottieAnimation from './LottieAnimation.jsx';
import { getCategoryAnimation } from '../../data/lottieMappings.js';
import AGENTIX_DATA from '../../data/agentixData.js';

const CATEGORY_ICONS = {
  content: Edit3,
  marketing: Rocket,
  sales: Zap,
  cx: MessageCircle,
  research: Search,
  ops: GitBranch,
  systems: Cpu,
  product: Layers,
  finance: Shield,
};

/**
 * OS Command Console Spotlight.
 * High-fidelity representation of the AI OS core nodes.
 */
export default function FeaturedSpotlight() {
  const allTools = useMemo(() => {
    return AGENTIX_DATA.categories.flatMap(cat => 
      cat.subcategories.flatMap(sub => 
        sub.tools.map(tool => ({
          name: tool,
          categoryId: cat.id,
          categoryName: cat.name,
          subcategoryName: sub.name,
          accent: cat.accent,
          accentRgb: cat.accentRgb,
          id: tool.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        }))
      )
    );
  }, []);

  const spotlightTools = useMemo(() => {
    const selected = [];
    const priorityCategories = ['ops', 'content', 'sales', 'marketing', 'research'];
    priorityCategories.forEach(catId => {
      const cat = AGENTIX_DATA.categories.find(c => c.id === catId);
      if (cat && cat.featured?.[0]) {
        const tool = allTools.find(t => t.name === cat.featured[0]);
        if (tool) selected.push(tool);
      }
    });
    return selected.slice(0, 5);
  }, [allTools]);

  return (
    <section className="console-spotlight" style={{ background: '#020607', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
      {/* OS Background Elements */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '80%', height: '80%', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '40px' }} />
        <div style={{ position: 'absolute', top: '15%', left: '10%', width: '70%', height: '70%', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '20px' }} />
      </div>

      <div className="container-wide" style={{ position: 'relative', zIndex: 10 }}>
        <div className="console-header" style={{ textAlign: 'center', marginBottom: '100px' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mono" 
            style={{ fontSize: '10px', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '10px', letterSpacing: '0.3em', background: 'rgba(255,255,255,0.02)', padding: '8px 20px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <Activity size={12} className="pulse-anim" /> OS_CORE_INFRASTRUCTURE_V2.0
          </motion.div>
          <h2 className="h-display" style={{ marginTop: '32px', fontSize: 'clamp(40px, 6vw, 64px)', letterSpacing: '-0.04em' }}>The neural core of your business.</h2>
          <p className="body-lg" style={{ maxWidth: 640, margin: '24px auto 0', color: 'var(--ink-3)', opacity: 0.8 }}>
            High-latency operations replaced by integrated AI nodes. Deploy, monitor, and scale in real-time.
          </p>
        </div>

        {/* Console Interface Grid */}
        <div className="console-interface" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
          
          {/* LARGE CORE NODE (The System Brain) */}
          <div style={{ gridColumn: 'span 7', gridRow: 'span 2' }}>
            {spotlightTools[0] && <CoreNode tool={spotlightTools[0]} />}
          </div>

          {/* PERIPHERAL MODULES GRID */}
          <div style={{ gridColumn: 'span 5', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {spotlightTools.slice(1, 3).map((tool, idx) => (
              <PeripheralModule key={tool.id} tool={tool} index={idx + 1} />
            ))}
          </div>

          <div style={{ gridColumn: 'span 5', display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
             {spotlightTools[3] && <LongModule tool={spotlightTools[3]} index={3} />}
          </div>

        </div>
      </div>

      <style>{`
        .pulse-anim { animation: ax-pulse 2s infinite; }
        @keyframes ax-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        
        .glass-panel {
          background: rgba(10, 15, 16, 0.6);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-panel:hover {
          background: rgba(15, 22, 24, 0.8);
          border-color: rgba(var(--accent-cat-rgb), 0.3);
          transform: translateY(-4px);
          box-shadow: 0 30px 100px -20px rgba(0,0,0,0.9);
        }
        
        .scan-line {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: scan 4s linear infinite;
        }
        @keyframes scan { from { top: -10%; } to { top: 110%; } }

        @media (max-width: 1100px) {
          .console-interface { grid-template-columns: 1fr !important; }
          .console-interface > div { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}

function CoreNode({ tool }) {
  const Icon = CATEGORY_ICONS[tool.categoryId] || Workflow;
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass-panel core-node" 
      style={{ height: '100%', padding: '60px', '--accent-cat-rgb': tool.accentRgb }}
    >
      <div className="scan-line" />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <div className="mono" style={{ fontSize: '11px', color: tool.accent, display: 'flex', alignItems: 'center', gap: 12 }}>
             <div style={{ width: 8, height: 8, borderRadius: '50%', background: tool.accent, boxShadow: `0 0 15px ${tool.accent}` }} />
             PRIMARY_PROCESSING_UNIT // {tool.categoryName.toUpperCase()}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
             {[1,2,3].map(i => <div key={i} style={{ width: 4, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />)}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flex: 1 }}>
          <div className="visual-orb" style={{ width: '300px', height: '300px', position: 'relative', flexShrink: 0 }}>
             <div style={{ position: 'absolute', inset: '-15%', background: `radial-gradient(circle at center, rgba(${tool.accentRgb}, 0.15), transparent 70%)`, filter: 'blur(50px)' }} />
             <LottieAnimation url={getCategoryAnimation(tool.categoryId, tool.id)} style={{ transform: 'scale(1.5)' }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: '24px' }}>
              <div style={{ padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', color: tool.accent }}>
                <Icon size={32} />
              </div>
              <h3 style={{ fontSize: '42px', fontWeight: 800, margin: 0, letterSpacing: '-0.03em' }}>{tool.name}</h3>
            </div>
            <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '40px' }}>
              The central nervous system for your {tool.categoryName.toLowerCase()} stack. Automates high-complexity sequences with native OS governance.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
               <Readout label="CPU_UTILIZATION" value="88.2%" percent={88} color={tool.accent} />
               <Readout label="NEURAL_LOAD" value="OPTIMAL" percent={42} color={tool.accent} />
            </div>
          </div>
        </div>

        <Link to={`/tools/${tool.id}`} className="btn btn-primary" style={{ marginTop: '60px', width: 'fit-content', padding: '16px 40px' }}>
          Initialize Master Node <ArrowRight size={18} style={{ marginLeft: 12 }} />
        </Link>
      </div>
    </motion.div>
  );
}

function PeripheralModule({ tool, index }) {
  const Icon = CATEGORY_ICONS[tool.categoryId] || Workflow;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-panel" 
      style={{ padding: '32px', '--accent-cat-rgb': tool.accentRgb }}
    >
      <div className="mono" style={{ fontSize: '9px', opacity: 0.4, marginBottom: '24px' }}>EXT_MODULE_0{index}</div>
      <div style={{ width: '100px', height: '100px', margin: '0 auto 24px', position: 'relative' }}>
         <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at center, rgba(${tool.accentRgb}, 0.1), transparent 70%)`, filter: 'blur(20px)' }} />
         <LottieAnimation url={getCategoryAnimation(tool.categoryId, tool.id)} />
      </div>
      <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>{tool.name}</h4>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: tool.accent }}>
        <Icon size={14} />
        <span className="mono" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>ACTIVE</span>
      </div>
      <Link to={`/tools/${tool.id}`} style={{ position: 'absolute', inset: 0 }} />
    </motion.div>
  );
}

function LongModule({ tool, index }) {
  const Icon = CATEGORY_ICONS[tool.categoryId] || Workflow;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-panel" 
      style={{ padding: '32px 40px', display: 'flex', alignItems: 'center', gap: '32px', '--accent-cat-rgb': tool.accentRgb }}
    >
      <div style={{ width: '80px', height: '80px', flexShrink: 0 }}>
         <LottieAnimation url={getCategoryAnimation(tool.categoryId, tool.id)} />
      </div>
      <div style={{ flex: 1 }}>
        <div className="mono" style={{ fontSize: '9px', opacity: 0.4, marginBottom: '4px' }}>AUX_SYSTEM_LOADER</div>
        <h4 style={{ fontSize: '20px', fontWeight: 700 }}>{tool.name}</h4>
      </div>
      <div style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
         <Icon size={20} color={tool.accent} />
      </div>
      <Link to={`/tools/${tool.id}`} style={{ position: 'absolute', inset: 0 }} />
    </motion.div>
  );
}

function Readout({ label, value, percent, color }) {
  return (
    <div style={{ borderLeft: '1px solid rgba(255,255,255,0.05)', paddingLeft: '20px' }}>
      <div className="mono" style={{ fontSize: '9px', color: 'var(--ink-3)', marginBottom: '8px' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>{value}</div>
        <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.05)', marginBottom: '6px', borderRadius: '2px', overflow: 'hidden' }}>
           <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ height: '100%', background: color }} 
           />
        </div>
      </div>
    </div>
  );
}
