import { Helmet } from 'react-helmet-async'
import { meta } from '../data/home'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import Hero from '../components/home/Hero'
import PlatformMarquee from '../components/home/PlatformMarquee'
import ProblemSection from '../components/home/ProblemSection'
import Capabilities from '../components/home/Capabilities'
import TrackRecord from '../components/home/TrackRecord'
import HowItWorks from '../components/home/HowItWorks'
import Solutions from '../components/home/Solutions'
import Industries from '../components/home/Industries'
import CaseStudies from '../components/home/CaseStudies'
import WhyUs from '../components/home/WhyUs'
import Testimonials from '../components/home/Testimonials'
import RoiCase from '../components/home/RoiCase'
import FinalCta from '../components/home/FinalCta'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>
      <SiteNav />
      <main>
        <Hero />
        <PlatformMarquee />
        <ProblemSection />
        <Capabilities />
        <TrackRecord />
        <HowItWorks />
        <Solutions />
        <Industries />
        <CaseStudies />
        <WhyUs />
        <Testimonials />
        <RoiCase />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
