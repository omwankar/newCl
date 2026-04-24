'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

interface Article {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}

const articles: Article[] = [
  {
    id: '1',
    date: 'Sep. 02/2025',
    title: 'Transforming Warehouse Management with Paperless Systems',
    description: 'In today\'s fast-paced logistics environment, efficiency and accuracy are paramount. Discover how paperless warehouse management systems revolutionize operations.',
    image: '/blog-warehouse.jpg',
    slug: 'warehouse-management-paperless'
  },
  {
    id: '2',
    date: 'Sep. 02/2025',
    title: 'Agility in Modern Supply Chains: The Key to Competitive Advantage',
    description: 'In today\'s fast-paced business environment, supply chains are more complex than ever. Learn how agility becomes the winning formula for logistics success.',
    image: '/blog-supply-chain.jpg',
    slug: 'supply-chain-agility'
  },
  {
    id: '3',
    date: 'Sep. 02/2025',
    title: 'Tailoring E-commerce Logistics for Small Businesses',
    description: 'In today\'s competitive marketplace, small businesses must adopt effective e-commerce logistics strategies. Explore specialized solutions tailored to your needs.',
    image: '/blog-ecommerce.jpg',
    slug: 'ecommerce-logistics-small-business'
  }
];

export function ArticlesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="app-container">
        <div className="mb-12 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            See Latest Articles From Our Company
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={article.id}
              className="group cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <p className="text-sm text-muted-foreground font-medium">{article.date}</p>
                <div className="h-1 w-24 bg-accent mt-2 group-hover:w-full transition-all duration-300"></div>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                {article.title}
              </h3>

              <p className="text-muted-foreground mb-6 line-clamp-2">
                {article.description}
              </p>

              <div className="relative overflow-hidden rounded-lg bg-muted aspect-video mb-6">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all"
              >
                Read More <ArrowRight className="w-5 h-5" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            <Link href="/blog" className="flex items-center gap-2">
              View All Articles <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
