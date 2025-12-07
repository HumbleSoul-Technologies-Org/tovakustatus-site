# ✅ SEO Verification Guide

## Quick Verification Checklist

### 1. Check Meta Tags in Browser

**Step-by-step:**
1. Go to your website
2. Right-click → "View Page Source" (or press `Ctrl+U`)
3. Look for `<meta>` tags in the `<head>` section
4. Verify you see:
   - ✅ `<meta name="description">`
   - ✅ `<meta name="keywords">`
   - ✅ `<meta property="og:title">`
   - ✅ `<meta property="og:description">`
   - ✅ `<meta name="twitter:card">`
   - ✅ `<script type="application/ld+json">` (schema)

### 2. Check Page Title

**Step-by-step:**
1. Open Home page: `https://yoursite.com`
2. Check browser tab title
3. Should show: "Tova ku Status - Rise Above Your Status | Empowering Talented Youth"

### 3. Test Sitemap

**Step-by-step:**
1. Go to: `https://yoursite.com/sitemap.xml`
2. You should see XML with 8 URLs
3. Each `<url>` has `<loc>`, `<changefreq>`, `<priority>`

### 4. Test Robots.txt

**Step-by-step:**
1. Go to: `https://yoursite.com/robots.txt`
2. You should see:
   ```
   User-agent: *
   Allow: /
   Disallow: /dashboard
   Disallow: /login
   Sitemap: ...
   ```

### 5. Test Mobile Friendliness

**Use Google's Tool:**
1. Visit: https://search.google.com/test/mobile-friendly
2. Enter your URL: `https://yoursite.com`
3. Should show: ✅ "Page is mobile friendly"

### 6. Check Social Sharing

**Facebook:**
1. Visit: https://developers.facebook.com/tools/debug/
2. Enter your URL
3. Verify it shows correct title, description, and image

**Twitter:**
1. Visit: https://cards-dev.twitter.com/validator
2. Enter your URL
3. Verify card displays correctly

### 7. Test Page Speed

**PageSpeed Insights:**
1. Visit: https://pagespeed.web.dev
2. Enter your URL
3. Check both Mobile and Desktop scores
4. Aim for:
   - Performance: > 90
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90

### 8. Check Structured Data

**Schema Validator:**
1. Visit: https://schema.org/
2. Or use: https://validator.schema.org/
3. Paste your page HTML
4. Should show valid Organization schema

## Automated Testing Commands

### Build and Test Locally

```bash
# Build the project
npm run build

# Preview the build
npm run preview

# Now test in browser:
# - http://localhost:5173/
# - http://localhost:5173/sitemap.xml
# - http://localhost:5173/robots.txt
```

### Check for Errors

```bash
# Lint TypeScript
npm run check

# This will catch any type errors that might break meta tags
```

## Manual Testing Steps

### Test 1: Verify Meta Tags Work
1. Open DevTools (F12)
2. Go to Elements/Inspector tab
3. Find the `<head>` section
4. Expand it
5. Look for `<meta name="description">`
6. Right-click → Copy
7. Verify content contains your keywords

### Test 2: Check Page Titles
1. Visit Home: `http://localhost:5173/`
2. Browser tab should show full title
3. Right-click tab → "Copy URL"
4. Check page source (Ctrl+U)
5. Verify `<title>` tag in head

### Test 3: Validate XML Sitemap
```xml
<!-- Should look like this -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tovakustatus.com/</loc>
    <lastmod>2025-12-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- ... more URLs ... -->
</urlset>
```

### Test 4: Check After Implementing Pages
After adding `useSEO` to a page:

1. Navigate to that page
2. Check page source
3. Verify meta tags updated
4. Example for About page:
   ```html
   <title>About Us - Empowering Talented Youth | Tova ku Status</title>
   <meta name="description" content="Learn about our mission...">
   <meta property="og:title" content="About Us - Tova ku Status">
   ```

## Google Search Console Setup

