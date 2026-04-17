import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, User } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BLOG_POSTS, getBlogBySlug } from '@/lib/blogs';
import { absoluteUrl } from '@/lib/seo';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Not Found | Clarusto Logistics',
    };
  }

  return {
    title: `${post.title} | Clarusto Logistics`,
    description: post.excerpt,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      title: `${post.title} | Clarusto Logistics`,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}`),
      type: 'article',
      images: [
        {
          url: absoluteUrl(post.image),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug)
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category) return -1;
      if (a.category !== post.category && b.category === post.category) return 1;
      return 0;
    })
    .slice(0, 4);

  return (
    <>
      <Navbar />

      <article className="bg-[#F5F5F0]">
        <section className="pt-10 pb-8 md:pt-14 md:pb-10 border-b border-border bg-[#0A1628] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>

            <div className="max-w-4xl">
              <span className="inline-flex rounded-full bg-[#FF5C00]/20 border border-[#FF5C00]/40 px-3 py-1 text-xs font-semibold text-[#FFB286]">
                {post.category}
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-balance">
                {post.title}
              </h1>
              <p className="mt-5 text-lg text-white/80 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/75">
                <div className="inline-flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <Clock3 className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
            <div>
              <div className="relative h-64 sm:h-80 md:h-[420px] rounded-2xl overflow-hidden ring-1 ring-border mb-10">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mb-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href="/blog"
                    className="rounded-full bg-white border border-border px-3 py-1 text-xs font-semibold text-[#0A1628] hover:border-[#FF5C00] hover:text-[#FF5C00] transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              <div className="space-y-6">
                {post.content.map((paragraph, index) => (
                  <p
                    key={`${post.slug}-${index}`}
                    className="text-base md:text-lg text-foreground/90 leading-loose"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 border-t border-border pt-8">
                <h2 className="text-2xl font-bold text-[#0A1628]">
                  Continue Reading
                </h2>
                <div className="mt-6 grid sm:grid-cols-2 gap-5">
                  {relatedPosts.slice(0, 2).map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group rounded-xl bg-white border border-border overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-36">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground mb-2">
                          {related.date}
                        </p>
                        <h3 className="font-semibold text-[#0A1628] line-clamp-2">
                          {related.title}
                        </h3>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#FF5C00]">
                          Read Next
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 h-fit space-y-5">
              <div className="rounded-2xl bg-white border border-border p-5">
                <h3 className="text-lg font-bold text-[#0A1628] mb-4">
                  More Blogs
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group flex gap-3"
                    >
                      <div className="relative h-16 w-20 rounded-md overflow-hidden shrink-0">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {related.date}
                        </p>
                        <p className="text-sm font-semibold text-[#0A1628] line-clamp-2 group-hover:text-[#FF5C00] transition-colors">
                          {related.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/blog"
                className="block rounded-2xl bg-[#FF5C00] p-5 text-white hover:bg-[#e55200] transition-colors"
              >
                <p className="text-sm uppercase tracking-wide opacity-90">
                  Explore all posts
                </p>
                <p className="mt-2 text-xl font-bold">
                  Browse Full Blog Library
                </p>
                <span className="mt-4 inline-flex items-center gap-2 font-semibold">
                  View Blogs
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </aside>
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
}
