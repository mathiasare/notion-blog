import { NotionPage } from "@/components/NotionPage";
import { getPageCached } from "@/lib/kv-cache";
import notion from "@/lib/notion";

export const revalidate = 500

export default async function Page({ params }: { params: { pageId: string } }) {
    const recordMap = await getPageCached(params.pageId)

    return <NotionPage recordMap={recordMap} rootPageId={params.pageId} />
}