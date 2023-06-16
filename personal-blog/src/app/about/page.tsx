import { NotionPage } from "@/components/NotionPage"
import { ABOUT_PAGE_ID } from "@/lib/config"
import notion from "@/lib/notion"

export default async function Page() {
    const pageId = ABOUT_PAGE_ID
    const recordMap = await notion.getPage(pageId)

    return <NotionPage recordMap={recordMap} rootPageId={pageId} />
}