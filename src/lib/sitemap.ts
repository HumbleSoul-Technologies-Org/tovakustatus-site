/**
 * Sitemap Generator for SEO
 * Creates a sitemap.xml for Google Search Console
 */

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (urls: SitemapUrl[]): string => {
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://tovakustatus.com';
  
  const xmlUrls = urls
    .map(
      (url) => `
  <url>
    <loc>${new URL(url.loc, baseUrl).href}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
};

// Default site structure for the application
export const defaultSitemapUrls: SitemapUrl[] = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    loc: '/about',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: '/talents',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    loc: '/events',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    loc: '/blog',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    loc: '/media',
    changefreq: 'weekly',
    priority: 0.7,
  },
  {
    loc: '/get-involved',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: '/contact',
    changefreq: 'monthly',
    priority: 0.7,
  },
];

/**
 * Generates a robots.txt content
 */
export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /login
Disallow: /admin

Sitemap: ${import.meta.env.VITE_SITE_URL || 'https://tovakustatus.com'}/sitemap.xml
`;
};
