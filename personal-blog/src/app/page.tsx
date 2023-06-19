
import { NotionPage } from '@/components/NotionPage'
import { getBaseUrl } from '@/lib/base-url'
import { ROOT_PAGE_ID } from '@/lib/config'
import { getPageCached } from '@/lib/kv-cache'

export const revalidate = 300

export default async function Home() {
  const pageId = ROOT_PAGE_ID

  console.log(getBaseUrl())

  console.time("getPageCached")
  const recordMap = await getPageCached(pageId)
  console.timeEnd("getPageCached")

  return <NotionPage recordMap={recordMap} rootPageId={ROOT_PAGE_ID} />
}
