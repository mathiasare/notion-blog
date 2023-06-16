import { type NextRequest } from 'next/server'
import { kv } from '@vercel/kv'
import { getKvKey } from '@/lib/kv-cache'
 
export async function GET(request: NextRequest,
    { params }: { params: { pageId: string } }) {
  
  const data = await kv.hget(getKvKey(params.pageId), 'recordMap')
  
  const res = data == null ? `Value for page: ${params.pageId}, was not present in KV database.` : JSON.stringify(data)
  
  return new Response(res, {
    status: 200,
  })
}