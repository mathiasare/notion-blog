import { ExtendedRecordMap } from "notion-types"
import notion from "./notion"
import { kv } from "@vercel/kv"

export const getPageCached = async (pageId: string) => {
    let recordMap: ExtendedRecordMap
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
            await kv.hset(
                kvKey, 
                { recordMap: recordMap },
                { ex: 3600 },
            )
        }
    } catch(error) {
        console.error(`Error saving data to KV:  ${pageId}`, error)
    }

    return recordMap;
}

const getKvKey = (pageId: string) => {
    return `notion:page:${pageId}`
}