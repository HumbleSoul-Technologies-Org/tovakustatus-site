import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import { Link } from "wouter";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
  readTime?: string;
}

export default function BlogCard({ id, title, excerpt, author, date, category, imageUrl, readTime }: BlogCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate">
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
            data-testid={`blog-image-${id}`}
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" data-testid={`blog-category-${id}`}>{category}</Badge>
          {readTime && <span className="text-xs text-muted-foreground">{readTime}</span>}
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2" data-testid={`blog-title-${id}`}>
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed" data-testid={`blog-excerpt-${id}`}>
          {excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span data-testid={`blog-author-${id}`}>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span data-testid={`blog-date-${id}`}>{date}</span>
          </div>
        </div>
        
        <Link href={`/blog/${id}`}>
          <Button variant="outline" className="w-full" data-testid={`button-read-more-${id}`}>
            Read More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
