import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { getProjectById, Project } from "@/lib/localStorage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Users } from "lucide-react";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (params?.id) {
      const foundProject = getProjectById(params.id);
      setProject(foundProject || null);
    }
  }, [params?.id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist.</p>
          <Link href="/projects">
            <Button data-testid="button-back-to-projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Link href="/projects">
            <Button variant="ghost" className="mb-6" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>

          <div className="mb-8">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-96 object-cover rounded-2xl mb-8"
              data-testid="project-detail-image"
            />

            <div className="flex items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span data-testid="project-detail-date">{project.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span data-testid="project-detail-participants">{project.participants} participants</span>
              </div>
              <Badge className="bg-primary/10 text-primary" data-testid="project-detail-status">{project.status}</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="project-detail-title">{project.title}</h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8" data-testid="project-detail-description">
              {project.description}
            </p>
          </div>

          {project.fullDescription && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">About This Project</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line" data-testid="project-detail-full-description">
                    {project.fullDescription}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Impact</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• {project.participants} young people directly impacted</li>
                  <li>• Professional training and mentorship provided</li>
                  <li>• Community engagement and awareness</li>
                  <li>• Long-term skill development</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Get Involved</h3>
                <p className="text-muted-foreground mb-4">
                  Help us continue projects like this by volunteering or making a donation.
                </p>
                <Link href="/get-involved">
                  <Button className="w-full" data-testid="button-get-involved">
                    Support This Project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