### Step 1: Verify Site Ownership
1. Go to: https://search.google.com/search-console
2. Click "Start Now"
3. Choose your domain type:
   - Domain (covers www and non-www)
   - URL prefix (specific URL)
4. Verify using TXT record (recommended)

### Step 2: Submit Sitemap
1. In Search Console sidebar
2. Select "Sitemaps"
3. Paste URL: `https://yoursite.com/sitemap.xml`
4. Click "Submit"
5. Wait for Google to crawl (24-72 hours)

### Step 3: Monitor Results
1. Check "Coverage" report:
   - Should show increasing number of indexed pages
   - Look for any errors

2. Check "Search Analytics":
   - Queries (what people searched to find you)
   - Impressions (how many times you appeared)
   - Clicks (how many clicked your link)
   - CTR (click-through rate)

3. Check "Core Web Vitals":
   - Monitor page speed metrics
   - Fix any issues flagged

## Before Going Live

### Pre-deployment Checklist

- [ ] All pages have meta descriptions (unique, 155 chars)
- [ ] All pages have 3-5 keywords
- [ ] All images have alt text
- [ ] Internal links use descriptive anchor text
- [ ] No broken links (404 errors)
- [ ] Mobile layout works correctly
- [ ] Page speed is acceptable (>50 on PageSpeed)
- [ ] Sitemap.xml is accessible
- [ ] robots.txt is accessible
- [ ] Schema validation passes
- [ ] Social sharing looks good
- [ ] No console errors (F12 → Console)

## Common Issues & Solutions

### Issue: Sitemap returns 404
**Solution:** Ensure `sitemap.xml` is in `/public` folder

### Issue: Robots.txt not found
**Solution:** Ensure `robots.txt` is in `/public` folder

### Issue: Meta tags not updating
**Solution:** 
- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+Shift+R)
- Check console for errors (F12)

### Issue: Social card not showing
**Solution:**
- Use og:image with absolute URL
- Image must be at least 1200x630px
- Clear Facebook/Twitter cache

### Issue: Page not ranking
**Solution:**
- Takes 30+ days for Google to index
- Check Search Console for issues
- Ensure content quality is good
- Build backlinks from other sites

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Largest Contentful Paint | < 2.5s | Check PageSpeed |
| First Input Delay | < 100ms | Check PageSpeed |
| Cumulative Layout Shift | < 0.1 | Check PageSpeed |
| Mobile Score | > 90 | Use PageSpeed Insights |
| Desktop Score | > 90 | Use PageSpeed Insights |

## Monthly Verification

Every month, check:

1. **Search Console Dashboard:**
   - Indexed pages count
   - Coverage status
   - Mobile usability

2. **Analytics:**
   - Organic traffic trend
   - Top landing pages
   - Bounce rate

3. **Keyword Rankings:**
   - Use free tools: SE Ranking, Ubersuggest
   - Track 10-15 main keywords
   - Monitor ranking position

4. **Backlinks:**
   - Use Ahrefs free tool or Moz
   - Monitor new referring domains

## Quick Testing URLs

Save these for quick testing:

```
Local Development:
http://localhost:5173/ (Home)
http://localhost:5173/sitemap.xml
http://localhost:5173/robots.txt

Google Tools:
https://search.google.com/test/mobile-friendly
https://pagespeed.web.dev
https://search.google.com/search-console

Validation Tools:
https://validator.schema.org/
https://developers.facebook.com/tools/debug/
https://cards-dev.twitter.com/validator
```

## Next Steps After Verification

1. ✅ Verify all local tests pass
2. ✅ Build and deploy to production
3. ✅ Test on live site (not localhost)
4. ✅ Submit sitemap to Google Search Console
5. ✅ Submit sitemap to Bing Webmaster Tools
6. ✅ Monitor for first 30 days
7. ✅ Add remaining pages' SEO
8. ✅ Set up analytics
9. ✅ Start content marketing

---

**Remember:** These verifications ensure Google can find, crawl, and understand your site. The rest is up to content quality and marketing effort!
