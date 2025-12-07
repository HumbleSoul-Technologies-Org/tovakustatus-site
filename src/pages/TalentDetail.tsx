import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { getTalentById, Talent } from "@/lib/localStorage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import VideoPlayerCard from "@/components/VideoPlayerCard";

import {
  ArrowLeft,
  Bookmark,
  Eye,
  Loader,
  Share,
  Share2,
  ThumbsUpIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { toggleLike, setViews, setShares } from "@/lib/talentsAPIs";

export default function TalentDetail() {
  const [, params] = useRoute("/talents/:id");
  const [talent, setTalent] = useState<Talent | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);
  const [sharing, setSharing] = useState<boolean | null>(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["talents", `${params?.id}`],
    enabled: !!params?.id,
    refetchInterval: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (data) {
      setTalent((data as any)?.talent);
    }

    const stored = localStorage.getItem("tovakustatus_visitor_id");
    if (stored) {
      setUserId(stored);
    }
    if (params?.id && stored) {
      setViews(params.id, stored);
      refetch();
    }
  }, [data, params?.id]);

  const likePost = async () => {
    if (!talent || !userId) return;

    // Optimistically update the UI
    const wasLiked = (talent as any)?.likes?.some(
      (m: any) => m.visitorId === userId
    );

    const updatedTalent = {
      ...talent,
      likes: wasLiked
        ? (talent as any).likes.filter((m: any) => m.visitorId !== userId)
        : [...(talent as any).likes, { visitorId: userId }],
    };
    setTalent(updatedTalent);

    // Process the API call in the background
    setLoading(true);
    try {
      const storedId = localStorage.getItem("tovakustatus_visitor_id");
      const res = await toggleLike(params?.id, storedId ? storedId : null);

      toast.success(`${res.message}`);
    } catch (error) {
      // Revert on error
      setTalent(talent);
      toast.error("Failed to like post!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-12">
          <Loader className="animate-spin size-7 text-muted-foreground" />
          <p className="text-muted-foreground">Loading talent profile...</p>
        </div>
      ) : (
        <>
          {talent ? (
            <div>
              <section className="py-16 md:py-24 bg-background">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                  <Link href="/talents">
                    <Button
                      variant="ghost"
                      className="mb-6"
                      data-testid="button-back"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Talents
                    </Button>
                  </Link>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div>
                      <img
                        src={talent.imageUrl || talent?.image?.url}
                        alt={talent.name}
                        className="w-full aspect-square object-cover rounded-2xl"
                        data-testid="talent-detail-image"
                      />
                    </div>
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h1
                          className="text-4xl md:text-5xl font-bold"
                          data-testid="talent-detail-name"
                        >
                          {talent.name}
                        </h1>
                        <Badge
                          variant="secondary"
                          className="text-base whitespace-nowrap"
                          data-testid="talent-detail-age"
                        >
                          Age {talent.age}
                        </Badge>
                      </div>
                      <Badge
                        className="mb-6 bg-accent/10 text-accent-foreground border-accent/20 text-base"
                        data-testid="talent-detail-type"
                      >
                        {talent.talentType}
                      </Badge>
                      <p
                        className="text-lg text-muted-foreground leading-relaxed mb-6"
                        data-testid="talent-detail-description"
                      >
                        {talent.description}
                      </p>
                      <Card className="bg-card">
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-lg mb-2">Status</h3>
                          <Badge className="bg-primary/10 text-primary">
                            {talent.status}
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* {!talent.videoUrl && (
                    <div className="mb-12 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                      Debug: No videoUrl found. Available properties:{" "}
                      {Object.keys(talent).join(", ")}
                    </div>
                  )} */}

                  {talent.fullStory && (
                    <Card>
                      <CardContent className="p-8">
                        <h2 className="text-3xl font-bold mb-6">Their Story</h2>
                        <div className="prose prose-lg max-w-none">
                          <p
                            className="text-muted-foreground leading-relaxed whitespace-pre-line"
                            data-testid="talent-detail-story"
                          >
                            {talent.fullStory}
                          </p>
                        </div>
                        <span className="flex-row mt-10 flex items-center gap-4 p-3 text-xs text-muted-foreground">
                          {/* Liking Btn */}
                          <span className="flex-row cursor-pointer flex   items-center gap-2   transition-colors">
                            {talent?.views.length} Views
                            <Eye className=" hover:text-primary" size={16} />
                          </span>
                          <span className="flex-row cursor-pointer flex   items-center gap-2   transition-colors">
                            {talent?.likes.length} Likes
                            {loading ? (
                              <Loader className="animate-spin size-3" />
                            ) : (
                              <ThumbsUpIcon
                                onClick={likePost}
                                className={`mb-1 ${
                                  (talent as any)?.likes?.some(
                                    (m: any) => m.visitorId === userId
                                  )
                                    ? "text-green-500"
                                    : ""
                                }`}
                                size={16}
                              />
                            )}
                          </span>

                          {/* Sharing Btn */}
                          <span
                            className="flex-row cursor-pointer flex-1 flex items-center gap-2   transition-colors"
                            onClick={async () => {
                              setSharing(true);

                              await setShares(
                                params?.id,
                                userId ? userId : null
                              );

                              try {
                                const url = `${window.location.origin}/talents/${params?.id}`;
                                navigator.clipboard?.writeText(url);
                                toast.success(
                                  "Talent link copied to clipboard!"
                                );
                              } catch (e) {
                                toast.error(
                                  "Failed to copy link to clipboard."
                                );
                              } finally {
                                setSharing(false);
                              }
                            }}
                          >
                            <span className="flex items-center gap-1">
                              {talent?.shares.length} <p>Shares</p>
                            </span>
                            {sharing ? (
                              <Loader className="animate-spin size-3" />
                            ) : (
                              <Share2
                                className=" hover:text-primary"
                                size={16}
                              />
                            )}
                          </span>
                          {/* <span className="text-xs text-muted">
                         {post.date}
                      </span> */}
                        </span>
                      </CardContent>
                    </Card>
                  )}

                  {talent.videoUrl && (
                    <div className="mb-12">
                      <VideoPlayerCard
                        videoUrl={talent.videoUrl}
                        title="Featured Video"
                        talentName={talent.name}
                      />
                    </div>
                  )}

                  <div className="mt-12  text-center">
                    <Link href="/contact">
                      <Button size="lg" data-testid="button-support">
                        Support Talents Like {talent.name.split(" ")[0]}
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Talent Not Found</h1>
                <p className="text-muted-foreground mb-6">
                  The talent profile you're looking for doesn't exist.
                </p>
                <Link href="/talents">
                  <Button data-testid="button-back-to-talents">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Talents
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
