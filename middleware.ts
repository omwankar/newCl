import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_USER = process.env.ADMIN_UPLOAD_USER ?? 'admin';
const ADMIN_PASS = process.env.ADMIN_UPLOAD_PASSWORD ?? 'clarusto-admin-2026';

function unauthorized() {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Upload"',
    },
  });
}

export function middleware(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) {
    return unauthorized();
  }

  const encoded = auth.split(' ')[1] ?? '';
  let decoded = '';
  try {
    decoded = atob(encoded);
  } catch {
    return unauthorized();
  }

  const [user, pass] = decoded.split(':');
  if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/upload-blog'],
};
