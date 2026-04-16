import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
  variant?: 'full' | 'compact';
}

export function HeroSection({
  title,
  subtitle,
  description,
  ctaText = 'Get Started',
  ctaHref = '/contact',
  backgroundImage = '/hero-bg.jpg',
  variant = 'full',
}: HeroSectionProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      className={`relative w-full overflow-hidden bg-cover bg-center ${
        isCompact ? 'h-64 md:h-80' : 'h-96 md:h-screen'
      }`}
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(21, 21, 21, 0.7) 0%, rgba(21, 21, 21, 0.5) 100%), url(${backgroundImage})`,
      }}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center ${
          isCompact ? 'py-16' : 'py-20'
        }`}
      >
        <div className="max-w-3xl">
          {subtitle && (
            <div className="inline-block mb-4 animate-slideInLeft">
              <span className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold">
                {subtitle}
              </span>
            </div>
          )}

          <h1
            className={`text-white font-bold mb-4 animate-slideInLeft ${
              isCompact ? 'text-3xl md:text-4xl' : 'text-5xl md:text-7xl'
            }`}
            style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)', animationDelay: '0.1s' }}
          >
            <span className="text-balance">{title}</span>
          </h1>

          {description && (
            <p className="text-white text-lg md:text-xl mb-8 opacity-95 max-w-2xl animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
              {description}
            </p>
          )}

          {ctaText && (
            <div className="animate-slideInLeft" style={{ animationDelay: '0.3s' }}>
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-secondary text-accent-foreground hover:text-secondary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-accent/50"
              >
                <Link href={ctaHref}>{ctaText}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
