import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { getTalentById, Talent } from "@/lib/localStorage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Bookmark, Eye, Share, Share2, ThumbsUpIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TalentDetail() {
  const {toast} = useToast()
  const [, params] = useRoute("/talents/:id");
  const [talent, setTalent] = useState<Talent | null>(null);

  useEffect(() => {
    if (params?.id) {
      const foundTalent = getTalentById(params.id);
      setTalent(foundTalent || null);
    }
  }, [params?.id]);

  if (!talent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Talent Not Found</h1>
          <p className="text-muted-foreground mb-6">The talent profile you're looking for doesn't exist.</p>
          <Link href="/talents">
            <Button data-testid="button-back-to-talents">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Talents
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
          <Link href="/talents">
            <Button variant="ghost" className="mb-6" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Talents
            </Button>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <img 
                src={talent.imageUrl} 
                alt={talent.name} 
                className="w-full aspect-square object-cover rounded-2xl"
                data-testid="talent-detail-image"
              />
            </div>
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold" data-testid="talent-detail-name">{talent.name}</h1>
                <Badge variant="secondary" className="text-base whitespace-nowrap" data-testid="talent-detail-age">
                  Age {talent.age}
                </Badge>
              </div>
              <Badge className="mb-6 bg-accent/10 text-accent-foreground border-accent/20 text-base" data-testid="talent-detail-type">
                {talent.talentType}
              </Badge>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6" data-testid="talent-detail-description">
                {talent.description}
              </p>
              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Status</h3>
                  <Badge className="bg-primary/10 text-primary">{talent.status}</Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {talent.fullStory && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Their Story</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line" data-testid="talent-detail-story">
                    {talent.fullStory}
                  </p>
                </div>
                   <span className="flex-row mt-10 flex items-center gap-4 p-3 text-xs text-muted-foreground">

                      {/* Liking Btn */}
                      <span
                        className="flex-row cursor-pointer flex   items-center gap-2   transition-colors"
                         
                      >
                        {talent.views} Views
                        <Eye className=" hover:text-primary" size={16} />
                      </span>
                      <span
                        className="flex-row cursor-pointer flex   items-center gap-2   transition-colors"
                         
                      >
                        0 Likes
                        <ThumbsUpIcon className="mb-1 hover:text-primary" size={16} />
                      </span>

                      

                      {/* Sharing Btn */}
                      <span
                        className="flex-row cursor-pointer flex-1 flex items-center gap-2   transition-colors"
                        onClick={() => {
                          try {
                            const url = `${window.location.origin}/talents/${
                            params?.id
                            }`;
                            navigator.clipboard?.writeText(url);
                            toast({ title: "link copied" });
                          } catch (e) {
                            toast({
                              title: "Could not copy link",
                              variant: "destructive",
                            });
                          }
                        }}
                      >
                        <span>Share</span>
                        <Share2 size={16} className="hover:text-primary" />
                      </span>
                      {/* <span className="text-xs text-muted">
                         {post.date}
                      </span> */}
                      
                    </span>
              </CardContent>
            </Card>
          )}

          <div className="mt-12 text-center">
            <Link href="/get-involved">
              <Button size="lg" data-testid="button-support">
                Support Talents Like {talent.name.split(' ')[0]}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
