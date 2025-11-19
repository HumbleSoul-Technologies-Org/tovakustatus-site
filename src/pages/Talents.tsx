import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import TalentCard from "@/components/TalentCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader, Search } from "lucide-react";
import { Talent } from "@/lib/localStorage";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { toggleLike, setViews, setShares } from "@/lib/talentsAPIs";

export default function Talents() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [allTalents, setAllTalents] = useState<Talent[]>([]);
  const { data, isLoading } = useQuery<{ talents: Talent[] } | null>({
    queryKey: ["talents", "all"],
    queryFn: getQueryFn({ on401: "throw", timeout: 5000 }),
    retry: 1,
    retryDelay: 2000,
  });

  useEffect(() => {
    if (data && data.talents) {
      setAllTalents(data.talents);
    }
  }, [data]);

  const talentTypes = [
    "All",
    ...Array.from(new Set(allTalents.map((t) => t.talentType))),
  ];

  const filteredTalents = allTalents.filter((talent) => {
    const matchesFilter =
      selectedFilter === "All" || talent.talentType === selectedFilter;
    const matchesSearch =
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <Hero
        title="Our Talented Youth"
        description="Discover the extraordinary young people we're proud to support"
        minHeight="min-h-[400px] md:min-h-[500px]"
      />

      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <span className="flex gap-3 items-center">
              Loading talents ... <Loader className="animate-spin size-6" />
            </span>
          </div>
        </div>
      ) : allTalents.length > 0 ? (
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="mb-8 space-y-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search talents..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-talents"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {talentTypes.map((type) => (
                  <Badge
                    key={type}
                    variant={selectedFilter === type ? "default" : "outline"}
                    className={`cursor-pointer hover-elevate ${
                      selectedFilter === type
                        ? "bg-accent text-accent-foreground"
                        : ""
                    }`}
                    onClick={() => setSelectedFilter(type)}
                    data-testid={`filter-${type.toLowerCase()}`}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTalents.map((talent) => (
                <TalentCard key={talent._id} {...talent} />
              ))}
            </div>

            {filteredTalents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No talents found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="py-16 md:py-24 flex items-center justify-center bg-background">
          <p className="text-muted-foreground text-lg">No talents found!</p>
        </section>
      )}
    </div>
  );
}
