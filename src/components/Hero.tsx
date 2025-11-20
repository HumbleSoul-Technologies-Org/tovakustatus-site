import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  backgroundImage?: string;
  trustIndicator?: string;
  minHeight?: string;
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  trustIndicator,
  minHeight = "min-h-[600px] md:min-h-[700px]",
}: HeroProps) {
  return (
    <div
      className={`relative ${minHeight} flex items-center justify-center overflow-hidden`}
    >
      {backgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <img
              src={backgroundImage}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 z-10" />
        </>
      )}

      <div className="relative z-20 max-w-4xl mx-auto px-4 md:px-8 text-center">
        {subtitle && (
          <p className="text-accent font-semibold text-base md:text-lg mb-4 tracking-wide uppercase">
            {subtitle}
          </p>
        )}

        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${
            backgroundImage ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h1>

        {description && (
          <p
            className={`text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto ${
              backgroundImage ? "text-white/90" : "text-muted-foreground"
            }`}
          >
            {description}
          </p>
        )}

        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryCTA && (
              <Link href={primaryCTA.href}>
                <Button
                  size="lg"
                  className={`text-lg px-8 py-6 hidden rounded-full ${
                    backgroundImage
                      ? "bg-accent text-accent-foreground border-2 border-accent-border hover:bg-accent"
                      : ""
                  }`}
                  data-testid="button-primary-cta"
                >
                  {primaryCTA.label}
                </Button>
              </Link>
            )}
            {secondaryCTA && (
              <Link href={secondaryCTA.href}>
                <Button
                  size="lg"
                  variant={backgroundImage ? "outline" : "default"}
                  className={`text-lg px-8 py-6 rounded-full ${
                    backgroundImage
                      ? "bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
                      : ""
                  }`}
                  data-testid="button-secondary-cta"
                >
                  {secondaryCTA.label}
                </Button>
              </Link>
            )}
          </div>
        )}

        {trustIndicator && (
          <p
            className={`mt-8 text-sm md:text-base ${
              backgroundImage ? "text-white/80" : "text-muted-foreground"
            }`}
          >
            {trustIndicator}
          </p>
        )}
      </div>
    </div>
  );
}
