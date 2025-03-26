import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Completely disabled middleware to prevent redirect loops
export async function middleware(request: NextRequest) {
  // Just pass through all requests without any redirects
  return NextResponse.next();
}

// Keep only homepage in the matcher to effectively disable it
export const config = {
  matcher: ['/disabled-middleware'],
}
