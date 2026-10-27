import Seo from '../components/common/Seo'
import { meta } from '../data/contact'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import Section from '../components/common/Section'
import ContactHero from '../components/contact/ContactHero'
import ContactForms from '../components/contact/ContactForms'
import ContactAside from '../components/contact/ContactAside'
import ContactFaq from '../components/contact/ContactFaq'
import ContactCta from '../components/contact/ContactCta'

export default function ContactPage() {
  return (
    <>
      <Seo title={meta.title} description={meta.description} />
      <ScrollProgress />
      <SiteNav />
      <main id="main" tabIndex={-1} className="outline-none">
        <ContactHero />
        <Section tone="white">
          <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
            <ContactForms />
            <ContactAside />
          </div>
        </Section>
        <ContactFaq />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  )
}
