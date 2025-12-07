import { useEffect } from 'react';
import { updateMetaTags } from '@/lib/seo';

interface UseSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  imageUrl?: string;
  type?: string;
}

/**
 * Custom hook to manage SEO meta tags on each page
 * Usage: useSEO({ title: 'Page Title', description: '...' })
 */
export const useSEO = ({
  title,
  description,
  keywords,
  imageUrl,
  type,
}: UseSEOProps) => {
  useEffect(() => {
    const pageTitle = `${title} | Tova ku Status`;
    
    updateMetaTags({
      title: pageTitle,
      description,
      keywords: keywords || [],
      imageUrl,
      url: window.location.href,
      type,
    });
  }, [title, description, keywords, imageUrl, type]);
};
