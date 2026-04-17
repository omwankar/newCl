import type { BlogPost } from '@/lib/blogs';
import { getAuthorInitials } from './blog-utils';

type BlogAuthorCardProps = {
  post: BlogPost;
};

export function BlogAuthorCard({ post }: BlogAuthorCardProps) {
  const initials = getAuthorInitials(post);
  const authorWithExtras = post.author as {
    name: string;
    avatar: string;
    role?: string;
    bio?: string;
  };

  return (
    <div className="bg-white rounded-2xl border border-border border-l-4 border-l-[#FF5C00] p-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-[#0A1628] text-white font-bold flex items-center justify-center shrink-0">
          {initials}
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#0A1628]">{post.author.name}</h3>
          <p className="text-sm text-muted-foreground">
            {authorWithExtras.role ?? 'Contributing Writer'}
          </p>
          <p className="mt-3 text-sm text-foreground/85 leading-relaxed">
            {authorWithExtras.bio ??
              'Focused on practical logistics strategy, freight operations, and supply chain resilience for modern businesses.'}
          </p>
        </div>
      </div>
    </div>
  );
}
