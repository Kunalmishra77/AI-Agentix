import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white pt-[120px] pb-20">
      <Helmet>
        <title>Privacy Policy — AI Agentix</title>
        <meta name="description" content="Privacy Policy of AI Agentix Ltd." />
      </Helmet>

      <div className="max-w-[800px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-display font-black text-[#0D1E3A] mb-8">Privacy Policy</h1>
          <p className="text-[#6B7280] mb-8">Last updated: May 1, 2026</p>

          <div className="prose prose-slate max-w-none text-[#4B5563] space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">1. Introduction</h2>
              <p>Welcome to AI Agentix Ltd. ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">2. Data We Collect</h2>
              <p>We may collect several types of information, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data:</strong> Name, job title.</li>
                <li><strong>Contact Data:</strong> Email address, phone number.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and operating system.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">3. How We Use Your Data</h2>
              <p>We use your data to provide and improve our services, communicate with you, and ensure security. We only process your personal data when we have a legal basis to do so.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">4. Data Security</h2>
              <p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">5. Your Rights</h2>
              <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, or erasure of your data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@ai-agentix.com" className="text-[#F26522] font-semibold">privacy@ai-agentix.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
