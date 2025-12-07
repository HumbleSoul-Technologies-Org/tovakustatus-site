# SEO Optimization Guide for Tova ku Status

This document outlines all SEO optimizations implemented for better Google search visibility.

## ✅ Completed Optimizations

### 1. **Meta Tags & Head Optimization**
- ✅ Primary meta description with keywords
- ✅ Open Graph tags for social sharing (Facebook, LinkedIn)
- ✅ Twitter Card tags for Twitter sharing
- ✅ Canonical URL tags
- ✅ Robots meta tag (index, follow)
- ✅ Theme color meta tag
- ✅ Schema.org structured data (Organization schema)

### 2. **Sitemap & Robots**
- ✅ `sitemap.xml` created at `/public/sitemap.xml`
- ✅ `robots.txt` created at `/public/robots.txt`
- Both files are automatically served by Vite

### 3. **SEO Hook & Meta Tag Manager**
- ✅ Created `use-seo.ts` hook for easy page-level SEO management
- ✅ Created `seo.ts` utility library for programmatic meta tag updates
- ✅ Created `sitemap.ts` for dynamic sitemap generation

### 4. **Page-Level Optimization**
- ✅ Home page: SEO hook integrated with targeted keywords

## 🚀 How to Use on Other Pages

Add SEO optimization to any page by:

```tsx
import { useSEO } from "@/hooks/use-seo";

export default function YourPage() {
  useSEO({
    title: "Your Page Title",
    description: "Unique description for this page",
    keywords: ["keyword1", "keyword2", "keyword3"],
    imageUrl: "https://example.com/image.jpg",
  });

  // Rest of your component...
}
```

## 📋 Recommended Keywords by Page

### Talents Page
- "talented youth", "talent discovery", "young artists", "skill development"
- "emerging talents", "youth mentorship", "career opportunities"

### Blog Page
- "blog", "news", "insights", "stories", "updates"
- "youth empowerment articles", "social impact stories"

### Events Page
- "events", "workshops", "webinars", "community events"
- "talent showcase", "networking events"

### Get Involved Page
- "volunteer", "partnership", "sponsorship", "donate"
- "support talented youth", "social initiative"

### About Page
- "about us", "mission", "vision", "organization"
- "our team", "our impact"

## 🔧 Configuration

### Environment Variables
Add to `.env` file:
```env
VITE_SITE_URL=https://tovakustatus.com
VITE_API_URL=https://api.tovakustatus.com
```

### Update Social Links
In `index.html`, update these URLs to your actual social profiles:
- Facebook: https://www.facebook.com/tovakustatus
- Twitter: https://www.twitter.com/tovakustatus
- Instagram: https://www.instagram.com/tovakustatus

## 📊 Google Search Console Setup

1. **Verify Site Ownership**
   - Add `sitemap.xml` to Google Search Console
   - Submit `robots.txt` for verification

2. **Monitor**
   - Check "Coverage" report for indexing issues
   - Monitor "Core Web Vitals" for performance
   - Review "Search Analytics" for top keywords

3. **Improve**
   - Fix any crawl errors shown in reports
   - Monitor keyword rankings
   - Add rich snippets data as needed

## 🏗️ Structured Data

Current structured data includes:
- Organization schema (for company info)
- Can add: Article schema (blog posts), Event schema, Person schema (talents)

### Adding Article Schema (for Blog Posts)

```tsx
// Add to BlogDetail.tsx
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.imageUrl,
  "datePublished": post.date,
  "author": {
    "@type": "Person",
    "name": post.author
  }
};

// Add to head
useEffect(() => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(articleSchema);
  document.head.appendChild(script);
}, [post]);
```

## 📱 Mobile Optimization

✅ Viewport meta tag configured
✅ Responsive design in place
- Test with Google Mobile-Friendly Test Tool
- Monitor mobile usability in Search Console

## ⚡ Performance (Core Web Vitals)

Monitor these metrics in Google Search Console:

1. **LCP (Largest Contentful Paint)** < 2.5s
2. **FID (First Input Delay)** < 100ms
3. **CLS (Cumulative Layout Shift)** < 0.1

### Optimization Tips:
- Lazy load images (already using `<img>` tags)
- Code splitting via Vite (automatic)
- Consider using Next.js if further optimization needed

## 🔗 Internal Linking

Best Practices:
- Use descriptive anchor text (not "click here")
- Link to related content within your site
- Create a hub-spoke structure (home → categories → details)

Example:
```tsx
<Link href="/talents">
  <a>Discover Our Talented Youth</a>
</Link>
```

## 📈 Tracking & Analytics

Recommended integrations:
- Google Analytics 4
- Google Search Console
- Bing Webmaster Tools

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Pages not indexed | Submit sitemap.xml to GSC |
| Low rankings | Improve content quality, build backlinks |
| Mobile errors | Test with Mobile-Friendly Test Tool |
| Slow loading | Optimize images, implement caching |

## 📚 Additional Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Schema.org](https://schema.org/)
- [Yoast SEO Guide](https://yoast.com/seo/)

## ✨ Next Steps

1. **Implement Page-Level SEO** - Add `useSEO` hook to remaining pages
2. **Add Rich Snippets** - Include schema for blog posts and events
3. **Build Backlinks** - Get mentioned on reputable sites
4. **Create Content** - Regular blog posts improve rankings
5. **Monitor Performance** - Set up Google Search Console alerts
