import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white pt-[120px] pb-20">
      <Helmet>
        <title>Terms and Conditions — AI Agentix</title>
        <meta name="description" content="Terms and Conditions of AI Agentix Ltd." />
      </Helmet>

      <div className="max-w-[800px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-display font-black text-[#0D1E3A] mb-8">Terms and Conditions</h1>
          <p className="text-[#6B7280] mb-8">Last updated: May 1, 2026</p>

          <div className="prose prose-slate max-w-none text-[#4B5563] space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials on AI Agentix's website for personal, non-commercial transitory viewing only.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">3. Disclaimer</h2>
              <p>The materials on AI Agentix's website are provided on an 'as is' basis. AI Agentix makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">4. Limitations</h2>
              <p>In no event shall AI Agentix or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">5. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
