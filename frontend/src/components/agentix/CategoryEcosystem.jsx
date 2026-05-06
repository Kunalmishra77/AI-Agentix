import { Link } from 'react-router-dom';
import AgentixIcon from './AgentixIcon';
import AGENTIX_DATA from '../../data/agentixData';

const catIconMap = {
  content: 'content-and-creative-production',
  marketing: 'marketing-and-growth',
  sales: 'sales-and-revenue',
  cx: 'customer-experience-and-support',
  research: 'market-research-and-strategy',
  ops: 'operations-and-workflow-automation',
  systems: 'business-systems-and-knowledge',
  product: 'product-project-and-delivery',
  finance: 'finance-admin-and-compliance',
};

export default function CategoryEcosystem() {
  const cats = AGENTIX_DATA.categories;
  return (
    <section className="section" id="ecosystem">
      <div className="container-wide">
        <div className="sec-head">
          <span className="eyebrow">01 / The ecosystem</span>
          <h2 className="h-1">One platform. Nine connected domains.</h2>
          <p className="body-lg" style={{ maxWidth: 640, marginTop: 20 }}>
            Agentix replaces the patchwork of point tools with a single operating layer — purpose-built for the moves a modern business actually needs to make.
          </p>
        </div>
        <div className="ecosystem-grid">
          {cats.map((c, i) => (
            <Link key={c.id} to={`/category/${c.id}`} className="eco-card card"
              style={{ '--accent-cat': c.accent, '--accent-cat-rgb': c.accentRgb, animationDelay: `${i * 40}ms` }}>
              <div className="eco-card-head">
                <span className="eco-dot" style={{ background: c.accent }}/>
                <span className="eco-num mono">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="eco-icon-wrap">
                <img
                  src={`/agentix-generated-media/icons/categories/${catIconMap[c.id] ?? c.id}.svg`}
                  alt=""
                  style={{ width: 36, height: 36, filter: 'brightness(0) invert(1)', opacity: 0.55 }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div className="eco-name">{c.name}</div>
              <div className="eco-desc">{c.promise || c.short}</div>
              <div className="eco-stats">
                <span className="mono">{c.subcategories.length} workflows</span>
                <span className="mono">·</span>
                <span className="mono">{c.subcategories.reduce((s, sc) => s + sc.tools.length, 0)} tools</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
