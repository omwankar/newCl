import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { put } from '@vercel/blob';
import {
  detectCategory,
  extractFaqsFromText,
  extractTitleFromText,
  generateBlogPost,
  generateSlug,
  normalizeBlogText,
  preprocessUploadedBlogText,
  understandUploadContent,
} from '@/lib/blog-generator';
import { readBlogData, writeBlogDataSafely } from '@/lib/blog-storage';
import { getAllBlogs } from '@/lib/blogs.server';
import type { BlogPost } from '@/lib/blogs';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGE_SIZE = 6 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

function cleanText(input: string): string {
  return preprocessUploadedBlogText(normalizeBlogText(input));
}

async function structureWithAI(input: string, providedTitle?: string): Promise<string> {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openAiApiKey = process.env.OPENAI_API_KEY;
  if (!geminiApiKey && !openAiApiKey) return input;

  const systemPrompt =
    'You clean and structure raw blog text. Output plain text only. Keep original meaning, remove duplicate blocks, preserve one title and clear section headings, and avoid extra commentary.';
  const userPrompt = `Title hint: ${providedTitle || 'None'}\n\nRaw blog:\n${input}`;

  try {
    if (geminiApiKey) {
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `${systemPrompt}\n\n${userPrompt}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.2,
            },
          }),
        }
      );

      if (geminiResponse.ok) {
        const geminiData = (await geminiResponse.json()) as {
          candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
        };
        const geminiOutput = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (geminiOutput) return cleanText(geminiOutput);
      }
    }

    if (openAiApiKey) {
      const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openAiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.2,
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: userPrompt,
            },
          ],
        }),
      });

      if (!openAiResponse.ok) return input;
      const openAiData = (await openAiResponse.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const openAiOutput = openAiData.choices?.[0]?.message?.content?.trim();
      return openAiOutput ? cleanText(openAiOutput) : input;
    }

    return input;
  } catch {
    return input;
  }
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

  const ext = getImageExtension(imageFile.type);
  const safeName = `${Date.now()}-${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const result = await put(`blog-images/${safeName}`, buffer, {
      access: 'public',
      contentType: imageFile.type,
      addRandomSuffix: false,
      cacheControlMaxAge: 31536000,
    });
    return result.url;
  }
  if (process.env.VERCEL === '1') {
    throw new Error(
      'Missing BLOB_READ_WRITE_TOKEN in Vercel environment. Image uploads require Vercel Blob in production.'
    );
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadsDir, { recursive: true });
  const filePath = path.join(uploadsDir, safeName);
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
        const { PDFParse } = await import('pdf-parse');
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

    contentText = await structureWithAI(contentText, title || undefined);

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
    const existing = await getAllBlogs();
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

    const uploadedBlogs = await readBlogData();
    const nextPost: BlogPost = {
      ...created,
      slug,
      ...buildMeta(created),
    };

    try {
      await writeBlogDataSafely([...uploadedBlogs, nextPost]);
    } catch (error) {
      console.error('Blog storage write failed:', error);
      return NextResponse.json(
        {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : 'Failed to save blog data. Please try again.',
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
  } catch (error) {
    console.error('Upload blog API failed:', error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Unexpected error while publishing blog.',
        slug: null,
      },
      { status: 500 }
    );
  }
}
