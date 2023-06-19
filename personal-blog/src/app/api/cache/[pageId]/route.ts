import { type NextRequest } from 'next/server'
import { kv } from '@vercel/kv'
import { getKvKey } from '@/lib/kv-cache'
 
export async function GET(request: NextRequest,
    { params }: { params: { pageId: string } }) {
  
  const data = await kv.hget(getKvKey(params.pageId), 'recordMap')
  
  if (data == null) {
    console.warn(`Value for page: ${params.pageId}, was not present in KV database.`)

    return new Response(`Value for page: ${params.pageId}, was not present in KV database.`, {
       status: 404,
    })
  }

  return new Response(JSON.stringify(data), {
    status: 200,
  })
}

export async function POST(request: NextRequest,
  { params }: { params: { pageId: string } }) {
    const kvKey = getKvKey(params.pageId)
    const data = await request.json()
    const response = await kv.hset(kvKey, data)
    if (response !== 1) {
        return new Response(`Failed to save to KV for key: ${kvKey}`, {
          status: 500,
        })
    }

    return new Response('OK!', {
      status: 201,
    })
}