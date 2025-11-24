import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, User } from "lucide-react";
import { Link } from "wouter";
import { format, isValid } from "date-fns";

interface BlogCardProps {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
  readTime?: string;
  // views can be an array of view entries or a numeric count
  views?: any[] | number;
  image?: { url: string; public_id: string };
}

export default function BlogCard({
  _id,
  title,
  excerpt,
  author,
  date,
  category,
  imageUrl,
  readTime,
  views,
  image,
}: BlogCardProps) {
  // Support both array-of-views and numeric views
  const viewsCount = Array.isArray(views)
    ? views.length
    : typeof views === "number"
    ? views
    : 0;
  return (
    <Card className="overflow-hidden hover-elevate">
      {(imageUrl || image?.url) && (
        <div className=" overflow-hidden">
          <img
            src={image?.url ? image?.url : imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            data-testid={`blog-image-${_id}`}
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex relative items-center gap-2 mb-3">
          <Badge variant="secondary" data-testid={`blog-category-${_id}`}>
            {category}
          </Badge>
          {readTime && (
            <span className="text-xs flex-1 text-muted-foreground">
              {readTime}
            </span>
          )}

          {viewsCount > 0 && (
            <span className="text-xs absolute right-1 flex-1 text-muted-foreground">
              <span className="flex-row cursor-pointer flex items-center gap-1 transition-colors">
                <Eye className=" hover:text-primary" size={16} />
                {viewsCount}
              </span>
            </span>
          )}
        </div>

        <h3
          className="text-xl font-bold text-foreground mb-2 line-clamp-2"
          data-testid={`blog-title-${_id}`}
        >
          {title}
        </h3>

        <p
          className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed"
          data-testid={`blog-excerpt-${_id}`}
        >
          {excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span data-testid={`blog-author-${_id}`}>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span data-testid={`blog-date-${_id}`}>
              {date && isValid(new Date(date))
                ? format(new Date(date), "PPP")
                : "Date not available"}
            </span>
          </div>
        </div>

        <Link href={`/blog/${_id}`}>
          <Button
            variant="outline"
            className="w-full"
            data-testid={`button-read-more-${_id}`}
          >
            Read More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
