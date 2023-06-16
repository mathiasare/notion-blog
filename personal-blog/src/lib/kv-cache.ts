import { ExtendedRecordMap } from "notion-types"
import notion from "./notion"
import { kv } from "@vercel/kv"

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
            kv.hset(
                kvKey, 
                { recordMap: recordMap }
            ).then((res) => {
                if (res !== 0) {
                    kv.expire(kvKey, 300).then((res) => {
                        if (res === 1) {
                            console.info(`Cached result for: ${kvKey}`)
                        } else {
                            console.warn(`Error caching result for key: ${kvKey}`)
                        }
                    })
                } else {
                    console.warn(`Error caching result for key: ${kvKey}`)
                }
            })
        }
    } catch(error) {
        console.error(`Error saving data to KV:  ${pageId}`, error)
    }

    return recordMap;
}

export const getKvKey = (pageId: string) => {
    return `notion:page:${pageId}`
}