import { ExtendedRecordMap } from "notion-types"
import notion from "./notion"
import { kv } from "@vercel/kv"
import { getBaseUrl } from "./base-url"
import { Ratelimit } from '@upstash/ratelimit'
import { headers } from "next/headers";


const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.fixedWindow(30, "60s"),
  });

export const getPageCached =  async (pageId: string) => {
    let recordMap: ExtendedRecordMap | null
    const kvKey = getKvKey(pageId)
    const baseUrl = getBaseUrl()

    const ip = headers().get("x-forwarded-for");
    const { success, limit, remaining, reset } = await ratelimit.limit(ip ?? "anonymous");

    if (!success) {
        console.debug(`No more remaining requests for ip: ${ip}`)
        return null
    }

    console.debug({"ip" : ip, "remaining requests" : remaining})

    try {
        const data = await fetch(`${baseUrl}/api/cache/${pageId}`, { method: 'GET', next: {tags: ['pageCache']} })
        recordMap = await data.json()
        if (recordMap) {
            console.info(`CACHE HIT: ${kvKey}`)
            return recordMap
        }
    } catch(error) {
        console.error(`Error fetching data from KV for page:  ${pageId}`, error)
    }

    recordMap = await notion.getPage(pageId)

    try {
        if (recordMap) {
            await kv.hset(kvKey, { recordMap: recordMap })
        }
    } catch(error) {
        console.error(`Error saving data to KV:  ${pageId}`, error)
    }
    return recordMap;
}

/**
 * 
 * OLD CACHE METHOD
export const getPageCached = async (pageId: string) => {
    let recordMap: ExtendedRecordMap | null
    const kvKey = getKvKey(pageId)
    try {
        recordMap = await kv.hget(kvKey, 'recordMap')
        if (recordMap) {
            console.info(`CACHE HIT: ${kvKey}`)
            return recordMap
        }
    } catch(error) {
        console.error(`Error fetching data from KV for page:  ${pageId}`, error)
    }

    recordMap = await notion.getPage(pageId)

    try {
        if (recordMap) {
            await kv.hset(kvKey, { recordMap: recordMap })
        }
    } catch(error) {
        console.error(`Error saving data to KV:  ${pageId}`, error)
    }

    return recordMap;
} */

export const getKvKey = (pageId: string) => {
    return `notion:page:${pageId}`
}