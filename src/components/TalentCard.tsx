import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface TalentCardProps {
  _id: string;
  name: string;
  age: number;
  talentType: string;
  description: string;
  imageUrl: string;
  views?: [number];
  image?: { url: string; public_id: string };
}

export default function TalentCard({
  _id,
  name,
  age,
  talentType,
  description,
  imageUrl,
  image,
}: TalentCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate">
      <div className="aspect-square overflow-hidden">
        <img
          src={imageUrl || image?.url}
          alt={name}
          className="w-full h-full object-cover"
          data-testid={`talent-image-${_id}`}
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3
            className="text-xl font-bold text-foreground"
            data-testid={`talent-name-${_id}`}
          >
            {name}
          </h3>
          <Badge
            variant="secondary"
            className="text-xs whitespace-nowrap"
            data-testid={`talent-age-${_id}`}
          >
            Age {age}
          </Badge>
        </div>
        <Badge
          className="mb-3 bg-accent/10 text-accent-foreground border-accent/20"
          data-testid={`talent-type-${_id}`}
        >
          {talentType}
        </Badge>
        <p
          className="text-sm text-muted-foreground line-clamp-3 leading-relaxed"
          data-testid={`talent-description-${_id}`}
        >
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/talents/${_id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full"
            data-testid={`button-read-story-${_id}`}
          >
            Read Story
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
