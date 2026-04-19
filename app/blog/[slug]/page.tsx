import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BLOG_POSTS, getBlogBySlug } from '@/lib/blogs';
import { absoluteUrl } from '@/lib/seo';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import {
  generateSlugFromTitle,
  parseRawBlogText,
} from '@/lib/blog-parser';
import { BlogSection } from '@/components/blog/BlogSection';
import { FAQSection } from '@/components/blog/FAQSection';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = new Set<string>();
  BLOG_POSTS.forEach((post) => {
    slugs.add(post.slug);
    slugs.add(generateSlugFromTitle(post.title));
  });
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post =
    getBlogBySlug(slug) ??
    BLOG_POSTS.find((item) => generateSlugFromTitle(item.title) === slug);

  if (!post) {
    return {
      title: 'Blog Not Found | Clarusto Logistics',
    };
  }

  const rawInput = post.rawText ?? `${post.title}\n\n${post.content.join('\n\n')}`;
  const parsed = parseRawBlogText(rawInput);
  const parsedDescription =
    parsed.sections
      .flatMap((section) => section.content ?? [])
      .find(Boolean)
      ?.slice(0, 180) ?? post.excerpt;

  return {
    title: post.metaTitle ?? `${post.title} | Clarusto Logistics`,
    description: post.metaDescription ?? parsedDescription,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      title: post.metaTitle ?? `${post.title} | Clarusto Logistics`,
      description: post.metaDescription ?? parsedDescription,
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
  const post =
    getBlogBySlug(slug) ??
    BLOG_POSTS.find((item) => generateSlugFromTitle(item.title) === slug);

  if (!post) {
    notFound();
  }

  const rawInput = post.rawText ?? `${post.title}\n\n${post.content.join('\n\n')}`;
  const parsed = parseRawBlogText(rawInput);

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
        <BlogHero post={{ ...post, title: parsed.title, excerpt: post.excerpt }} />
        <section className="pt-28 pb-12 md:pb-16">
          <div className="app-container max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            <div className="space-y-6">
              {parsed.sections.map((section, index) => (
                <BlogSection key={`${section.heading}-${index}`} section={section} />
              ))}
              <FAQSection faqs={parsed.faqs} />
            </div>
            <BlogSidebar post={post} relatedPosts={relatedPosts} />
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
}
