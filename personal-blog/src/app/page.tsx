import { NotionPage } from '@/components/NotionPage'
import { ROOT_PAGE_ID } from '@/lib/config'
import notion from '@/lib/notion'

export const revalidate = 3600

export default async function Home() {

  const pageId = ROOT_PAGE_ID
  const recordMap = await notion.getPage(pageId)

  return <NotionPage recordMap={recordMap} rootPageId={ROOT_PAGE_ID} />
}
