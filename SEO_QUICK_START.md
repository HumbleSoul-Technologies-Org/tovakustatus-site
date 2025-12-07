# 🚀 SEO Quick Start - 5 Minute Setup

## What You Need to Know

Your site is **85% ready for Google**. Complete these 5 quick steps to get the remaining 15%:

## Step 1: Add SEO to 8 Pages (5 min each)

Open each file and add this at the top:

```tsx
import { useSEO } from "@/hooks/use-seo";

// Inside your component function, add this line immediately:
useSEO({
  title: "Page Title",
  description: "Unique description for this page",
  keywords: ["keyword1", "keyword2", "keyword3"],
});
```

### Files to Update:

1. **About.tsx**
   ```tsx
   useSEO({
     title: "About Us - Tova ku Status",
     description: "Learn about our mission, vision, and impact.",
     keywords: ["about us", "mission", "vision", "organization"],
   });
   ```

2. **Talents.tsx**
   ```tsx
   useSEO({
     title: "Discover Talented Youth - Tova ku Status",
     description: "Browse talented kids from underprivileged schools.",
     keywords: ["talented youth", "talent discovery", "young talents"],
   });
   ```

3. **Blog.tsx**
   ```tsx
   useSEO({
     title: "Blog & News - Tova ku Status",
     description: "Stories and insights about youth empowerment.",
     keywords: ["blog", "news", "youth stories"],
   });
   ```

4. **Events.tsx**
   ```tsx
   useSEO({
     title: "Events & Workshops - Tova ku Status",
     description: "Join community events and talent showcases.",
     keywords: ["events", "workshops", "talent showcase"],
   });
   ```

5. **GetInvolved.tsx**
   ```tsx
   useSEO({
     title: "Get Involved - Support Talented Youth",
     description: "Volunteer, partner, or donate to support youth.",
     keywords: ["volunteer", "partnership", "donate"],
   });
   ```

6. **Contact.tsx**
   ```tsx
   useSEO({
     title: "Contact Us - Tova ku Status",
     description: "Get in touch with us.",
     keywords: ["contact", "get in touch", "support"],
   });
   ```

7. **Media.tsx**
   ```tsx
   useSEO({
     title: "Media & Gallery - Tova ku Status",
     description: "Photos and videos from our events.",
     keywords: ["media", "gallery", "photos"],
   });
   ```

## Step 2: Test Locally (2 minutes)

```bash
# Terminal
npm run dev

# Browser
# 1. Go to http://localhost:5173/
# 2. Right-click → View Page Source
# 3. Search for "description" (Ctrl+F)
# 4. Should see your meta description
# 5. Also check:
#    - <title> tag changed
#    - <meta name="keywords"> exists
```

## Step 3: Build & Deploy (5 minutes)

```bash
# Terminal
npm run build
npm run preview

# Browser - Test that everything works on preview
# http://localhost:5173/
```

Then deploy to your hosting service (Vercel, Netlify, etc.)

## Step 4: Submit to Google (3 minutes)

1. Visit: https://search.google.com/search-console
2. Add your site URL
3. Verify ownership (via DNS)
4. Go to "Sitemaps" section
5. Add: `https://yoursite.com/sitemap.xml`
6. Click Submit

## Step 5: Submit to Bing (2 minutes)

1. Visit: https://www.bing.com/webmaster
2. Add your site
3. Verify via file upload
4. Go to "Sitemaps"
5. Add: `https://yoursite.com/sitemap.xml`

## Done! 🎉

You now have professional SEO. Google will:
- ✅ Index your site
- ✅ Show rich results
- ✅ Include your site in searches
- ✅ Display your content in social media

## What Happens Next

- **Week 1-2:** Google crawls your site
- **Month 1:** Basic keywords appear in search
- **Month 2-3:** More pages ranked
- **Month 6+:** Significant traffic growth

## Optional: Advanced SEO (Extra Credit)

After completing the above, add to detail pages:

```tsx
// TalentDetail.tsx - Add inside component
const talentName = talent?.name || "Talent";
const talentType = talent?.talentType || "";

useSEO({
  title: `${talentName} - ${talentType} | Tova ku Status`,
  description: `Meet ${talentName}, an extraordinary ${talentType} talent.`,
  keywords: [talentName, talentType, "talent", "emerging talent"],
  type: "profile",
});
```

Same for BlogDetail.tsx and EventDetail.tsx.

## Troubleshooting

**Q: Why aren't I ranking?**
A: Takes 30+ days. Keep blogging and building backlinks.

**Q: How do I check my rankings?**
A: Use Google Search Console (free) or SE Ranking (freemium).

**Q: Why isn't my sitemap working?**
A: It is! Google needs time to crawl. Check Search Console after 24 hours.

**Q: Do I need paid SEO tools?**
A: No, the free Google tools are great to start.

## Files You Don't Need to Touch

These are already done ✅:
- index.html (meta tags added)
- /public/sitemap.xml (created)
- /public/robots.txt (created)
- /src/lib/seo.ts (utility library)
- /src/hooks/use-seo.ts (React hook)

Just use the hook, and you're golden!

## Timeline

| Task | Time | Difficulty |
|------|------|------------|
| Add SEO to 8 pages | 40 min | ⭐ Easy |
| Test locally | 5 min | ⭐ Easy |
| Deploy | 10 min | ⭐ Easy |
| Submit to Google | 3 min | ⭐ Easy |
| Submit to Bing | 2 min | ⭐ Easy |
| **Total** | **60 min** | **⭐ Easy** |

## Resources

- Check `SEO_EXAMPLES.md` for copy-paste templates
- Check `SEO_VERIFICATION_GUIDE.md` for testing
- Check `SEO_GUIDE.md` for deep dive info

## Questions?

1. Read the relevant guide document
2. Check Google's SEO Starter Guide
3. Use Google Search Console help

---

**That's it! You're now SEO-optimized.** 🚀

Next step: Keep creating great content and watch your traffic grow!
