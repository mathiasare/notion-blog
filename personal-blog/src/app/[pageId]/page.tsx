import { NotionPage } from "@/components/NotionPage";
import notion from "@/lib/notion";

export default async function Page({ params }: { params: { pageId: string } }) {
    const recordMap = await notion.getPage(params.pageId)

    return <NotionPage recordMap={recordMap} rootPageId={params.pageId} />
}