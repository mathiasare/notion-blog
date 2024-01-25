import { NotionPage } from "@/components/NotionPage"
import { ABOUT_PAGE_ID } from "@/lib/config"
import { getPageCached } from "@/lib/kv-cache"

export default async function Page() {
    const pageId = ABOUT_PAGE_ID
    const recordMap = await getPageCached(pageId)

    return <NotionPage recordMap={recordMap} rootPageId={pageId} />
}