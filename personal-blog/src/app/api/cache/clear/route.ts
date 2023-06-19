import { type NextRequest } from 'next/server'
import { kv } from '@vercel/kv'
import { revalidateTag } from 'next/cache'
 
export async function PUT(request: NextRequest) {
  const res = await kv.flushdb()
  revalidateTag('pageCache')
  return new Response(res, {
    status: 200
  })
}