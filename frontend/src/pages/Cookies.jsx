import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-white pt-[120px] pb-20">
      <Helmet>
        <title>Cookies Policy — AI Agentix</title>
        <meta name="description" content="Cookies Policy of AI Agentix Ltd." />
      </Helmet>

      <div className="max-w-[800px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-display font-black text-[#0D1E3A] mb-8">Cookies Policy</h1>
          <p className="text-[#6B7280] mb-8">Last updated: May 1, 2026</p>

          <div className="prose prose-slate max-w-none text-[#4B5563] space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">1. What Are Cookies</h2>
              <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">2. How We Use Cookies</h2>
              <p>We use cookies for various reasons, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with the website.</li>
                <li><strong>Functional Cookies:</strong> Allow the website to remember choices you make.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">3. Controlling Cookies</h2>
              <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D1E3A] mt-8 mb-4">4. Updates to This Policy</h2>
              <p>We may update this Cookies Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
