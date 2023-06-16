import { NotionPage } from "@/components/NotionPage"
import { CONTACT_PAGE_ID } from "@/lib/config"
import { getPageCached } from "@/lib/kv-cache"

export const revalidate = 500

export default async function Page() {
    const pageId = CONTACT_PAGE_ID
    const recordMap = await getPageCached(pageId)

    return <NotionPage recordMap={recordMap} rootPageId={pageId} />
}