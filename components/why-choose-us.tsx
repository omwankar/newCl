import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Differentiator } from '@/lib/types';

interface WhyChooseUsProps {
  differentiators: Differentiator[];
}

export function WhyChooseUs({ differentiators }: WhyChooseUsProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="app-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Why Choose Clarusto?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what makes us the preferred logistics partner for businesses worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((diff) => (
            <Card key={diff.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-xl">{diff.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{diff.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
