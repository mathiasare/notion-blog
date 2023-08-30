"use client"

import * as React from 'react'
import { ExtendedRecordMap } from 'notion-types'
import { getPageTitle } from 'notion-utils'

import { NotionRenderer } from 'react-notion-x'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import PageHeader from './PageHeader'
import PageFooter from './PageFooter'

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then((m) => {
      m.Modal.setAppElement('.notion-viewport')
      return m.Modal
    }),
  {
    ssr: false
  }
)

export const NotionPage = ({
  recordMap,
  rootPageId
}: {
  recordMap: ExtendedRecordMap | null
  rootPageId?: string
}) => {
  if (!recordMap) {
     return null
  }

  return (
    <>
      <NotionRenderer
        className='.notion'
        bodyClassName='.notion'
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        rootPageId={rootPageId}
        previewImages={true}
        footer={PageFooter()}
        components={{
            nextImage: Image,
            nextLink: Link,
            Collection,
            Equation,
            Pdf,
            Modal,
            Header: PageHeader,
        }}
      />
    </>
  )
}