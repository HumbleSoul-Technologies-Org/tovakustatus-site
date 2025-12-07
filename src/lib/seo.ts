/**
 * SEO Meta Tags Manager
 * Handles dynamic meta tag updates for better Google indexing
 */

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  imageUrl?: string;
  url?: string;
  type?: string;
}

export const updateMetaTags = (config: SEOConfig) => {
  // Update title
  document.title = config.title;
  
  // Update or create meta description
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.setAttribute('name', 'description');
    document.head.appendChild(descTag);
  }
  descTag.setAttribute('content', config.description);

  // Update or create keywords meta
  if (config.keywords && config.keywords.length > 0) {
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement('meta');
      keywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute('content', config.keywords.join(', '));
  }

  // Update or create Open Graph tags for social sharing
  const ogTags = [
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:type', content: config.type || 'website' },
    { property: 'og:url', content: config.url || window.location.href },
    { property: 'og:image', content: config.imageUrl || '' },
  ];

  ogTags.forEach(({ property, content }) => {
    if (!content) return;
    
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  });

  // Update Twitter Card tags
  const twitterTags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description },
    { name: 'twitter:image', content: config.imageUrl || '' },
  ];

  twitterTags.forEach(({ name, content }) => {
    if (!content) return;
    
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  });

  // Update canonical URL
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute('href', config.url || window.location.href);
};

export const SEO = {
  updateMetaTags,
};
