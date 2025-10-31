import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { Link } from "wouter";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  participants: number;
  imageUrl: string;
}

export default function ProjectCard({ id, title, description, date, participants, imageUrl }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 md:h-full object-cover"
            data-testid={`project-image-${id}`}
          />
        </div>
        <CardContent className="md:w-2/3 p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span data-testid={`project-date-${id}`}>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span data-testid={`project-participants-${id}`}>{participants} participants</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2" data-testid={`project-title-${id}`}>{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3" data-testid={`project-description-${id}`}>
              {description}
            </p>
          </div>
          <Link href={`/projects/${id}`}>
            <Button variant="outline" data-testid={`button-learn-more-${id}`}>
              Learn More
            </Button>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
}
