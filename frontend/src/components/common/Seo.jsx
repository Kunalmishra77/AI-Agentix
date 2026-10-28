import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SITE_NAME, DEFAULT_OG_IMAGE, SITE_URL, canonicalUrl, organizationJsonLd } from '../../lib/seo'

/** Per-page title, description, canonical, Open Graph and Twitter tags (AGX-005). */
export default function Seo({ title, description, image = DEFAULT_OG_IMAGE, noindex = false, org = false }) {
  const { pathname } = useLocation()
  const url = canonicalUrl(pathname)
  const img = image.startsWith('http') ? image : SITE_URL + image
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={img} />
      {org && <script type="application/ld+json">{JSON.stringify(organizationJsonLd())}</script>}
    </Helmet>
  )
}
