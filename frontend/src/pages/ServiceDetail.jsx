import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { fetchServiceBySlug } from '../lib/api.js';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { data: service, isLoading, isError } = useQuery({
    queryKey: ['service', slug],
    queryFn: () => fetchServiceBySlug(slug),
  });

  if (isLoading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-[#555] text-[15px]">Loading...</div>
    </div>
  );

  if (isError || !service) return (
    <div className="min-h-screen bg-white flex items-center justify-center text-center px-6">
      <div>
        <p className="text-[64px] font-display font-black text-[#e5e5e5] leading-none select-none">404</p>
        <h1 className="text-[22px] font-display font-bold text-[#0D1E3A] mt-4 mb-3">Service not found</h1>
        <Link to="/" className="btn-accent">Go Home</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{service.title} — AI Agentix Services</title>
        <meta name="description" content={service.description || service.tagline || `AI Agentix ${service.title} service for enterprise.`} />
        <link rel="canonical" href={`https://ai-agentix.com/services/${service.slug}`} />
      </Helmet>
      {/* Hero */}
      <div className="pt-[120px] pb-16 section-pad border-b border-[#e5e5e5]">
        <div className="content-wrap max-w-3xl">
          {service.icon && (
            <span className="text-[48px] leading-none block mb-4">{service.icon}</span>
          )}
          <p className="eyebrow text-[#F26522] mb-4">Service</p>
          <h1 className="section-title text-[#0D1E3A] mb-4">{service.title}</h1>
          <div className="w-12 h-px bg-[#F26522] mb-6" />
          {service.tagline && (
            <p className="text-[20px] text-[#555] leading-relaxed">{service.tagline}</p>
          )}
        </div>
      </div>

      {/* Description */}
      {service.description && (
        <div className="section-pad py-16">
          <div className="content-wrap max-w-3xl">
            <p className="text-[17px] text-[#555] leading-relaxed">{service.description}</p>
          </div>
        </div>
      )}

      {/* Features */}
      {service.features?.length > 0 && (
        <div className="section-pad py-0 pb-16">
          <div className="content-wrap max-w-3xl">
            <h2 className="text-[11px] uppercase tracking-widest text-[#F26522] mb-8">What's included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-[#e5e5e5]">
              {service.features.map((f, i) => (
                <div key={i} className="p-6 border-b border-r border-[#e5e5e5] last:border-r-0">
                  <span className="text-[#F26522] mr-2">→</span>
                  <span className="text-[15px] text-[#0D1E3A]">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="section-pad py-20 bg-[#f7f7f5] text-center border-t border-[#e5e5e5]">
        <div className="content-wrap max-w-2xl">
          <p className="text-[11px] uppercase tracking-widest text-[#F26522] mb-4">Interested?</p>
          <h2 className="text-[28px] font-display font-black text-[#0D1E3A] mb-6">
            Let's discuss your {service.title} project
          </h2>
          <Link to="/contact" className="inline-flex items-center px-8 py-3.5 bg-[#F26522] text-white font-display font-bold hover:bg-[#FF7A3D] transition-colors">Book a Free Consultation →</Link>
        </div>
      </div>
    </div>
  );
}
