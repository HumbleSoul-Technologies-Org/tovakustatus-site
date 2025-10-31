import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, Project } from "@/lib/localStorage";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const data = getProjects();
    setProjects(data);
  }, []);

  return (
    <div>
      <Hero
        title="Our Projects"
        description="Initiatives making a real difference in talented young lives"
        minHeight="min-h-[400px] md:min-h-[500px]"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="space-y-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
