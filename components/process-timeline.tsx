import { ProcessStep } from '@/lib/types';

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Our Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From order to delivery, we guide you through every step with transparency and expertise
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-12 bottom-0 w-1 bg-gradient-to-b from-accent to-secondary" />

          {/* Steps */}
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div key={step.id} className="lg:flex lg:gap-8 lg:mb-12">
                {/* Timeline circle and content (alternates sides on desktop) */}
                <div
                  className={`lg:flex-1 ${
                    index % 2 === 0 ? 'lg:text-right' : ''
                  }`}
                >
                  <div className="bg-white rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                    <div className="flex lg:flex-col items-start gap-4 lg:gap-0">
                      <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1 lg:mt-4">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline circle for desktop */}
                <div className="hidden lg:flex justify-center">
                  <div className="w-6 h-6 rounded-full bg-accent border-4 border-background absolute left-1/2 transform -translate-x-1/2 mt-8" />
                </div>

                {/* Empty space for second column */}
                <div className="hidden lg:flex-1 lg:flex" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
