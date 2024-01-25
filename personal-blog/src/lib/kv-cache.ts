import { ExtendedRecordMap } from "notion-types"
import notion from "./notion"
import { kv } from "@vercel/kv"
import { Ratelimit } from '@upstash/ratelimit'
import { headers } from "next/headers";
import { cache } from 'react'


const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.fixedWindow(30, "60s"),
  });

export const getPageCached =  cache(async (pageId: string) => {
    let recordMap: ExtendedRecordMap | null
    const kvKey = getKvKey(pageId)

    const ip = headers().get("x-forwarded-for");
    const { success, limit, remaining, reset } = await ratelimit.limit(ip ?? "anonymous");

    if (!success) {
        return null
    }

    try {
        recordMap = await kv.hget(getKvKey(pageId), 'recordMap')
        if (recordMap) {
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
})

export const getKvKey = (pageId: string) => {
    return `notion:page:${pageId}`
}