import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { PDFParse } from 'pdf-parse';
import {
  detectCategory,
  extractFaqsFromText,
  extractTitleFromText,
  generateBlogPost,
  generateSlug,
  normalizeBlogText,
  understandUploadContent,
} from '@/lib/blog-generator';
import { readBlogData, writeBlogDataSafely } from '@/lib/blog-storage';
import { getAllBlogs } from '@/lib/blogs.server';
import type { BlogPost } from '@/lib/blogs';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGE_SIZE = 6 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

function cleanText(input: string): string {
  return normalizeBlogText(input);
}

function buildMeta(post: BlogPost) {
  const metaTitle = post.metaTitle ?? `${post.title} | Clarusto Logistics`;
  const metaDescription = post.metaDescription ?? post.excerpt.slice(0, 160);
  return { metaTitle, metaDescription };
}

function getImageExtension(mimeType: string): string {
  if (mimeType === 'image/jpeg') return 'jpg';
  if (mimeType === 'image/png') return 'png';
  if (mimeType === 'image/webp') return 'webp';
  if (mimeType === 'image/gif') return 'gif';
  return 'png';
}

async function saveUploadedImage(imageFile: File): Promise<string> {
  if (imageFile.size > MAX_IMAGE_SIZE) {
    throw new Error('Image is too large. Maximum allowed size is 6MB.');
  }
  if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
    throw new Error('Unsupported image format. Please upload JPG, PNG, WEBP, or GIF.');
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadsDir, { recursive: true });
  const ext = getImageExtension(imageFile.type);
  const safeName = `${Date.now()}-${randomUUID()}.${ext}`;
  const filePath = path.join(uploadsDir, safeName);
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  await writeFile(filePath, buffer);
  return `/uploads/${safeName}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const imageFile = formData.get('imageFile');
    const title = String(formData.get('title') ?? '').trim();
    const category = String(formData.get('category') ?? '').trim();
    const image = String(formData.get('image') ?? '').trim();

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'Please upload a file.', slug: null },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: 'File is too large. Maximum allowed size is 5MB.',
          slug: null,
        },
        { status: 400 }
      );
    }

    const extension = file.name.toLowerCase().split('.').pop() ?? '';
    let contentText = '';

    if (extension === 'txt' || extension === 'md') {
      contentText = cleanText(await file.text());
    } else if (extension === 'pdf') {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const parser = new PDFParse({ data: Buffer.from(arrayBuffer) });
        const parsed = await parser.getText();
        await parser.destroy();
        contentText = cleanText(parsed.text);
      } catch {
        return NextResponse.json(
          {
            success: false,
            message: 'Could not read this PDF. Please upload a valid PDF file.',
            slug: null,
          },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Unsupported file format. Please upload .txt, .md, or .pdf.',
          slug: null,
        },
        { status: 400 }
      );
    }

    if (!contentText) {
      return NextResponse.json(
        {
          success: false,
          message: 'Uploaded file is empty. Please upload file with content.',
          slug: null,
        },
        { status: 400 }
      );
    }

    const understanding = understandUploadContent(contentText, title || undefined);
    if (!understanding.isLikelyBlog) {
      return NextResponse.json(
        {
          success: false,
          message:
            'This file does not look like a single blog article. Please upload one blog with title and body content.',
          slug: null,
          details: understanding.reasons,
        },
        { status: 400 }
      );
    }

    const resolvedTitle = extractTitleFromText(contentText, title);
    const extractedCategory = detectCategory(resolvedTitle, contentText);
    const faqs = extractFaqsFromText(contentText);

    let resolvedImage = image;
    if (imageFile instanceof File && imageFile.size > 0) {
      try {
        resolvedImage = await saveUploadedImage(imageFile);
      } catch (error) {
        return NextResponse.json(
          {
            success: false,
            message:
              error instanceof Error
                ? error.message
                : 'Failed to process uploaded image.',
            slug: null,
          },
          { status: 400 }
        );
      }
    }

    const created = generateBlogPost({
      title: resolvedTitle,
      content: contentText,
      category: category || extractedCategory,
      image: resolvedImage || undefined,
      faqs,
    });

    const slug = generateSlug(created.title);
    const existing = getAllBlogs();
    if (existing.some((post) => post.slug === slug)) {
      return NextResponse.json(
        {
          success: false,
          message: 'A blog with the same title/slug already exists.',
          slug,
        },
        { status: 409 }
      );
    }

    const uploadedBlogs = readBlogData();
    const nextPost: BlogPost = {
      ...created,
      slug,
      ...buildMeta(created),
    };

    try {
      writeBlogDataSafely([...uploadedBlogs, nextPost]);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to save blog data. Please try again.',
          slug: null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog published successfully.',
      slug: nextPost.slug,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unexpected error while publishing blog.',
        slug: null,
      },
      { status: 500 }
    );
  }
}
