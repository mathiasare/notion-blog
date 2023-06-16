import { NotionPage } from '@/components/NotionPage'
import { ROOT_PAGE_ID } from '@/lib/config'
import { getPageCached } from '@/lib/get-page-cached'

export const revalidate = 500

export default async function Home() {

  const pageId = ROOT_PAGE_ID
  const recordMap = await getPageCached(pageId)

  return <NotionPage recordMap={recordMap} rootPageId={ROOT_PAGE_ID} />
}
