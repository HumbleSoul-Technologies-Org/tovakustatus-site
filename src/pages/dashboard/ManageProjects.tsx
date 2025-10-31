import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { getProjects, addProject, updateProject, deleteProject, Project } from "@/lib/localStorage";

export default function ManageProjects() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    date: "",
    participants: "",
    imageUrl: "",
    status: "Active"
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const data = getProjects();
    setProjects(data);
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        fullDescription: project.fullDescription || "",
        date: project.date,
        participants: project.participants.toString(),
        imageUrl: project.imageUrl,
        status: project.status
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        fullDescription: "",
        date: "",
        participants: "",
        imageUrl: "",
        status: "Active"
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProject) {
      updateProject(editingProject.id, {
        ...formData,
        participants: parseInt(formData.participants)
      });
      toast({
        title: "Project Updated",
        description: "Project has been successfully updated.",
      });
    } else {
      addProject({
        title: formData.title,
        description: formData.description,
        fullDescription: formData.fullDescription,
        date: formData.date,
        participants: parseInt(formData.participants),
        imageUrl: formData.imageUrl || '/assets/generated_images/Community_workshop_outreach_event_photo_3fb17f3c.png',
        status: formData.status
      });
      toast({
        title: "Project Added",
        description: "New project has been successfully added.",
      });
    }
    
    loadProjects();
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
      loadProjects();
      toast({
        title: "Project Removed",
        description: `"${title}" has been removed.`,
      });
    }
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Manage Projects</h1>
          <p className="text-muted-foreground">Add, edit, and manage project initiatives</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} data-testid="button-add-project">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit' : 'Add New'} Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-title">Project Title</Label>
                <Input 
                  id="project-title" 
                  placeholder="Enter project title" 
                  required 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  data-testid="input-project-title" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Short Description</Label>
                <Textarea 
                  id="project-description" 
                  placeholder="Brief description of the project..." 
                  required 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  data-testid="textarea-project-description" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-full-description">Full Description (Optional)</Label>
                <Textarea 
                  id="project-full-description" 
                  placeholder="Detailed description..." 
                  rows={5}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                  data-testid="textarea-project-full-description" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-date">Date</Label>
                <Input 
                  id="project-date" 
                  placeholder="e.g., March 15, 2024" 
                  required 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  data-testid="input-project-date" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-participants">Number of Participants</Label>
                <Input 
                  id="project-participants" 
                  type="number" 
                  placeholder="Enter number of participants" 
                  required 
                  value={formData.participants}
                  onChange={(e) => setFormData({...formData, participants: e.target.value})}
                  data-testid="input-project-participants" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-image">Image URL</Label>
                <Input 
                  id="project-image" 
                  placeholder="Enter image URL" 
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  data-testid="input-project-image" 
                />
              </div>
              <Button type="submit" className="w-full" data-testid="button-submit-project">
                {editingProject ? 'Update' : 'Add'} Project
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projects ({filteredProjects.length})</CardTitle>
          <div className="relative max-w-md mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-projects-dashboard"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Participants</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-right py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b border-border hover:bg-muted/50" data-testid={`project-row-${project.id}`}>
                    <td className="py-3 px-4 font-medium">{project.title}</td>
                    <td className="py-3 px-4">{project.date}</td>
                    <td className="py-3 px-4">{project.participants}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-primary/10 text-primary">{project.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleOpenDialog(project)}
                          data-testid={`button-edit-${project.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(project.id, project.title)}
                          data-testid={`button-delete-${project.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No projects found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
