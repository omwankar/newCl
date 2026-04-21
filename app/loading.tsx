import Image from 'next/image';

export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080B10] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-1/4 h-56 w-56 animate-pulse rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -right-16 top-1/3 h-64 w-64 animate-pulse rounded-full bg-blue-500/20 blur-3xl [animation-delay:400ms]" />
        <div className="absolute bottom-0 left-1/3 h-52 w-52 animate-pulse rounded-full bg-violet-500/20 blur-3xl [animation-delay:800ms]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <Image
          src="/clarusto-logo-light.png"
          alt="Clarusto Logistics"
          width={220}
          height={60}
          className="h-12 w-auto"
          priority
        />

        <div className="h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-[loading-bar_1.1s_ease-in-out_infinite] rounded-full bg-amber-400" />
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-white/70">
          Preparing your experience
        </p>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-120%); }
          50% { transform: translateX(70%); }
          100% { transform: translateX(220%); }
        }
      `}</style>
    </main>
  );
}
