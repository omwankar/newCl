import { NextResponse } from 'next/server';
import { getBlogsNewestFirst } from '@/lib/blogs.server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitParam = Number(searchParams.get('limit') ?? '0');
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : 0;

  const posts = await getBlogsNewestFirst();
  const payload = limit > 0 ? posts.slice(0, limit) : posts;
  return NextResponse.json(payload);
}
