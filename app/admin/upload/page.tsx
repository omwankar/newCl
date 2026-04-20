'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type UploadResponse = {
  success: boolean;
  message: string;
  slug: string | null;
};

const ACCEPTED_TYPES = '.md,.txt,.pdf';
const ACCEPTED_IMAGE_TYPES = 'image/png,image/jpeg,image/webp,image/gif';

export default function AdminUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewText, setPreviewText] = useState('');

  const preview = useMemo(() => {
    if (!previewText) return '';
    return previewText.length > 600
      ? `${previewText.slice(0, 600)}...`
      : previewText;
  }, [previewText]);

  const loadPreview = async (nextFile: File) => {
    const ext = nextFile.name.toLowerCase().split('.').pop();
    if (ext === 'txt' || ext === 'md') {
      const text = await nextFile.text();
      setPreviewText(text.trim());
      return;
    }
    setPreviewText('Preview unavailable for PDF files. The full content will still be processed.');
  };

  const handleSelectFile = async (nextFile: File | null) => {
    setResult(null);
    setFile(nextFile);
    if (nextFile) {
      await loadPreview(nextFile);
    } else {
      setPreviewText('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setResult({
        success: false,
        message: 'Please choose a file before publishing.',
        slug: null,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    if (title.trim()) formData.append('title', title.trim());
    if (category.trim()) formData.append('category', category.trim());
    if (image.trim()) formData.append('image', image.trim());
    if (imageFile) formData.append('imageFile', imageFile);

    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/upload-blog', {
        method: 'POST',
        body: formData,
      });
      const data = (await response.json()) as UploadResponse;
      setResult(data);
      if (data.success) {
        setTitle('');
        setCategory('');
        setImage('');
        setImageFile(null);
        setFile(null);
        setPreviewText('');
      }
    } catch {
      setResult({
        success: false,
        message: 'Upload failed. Please check your connection and try again.',
        slug: null,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0] px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-2xl font-bold text-[#0A1628]">Admin Blog Upload</h1>
        <p className="mt-2 text-sm text-slate-600">
          Upload a <strong>.md</strong>, <strong>.txt</strong>, or <strong>.pdf</strong> file.
          Title, category, image URL, and image file are optional. Click Publish Blog to make it live.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              void handleSelectFile(e.dataTransfer.files?.[0] ?? null);
            }}
            className={`flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition-colors ${
              dragActive
                ? 'border-[#FF5C00] bg-orange-50'
                : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            <span className="font-medium text-[#0A1628]">
              Drag and drop your file here, or click to browse
            </span>
            <span className="mt-1 text-sm text-slate-500">Accepted: {ACCEPTED_TYPES}</span>
            {file && (
              <span className="mt-2 text-sm font-semibold text-green-700">{file.name}</span>
            )}
            <input
              type="file"
              accept={ACCEPTED_TYPES}
              className="sr-only"
              onChange={(e) => void handleSelectFile(e.target.files?.[0] ?? null)}
            />
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-[#FF5C00]"
          />

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category (optional)"
            className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-[#FF5C00]"
          />

          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL (optional)"
            className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-[#FF5C00]"
          />

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Image file (optional)
            </span>
            <input
              type="file"
              accept={ACCEPTED_IMAGE_TYPES}
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="block h-11 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none file:mr-3 file:rounded file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200 focus:ring-2 focus:ring-[#FF5C00]"
            />
            {imageFile && (
              <span className="mt-1 inline-block text-xs text-slate-500">
                Selected: {imageFile.name}
              </span>
            )}
          </label>

          {preview && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Preview
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{preview}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#0A1628] text-sm font-semibold text-white transition hover:bg-[#13233a] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Publishing...' : 'Publish Blog'}
          </button>
        </form>

        {result && (
          <div
            className={`mt-4 rounded-lg p-3 text-sm ${
              result.success
                ? 'border border-green-200 bg-green-50 text-green-700'
                : 'border border-red-200 bg-red-50 text-red-700'
            }`}
          >
            <p>{result.message}</p>
            {result.success && result.slug && (
              <p className="mt-1">
                View post:{' '}
                <Link className="font-semibold underline" href={`/blog/${result.slug}`}>
                  /blog/{result.slug}
                </Link>
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
