"use client"

import * as React from 'react'
import { ExtendedRecordMap } from 'notion-types'
import { getPageTitle } from 'notion-utils'

import { NotionRenderer } from 'react-notion-x'
import Image from 'next/image'
import Link from 'next/link'

export const NotionPage = ({
  recordMap,
  rootPageId
}: {
  recordMap: ExtendedRecordMap
  rootPageId?: string
}) => {
  if (!recordMap) {
    return null
  }

  const title = getPageTitle(recordMap)
  console.log(title, recordMap)

  return (
    <>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        rootPageId={rootPageId}
        disableHeader={true}
        components={{
            nextImage: Image,
            nextLink: Link
        }}
      />
    </>
  )
}