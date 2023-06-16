import { type NextRequest } from 'next/server'
import { kv } from '@vercel/kv'
 
export async function PUT(request: NextRequest) {
  const res = await kv.flushdb()
  return new Response(res, {
    status: 200
  })
}