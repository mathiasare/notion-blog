import { NotionPage } from "@/components/NotionPage";
import { getPageCached } from "@/lib/kv-cache";

export default async function Page({ params }: { params: { pageId: string } }) {
    const recordMap = await getPageCached(params.pageId)

    return <NotionPage recordMap={recordMap} rootPageId={params.pageId} />
}